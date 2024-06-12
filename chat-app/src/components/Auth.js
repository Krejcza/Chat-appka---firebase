import {auth, provider} from '../firebase-config.js'
import { signInWithPopup} from 'firebase/auth'
import "../styles/Auth.css";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = (props) => {

  const {setIsAuth} = props

 const signInWithGoogle = async () =>{
   try{
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      cookies.set('auth-token', result.user.refreshToken)
      setIsAuth(true)
   } catch(err) {
      console.error(err)
   }
 }



  return (
    <div className="auth">
      <p>Přihlásit se přes Google</p>
      <button onClick={signInWithGoogle}>Přihlásit se</button>
    </div>
  )
}

export default Auth
