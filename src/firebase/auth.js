import {auth} from './firebase';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword, updatePassword,signInWithPopup} from 'firebase/auth'


//create user
export const doCreateUserWithEmailAndPassword = async (email,password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
}

//sigin with email and password
export const doSignInWithEmailAndPassword = async (email,password) =>{
    return signInWithEmailAndPassword(auth, email, password);
}

//signin with google
export const doSignInWithGoogle = async ()=>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //result.user
    return result
};

export const doSignOut = ()=>{
    return auth.signOut();
};

//export const doPasswordReset = (email)=>{
//    return sendPasswordResetEmail(auth,email);
//}

//export const doPasswordChange = (password)=>{
//    return updatePassword(auth.currentUser,password);
//}

//export const doSendEmailVerification = (email)=>{
//    return sendEmailVerification(auth.currentUser,{
//        url:`${window.location.origin}/home`
//    });
//}


// Reset password
export const doPasswordReset = async (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
};

