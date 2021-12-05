import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const musicKitInstance = MusicKit.configure({
  developerToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IloyTDRWRFpXRFAifQ.eyJpc3MiOiJEQVQ1VU1aWU03IiwiaWF0IjoxNjM4NjYzNTk2LCJleHAiOjE2NTE2MTk5OTZ9.9iCTRy0hmCvT52tzcJMKhI8oiZoJWiC_pxuI0U3TZk01e5nmAc8E5WAqprOafk2wH9pLEM0M6jhVf6Ic0V-PoA",
  app: {
    name: "Library.xml importer",
    icon: process.env.PUBLIC_URL + '/logo192.png'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App musicKitInstance={musicKitInstance}/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
