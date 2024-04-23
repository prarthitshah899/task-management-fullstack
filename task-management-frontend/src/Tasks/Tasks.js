import "./Tasks.css";
import { useNavigate } from "react-router-dom";
import React, { Suspense, useState, useEffect, useMemo } from "react";
import { Button, Table, Space, Tooltip, Modal, Spin, notification } from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  EyeFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import TaskForm from "./TaskForm.js";

const Context = React.createContext({
  name: "Default",
});

const Tasks = (props) => {
  const { setLoggedIn } = props;
  const [api, contextHolder] = notification.useNotification();
  const [createTask, setCreateTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [readTask, setReadTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [singleTaskData, setSingleTaskData] = useState();

  const navigate = useNavigate();

  const openNotification = (placement, message) => {
    api.info({
      message: `Task Notification`,
      description: (
        <Context.Consumer>{({ name }) => `${message}`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const dataSource =
    tasks &&
    tasks.map((singleTask) => {
      return {
        key: singleTask?._id,
        title: singleTask?.title,
        description: singleTask?.description,
        status: singleTask?.status,
      };
    });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 200,
      render: (text, record) => renderButton(record?.key),
    },
  ];

  const onDeleteClick = (id) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete?",
      okText: "YES",
      cancelText: "CANCEL",
      onOk() {
        console.log(id);
        fetch("http://127.0.0.1:5000/tasks/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((taskData) => {
            taskData?.message &&
              openNotification("topRight", taskData?.message);
            setTasks(taskData?.data);
          });
      },
    });
  };

  const getSingleTaskData = (id) => {
    fetch("http://127.0.0.1:5000/tasks/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (singleTaskData) =>
          singleTaskData?.data && setSingleTaskData(singleTaskData?.data)
      );
  };

  const onUpdateClick = (id) => {
    setEditTask(true);
    getSingleTaskData(id);
  };

  const onReadClick = (id) => {
    setReadTask(true);
    getSingleTaskData(id);
  };

  const onCreateClick = () => {
    setCreateTask(true);
  };

  const renderButton = (key) => {
    return (
      <Space>
        <Tooltip title="View task">
          <Button onClick={() => onReadClick(key)}>
            <EyeFilled />
          </Button>
        </Tooltip>

        <Tooltip title="Edit task">
          <Button onClick={() => onUpdateClick(key)}>
            <EditFilled />
          </Button>
        </Tooltip>

        <Tooltip title="Delete task">
          <Button onClick={() => onDeleteClick(key)}>
            <DeleteFilled />
          </Button>
        </Tooltip>
      </Space>
    );
  };

  const onLogoutButtonClicked = () => {
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((tasksData) => setTasks(tasksData?.data));
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <>
        <Modal
          open={createTask}
          destroyOnClose={true}
          footer={false}
          title="Create Task"
          width={760}
          onCancel={() => {
            setCreateTask(false);
            Modal.destroyAll();
          }}
        >
          <Suspense fallback={<Spin />}>
            <TaskForm
              type="create"
              setCreateTask={setCreateTask}
              setTasks={setTasks}
            />
          </Suspense>
        </Modal>

        <Modal
          open={editTask}
          destroyOnClose={true}
          footer={false}
          title="Edit Task"
          width={760}
          onCancel={() => {
            setEditTask(false);
            Modal.destroyAll();
          }}
        >
          <Suspense fallback={<Spin />}>
            <TaskForm
              type="edit"
              singleTaskData={singleTaskData}
              setEditTask={setEditTask}
              setTasks={setTasks}
            />
          </Suspense>
        </Modal>

        <Modal
          open={readTask}
          destroyOnClose={true}
          footer={false}
          title="Read Task"
          width={760}
          onCancel={() => {
            setReadTask(false);
            Modal.destroyAll();
          }}
        >
          <Suspense fallback={<Spin />}>
            <TaskForm type="read" singleTaskData={singleTaskData} />
          </Suspense>
        </Modal>

        <div className="mainContainer">
          <div className={"titleContainer"}>
            <div>
              Task Management
              <Button
                onClick={onLogoutButtonClicked}
                style={{ left: "235px" }}
                icon={<LogoutOutlined />}
                type="primary"
              ></Button>
            </div>
            <br></br>
          </div>
          <Button
            onClick={() => onCreateClick()}
            className="newTaskButton"
            type="primary"
          >
            Add New Task
          </Button>
          <br></br>

          <Suspense fallback={<Spin />}>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered
              pagination={{
                pageSize: 5,
              }}
            />
          </Suspense>
        </div>
      </>
    </Context.Provider>
  );
};

export default Tasks;
