import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.styles'
import { CollectionPageContainer } from '../collection/collection.styles'

class ShopPage extends Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync()
    }
    render() {
        const { match } = this.props
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})
export default connect(null, mapDispatchToProps)(ShopPage)
