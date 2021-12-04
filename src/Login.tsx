import React from 'react'

import {Button, Col, Container, Row} from "react-bootstrap"

interface AppProps {
  callback: () => void;
}


function Login({callback}: AppProps) {
  return (
    <Row>
      <Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h1>Connect with Apple Music</h1>
        <p>No credentials leave your browser. Popups may need to be allowed.</p>
        <Button onClick={callback} variant="primary">Authenticate with Apple</Button>
      </Col>
    </Row>
  )
}

export default Login
