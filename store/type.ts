interface BLECurrentDeviceInfo {
    /**
     * 蓝牙设备名称，某些设备可能没有
     */
    name: string;
    /**
     * 用于区分设备的 id
     */
    deviceId: string;
    /**
     * 当前蓝牙设备的信号强度
     */
    RSSI: number;
    /**
     * 当前蓝牙设备的广播数据段中的LocalName数据段
     */
    localName: string;
    services: []
}

export {
    BLECurrentDeviceInfo
}