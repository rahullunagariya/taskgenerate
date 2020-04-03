import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import serverPath from "../serverpath";
import axios from "axios";

export const createNewTask = btnClick => {
  return dispatch => {
    dispatch({ type: "NEW_TASK", payload: true });
  };
};

export const newTaskClose = btnclose => {
  return dispatch => {
    dispatch({ type: "NEW_CLOSE", payload: false });
  };
};

export const inputChangeHandlar = event => {
  return dispatch => {
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };

    dispatch({ type: "GET_FORM", payload: formValue });
  };
};

export const taskAdded = data => {
  return async dispatch => {
    const res = await axios.post(serverPath + "/task/addtask", data);
    const addResult = await res.data.succMsg;

    if (addResult === "success") {
      toast.success("Task Create Successfully!");
      dispatch({ type: "TASK_ADDED", payload: true });
    }
  };
};

export const viewTask = () => {
  return async dispatch => {
    const res = await axios.get(serverPath + "/task/viewtask");
    const result = await res.data.findAllRec;

    dispatch({ type: "GET_ALLREC", payload: result });
  };
};

export const deleteTaskList = deleteid => {
  return async dispatch => {
    const deleteId = { deleteId: deleteid };
    const res = await axios.post(serverPath + "/task/deletetask", deleteId);
    const result = await res.data.succMsg;

    // console.log(result);
    // console.log(res);
    // console.log(res.errMsg);
    if (result === "success") {
      toast.success("Task Removed Successfully!");

      dispatch({ type: "REMOVE_TASK", payload: deleteid });
    } else {
    }
  };
};

export const UpdateExistingTask = editid => {
  return async dispatch => {
    let EditId = { editID: editid };
    const res = await axios.post(serverPath + "/task/getEditTaskList", EditId);

    const result = await res.data.findTaskData;
    //const finalResult = null;
    if (result) {
      const finalResult = result[0];
      //console.log(finalResult);
      let data = {
        editid: editid,
        isTaskUpdate: true,
        editTaskData: finalResult
      };
      dispatch({ type: "UPDATE_TASK", payload: data });
    } else {
      console.log("error");
    }
  };
};

export const editTaskClose = () => {
  return dispatch => {
    dispatch({ type: "UPDATE_TASKCLOSE", payload: false });
  };
};

export const inputEditChangeHandlar = event => {
  return dispatch => {
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };

    dispatch({ type: "GET_EDITFORM", payload: formValue });
  };
};

export const taskUpdated = (data, editid) => {
  return async dispatch => {
    const updateData = { updatedata: data, editId: editid };
    const res = await axios.post(serverPath + "/task/updateTask", updateData);
    const result = await res.data.findTaskData;

    if (result) {
      dispatch({ type: "UPDATE_SUCCESS", payload: result });
      toast.success("Task Updated Successfully!");
    } else {
      console.log("error");
    }
    // console.log(res);
    // // console.log(res.errMsg);
    // if (result === "success") {
    //   toast.success("Task Removed Successfully!");

    //   dispatch({ type: "REMOVE_TASK", payload: deleteid });
    // } else {
    // }
  };
};
