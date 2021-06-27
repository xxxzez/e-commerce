import { Component } from 'react'
import { Route } from 'react-router-dom'
import { firestore } from '../../firebase/firebase.utils'
import CollectionsOverview from '../../components/collections-overview/collections-overview'
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import CollectionPage from '../collection/collection'
import { UpdateCollections } from '../../redux/shop/shop.actions'
import { connect } from 'react-redux'

class ShopPage extends Component {
    unsubscribeFromSnapshot = null
    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async (snapshot) => {
                const collectionsMap = convertCollectionsSnapshotToMap()
                updateCollections(collectionsMap)
            }
        )
    }

    render() {
        const { match } = this.props
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(UpdateCollections(collectionsMap)),
})

export default connect(null, mapDispatchToProps)(ShopPage)
