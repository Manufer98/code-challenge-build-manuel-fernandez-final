
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAnBXVSUQyeTkxN8wW1svmBayd8f8uG9Ls",
  authDomain: "upload-image-laravel.firebaseapp.com",
  projectId: "upload-image-laravel",
  storageBucket: "upload-image-laravel.appspot.com",
  messagingSenderId: "1069766593951",
  appId: "1:1069766593951:web:d3b70d2a840c713e79c1aa"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db=getDatabase(app);
;