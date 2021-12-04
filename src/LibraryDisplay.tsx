import MusicKitInstance = MusicKit.MusicKitInstance
import {LibraryTrack} from "./LibraryUpload"
import {Col, Image, ProgressBar, Row} from "react-bootstrap"
import Searcher, {FoundTrack, NotFoundTrack} from "./Searcher"
import SearchManager from "./Searcher"
import {useEffect, useState} from "react"
import {uniqBy} from "lodash"


interface AppProps {
  musicKitInstance: MusicKitInstance;
  searchManager: SearchManager
}

function LibraryDisplay({musicKitInstance, searchManager}: AppProps) {
  const [foundTracks, setFoundTracks] = useState<FoundTrack[]>([])
  const [notFoundTracks, setNotFoundTracks] = useState<NotFoundTrack[]>([])

  useEffect(() => {
    searchManager.startSearching(setFoundTracks, setNotFoundTracks)
  }, [searchManager, setNotFoundTracks, setFoundTracks])

  const totalFound = foundTracks.length + notFoundTracks.length
  const progressDone = (totalFound / searchManager.library.length) * 100

  const uniqueAlbumCovers = uniqBy(foundTracks, (v) => v.albumArt);

  return <div>
    <Row>
      <Col className="d-flex flex-column justify-content-center align-items-center">
        <h3>{searchManager.library.length} tracks in your library</h3>
      </Col>
    </Row>
    <Row>
      <Col sm={{span: 6, offset: 3}}>
        <ProgressBar animated now={progressDone} label={`${progressDone.toFixed(0)}%`}/>
      </Col>
    </Row>
    <Row>
      <Col sm={{span: 8}} className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h4>Found {foundTracks.length} Tracks from {uniqueAlbumCovers.length} albums</h4>
        <Row className="g-0">
          {uniqueAlbumCovers.map(t => {
            return <Col id={t.trackId}>
              <Image src={t.albumArtUrl(100)}/>
            </Col>
          })}
        </Row>
      </Col>
      <Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h4>Missing {notFoundTracks.length} Tracks</h4>
      </Col>
    </Row>
  </div>
}

export default LibraryDisplay
