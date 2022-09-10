import { Input, Button, Form, message } from "antd";
import "../index.css"
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../api";

function Password() {
  let navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const user_id = localStorage.getItem("userId");

  const showSuccess = () => {
    setTimeout(() => {
      message.success("reset password successfully");
    });
  };

  const showError = (error) => {
    setTimeout(() => {
      message.error(error);
    });
  };

  const signout = () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  };

  const handleSubmit = async () => {
    await http
      .post("/users/password", {
        _id: user_id,
        password: currentPassword,
        new_password: newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          showSuccess();
          signout();
          navigate("/login");
        }
      })
      .catch((res) => showError(res.response.data.error));
  };

  return (
    <div className="tab-content-wrapper">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}>
        <Form.Item 
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: 'Please enter your current password!',
            },
          ]}>
          <Input.Password

            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item 
          label="New Password"
          name="newPassord"
          rules={[
            {
              required: true,
              message: 'Please enter your new password!',
            },
          ]}>
          <Input.Password

            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"

            onClick={handleSubmit}
          >
            {" "}
            Update password{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Password;
