/**
 * @description 写入蓝牙数据
 * @param deviceId
 * @param serviceId
 * @param characteristicId
 * @param buffer
 * @returns {Promise<*>}
 */
const hookWriteBLEValue = async ({deviceId, serviceId, characteristicId, buffer,}) => {
    deviceId = deviceId || '';
    serviceId = serviceId || '';
    characteristicId = characteristicId || '';

    try {
        const res = await uni.writeBLECharacteristicValue({
            deviceId: deviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            value: buffer,
        });
        // 如果写入成功，打印成功的日志
        console.log("writeBLECharacteristicValue success", res.errMsg);
        return res;
    } catch (e) {
        console.log("writeBLECharacteristicValue fail", e);
        throw e;
    }

}

const writeBLECharacteristicValue = async ({deviceId, serviceId, characteristicId, buffer, isShowLog = true}) => {
    deviceId = deviceId || '';
    serviceId = serviceId || '';
    characteristicId = characteristicId || '';

    if (isShowLog) {
        console.log("writeBLECharacteristicValue", deviceId, serviceId, characteristicId, buffer);
    }

    try {
        const res = await uni.writeBLECharacteristicValue({
            deviceId: deviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            value: buffer,
        });
        if (isShowLog) {
            // 如果写入成功，打印成功的日志
            console.log("writeBLECharacteristicValue success", res.errMsg);
        }
        return res;
    } catch (e) {
        if (isShowLog) {
            console.log("writeBLECharacteristicValue fail", e);
        }
        throw e;
    }

}

export {hookWriteBLEValue, writeBLECharacteristicValue};