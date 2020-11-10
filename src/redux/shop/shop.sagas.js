//saga is another way to create async action instead of thunk
//sync action can stay in action
import { all, takeLatest, call, put } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { fetchCollectionsSuccess, fetchCollectionFailure } from "./shop.action";
export function* fetchCollectionAsync() {
  yield console.log("I am fired");
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get(); //similar to await
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    ); //pass snapshot to convert....
    yield put(fetchCollectionsSuccess(collectionsMap));//like dispatch(function()) in redux
  } catch (err) {

    yield put(fetchCollectionFailure(err.message))
  }
  /*collectionRef
    .get()
    .then((snapShot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((err) => dispatch(fetchCollectionFailure(err.message)));
    */
}

export function* fetchCollectionStart() {
  yield takeLatest( //only call one time
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}


export function* shopSagas() {
  yield all([call(fetchCollectionStart)])
}
