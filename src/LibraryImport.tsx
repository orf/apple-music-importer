import SearchManager, {FoundTrack} from "./Searcher"
import {Button, ProgressBar} from "react-bootstrap"
import {useEffect, useMemo, useState} from "react"
import {chunk} from "lodash"

interface AppProps {
  foundTracks: FoundTrack[],
  searcher: SearchManager
}


function LibraryImport({foundTracks, searcher}: AppProps) {
  const [isImporting, setImporting] = useState(false)
  const [doneChunks, setDoneChunks] = useState(0)

  const chunks = useMemo(() => chunk(foundTracks, 40), [foundTracks]);

  useEffect(() => {
    if (!isImporting) return

    chunks.forEach((c) => {
      searcher.import(c.map(t => t.trackId)).finally(() => {
        setDoneChunks((s) => s + 1)
      })
    })

  }, [searcher, isImporting, chunks])

  const progressDone = (doneChunks / chunks.length) * 100

  if (isImporting) {
    return <div>
      <ProgressBar now={progressDone} label={`Importing Songs: ${progressDone.toFixed(0)}%`}/>
      <p>This may take a while, Apple Music has very low request limits</p>
    </div>
  } else {
    return <Button variant="primary" onClick={() => setImporting(true)}>Import My Library</Button>
  }
  // return <></>
}

export default LibraryImport
