import MusicKitInstance = MusicKit.MusicKitInstance
import {LibraryTrack} from "./LibraryUpload"
import {Col, Image, ListGroup, ProgressBar, Row} from "react-bootstrap"
import Searcher, {FoundTrack, NotFoundTrack} from "./Searcher"
import SearchManager from "./Searcher"
import LibraryImport from "./LibraryImport"
import {useEffect, useMemo, useState} from "react"
import {uniqBy} from "lodash"


interface AppProps {
  musicKitInstance: MusicKitInstance;
  searchManager: SearchManager
}

function LibraryDisplay({musicKitInstance, searchManager}: AppProps) {
  const [foundTracks, setFoundTracks] = useState<FoundTrack[]>([])
  const [notFoundTracks, setNotFoundTracks] = useState<NotFoundTrack[]>([])
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    searchManager.startSearching(setFoundTracks, setNotFoundTracks).finally(() => setIsFinished(true))
  }, [searchManager, setNotFoundTracks, setFoundTracks])

  const totalFound = foundTracks.length + notFoundTracks.length
  const progressDone = (totalFound / searchManager.library.length) * 100

  const uniqueAlbumCovers = useMemo(() => uniqBy(foundTracks, (v) => v.albumArt), [foundTracks])

  return <div>
    <Row>
      <Col className="d-flex flex-column justify-content-center align-items-center">
        <h3>{searchManager.library.length} tracks in your library</h3>
      </Col>
    </Row>
    <Row>
      <Col sm={{span: 6, offset: 3}} className="d-flex flex-column justify-content-center">
        {isFinished
          ? <LibraryImport foundTracks={foundTracks} searcher={searchManager}/>
          : <ProgressBar now={progressDone} label={`${progressDone.toFixed(0)}%`}/>
        }
      </Col>
    </Row>
    <br/>
    <Row>
      <Col sm={{span: 8}}>
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h4>Found {foundTracks.length} Tracks from {uniqueAlbumCovers.length} albums</h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column min-vh-100">
            <Row className="g-0">
              {uniqueAlbumCovers.map((t, idx) => {
                return <Col key={idx} className="flex-grow-0">
                  <Image src={t.albumArtUrl(50)}/>
                </Col>
              })}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <h4>Missing {notFoundTracks.length} Tracks</h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column min-vh-100">
            <ul>
              {notFoundTracks.map((t, i) => {
                return <li key={i}>{t.track.Name} - {t.track.Album} - {t.track.Artist}</li>
              })}
            </ul>
          </Col>
        </Row>
      </Col>
      {/*<Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center">*/}
      {/*  <h4>Missing {notFoundTracks.length} Tracks</h4>*/}
      {/*  <ul>*/}
      {/*    {notFoundTracks.map((t, i) => <li key={i}>{t.track.Name} - {t.track.Album} - {t.track.Artist}</li>)}*/}
      {/*  </ul>*/}
      {/*</Col>*/}
    </Row>
  </div>
}

export default LibraryDisplay
