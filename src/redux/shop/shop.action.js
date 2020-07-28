import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
/*export const updateCollections = (collectionMap) =>({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap

})*/

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());
    collectionRef
      .get()
      .then((snapShot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => dispatch(fetchCollectionFailure(err.message)));
  };
};
