import TopBar from "../../components/TopBar";
import PhoneCard from "../../components/PhoneCard";
import React from "react";
import { Link } from "react-router-dom";
import http from "../../api";
import "./index.css";
import baseImageUrl from "../../baseImageUrl";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soldoutsoonList: [],
            bestsellerList: [],
        }
    }

    componentDidMount() {

        http.get('/home/soldoutList').then((res => {
            this.setState({ soldoutsoonList: res.data.result });
        }))

        http.get('/home/bestSellersList').then((res => {
            this.setState({ bestsellerList: res.data.result });
        }))

    }

    render() {
        let baseDetailUrl = "/home/detail/";
        return (
            <div>
                <TopBar isLoggedIn={false} userName="" keyword="" params={this.props}></TopBar>
                <div className="homepage-nosearch-wrapper">
                    <div className="homepage-nosearch-content">
                        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
                            <img src={require("../../image/freeDelivery.jpg")} style={{ width: "100%", maxWidth: "1500px", margin: "0 auto" }}></img>
                        </div>
                        <div className="sold-out-soon">
                            <div className="soldout-title">Sold out soon</div>
                            <div className="phone-list">
                                {this.state.soldoutsoonList.map(item => (
                                    <Link key={item._id} to={baseDetailUrl + item._id}>
                                        <PhoneCard key={item._id} imgUrl={baseImageUrl + item.image} title={item.title} price={item.price}></PhoneCard>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="best-sellers">
                            <div className="soldout-title">Best Sellers</div>
                            <div className="phone-list">
                                {this.state.bestsellerList.map(item => (
                                    <Link key={item._id} to={baseDetailUrl + item._id}>
                                        <PhoneCard key={item._id} imgUrl={baseImageUrl + '/' + item.image} title={item.title} price={item.price}></PhoneCard>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;