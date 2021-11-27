import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import MusicKitInstance = MusicKit.MusicKitInstance

interface AppProps {
  musicKitInstance: MusicKitInstance;
}

function App({musicKitInstance}: AppProps) {
  const [signedIn, setSignedIn] = useState(false)

  const isMusickitSetup = musicKitInstance.isAuthorized || signedIn

  const signedInHandler = () => {
    setSignedIn(true)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
