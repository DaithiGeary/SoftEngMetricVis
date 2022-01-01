import { firebase } from "./firebase";
import {getAuth, signInWithPopup, GithubAuthProvider} from "firebase/auth";

const gp = new GithubAuthProvider();
const auth = getAuth(firebase);


export const login = async () => {
    return signInWithPopup(auth, gp).then((res)=>{
        const credential = GithubAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const user = res.user;
        sessionStorage.setItem("tkn", token);
        sessionStorage.setItem("user", res._tokenResponse.screenName);
        return true;
        
    })
    .catch(error=>{
        console.error(error);
        return false;
    })
}