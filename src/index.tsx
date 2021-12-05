import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Container, Nav, Navbar} from "react-bootstrap"

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://5e5a8ce1c7a24928a5f2e484accee607@o1083910.ingest.sentry.io/6093765",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const musicKitInstance = MusicKit.configure({
  developerToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IloyTDRWRFpXRFAifQ.eyJpc3MiOiJEQVQ1VU1aWU03IiwiaWF0IjoxNjM4NjYzNTk2LCJleHAiOjE2NTE2MTk5OTZ9.9iCTRy0hmCvT52tzcJMKhI8oiZoJWiC_pxuI0U3TZk01e5nmAc8E5WAqprOafk2wH9pLEM0M6jhVf6Ic0V-PoA",
  app: {
    name: "Library.xml importer",
    icon: process.env.PUBLIC_URL + '/logo192.png'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Container fluid>
      <App musicKitInstance={musicKitInstance}/>
    </Container>
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
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
