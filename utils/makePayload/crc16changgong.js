export default function crc16changgong(data) {
    let crc = 4119;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i);
        for (let j = 0; j < 8; j++) {
            if ((crc & 1) == 1) {
                crc >>= 1;
                crc ^= 40961;
            } else crc >>= 1;
        }
    }
    return crc;
}