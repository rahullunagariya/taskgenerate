const iState = {
  taskTitle: "",
  taskDesc: "",
  taskDate: "",
  taskPri: "",
  editTaskTitle: "",
  editTaskDesc: "",
  editTaskDate: "",
  editTaskPri: "",
  createNewTask: false,
  show: false,
  getAllTaskList: [],
  viewUpdate: false,
  isTaskUpdate: false,
  editId: "",
  editTaskData: null
};

const taskReducer = (state = iState, action) => {
  switch (action.type) {
    case "NEW_TASK":
      //console.log(action.payload);
      //action.payload.name = action.payload.val;

      return {
        ...state,
        createNewTask: action.payload,
        viewUpdate: false
      };

    case "NEW_CLOSE":
      return {
        ...state,
        createNewTask: action.payload
      };

    case "TASK_ADDED":
      return {
        ...state,
        createNewTask: false,
        viewUpdate: action.payload
      };

    case "GET_FORM":
      return {
        ...state,
        [action.payload.name]: action.payload.val
      };

    case "GET_EDITFORM":
      return {
        ...state,
        [action.payload.name]: action.payload.val
      };

    case "GET_ALLREC":
      //console.log(action.payload);
      return {
        ...state,
        getAllTaskList: action.payload
      };

    case "REMOVE_TASK":
      //console.log(action.payload);
      const newTaskList = state.getAllTaskList.filter(getAllTaskList => {
        return getAllTaskList._id !== action.payload;
      });
      //console.log(newTaskList);
      return {
        ...state,
        getAllTaskList: newTaskList
      };

    case "UPDATE_SUCCESS":
      let copyViewData = state.getAllTaskList;

      let index = copyViewData.findIndex(el => el._id === action.payload._id);

      copyViewData[index] = action.payload;

      return {
        ...state,
        isTaskUpdate: false,
        editId: "",
        getAllTaskList: copyViewData
      };

    case "UPDATE_TASK":
      return {
        ...state,
        isTaskUpdate: action.payload.isTaskUpdate,
        editId: action.payload.editid,
        editTaskData: action.payload.editTaskData,
        editTaskTitle: action.payload.editTaskData.taskTitle,
        editTaskDesc: action.payload.editTaskData.taskDesc,
        editTaskDate: action.payload.editTaskData.taskDate,
        editTaskPri: action.payload.editTaskData.taskPri
      };

    case "UPDATE_TASKCLOSE":
      return {
        ...state,
        isTaskUpdate: action.payload,
        editId: ""
      };

    //   case "DELETE_WISH":
    //     const newWishes = state.mywishes.filter((item) => {
    //       return item._id !== action.payload._id;
    //     });
    //     return {
    //       ...state,
    //       mywishes: newWishes
    //     };
    default:
      return state;
  }
};

export default taskReducer;
