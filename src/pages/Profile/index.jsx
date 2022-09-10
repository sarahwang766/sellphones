import { Tabs, Card } from "antd";
import "./index.css";
import { CaretLeftOutlined } from "@ant-design/icons";
import Info from "./Info";
import Password from "./Password";
// import PhoneList from "../../components/Profile/phoneListComponent";
// import CommentList from "../../components/Profile/commentComponent";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
const { TabPane } = Tabs;

const ProfilePage = () => (
  <div>
  <TopBar /> 
  <div className="profile-wrapper">
    
    {/* <div className={styles.back}>
        <Link to="/"><CaretLeftOutlined />Back to main page</Link> 
    </div> */}
    {/* <Card title="My Profile" bordered={false} className={styles.card}> */}
    <h1> My Profile </h1>
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Edit profile" key="1">
        <Info />
      </TabPane>
      <TabPane tab="Change password" key="2">
        <Password />
      </TabPane>
      {/* <TabPane tab="Manage listing" key="3">
        <PhoneList />
      </TabPane>
      <TabPane tab="View comments" key="4">
        <CommentList />
      </TabPane> */}
    </Tabs>
    {/* </Card> */}
  </div>
  </div>
);

export default ProfilePage;
