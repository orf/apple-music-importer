import React, {useState} from 'react'

import MusicKitInstance = MusicKit.MusicKitInstance
import {Container, Nav, Navbar} from "react-bootstrap"
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
    return (
      <Container fluid>
        <Login callback={signIn}/>
      </Container>
    )
  } else {
    return (
      <Container fluid>
        <LibraryUpload musicKitInstance={musicKitInstance}/>
        <div className="fixed-bottom">
          <Navbar color="dark">
            <Container>
              <Nav className="me-auto">
                <Nav.Link target="blank" href="https://tomforb.es">Made by Tom Forbes</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      </Container>
    )
  }
}

export default App
