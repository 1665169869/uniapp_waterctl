import {useStore} from "vuex";

const connectionBLEDevice = async ({deviceId, isShowLog = true, timeout = 3000}) => {
    // 连接蓝牙设备

    try {
        const res = await uni.createBLEConnection({deviceId, timeout});
        if (isShowLog) {
            console.log('连接蓝牙设备成功', res);
        }

        return res;
    } catch (e) {
        if (isShowLog) {
            console.log(e)
        }

        throw e;
    }
}

export default connectionBLEDevice