import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, InputNumber, message } from 'antd';
import axios from "axios";

function CheckoutPopupForm({ onCreate, onCancel, min, record }) {
    const [form] = Form.useForm();
    const [stock, setStock] = React.useState(0);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        getStock();
    }, []);
    const getStock = async () => {
        let res = await axios.get("/phones/fetch?phone_id=" + record.phoneId);
        setStock(res.data.result.stock);
    }
    return (
        <div>
            <Button type="primary" onClick={() => {
                setVisible(true)
            }}>Edit</Button>
            <Modal
                visible={visible}
                title="Please type in the quantity you want to purchase"
                okText="OK"
                cancelText="Cancel"
                onCancel={()=>{setVisible(false);}}
                onOk={() => {
                    form.validateFields().then((values) => {
                        form.resetFields();
                        onCreate(values, record);
                        setVisible(false);
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
                                message: `Please enter an integer not less than 0 and not greater than ${stock}`,
                            },
                        ]}
                    >
                        <InputNumber></InputNumber>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default CheckoutPopupForm;