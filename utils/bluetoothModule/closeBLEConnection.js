import {initBluetooth} from "@/utils/bluetoothModule/index";
import {useStore} from "vuex";
import showMessageBox from './showMessage'

const closeBLEConnection = async ({deviceId, isShowLog = true}) => {
    try {
        const res = await uni.closeBLEConnection({deviceId: deviceId});
        if (isShowLog) {
            console.log(res);
            await uni.showToast({ title: "断开成功！", icon: "success" })
        }
        return res;
    } catch (e) {
        if (isShowLog) {
            console.log(e);
            await showMessageBox({
                title: "断开失败！",
                errCode: e.errCode
            });
        }
        throw e;
    }
}

export default closeBLEConnection;