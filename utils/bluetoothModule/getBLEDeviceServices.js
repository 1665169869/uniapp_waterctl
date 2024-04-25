import {useStore} from "vuex";
import showMessageBox from './showMessage'

const getBLEDeviceServices = async ({deviceId, isShowLog = true}) => {
    try {
        const res = await uni.getBLEDeviceServices({deviceId});
        if (isShowLog) {
            console.log("获取Services成功！", res.services);
        }

        return res;
    } catch (e) {
        if (isShowLog) {
            console.log(e);
            showMessageBox({title: "获取Services失败！", errCode: e.errCode})
        }
        throw e;
    }
}

export default getBLEDeviceServices