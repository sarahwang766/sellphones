import TopBar from '../../components/TopBar';
import ShoppingCart from '../../components/ShoppingCart';
import styles from './index.module.css';
function Checkout() {
    return (
        <div>
            <TopBar />
            <div className={styles.container}>

                <ShoppingCart />
            </div>
        </div>

    )
}
export default Checkout;