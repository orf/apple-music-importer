import React, {useState} from 'react'

import MusicKitInstance = MusicKit.MusicKitInstance
import Login from "./Login"
import LibraryUpload from "./LibraryUpload"

interface AppProps {
  musicKitInstance: MusicKitInstance;
}

function App({musicKitInstance}: AppProps) {
  const [signedIn, setSignedIn] = useState(musicKitInstance.isAuthorized)

  const signIn = () => {
    musicKitInstance.authorize().then(r => setSignedIn(true))
  }

  if (!signedIn) {
    return <Login callback={signIn}/>
  } else {
    return <LibraryUpload musicKitInstance={musicKitInstance}/>
  }
}

export default App
