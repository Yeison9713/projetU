// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmd78NYfTIZE_0Kv7vR_NPKKOcnoOoiaA",
    authDomain: "projectu-c6d6c.firebaseapp.com",
    projectId: "projectu-c6d6c",
    storageBucket: "projectu-c6d6c.appspot.com",
    messagingSenderId: "585020943123",
    appId: "1:585020943123:web:c84b77cbbd8da1ca2248e6",
    measurementId: "G-PB7RLX5B8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async ({ name, genero, edad, celular, email, password }) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            genero,
            edad,
            celular,
            email,
            authProvider: "local",
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const createPet = async ({ auth, name, age, type, color, weight }) => {
    try {
        const response = await addDoc(collection(db, "pets"), {
            user_id: auth.uid,
            name,
            age,
            type,
            color,
            weight,
            created_at: new Date().getTime()
        })

        console.log(response)

        return { success: true, data: response }
    } catch (error) {
        console.error(error);
        alert(error.message);
        return { success: false, data: null }
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    signInWithEmailAndPassword,
    createPet
};

// export {
//     app,
//     analytics,
//     auth,
//     db,
//     GoogleAuthProvider,
//     signInWithPopup,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut,
//     query,
//     getDocs,
//     collection,
//     where,
//     addDoc,
// }