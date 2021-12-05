import React from 'react'

import {Button, Row} from "react-bootstrap"

interface AppProps {
  callback: () => void;
}


function Login({callback}: AppProps) {
  return (
    <Row>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Apple Music Library.xml Importer</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            This is a web-based tool that imports a library.xml file exported from Apple Music back into your account.
          </p>
          <p className="lead mb-4">
            I built this because Apple Music deletes your entire library if you move country, and there isn't a simple
            way to recover it.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button onClick={callback} size="lg" variant="primary">Login with Apple</Button>
          </div>
        </div>
      </div>
    </Row>
  )
}

export default Login
