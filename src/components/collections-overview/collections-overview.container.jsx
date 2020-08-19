import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selector.js";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview) //run from right to left


export default CollectionsOverviewContainer;