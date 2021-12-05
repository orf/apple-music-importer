import React, {useState} from 'react'

import {Alert, Col, Form, Row, Spinner} from "react-bootstrap"
import {parse} from "plist"
import MusicKitInstance = MusicKit.MusicKitInstance
import LibraryDisplay from "./LibraryDisplay"
import SearchManager from "./Searcher"

interface AppProps {
  musicKitInstance: MusicKitInstance;
}

// Example:
// {
//   "Track ID": 3003,
//   "Name": "Waveforms",
//   "Artist": "Logistics",
//   "Album Artist": "Logistics",
//   "Composer": "Matthew Gresham & Emile Bani",
//   "Album": "Waveforms - EP",
//   "Genre": "Dance",
//   "Kind": "Apple Music AAC audio file",
//   "Size": 8462492,
//   "Total Time": 242229,
//   "Disc Number": 1,
//   "Disc Count": 1,
//   "Track Number": 1,
//   "Track Count": 4,
//   "Year": 2019,
//   "Date Modified": "2019-09-17T23:00:13.000Z",
//   "Date Added": "2019-09-17T23:50:49.000Z",
//   "Bit Rate": 256,
//   "Sample Rate": 44100,
//   "Play Count": 9,
//   "Play Date": 3714639707,
//   "Play Date UTC": "2021-09-16T11:21:47.000Z",
//   "Release Date": "2019-09-13T12:00:00.000Z",
//   "Artwork Count": 1,
//   "Sort Album": "Waveforms - EP",
//   "Sort Artist": "Logistics",
//   "Sort Name": "Waveforms",
//   "Persistent ID": "6AE154C15569FA6A",
//   "Track Type": "Remote",
//   "Apple Music": true
// }

export interface LibraryTrack {
  LibraryId: string
  Artist: string
  Name: string
  Album: string
}

interface Library {
  Tracks: Record<number, Record<string, string>>
}


async function handleUpload(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<LibraryTrack[] | null> {
  let file = null
  if ('files' in e.currentTarget) {
    file = e.currentTarget.files?.[0]
  }
  if (!file) return null

  const text = await file.text()
  const library_contents = (parse(text) as unknown) as Library
  return Object.values(library_contents.Tracks).map((t) => {
    return {
      LibraryId: t["Track ID"],
      Artist: t["Artist"],
      Name: t["Name"],
      Album: t["Album"]
    }
  })
}


function LibraryUpload({musicKitInstance}: AppProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [library, setLibrary] = useState<LibraryTrack[] | null>(null)

  function onUpload(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setIsLoading(true)
    setError(null)
    handleUpload(e)
      .then((library) => setLibrary(library))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false))
  }

  if (library != null && !isLoading && !error) {
    const manager = new SearchManager(musicKitInstance, library);
    return <LibraryDisplay musicKitInstance={musicKitInstance} searchManager={manager}/>
  }

  return (
    <Row>
      <Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h1>Upload your library.xml file</h1>
        <p>No credentials leave your browser. Popups may need to be allowed.</p>
        {isLoading
          ? <div><Spinner animation="border" role="status"/></div>
          : <div>
            {error != null && <Alert variant="danger">
              <Alert.Heading>Error parsing library file - are you sure this is an Apple music library.xml
                file?</Alert.Heading>
              <p>The Error thrown was: {error.toString()}</p>
            </Alert>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={onUpload}/>
              </Form.Group>
          </div>
        }
      </Col>
    </Row>
  )
}

export default LibraryUpload
