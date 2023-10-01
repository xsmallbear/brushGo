import Task from "../../common/Task";
import dataUtil from "../lib/dataUtil";
import uuid from "../lib/uuid";

interface TaskService {
  getAllTask: Function;
  getSingleTask: Function;
  addTask: Function;
  updateTask: Function;
  removeTask: Function;
}

const lowData = dataUtil<Task[]>("task");

class TaskServiceImpl implements TaskService {
  sName: string = "taskService";
  getAllTask(): Task[] {
    lowData.read();
    const data = lowData.data;
    // lowData.write();
    return data;
  }
  getSingleTask(uuid: string): Task {
    lowData.read();
    const data = lowData.data;
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      if (currentData.uuid === uuid) {
        return currentData;
      }
    }
    return {};
  }
  addTask(newTask: Task): boolean {
    lowData.read();
    const data = lowData.data;
    data.push({
      uuid: uuid(),
      operator: newTask.operator,
      shop: newTask.shop,
      time: newTask.time,
      showTime: newTask.showTime,
      orderNumber: newTask.orderNumber,
      orderId: newTask.orderId,
      amount: newTask.amount,
      gift: newTask.gift,
      expenditureChannel: newTask.expenditureChannel,
      note: newTask.note,
      operationPhone: newTask.operationPhone,
      phoneNumber: newTask.phoneNumber,
      productName: newTask.productName,
      keywords: newTask.keywords,
      jdToTbId: newTask.jdToTbId,
      createTime: new Date(),
      updateTime: new Date(),
    });
    lowData.write();
    return true;
  }
  updateTask() {}
  removeTask() {}
}

export type { TaskService };
export default TaskServiceImpl;