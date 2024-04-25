import crc16changgong from "@/utils/makePayload/crc16changgong";


export default function useMakePayload(deviceName) {
    const checksum = crc16changgong(deviceName.slice(-5));
    // prettier-ignore
    // FE FE 09 B8 00 00 05 09 03 04 02 06


    // FE FE 09 B2
    // 01 28 8C FF
    // 00 0B 3C 24
    // 04 22 21 08
    // 43 A8 03 00
    // fe fe 09 b2 01 28 8c ff 00 0b 3c 24 04 22 21 08 43 a8  03 00
    // fe fe 09 b2 01 28 8c ff 00 07 fd 24 04 22 21 44 08 14  0d 00
    // fd fd 09 ba 7d d6 0d 6d 6c 00 06 a1 82 02 04 36 5b 00  00 00
    // fefe 09b2 0128 8cff 000b 3c24 0422210843a80300
    // fefe 09b2 013b dd00 70e2 eb20 01010000006c3000
    // 最后两位0xff代表热水余额
    // fefe09b201288cff0007fd24042221440101ffff
    // fefe09b201288cff000b3c24042221084300ffff
    // fe fe 09 b2
    // 01 28 8c ff
    // ff ff ff ff
    // ff ff ff ff
    // ff ff ff ff
    return new Uint8Array([
        0xFE, 0xFE, 0x09, 0xB2,
        0x01, checksum & 0xFF, checksum >> 8, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF
    ]);
    //
    // 0x32 0x33 0x30 0x35 0x39 0x33 0x34 0x32 0x36
}




