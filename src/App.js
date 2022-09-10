import logo from './logo.svg';
import './App.css';
import Board from './pages/reactTest';
import UseEffectTest from './pages/reactuseEffect';
import { Layout } from 'antd';
import { Button } from 'antd';
import TopBar from './components/TopBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import HomeSearchState from "./pages/homeSearchState";
import ProductDetail from "./pages/homeProductDetail";
import Login from './pages/login';
import NotMatch from './pages/NotMatch';
import ProtectedRoute from './components/ProtectedRoute';
import CheckoutPage from "./pages/Checkout";
import ProfilePage from "./pages/Profile";
import Register from "./pages/Register";



const { Header, Content, Footer } = Layout;
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // <Board />
    // <UseEffectTest />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="home/search/:keyword" element={<HomeSearchState />}></Route>
        <Route path="home/detail/:id" element={<ProductDetail />}></Route>
        <Route element = {<ProtectedRoute/>}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
