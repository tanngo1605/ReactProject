import React from "react";
//import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
//import CollectionPage from "../collection/collection.component";
import CollectionPageContainer from "../collection/collection.container"
import { connect } from "react-redux";
//import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionStart } from "../../redux/shop/shop.action.js";
import { createStructuredSelector } from "reselect";
//import { selectIsCollectionsFetching, selectIsCollectionLoaded } from "../../redux/shop/shop.selector";
const databaseLink =
  "https://firestore.googleapis.com/v1/projects/crwn-6e934/databases/(default)/documents/";
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        {/*match.path is current ROute*/}
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
    );
  }
}

/*const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsCollectionLoaded
});*/

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
