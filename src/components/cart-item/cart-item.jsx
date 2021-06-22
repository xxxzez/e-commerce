import './cart-item.styles.scss'

const CartItem = ({ item: { imageUrl, price, name } }) => (
    <div className="cart-item">
        <img src={imageUrl} alt="item" />
        <div className="item-details">
            <span>{name}</span>
            <span>{price}</span>
        </div>
    </div>
)
export default CartItem
