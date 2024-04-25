<template>
    <view class="content">
        <button @click="startSearchDevices">{{ isSearchText }}</button>
        <button @click="closeConnection" :disabled="isCloseConnection">断开设备</button>
        <button @click="getServices">获取services</button>
        <button @click="clearDiscoveredDevices">清除所有设备</button>
        <div class="deviceList">
            <template v-for="BLEDeviceItem in sortDiscoveredBLEDevices" :key="BLEDeviceItem.deviceId">
                <div class="deviceItem">
                    <h3>{{ BLEDeviceItem.name || "这是没有名字的设备" }}</h3>
                    <p>{{ BLEDeviceItem.deviceId }}</p>
                    <p>信号强度：{{ BLEDeviceItem.RSSI }}</p>
                    <button @click="bluetoothDeviceConnection(BLEDeviceItem)" class="btn-connect">connect</button>

                </div>
            </template>
        </div>
    </view>


</template>


<script>
import {
    searchBLEDevices,
    initBluetooth,
    stopSearchBLEDevices,
    closeBLEConnection,
    getBLEDevices,
    connectionBLEDevice,
    getWriteableBLEFeatures,
    writeBLECharacteristicValue,
} from "@/utils/bluetoothModule";
import {useMakePayload} from "@/utils/makePayload";
import getBLEDeviceServices from "@/utils/bluetoothModule/getBLEDeviceServices";
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
    name: "首页",
    created() {
        initBluetooth();
    },
    setup() {
        // data
        const store = useStore();

        const isSearch = ref(false);
        const discoveredBLEDevices = ref([]);

        let timeId = null;

        // computed
        let currentDevice = computed(() => store.state.currentDevice);


        const isSearchText = computed(() => {
            return isSearch.value ? "停止" : "搜索";
        })
        console.log(isSearchText.value)
        const sortDiscoveredBLEDevices = computed(() => {
            return discoveredBLEDevices.value.sort((a, b) => b.RSSI - a.RSSI).sort(a => {
                if (a.name.indexOf("Water") !== -1) return -1;
            })
        });

        const isCloseConnection = computed(() => {
            const deviceId = currentDevice.value?.deviceId;
            return deviceId === '' || deviceId === 'null' || deviceId === undefined || deviceId === null;
        });
        // methods
        const startSearchDevices = () => {
            if (!isSearch.value) {
                initBluetooth();
                isSearch.value = !isSearch.value;
                searchBLEDevices().then(() => {
                    timeId = setInterval(() => {
                        // 获取已搜索到的BLE设备
                        console.log("搜索中");
                        getBLEDevices().then(res => discoveredBLEDevices.value = res.devices)
                    }, 2000)
                })
            } else {
                stopSearchBLEDevices();
                clearTimeId();
            }
        }

        const clearTimeId = () => {
            if (timeId !== null) {
                isSearch.value = !isSearch.value;
                clearInterval(timeId);
                timeId = null;
            }
        }

        const clearDiscoveredDevices = () => {
            discoveredBLEDevices.value = [];
            initBluetooth();
            clearTimeId();
        }
        const closeConnection = (deviceId, isShowLog = true) => {
            closeBLEConnection({deviceId, isShowLog});
        }
        const bluetoothDeviceConnection = async (thisDevice) => {
            store.commit('setCurrentDevice', thisDevice);

            console.log("thisDevice: ", thisDevice.deviceId, thisDevice.name);
            console.log(currentDevice.value)
            uni.showLoading({title: "连接中"}).then();

            const deviceId = currentDevice.value.deviceId;
            try {
                await connectionBLEDevice({deviceId});
                await uni.showModal({
                    title: "连接成功",
                    content: "连接成功！" + deviceId,
                    showCancel: false,
                    confirmText: "确定",
                });
                const servicesRes = await getBLEDeviceServices({deviceId});
                store.commit('setServices', servicesRes.services);

                console.log("servicesRes: ", servicesRes);

                const writeableBLEFeatures = await getWriteableBLEFeatures({
                    deviceId,
                    serviceId: servicesRes.services[0].uuid
                });
                console.log("writeableBLEFeatures: ", writeableBLEFeatures);
                store.commit('setWriteableBLEFeatures', {features: writeableBLEFeatures});


                const hexUnit8 = useMakePayload(currentDevice.value.name);

                for (const writeableBLEFeature of writeableBLEFeatures) {

                    console.log("writeableBLEFeature: ", writeableBLEFeature);
                    await writeBLECharacteristicValue({
                        deviceId: writeableBLEFeature.deviceId,
                        serviceId: writeableBLEFeature.serviceId,
                        characteristicId: writeableBLEFeature.uuid,
                        buffer: hexUnit8.buffer
                    })
                }

                await uni.showModal({
                    title: "写入成功",
                    content: "写入数据成功！" + deviceId,
                    showCancel: false,
                    confirmText: "确定",
                })

            } catch (e) {
                console.log(e);
                await uni.showModal({
                    title: "连接失败！",
                    content: e.errMsg,
                    showCancel: false,
                    confirmText: "确定"
                })
                closeConnection(deviceId, false);
            }
            uni.hideLoading()
        }

        const getServices = () => {
            getBLEDeviceServices({deviceId: currentDevice.value?.deviceId}).then(res => console.log(res))
        }

        return {
            // data
            isSearch,
            discoveredBLEDevices,
            // computed
            currentDevice,
            isSearchText,
            sortDiscoveredBLEDevices,
            isCloseConnection,
            // methods
            closeConnection,
            startSearchDevices,
            clearDiscoveredDevices,
            bluetoothDeviceConnection,
            getServices

        };

    }
}
</script>


<style scoped>
.deviceList {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.deviceItem {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    padding: 10px;
    flex-grow: 1;
    border-radius: 10px;
    margin: 5px;
    box-shadow: 0 0 10px #c1c1c1;
}

.btn-connect {
    width: calc(100% - 20px);

}
</style>