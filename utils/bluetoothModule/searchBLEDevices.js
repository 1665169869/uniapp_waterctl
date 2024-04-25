import showMessageBox from '@/utils/bluetoothModule/showMessage'

const searchBLEDevices = async (isShowLog = true) => {
    try {
        const res = await uni.startBluetoothDevicesDiscovery();
        if (isShowLog) {
            console.log(res);
        }
        return res;
    } catch (e) {
        if (isShowLog) {
            showMessageBox({
                title: "搜索失败！",
                errCode: e.errCode,
            })
            console.log(e);
        }
        throw e;
    }
}

const stopSearchBLEDevices = async (isShowLog = true) => {
    try {
        const res = await uni.stopBluetoothDevicesDiscovery();
        if (isShowLog) {
            console.log(res);
            await uni.showToast({
                title: "停止搜索",
                icon: "success"
            });
        }
        return res;

    } catch (e) {
        if (isShowLog) {
            showMessageBox({
                title: "停止搜索失败！",
                errCode: e.errCode,
            })
            console.log(e)
        }
        throw e;
    }
}

const getBLEDevices = async (isShowLog = true) => {
    try {
        return await uni.getBluetoothDevices();
    } catch (e) {
        if (isShowLog) {
            console.log(e);
        }
        throw e;
    }
}

export {
    searchBLEDevices,
    stopSearchBLEDevices,
    getBLEDevices
};