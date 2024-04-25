const initBluetooth = async () => {
    try {
        const res = await uni.openBluetoothAdapter();
        console.log(res);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default initBluetooth;