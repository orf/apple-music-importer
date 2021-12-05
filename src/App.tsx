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
        <Navbar color="dark" fixed="bottom">
          <Container>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link target="blank" href="https://tomforb.es">Made by Tom Forbes</Nav.Link>
                <Nav.Link target="blank" href="https://github.com/orf/apple-music-importer">Source Code</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    )
  }
}

export default App
