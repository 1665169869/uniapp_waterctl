import {initBluetooth} from "@/utils/bluetoothModule/index";

export default function ShowMessageBox({title, errCode, errMsg}) {
    let content = "";
    if (errMsg) {
        content = errMsg;
    } else {
        switch (errCode) {
            case 0:
                content = "设备正常。"
                break;
            case -1:
                content = "设备已连接";
                break;
            case 10000:
                content = "未初始化蓝牙适配器";
                return initBluetooth();
            case 10001:
                content = "当前蓝牙适配器不可用";
                break;
            case 10002:
                content = "没有找到指定设备";
                break;
            case 10003:
                content = "连接设备失败";
                break;
            case 10004:
                content = "没有找到指定服务";
                break;
            case 10005:
                content = "没有找到指定特征值";
                break;
            case 10006:
                content = "当前连接已断开";
                break;
            case 10007:
                content = "当前特征值不支持此操作";
                break;
            case 10008:
                content = "其余所有系统上报的异常";
                break;
            case 10009:
                content = "Android系统版本低于 4.3 不支持 BLE";
                break;
            case 10010:
                content = "已连接";
                break;
            case 10011:
                content = "配对设备需要配对码";
                break;
            case 10012:
                content = "连接超时";
                break;
            case 10013:
                content = "连接 deviceId 为空或者是格式不正确";
                break;
        }
    }
    return uni.showModal({
        title: title,
        content: errMsg,
        showCancel: false,
        confirmText: "确定",
    })
}