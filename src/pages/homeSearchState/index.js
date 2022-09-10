import { List, Typography, Collapse, Slider, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import http from "../../api";
import TopBar from "../../components/TopBar";
import "./index.css"
import baseImageUrl from "../../baseImageUrl";

const { Paragraph } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

function HomeSearchState(props) {
    const [phonelist, setPhoneList] = useState([]);
    const [priceFilter, setPriceFilter] = useState(1000);
    const [brandFilter, setBrandFilter] = useState("");
    let params = useParams();
    // let baseImageUrl = "/static/phoneimages/"
    let baseDetailUrl = "/home/detail/"
    useEffect(() => {
        http.post('/home/filter', { keyword: params.keyword, price: priceFilter, brand:brandFilter }).then((res) => {
            setPhoneList(res.data.result);
        })
    }, [params.keyword, priceFilter, brandFilter]);

    const priceHandler = (value) => {
        setPriceFilter(value);
    }

    const brandHandler = (value) => {
        setBrandFilter(value);
    }

    return (
        <div>
            <TopBar isLoggedIn={false} keyword={params.keyword}></TopBar>
            <div className="homepage-search-wrapper">
                <div className="left-filter">
                    <h2 style={{paddingLeft:"2rem"}}>Filter</h2>
                    <Collapse>
                        <Panel header="Price" key="1">
                            <div className="slider-style">
                            <span>$0</span>
                            <div style={{width:"80%"}}>
                            <Slider defaultValue={1000} min={0} max={1000} onChange={priceHandler}></Slider>
                            </div>
                            <span>${priceFilter}</span>
                            </div> 
                        </Panel>
                        <Panel header="Brand" key="2">
                            <Select defaultValue="" style={{ width: 120 }} onChange={brandHandler}>
                                <Option value="">All</Option>
                                <Option value="Huawei">Huawei</Option>
                                <Option value="BlackBerry">BlackBerry</Option>
                                <Option value="HTC">HTC</Option>
                                <Option value="Apple">Apple</Option>
                                <Option value="LG">LG</Option>
                                <Option value="Motorola">Motorola</Option>
                                <Option value="Nokia">Nokia</Option>
                                <Option value="Samsung">Samsung</Option>
                                <Option value="Sony">Sony</Option>
                            </Select>
                        </Panel>
                    </Collapse>
                </div>
                <div className="right-space">
                    <p style={{ paddingLeft: "2rem" }}>we have found {phonelist.length} item(s) for you</p>
                    <List
                        grid={{ gutter: 16, column: 1 }}
                        itemLayout="vertical"
                        // loading="true"
                        dataSource={phonelist}
                        size="large"
                        pagination={
                            {
                                pageSize: 20,
                                hideOneSinglePage: true,
                            }
                        }
                        renderItem={item => (
                            <List.Item key={item._id}>
                                <Link to={baseDetailUrl + item._id}>
                                    <div className="phone-item-wrapper">
                                        <img className="phone-item-image" src={baseImageUrl + item.image}></img>
                                        <div className="phone-info">
                                            <Paragraph strong={true} ellipsis={{ rows: 3, expandable: false }}>{item.title}</Paragraph>
                                            <h2>${item.price}</h2>
                                        </div>
                                    </div>
                                </Link>
                            </List.Item>
                        )}
                    ></List>

                </div>
            </div>
        </div>
    );
}

export default HomeSearchState;