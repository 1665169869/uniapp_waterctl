import {createStore} from "vuex";
import {BLECurrentDeviceInfo} from './type'

const store = createStore({
    state() {
        return {
            writeableBLEFeatures: [],
            currentDevice: {
                deviceId: "null",
                name: "null",
                RSSI: "null",
                services: [],
                localName: "null",
            }
        }
    },
    mutations: {
        setCurrentDevice(state, payload: BLECurrentDeviceInfo) {
            // 更新当前设备信息
            Object.keys(payload).forEach(key => {
                const value = payload[key];
                if (state.currentDevice[key] !== value) state.currentDevice[key] = value;
            })
        },
        setServices(state, payload) {
            state.currentDevice.services = payload.services
        },
        setWriteableBLEFeatures(state, payload) {
            state.writeableBLEFeatures = payload.features;
        }
    }
})
export default store;
