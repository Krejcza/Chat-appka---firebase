import React, {useState, useRef} from 'react'
import './App.css'
import Auth from './components/Auth';
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import {signOut} from 'firebase/auth'
import {auth} from './firebase-config'
const cookies = new Cookies()

const App = () => {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  //Pokud to najde cookie auth-token, vrátí to true, jinak false//
  const [room, setRoom] = useState('')

  const roomInputRef = useRef(null)

  const signUserOut = async () =>{
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }


  //Pokud uživatel není authenticated tak se mu zobrazí authentikace a přihlášení//
  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }

  //Pokud authenticovanej je tak se mu ukáže toto//
  return <div className="room">
    {room ?  
    <Chat room={room}/>
    :
    <div>
      <label> Zadejte název místnosti:</label>
      <input type="text" ref={roomInputRef} />
      <button onClick={()=>setRoom(roomInputRef.current.value)}>Zahájit chat</button>
    </div> }

    <div className="sign-out">
      <button onClick={signUserOut}>Odhlásit se</button>
    </div>
  </div>
  //Pokud existuje room (například pokud je proměnná room nastavena na nějaký název místnosti), zobrazí se pouze <div> s textem "Chat".//
  //Pokud room neexistuje, zobrazí se formulář, kde uživatel může zadat název místnosti a stisknout tlačítko "Zahájit chat".//
}

export default App
