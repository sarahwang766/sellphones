import { Input, Button, Form, Modal, message } from "antd";
import "../index.css";
import React, { useState, useEffect } from "react";
import http from "../../../api";
import { useDispatch } from "react-redux";
import { updateName } from "../../../redux/features/sellPhoneSlice";


function Info() {
  const user_id = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(
    "Type your password to change"
  );
  const [password, setPassword] = React.useState("");
  let dispatch = useDispatch();




  useEffect(() => {
    const getData = async () => {
      const response = await http.get("/users/profile?_id=" + user_id);
      const data = response.data.result;
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setEmail(data.email);
    };
    getData();
  }, []);

  const showModal = (value) => {
    setFirstName(value.firstname);
    setLastName(value.lastname);
    setEmail(value.email);
    setVisible(true);
  };

  // const Confirm = () => {



  const handleOk = async () => {
    // setModalText("Updating...");
    setConfirmLoading(true);
    // formResult["password"] = password;
    let formResult = { _id: user_id, firstname: firstName, lastname: lastName, email: email, password: password }

    await http
      .post("/users/profile",
        // {
        //   _id: user_id,
        //   firstname: firstName,
        //   lastname: lastName,
        //   email: email,
        //   password: password,
        // }
        formResult
      )
      .then((res) => {
        if (res.status === 200) {
          setPassword("");
          localStorage.setItem("firstname",res.data.result.firstname);
          localStorage.setItem("lastname", res.data.result.lastname);
          setTimeout(() => {
            message.success("update successfully");
            dispatch(updateName({firstname: res.data.result.firstname, lastname: res.data.result.lastname}));
            setVisible(false);
            setConfirmLoading(false);
          }, 2000);
        }
      })
      .catch((res) => {
        setTimeout(() => {
          message.error(res.response.data.error);
          setConfirmLoading(false);
          setModalText("Type your password to change");
        }, 2000);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // return (
  //   <>
  //     {/* <Button type="primary" onClick={showModal}>
  //       Update profile
  //     </Button> */}
  //     <Modal
  //       title="Title"
  //       visible={visible}
  //       onOk={handleOk}
  //       confirmLoading={confirmLoading}
  //       onCancel={handleCancel}
  //     >
  //       <p>{modalText}</p>
  //       <Input.Password
  //         value={password}
  //         // className={styles.input}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </Modal>
  //   </>
  // );
  // };

  return (
    firstName &&
    <div className="tab-content-wrapper">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={showModal}
        initialValues={{ firstname: firstName, lastname: lastName, email }}
      >

        <Form.Item label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              message: 'Please enter your first name!',
            },
          ]}>
          <Input
          // key={firstName}
          // defaultValue={firstName}
          // className={styles.input}
          // onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: 'Please enter your last name!',
            },
          ]}>
          <Input
          // value={lastName}
          // className={styles.input}
          // onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            }]}>
          <Input
          // key={email}
          // defaultValue={email}
          // className={styles.input}
          // onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 18 }}>
          {/* <Confirm /> */}
          <Button type="primary" htmlType="submit"
          // onClick={showModal}
          >
            Update profile
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose="true"
      >
        <p>{modalText}</p>
        <Form initialValues={{password:""}}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>

  );
}

export default Info;
