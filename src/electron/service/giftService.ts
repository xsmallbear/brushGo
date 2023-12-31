import Gift from "../../common/Gift";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface GiftService {
  getAllGift: Function;
  getSingleGift: Function;
  addGift: Function;
  updateGift: Function;
  removeGift: Function;
}

const lowData = dataUtil<Gift[]>("gift");

class GiftServiceImpl implements GiftService {
  sName: string = "giftService";
  /**
   * 获取所有的礼品
   */
  getAllGift(): Gift[] {
    lowData.read();
    const data = lowData.data;
    lowData.write();
    return data;
  }

  /**
   * 获取单个礼品
   */
  getSingleGift(name: string): Gift {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.name === name) {
        return currentData;
      }
    }
    return {};
  }

  /**
   * 添加一个礼品
   */
  addGift(giftName: string): boolean {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.name === giftName) {
        return false;
      }
    }
    data.push({
      uuid: uuid(),
      name: giftName,
      state: true,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  }

  /**
   * 跟新礼品信息
   */
  updateGift(gift: Gift) {
    lowData.read();
    for (let i = 0; i < lowData.data.length; i++) {
      if (lowData.data[i].uuid === gift.uuid) {
        lowData.data[i].uuid = gift.uuid;
        lowData.data[i].name = gift.name;
        lowData.data[i].state = gift.state;
        lowData.data[i].updateTime = gift.updateTime;
      }
    }
    lowData.write();
    return true;
  }

  /**
   * 删除一个礼品
   */
  removeGift(giftUUid: string): boolean {
    lowData.read();
    for (let i = 0; i < lowData.data.length; i++) {
      const data = lowData.data[i];
      if (data.uuid === giftUUid) {
        lowData.data.splice(i, 1);
        lowData.write();
        return true;
      }
    }
    return false;
  }
}

export type { GiftService };
export default GiftServiceImpl;
