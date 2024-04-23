import "./Tasks.css";
import React, { useMemo, useEffect, useState } from "react";
import { Button, Row, Col, Input, Form, Select, notification } from "antd";
import { isEmpty as _isEmpty } from "lodash";

const Context = React.createContext({
  name: "Default",
});

const TaskForm = (props) => {
  const { idForView, idForEdit, type, setCreateTask, setEditTask, setTasks } =
    props;

  const [api, contextHolder] = notification.useNotification();
  const [singleTaskData, setSingleTaskData] = useState({});
  const statusValue = ["To Do", "In Progress", "Done"];
  const [form] = Form.useForm();

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

  const formInitialValue = {
    title: singleTaskData?.title,
    description: singleTaskData?.description,
    status: singleTaskData?.status,
  };

  const onSubmitEdit = (values) => {
    var object = {
      title: values?.title,
      description: values?.description,
      status: values?.status,
    };
    fetch("http://127.0.0.1:5000/tasks/" + singleTaskData?._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((taskData) => {
        taskData?.message && openNotification("topRight", taskData?.message);
        setTasks(taskData?.data);
      });
    setTimeout(function () {
      setEditTask(false);
    }, 1000);
  };

  const onSubmitAdd = (values) => {
    var object = {
      title: values?.title,
      description: values?.description,
      status: values?.status,
    };
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((taskData) => {
        taskData?.message && openNotification("topRight", taskData?.message);
        setTasks(taskData?.data);
      });
    setTimeout(function () {
      setCreateTask(false);
    }, 1000);
  };

  useEffect(() => {
    if (type === "edit") {
      fetch("http://127.0.0.1:5000/tasks/" + idForEdit, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((apiData) => {
          apiData?.message && setSingleTaskData(apiData?.data);
        });
    } else if (type === "read") {
      fetch("http://127.0.0.1:5000/tasks/" + idForView, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((apiData) => {
          apiData?.message && setSingleTaskData(apiData?.data);
        });
    }
  }, [idForEdit, idForView, type]);

  return (
    <>
      {(type === "create" || !_isEmpty(singleTaskData)) && (
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Form
            form={form}
            initialValues={formInitialValue}
            onFinish={type === "edit" ? onSubmitEdit : onSubmitAdd}
          >
            <Row>
              <Col span={6} offset={6}>
                <Form.Item
                  name={"title"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Title",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Title"
                    className={"inputBox"}
                    disabled={type === "read" ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={6}>
                <Form.Item
                  name={"description"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Description",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Description"
                    className={"inputBox"}
                    disabled={type === "read" ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={6}>
                <Form.Item
                  name={"status"}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Status",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    disabled={type === "read" ? true : false}
                    placeholder="Select Status"
                    className={"selectBox"}
                  >
                    {statusValue &&
                      statusValue?.map((singleStatus) => {
                        return (
                          <Select.Option
                            key={singleStatus}
                            value={singleStatus}
                          >
                            {singleStatus}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {type !== "read" && (
              <Row>
                <Col span={12} offset={11}>
                  <Button size="large" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            )}
          </Form>
        </Context.Provider>
      )}
    </>
  );
};

export default TaskForm;
