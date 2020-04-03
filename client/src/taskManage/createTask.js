import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import swal from "sweetalert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import {
  createNewTask,
  newTaskClose,
  taskAdded,
  inputChangeHandlar,
  viewTask,
  deleteTaskList,
  UpdateExistingTask,
  editTaskClose,
  inputEditChangeHandlar,
  taskUpdated
} from "../myActions/taskAction";
import ".././assets/css/taskList.scss";

class CreateTask extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.viewTask();
    this.state = { errMsg: "" };
  }

  componentDidMount() {
    setInterval(() => {
      this.props.viewTask();
    }, 1000);
  }

  deleteTasks = deleteId => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Records!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteTaskList(deleteId);
      } else {
        swal("Your TaskList is safe!");
      }
    });
  };

  editTasks = editId => {
    this.setState({ errMsg: "" });

    this.props.UpdateExistingTask(editId);
  };

  errorHandlarAddTask(taskerr) {
    if (taskerr === "addtask") {
      if (this.props.taskTitle === "") {
        this.setState({ errMsg: "Note : Please enter task title!" });
        return false;
      } else if (this.props.taskDesc === "") {
        this.setState({ errMsg: "Note : Please enter task Description!" });
        return false;
      } else if (this.props.taskDate === "") {
        this.setState({ errMsg: "Note : Please Select due date!" });
        return false;
      } else if (this.props.taskPri === "") {
        this.setState({ errMsg: "Note : Please Select Priority!" });
        return false;
      } else {
        this.setState({ errMsg: "" });
        return true;
      }
    } else if (taskerr === "edittask") {
      if (this.props.editTaskTitle === "") {
        this.setState({ errMsg: "Note : Please enter task title!" });
        return false;
      } else if (this.props.editTaskDesc === "") {
        this.setState({ errMsg: "Note : Please enter task Description!" });
        return false;
      } else if (this.props.editTaskDate === "") {
        this.setState({ errMsg: "Note : Please Select due date!" });
        return false;
      } else if (this.props.editTaskPri === "") {
        this.setState({ errMsg: "Note : Please Select Priority!" });
        return false;
      } else {
        this.setState({ errMsg: "" });

        return true;
      }
    }
  }

  taskAddedHandlar = async () => {
    let errMsg = this.errorHandlarAddTask("addtask");

    if (errMsg === true) {
      const data = {
        taskTitle: this.props.taskTitle,
        taskDesc: this.props.taskDesc,
        taskDate: this.props.taskDate,
        taskPri: this.props.taskPri
      };

      this.props.taskAdded(data);
    }
  };

  taskEditHandlar = async () => {
    let errMsg = this.errorHandlarAddTask("edittask");

    if (errMsg === true) {
      const data = {
        taskTitle: this.props.editTaskTitle,
        taskDesc: this.props.editTaskDesc,
        taskDate: this.props.editTaskDate,
        taskPri: this.props.editTaskPri
      };

      this.props.taskUpdated(data, this.props.editId);
    }
  };

  createNewTaskOpenModel = () => {
    this.setState({ errMsg: "" });

    this.props.createNewTask();
  };
  render() {
    const closeBtn = (
      <button className="close" onClick={this.props.newTaskClose}></button>
    );

    const closeEditBtn = (
      <button className="close" onClick={this.props.editTaskClose}></button>
    );

    if (this.props.viewUpdate === true) {
      this.props.viewTask();
    }

    if (this.props.isTaskCreate === true) {
      return (
        <div>
          <Modal isOpen={this.props.isTaskCreate}>
            <ModalHeader close={closeBtn}>Generate New Task</ModalHeader>
            <ModalBody>
              <Form method="post">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="taskTitle"
                    id="taskTitle"
                    required
                    onChange={this.props.inputChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    type="textarea"
                    name="taskDesc"
                    id="taskDesc"
                    required
                    onChange={this.props.inputChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate">Due Date</Label>
                  <Input
                    type="date"
                    name="taskDate"
                    id="taskDate"
                    required
                    placeholder="select date"
                    onChange={this.props.inputChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">priority</Label>

                  <Input
                    type="select"
                    name="taskPri"
                    id="taskPri"
                    required
                    onChange={this.props.inputChangeHandlar}
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Input>
                </FormGroup>
              </Form>
              <label className="lblErr"> {this.state.errMsg}</label>
            </ModalBody>
            <ModalFooter>
              {/* <input type="submit" className="btn btn-primary" value="Submit" /> */}
              <Button color="primary" onClick={this.taskAddedHandlar}>
                Submit
              </Button>
              <Button color="secondary" onClick={this.props.newTaskClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else if (this.props.isTaskUpdate === true) {
      return (
        <div>
          <Modal isOpen={this.props.isTaskUpdate}>
            <ModalHeader close={closeEditBtn}>Update Task</ModalHeader>
            <ModalBody>
              <Form method="post">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="editTaskTitle"
                    id="editTaskTitle"
                    value={this.props.editTaskTitle}
                    onChange={this.props.inputEditChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    type="textarea"
                    name="editTaskDesc"
                    id="editTaskDesc"
                    value={this.props.editTaskDesc}
                    onChange={this.props.inputEditChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    type="date"
                    name="editTaskDate"
                    id="editTaskDate"
                    value={this.props.editTaskDate}
                    onChange={this.props.inputEditChangeHandlar}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">priority</Label>

                  <Input
                    type="select"
                    name="editTaskPri"
                    id="editTaskPri"
                    value={this.props.editTaskPri}
                    onChange={this.props.inputEditChangeHandlar}
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Input>
                </FormGroup>
              </Form>
              <label className="lblErr"> {this.state.errMsg}</label>
            </ModalBody>
            <ModalFooter>
              {/* <input type="submit" className="btn btn-primary" value="Submit" /> */}
              <Button color="primary" onClick={this.taskEditHandlar}>
                Update
              </Button>
              <Button color="secondary" onClick={this.props.editTaskClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Button color="primary" onClick={this.createNewTaskOpenModel}>
              Create New Task
            </Button>
          </div>

          <div className="container cardMain">
            {/* <h2>Cards Columns</h2>
            <p>
              The .card-columns class creates a masonry-like grid of cards. The
              layout will automatically adjust as you insert more cards.
            </p>
            <p>
              <strong>Note:</strong> The cards are displayed vertically on small
              screens (less than 576px):
            </p> */}

            <div className="card-columns">
              {this.props.getAllTaskList.map(getAllTaskList => (
                <div className="card bg-light" key={getAllTaskList._id}>
                  <div className="card-body text-center">
                    <p className="card-text">
                      Title : {getAllTaskList.taskTitle}
                    </p>
                    <p className="card-text">
                      Description : {getAllTaskList.taskDesc}
                    </p>
                    <p className="card-text">
                      Due Date : {getAllTaskList.taskDate}
                    </p>
                    <p className="card-text">
                      Priority : {getAllTaskList.taskPri}
                    </p>
                    <p className="card-text">
                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        onClick={() => this.editTasks(getAllTaskList._id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => this.deleteTasks(getAllTaskList._id)}
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className="card bg-primary">
                <div className="card-body text-center">
                  <p className="card-text">Some text inside the first card</p>
                </div>
              </div>
              <div class="card bg-warning">
                <div class="card-body text-center">
                  <p class="card-text">Some text inside the second card</p>
                </div>
              </div>
              <div class="card bg-success">
                <div class="card-body text-center">
                  <p class="card-text">Some text inside the third card</p>
                </div>
              </div>
              <div class="card bg-danger">
                <div class="card-body text-center">
                  <p class="card-text">Some text inside the fourth card</p>
                </div>
              </div>
              <div class="card bg-light">
                <div class="card-body text-center">
                  <p class="card-text">Some text inside the fifth card</p>
                </div>
              </div>
              <div class="card bg-info">
                <div class="card-body text-center">
                  <p class="card-text">Some text inside the sixth card</p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isTaskCreate: state.task.createNewTask,
    taskTitle: state.task.taskTitle,
    taskDesc: state.task.taskDesc,
    taskDate: state.task.taskDate,
    taskPri: state.task.taskPri,
    getAllTaskList: state.task.getAllTaskList,
    viewUpdate: state.task.viewUpdate,
    isTaskUpdate: state.task.isTaskUpdate,
    editId: state.task.editId,
    editTaskData: state.task.editTaskData,
    editTaskTitle: state.task.editTaskTitle,
    editTaskDesc: state.task.editTaskDesc,
    editTaskDate: state.task.editTaskDate,
    editTaskPri: state.task.editTaskPri
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewTask: event => {
      dispatch(createNewTask(event));
    },
    newTaskClose: event => {
      dispatch(newTaskClose(event));
    },
    inputChangeHandlar: event => {
      dispatch(inputChangeHandlar(event));
    },

    inputEditChangeHandlar: event => {
      dispatch(inputEditChangeHandlar(event));
    },

    taskAdded: data => {
      dispatch(taskAdded(data));
    },
    viewTask: () => {
      dispatch(viewTask());
    },
    deleteTaskList: deleteId => {
      dispatch(deleteTaskList(deleteId));
    },
    UpdateExistingTask: editId => {
      dispatch(UpdateExistingTask(editId));
    },
    editTaskClose: () => {
      dispatch(editTaskClose());
    },
    taskUpdated: (data, editid) => {
      dispatch(taskUpdated(data, editid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
