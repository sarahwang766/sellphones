import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';

function PopupForm({ visible, onCreate, onCancel, min, stock }) {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Please type in the quantity you want to purchase"
            okText="Add to Cart"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    message.error(`Add to cart failed. ${info.errorFields[0].errors[0]}.`);
                });
            }}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name='quantity'
                    label='Quantity'
                    rules={[
                        {
                            type: 'number',
                            min: min,
                            max: stock,
                            required: true,
                            message: `Please enter an integer greater than 0 and not greater than ${stock}`,
                        },
                    ]}
                >
                    <InputNumber></InputNumber>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default PopupForm;