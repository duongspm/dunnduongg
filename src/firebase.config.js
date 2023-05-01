import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = { 
    apiKey : "AIzaSyAiraH4JLA5tCdJ0jHuDoW_0qsknKtMiQc" , 
    authDomain : "ddcoffee-35878.firebaseapp.com" , 
    databaseURL : "https://ddcoffee-35878-default-rtdb.firebaseio.com" , 
    projectId : "ddcoffee-35878" , 
    storageBucket : "ddcoffee-35878.appspot.com" , 
    messagingSenderId : "404922796023" , 
    appId : "1:404922796023:web:4717a230c36f3a24a4d0f2" 
    };

    const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

    const firestore = getFirestore(app); //db
    const storage = getStorage(app);

    export {app, firestore, storage};   