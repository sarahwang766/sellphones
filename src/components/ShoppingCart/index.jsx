import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CheckoutPopupForm from '../CheckoutPopupForm';
import { Table, Button, ConfigProvider, Empty, Space, message } from "antd";
import { DeleteOutlined, CaretLeftOutlined } from '@ant-design/icons';
import http from "../../api";
import baseImageUrl from "../../baseImageUrl";


function ShoppingCart() {
    const [cartData, setCartData] = useState({ data: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    
    const userID = localStorage.getItem("userId");
    const navigate = useNavigate();
    // let baseImageUrl = "/static/phoneimages/";
    useEffect(() => {
        getCartData();
    }, []);

    // after user update the quantity of item, send post request to backend server.
    const onCreate = async (values, record) => {
        if(values.quantity === 0) {
            deleteRecord(record);
        } else {
            await http.post('/cart/changeRecord', {
                userId: userID,
                recordId: record.key,
                quantity: values.quantity,
            }).then((res) => {
                if (res.status === 200) {
                    message.success('change successfully');
                } else {
                    message.error('change failed');
                }
    
            }).catch((err) => {
                message.error('change failed');
            })
            getCartData();
        }
    }

    // After checkout, the inventory of the item will decrease and the shopping cart will be emptied.
    const checkout = async() => {
        if(cartData.data.length === 0) {
            message.warn('Your shopping cart is empty');
            return;
        }
        let shoppingList = [];
        for(let item of cartData.data) {
            shoppingList.push({userId: userID, phoneId: item.phoneId, quantity: item.quantity});
        }
        http.post('/cart/checkout', {
            shoppingList,
        }).then((res) => {
            if (res.status === 200 && checkPromiseStatus(res.data.result)) {
                message.success('You have successfully checked out');
                navigate('/');
            } else {
                message.error('Failed to checkout.');
                getCartData();
            }
        }).catch((err) => {
            message.error('Failed to checkout');
        });
    }

    // Check if any item fails to checkout
    const checkPromiseStatus = (results) => {
        for(let item of results) {
            if(item.status !== 'fulfilled') {
                return false;
            }
        }
        return true;
    }

    // Delete the record of an item in the shopping cart
    const deleteRecord = async (record) => {
        await http.post('/cart/delete', {
            userId: userID,
            phoneId: record.phoneId,
        }).then((res) => {
            message.success('deleted successfully');
            let dataSource = cartData.data.filter(item => item.key !== record.key);
            setCartData({ data: dataSource });
        }).catch((err) => {
            message.error('delete failed ')
        });
        getCartData();
    }

    //Customize the display of empty content in a table
    const emptyContent = () => (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
                <span>Your shopping cart is empty</span>
            }
        ></Empty>
    );

    // get the shopping cart data of the current user.
    const getCartData = async () => {
        const result = await http.get('/cart/cartData?id=' + userID);
        let cartDetail = [];
        console.log(result);
        for (let item of result.data.result.cart) {
            cartDetail.push({
                key: item._id,
                image: item.image,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                subtotal: parseFloat(item.price) * parseFloat(item.quantity),
                phoneId: item.phoneID,
            })
        }
        setCartData({ data: cartDetail });
        let total = 0;
        for (let item of cartDetail) {
            total += item.subtotal;
        }
        setTotalPrice(Math.round(total*100)/100);
    }

    const columns = [
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            width: 200,
            render: record => (<img src={baseImageUrl+record} alt="phone" className={styles.pic} width="100%" height="100%" />)
        },
        {
            title: 'Product Title',
            dataIndex: 'title',
            key: 'title',
            width: 300,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: record => (<span>${record}</span>)
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record, index) => {
                return (<Space size="large">
                    <span>{record.quantity}</span>
                    <CheckoutPopupForm
                        onCreate={onCreate}
                        min={0}
                        record={record}>
                    </CheckoutPopupForm>
                </Space>)
        },
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: record => (<span>${record}</span>)
        },
        {
            title: 'Remove',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (<Button shape="circle" icon={<DeleteOutlined />} onClick={() => { deleteRecord(record) }} />)
        }
    ];
    const data = cartData.data;

    return (
        <div className={styles.container}>
            <Button type="link" onClick={() => navigate(-1)}><CaretLeftOutlined />Return to the previous page</Button>
            <h1 className={styles.title}>Shopping Cart</h1>
            <ConfigProvider renderEmpty={emptyContent}>
                <Table columns={columns} dataSource={data} pagination={false} />
            </ConfigProvider>
            <h2 className={styles.totalprice}>Total: ${totalPrice}</h2>
            <div className={styles.checkout}>
            <Button type="primary" onClick={()=> {checkout()}}>Checkout</Button>
            </div>
        </div>
    )
}

export default ShoppingCart;