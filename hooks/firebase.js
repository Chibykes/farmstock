// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as signout } from "firebase/auth";
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyDvNyhrrUtAUGL08ZZ3ALV3v__O7rH-k_Y",
  authDomain: "farmstock-af020.firebaseapp.com",
  projectId: "farmstock-af020",
  storageBucket: "farmstock-af020.appspot.com",
  messagingSenderId: "533710192723",
  appId: "1:533710192723:web:86e87ad3c1f96ba64d46a6",
  measurementId: "G-983SLGG026"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

function signIn(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    if(user){
      toast.success("Sign in successful");
    }
    console.log(result)
  })
  .catch((error) => {
    toast.error("Sign in failed");
    console.log(error.message)
  });
}

function signOut(){
  signout(auth)
  .then(() => {
    toast.success("Sign out successful")
  })
  .catch((error) => {
    toast.error("Sign out failed");
    console.error(error)
  });
}

async function add_doc(collection, id, topic){
  return toast.promise(
      setDoc(doc(db, collection, id), topic, { merge: true }),
    {
      success: "Task Succesful",
      error: "Task Failed",
      loading: "Updating..."
    }
  )
}

async function uploadFile(name, type, string){
  const storageRef = ref(storage, `${type}/${Date.now()}-${name}`);

  let snapshot = await toast.promise(
      uploadString(storageRef, string, 'data_url'),
      {
        loading: "Uploading " +type,
        success: type+" successfully uploaded",
        error: "Uploading " +type+ " failed",
      }
  );

  let downloadURL = await toast.promise(
      getDownloadURL(snapshot.ref),
      {
        loading: "Downloading " +type+ " URL",
        success: type+" URL Downloaded",
        error: "Downloading " +type+ " URL failed",
      }
  );  

  return downloadURL;
}

async function read_database(dbname, uid){
  const data = [];
  const q = query(collection(db, dbname), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => data.push(doc.data()));
  console.log(data);
  return data;
}

async function get_single_doc(dbname, id){
  const singleDoc = await getDoc(doc(db, dbname, id));
  return singleDoc.data();
}


export {
  app,
  auth,
  provider,
  GoogleAuthProvider,
  signIn,
  signOut,
  storage,
  add_doc,
  uploadFile,
  read_database,
  get_single_doc
};
