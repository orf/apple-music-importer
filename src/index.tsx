import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const musicKitInstance = MusicKit.configure({
  developerToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IloyTDRWRFpXRFAifQ.eyJpc3MiOiJEQVQ1VU1aWU03IiwiaWF0IjoxNjM4NjMyNjU5LCJleHAiOjE2NDEyMjQ2NTl9.yErVWj9hykc03fDIwEFGilZ76kSIAtYu2siL1dswIJ3m_n1Sb1mkw_e7fFJE5vFQsKgpWixccUUzflb-ipTjBw",
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
