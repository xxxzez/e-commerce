import CustomButton from '../custom-button.jsx/custom.button'
import './collection-item.styles.scss'

const CollectionItem = ({ id, price, imageUrl, name }) => (
    <div className="collection-item">
        <div
            className="image"
            style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <CustomButton inverted>Add to cart</CustomButton>
    </div>
)

export default CollectionItem
