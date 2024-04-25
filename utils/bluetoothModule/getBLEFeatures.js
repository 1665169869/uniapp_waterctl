const getWriteableBLEFeatures = async ({deviceId, serviceId, isShowLog = true}) => {
    console.log('getWriteableBLEFeatures: ', deviceId, serviceId)
    try {
        const writeFeatures = [];
        // 获取蓝牙设备所有特征值
        const res = await uni.getBLEDeviceCharacteristics({
            deviceId,
            serviceId
        });
        if (isShowLog) {
            console.log(res, res.characteristics);
        }

        for (const characteristic of res.characteristics) {
            if (characteristic.properties.write) {
                writeFeatures.push({
                    ...characteristic,
                    serviceId,
                    deviceId,
                });
            }
        }
        return writeFeatures;
    } catch (e) {
        if (isShowLog) {
            console.log(e);
        }
        throw e;
    }
}

export {
    getWriteableBLEFeatures
}