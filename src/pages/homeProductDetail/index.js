import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, List, Skeleton, Input, message, Form, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import http from "../../api";
import PopupForm from "../../components/PopupForm"
import styles from './index.module.css';
import baseImageUrl from "../../baseImageUrl";

const { TextArea } = Input;

function ProductDetail(props) {
    let navigate = useNavigate();
    // let baseImageUrl = "/static/phoneimages/";
    let params = useParams();
    const userId = localStorage.getItem("userId");
    const [productInfo, setProductInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        http.get(`/home/productInfo?id=${params.id}`).then((res) => {
            let product = res.data.result[0];
            http.post("/home/username", { id: product.seller }).then((res) => {
                let seller = res.data.result[0];
                product.seller = seller.firstname + " " + seller.lastname;
                setProductInfo(product);
            })
        })
        loggedIn();
    }, [params.id])

    const validateQuantity = (quantityInCart, stock) => {
        if (quantityInCart >= stock) {
            if (stock === 0) {
                message.warn("This product's stock is 0.");
            } else {
                message.warn("The number of items in your cart cannot be greater than the item's stock. Please go to Checkout page to edit the current added quantity.");
            }
        } else {
            setVisible(true);
        }
    }

    const getQuantityInCart = async () => {
        await http.post('/cart/getPhoneQuantityInCart', {
            userId: userId,
            phoneId: productInfo._id,
        }).then((res) => {
            if (res.status === 200) {
                if (res.data.result) {
                    let quantity = 0;
                    for (let item of res.data.result.cart) {
                        if (item.phoneID == productInfo._id) {
                            quantity = item.quantity;
                            break;
                        }
                    }
                    setQuantityInCart(quantity);
                } else {
                    setQuantityInCart(0);
                }
            }
        }).catch(res => message.error(res.data.error));
    }

    const onCreate = async (values) => {
        // the quantity of items the current user want to buy cannot be greater than the item's stock. 
        if (values.quantity + quantityInCart > productInfo.stock) {
            message.error("Failed to add, the number of items in your cart cannot be greater than the item's stock");
            setVisible(false);
        } else {
            await http.post('/cart/addToCart', {
                userId: userId,
                phoneId: productInfo._id,
                title: productInfo.title,
                image: productInfo.image,
                quantity: values.quantity,
                price: productInfo.price,
                brand: productInfo.brand,
            }).then((res) => {
                if (res.status === 200) {
                    message.success('Add to cart successfully');
                } else {
                    message.error('Add to cart failed');
                }

            }).catch((err) => {
                message.error('Add to cart failed');
            })
            await getQuantityInCart();
            setVisible(false);
        }
    }

    // check if there is a loggin user
    const loggedIn = () => {
        const token = localStorage.getItem('accessToken');

        if (token !== "undefined" && token !== null) {
            setIsLoggedIn(true);
        }
    }

    // handle the post comment event 
    const onFinish = (values) => {
        // check if it is loggined
        if (!isLoggedIn) {
            message.error("You have to login first!");
        } else {
            http.post('/home/comment', {
                user_id: localStorage.getItem('userId'),
                phone_id: productInfo._id,
                rating: values.rating,
                content: values.comment,
            }).then((res) => {
                if (res.status === 200) {
                    message.success("Your comment has been posted");
                    navigate(0);
                }
            }).catch(res => message.error(res.data.error))
        }
        // clear the form field after submitting
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        productInfo && (
            <div>
                <TopBar></TopBar>
                <div className={styles.container}>
                    <div className={styles.list}>
                        <div className={styles.detail}>
                            <div className={styles.left}>
                                <img src={baseImageUrl + productInfo.image}></img>
                            </div>

                            <div className={styles.right}>
                                <h3>Brand: {productInfo.brand}</h3>
                                <h1>{productInfo.title}</h1>
                                <h3>Seller: {productInfo.seller}</h3>
                                <h3>Price: ${productInfo.price}</h3>
                                <h3>In stock: {productInfo.stock}</h3>
                                <Button type="primary" onClick={() => {
                                    {isLoggedIn ? validateQuantity(quantityInCart, productInfo.stock) : message.warn("please login first");};
                                }}>Add to Cart</Button>
                                <PopupForm
                                    visible={visible}
                                    onCreate={onCreate}
                                    onCancel={() => {
                                        setVisible(false)
                                    }}
                                    min={1}
                                    stock={productInfo.stock}></PopupForm>
                                <h4 className={styles.quantity}>Current added quantity: {quantityInCart}</h4>
                            </div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.inner_comment}>
                                <h2>Leave a comment</h2>
                                <Form
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    form={form}
                                >
                                    <div className={styles.rating}>
                                        <h3 className={styles.rate_text}>Your rate: </h3>
                                        <Form.Item
                                            name="rating"
                                            rules={[{ required: true, message: 'Please input your rate!' }]}
                                        >
                                            <Rate />
                                        </Form.Item>
                                    </div>

                                    <Form.Item
                                        name="comment"
                                        rules={[{ required: true, message: 'Please input your comment!' }]}
                                    >
                                        <TextArea rows={4} placeholder="Please leave your comment" className={styles.input_comment} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>

                        <div className={styles.display}>
                            <h2 className={styles.display_text}>Customer Reviews</h2>

                            <List
                                bordered="true"
                                className="display_list"
                                itemLayout="horizontal"
                                // loadMore={loadMore}
                                dataSource={productInfo.reviews}
                                renderItem={item => (
                                    <List.Item>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                title={
                                                    <div>
                                                        <h3>{item.reviewer}</h3>
                                                        <Rate disabled defaultValue={item.rating} />
                                                    </div>
                                                }
                                                description={
                                                    <p>{item.comment}</p>
                                                }
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>)
    )
}

export default ProductDetail;