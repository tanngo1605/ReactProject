import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.action'

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils.js";


class ShopPage extends React.Component {
  unsubcribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props
    const collectionRef = firestore.collection("collections");

    this.unsubcribeFromSnapshot = collectionRef.onSnapshot(async (snapShot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      updateCollections(collectionsMap)
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        {/*match.path is current ROute*/}
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>({
  updateCollections: collectionMaps => dispatch(updateCollections(collectionMaps))
})

export default connect(null, mapDispatchToProps)(ShopPage);
