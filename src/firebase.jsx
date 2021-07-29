import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebaseConfig from './config/firebase.js'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }  

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {

    const [user] = useAuthState(auth);
  
    return (
      <div className="App">
        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    );
  }


function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      </>
    )
  
  }
  
  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  
  function ChatRoom() {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
    }
  
    return (<>
      <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>From/To</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {messages && messages.map(msg => <TableRowFunc key={msg.id} message={msg} />)}
          </TableBody>
        </Table>
        </TableContainer>
  
      <form onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="write here" />
  
        <button type="submit" disabled={!formValue}>Send</button>
  
      </form>
    </>)
  }
    
  const deleteMessage = async (e,id) => {
    e.preventDefault();
    firestore.collection('messages').doc(id).delete();
  }
  
  function TableRowFunc(props) {
    const { text, uid, createdAt, id, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    let date = 'now';
    if(createdAt && createdAt.seconds){
       date = new Date(createdAt.seconds * 1000).toUTCString();
    }
  
    return (
      <TableRow key={id}>
              <TableCell>{messageClass}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{text}</TableCell>
              <TableCell><img src={photoURL} style={{ width:30 }}></img></TableCell>
              <TableCell>
              <Button variant="contained" color="primary" disableElevation onClick={(e) => deleteMessage(e,id)}>
      Delete
    </Button>
              </TableCell>
            </TableRow>
    )
  }

  export default App;
  