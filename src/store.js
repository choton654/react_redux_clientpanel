import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import { settingsReducer } from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyDyL_Qfjy7iSd5NWo1XjvNw28Q13vtlRN0',
  authDomain: 'reactclientpanel-c15e8.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-c15e8.firebaseio.com',
  projectId: 'reactclientpanel-c15e8',
  storageBucket: 'reactclientpanel-c15e8.appspot.com',
  messagingSenderId: '915940495314',
  appId: '1:915940495314:web:81330d001d17dad9fd420b',
  measurementId: 'G-VQBFNT6VDS',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// init firbase instance
firebase.initializeApp(firebaseConfig);
// firebase.firestore();
// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
// reactReduxFirebase(firebase, rrfConfig),
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
  // <- needed if using firestore
});

if (localStorage.getItem('settings') == null) {
  const defaultSettings = {
    diseableBalanceOnAdd: true,
    diseableBalanceOnEdit: false,
    allowRegistration: false,
  };
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
