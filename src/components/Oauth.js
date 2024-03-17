import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


GoogleSignin.configure({
  webClientId: '370606382761-30smsj8ggaldd69uavmju1a18d05jf6g.apps.googleusercontent.com'
});


const login = async (userInfo,baseURL) => {
  try {
    const res = await axios.post(baseURL + "/googlelogin", { idToken: userInfo.idToken })
    if (res?.data) {
      res.data.user_id = userInfo.user.id
      res.data.photo = userInfo.user.photo
      res.data.email = userInfo.user.email
      const userData = JSON.stringify(res.data);
      await AsyncStorage.setItem('user', userData);
      return res.data
    } else {
      console.error("Login failed:", res.data.error);
    }
  }
  catch (err) {
    console.log(err)
  }
}

const signIn = async (baseURL) => {

  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const userInfo = await GoogleSignin.getCurrentUser();
    const user = await login(userInfo,baseURL);
    return user;
  } catch {
  }
};



export default signIn;
