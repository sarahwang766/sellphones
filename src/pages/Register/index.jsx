import RegisterComponent from "../../components/RegisterComponent";
import './index.css';


function RegisterPage() {

    return (
        <div className="register-container">
            <h1 className="sellphones-title">Sellphones</h1>
            <h3 style={{marginBottom:"20px"}}>Create your account</h3>
            < RegisterComponent/>
        </div>
    )
}
export default RegisterPage;