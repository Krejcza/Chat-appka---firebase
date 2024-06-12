import {useEffect, useState} from 'react'
import {addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import '../styles/Chat.css'


const Chat = (props) => {

   const {room} = props

   const [newMessage, setNewMessage] = useState('')
   const [messages, setMessages] = useState([])

   const messagesRef = collection(db, 'messages')

   useEffect(()=>{
      const queryMessages = query(messagesRef, where('room', '==', room), orderBy('createdAt'))
      const unsubscribe = onSnapshot(queryMessages, (snapshot)=>{

         let messages = []
         
         snapshot.forEach((doc) =>{
            messages.push({...doc.data(), id: doc.id})
         })
         setMessages(messages)
      })

      return () => unsubscribe()
      //clean up useefektu//
   })

   const handleSubmit = async (e) =>{
      e.preventDefault()
      if(newMessage === '') return
      //aby se neposílali prázdné zprávy//


      await addDoc(messagesRef, {
         text: newMessage,
         createdAt: serverTimestamp(),
         user: auth.currentUser.displayName,
         room: room
      })

      setNewMessage('')
   }

   return (
      <div className='chat-app'>
        <div className="header">
          <h1>Vítejte v: {room.toUpperCase()}</h1>
        </div>
        <div className='messages'>
          {messages.map((message) => (
            <div className='message' key={message.id}>
              <span className='user'>{message.user}: </span>  {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            placeholder='Napište svoji zprávu'
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="new-message-input"
          />
          <button type='submit' className="send-button">Odeslat</button>
        </form>
      </div>
    );
  };

//value u inputu kvůli validaci vstupu//

export default Chat
