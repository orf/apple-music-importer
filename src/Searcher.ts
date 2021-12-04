import MusicKitInstance = MusicKit.MusicKitInstance
import {Sema} from "async-sema"
import {LibraryTrack} from "./LibraryUpload"
import {Dispatch, SetStateAction} from "react"

export class FoundTrack {
  track: LibraryTrack
  trackId: string
  albumArt: string

  constructor(track: LibraryTrack, trackId: string, albumArt: string) {
    this.track = track
    this.trackId = trackId
    this.albumArt = albumArt
  }

  albumArtUrl(size: number): string {
    return this.albumArt.replace('{w}', size.toString()).replace('{h}', size.toString())
  }
}

export class NotFoundTrack {
  track: LibraryTrack

  constructor(track: LibraryTrack) {
    this.track = track
  }
}

// Result type from Apple Music
interface TrackResource {
  id: string
  attributes: {
    name: string
    artwork: {
      url: string
    }
  }
}

type SearchResult = FoundTrack | NotFoundTrack;


class SearchManager {
  private readonly musicKit: MusicKitInstance
  private readonly requestSemaphore: Sema
  readonly library: LibraryTrack[]

  constructor(musicKit: MusicKitInstance, library: LibraryTrack[]) {
    this.musicKit = musicKit
    this.requestSemaphore = new Sema(10)
    this.library = library
  }

  async startSearching(foundCallback: Dispatch<SetStateAction<FoundTrack[]>>, notFoundCallback: Dispatch<SetStateAction<NotFoundTrack[]>>) {
    console.log("Start Searching Called!!")

    foundCallback([])
    notFoundCallback([])

    const promises = this.library.map((track) => {
      return this.search(track).then(
        (trackResult) => {
          console.log(trackResult);
          if (trackResult instanceof FoundTrack) {
            foundCallback((prev) => [...prev, trackResult])
          } else {
            notFoundCallback((prev) => [...prev, trackResult])
          }
        }
      )
    })
    await Promise.all(promises)
  }

  private async search(track: LibraryTrack): Promise<SearchResult> {
    const token = await this.requestSemaphore.acquire()
    try {
      const searchString = `${track.Name} - ${track.Album} - ${track.Artist}`
      console.log("Searching for", searchString)
      const result = await this.doSearch(searchString, track)
      if (result == null) {
        return new NotFoundTrack(track)
      }
      return result

    } finally {
      await this.requestSemaphore.release(token)
    }
  }

  private async doSearch(searchString: string, track: LibraryTrack): Promise<FoundTrack | null> {
    const apiResult = await this.musicKit.api.search(searchString) as unknown
    const result = apiResult as { songs: { data: TrackResource[] } }
    if (!result.songs) {
      // Not found!
      return null
    } else {
      const artwork = result.songs.data[0].attributes.artwork.url
      const trackId = result.songs.data[0].id
      return new FoundTrack(track, trackId, artwork)
    }
  }
}

export default SearchManager
