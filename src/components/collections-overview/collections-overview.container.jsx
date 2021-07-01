import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner'
import collectionsOverview from './collections-overview'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionsOverview)
export default CollectionsOverviewContainer
