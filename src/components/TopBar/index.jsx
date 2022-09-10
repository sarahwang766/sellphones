import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined, ExportOutlined } from '@ant-design/icons';
import { Input } from "antd";
import "./index.css";
import http from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
let { Search } = Input;

function TopBar(props) {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         userName: props.userName,
    //         isLogin:false,
    //     };
    //     this.onSearch = this.onSearch.bind(this);
    // }
    const firstname = useSelector(state => state.sellphone.firstname);
    const lastname = useSelector(state => state.sellphone.lastname);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(firstname);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const firstname = localStorage.getItem("firstname");
        const lastname = localStorage.getItem("lastname");
        const userId = localStorage.getItem("userId");

        if (userId) {
            setIsLoggedIn(true);
            setUserName(firstname + " " + lastname);
        }
    }, [])


    function onSearch(value) {
        // http.post('/home/search',{keyword: value}).then((res => {
        //     console.log(res.data.result);
        // }))
        value ? navigate(`/home/search/${value}`) : navigate('/home');
    };
    function onPressEnter(e) {
        // http.post('/home/search',{keyword: e.target.value}).then((res => {
        //     console.log(res.data.result);
        // }))
        e.target.value ? navigate(`/home/search/${e.target.value}`) : navigate('/home');
    };

    function signout () {
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        navigate("/login");
    }

    // render() {
    return (
        <div className="topbar-wrapper">
            <div className="topbar-content">
            <Link to="/home">
            <h1 style={{ color: "#40a9ff" }}>SellPhones</h1>
            </Link>
            <Search key={props.keyword} defaultValue={props.keyword} placeholder="Search what you want" onPressEnter={onPressEnter} onSearch={onSearch} size="large" style={{ width: "50rem" }} />
            <div className="login-status-wrapper">
                {isLoggedIn ?
                    <div className="right">
                        <ShoppingCartOutlined className="icon" />
                        <h3 className="log"><Link to="/checkout">Checkout</Link></h3>
                        <UserOutlined className="icon" />
                        <h3 className="log"><Link to="/profile">{firstname + " " + lastname}</Link></h3>
                        <ExportOutlined style={{marginRight:"5px"}} />
                        <h3 className="log" onClick={signout}>Sign out</h3>
                    </div>
                    :
                    <p>Hi visitor, please <Link to="/login">sign in.</Link></p>}
            </div>
            </div>
        </div>
    )
}

export default TopBar;