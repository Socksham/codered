import { initializeApp } from "firebase/app";
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
    setDoc,
    doc,
    getDoc
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCItj4pUCkWDKUpmtPzDVXYKc1gQXxATT8",
    authDomain: "codered-d903c.firebaseapp.com",
    projectId: "codered-d903c",
    storageBucket: "codered-d903c.appspot.com",
    messagingSenderId: "959991857330",
    appId: "1:959991857330:web:542fb1569d90d9389949ab",
    measurementId: "G-SRCJTZP26X"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        // const q = query(collection(db, "hospitals"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
        // if (docs.docs.length === 0) {
        const hospRef = doc(db, 'hospitals', user.uid);
        if (user.phoneNumber != null) {
            await setDoc(hospRef, {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                number: user.phoneNumber
            }, { merge: true });
        } else {
            await setDoc(hospRef, {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            }, { merge: true });
        }
        // }
    } catch (err) {
        console.error(err);
    }
};
const checkNumber = async (uid) => {
    try {
        const docRef = doc(db, "hospitals", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var data = docSnap.data()
            console.log(data.number)
            if (docSnap.data().number !== null && docSnap.data().number !== "" && docSnap.data().number !== undefined) {
                return true
            }
            return false
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (err) {
        alert(err)
    }
}
const setNumber = async (uid, number) => {
    try {
        const q = query(collection(db, "hospitals"), where("uid", "==", uid));
        const docs = await getDocs(q);
        if (docs.docs.length !== 0) {
            await setDoc(doc(db, "hospitals", uid), {
                number: number,
            }, { merge: true })
        }
    } catch (err) {
        alert(err)
    }
}
const checkNameAddressOccupation = async (uid) => {
    try {
        const docRef = doc(db, "hospitals", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var data = docSnap.data()
            console.log(data.number)
            if (docSnap.data().name !== null && docSnap.data().name !== "" && docSnap.data().name !== undefined) {
                return true
            }
            return false
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (err) {
        alert(err)
    }
}
const setNameAddressOccupation = async (uid, name, address, occupation) => {
    try {
        const q = query(collection(db, "hospitals"), where("uid", "==", uid));
        const docs = await getDocs(q);
        if (docs.docs.length !== 0) {
            await setDoc(doc(db, "hospitals", uid), {
                name,
                address,
                occupation
            }, { merge: true })
        }
    } catch (err) {
        alert(err)
    }
}
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (name, number, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "hospitals"), {
            uid: user.uid,
            name,
            number,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
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
    checkNumber,
    setNumber,
    setNameAddressOccupation,
    checkNameAddressOccupation
};