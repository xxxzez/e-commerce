import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    firestore,
    convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js'
import { Component } from 'react'
import { UpdateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner'
import CollectionsOverview from '../../components/collections-overview/collections-overview'
import CollectionPage from '../collection/collection'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {
    state = {
        loading: true,
    }

    unsubscribeFromSnapshot = null

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')

        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState({ loading: false })
        })
    }

    render() {
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => (
                        <CollectionsOverviewWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner
                            isLoading={loading}
                            {...props}
                        />
                    )}
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
