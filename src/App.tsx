import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import MusicKitInstance = MusicKit.MusicKitInstance

interface AppProps {
  musicKitInstance: MusicKitInstance;
}

function App({musicKitInstance}: AppProps) {
  const [signedIn, setSignedIn] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isMusickitSetup = musicKitInstance.isAuthorized || signedIn
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
