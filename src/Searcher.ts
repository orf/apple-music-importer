import MusicKitInstance = MusicKit.MusicKitInstance
import {Sema, RateLimit} from "async-sema"
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
  readonly musicKit: MusicKitInstance
  readonly library: LibraryTrack[]

  private readonly searchSemaphore: Sema
  private readonly addRateLimit: (() => Promise<void>)
  private readonly cache: Record<string, SearchResult>

  constructor(musicKit: MusicKitInstance, library: LibraryTrack[]) {
    this.musicKit = musicKit
    this.searchSemaphore = new Sema(10)
    // 1 request every 4 seconds... Apple music is lame.
    this.addRateLimit = RateLimit(0.4, {
      timeUnit: 1000,
      uniformDistribution: true,
    })
    this.library = library
    this.cache = {}
  }

  async import(ids: string[]) {
    await this.addRateLimit()
    await this.musicKit.api.addToLibrary({songs: ids})
  }

  async startSearching(foundCallback: Dispatch<SetStateAction<FoundTrack[]>>, notFoundCallback: Dispatch<SetStateAction<NotFoundTrack[]>>) {
    foundCallback([])
    notFoundCallback([])

    const promises = this.library.map((track) => {
      return this.search(track).then(
        (trackResult) => {
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
    if (track.LibraryId in this.cache) {
      return this.cache[track.LibraryId]
    }

    const token = await this.searchSemaphore.acquire()
    try {
      const searches = [
        `${track.Name} - ${track.Album} - ${track.Artist}`,
        `${track.Name} -  ${track.Artist}`
      ]
      for (const search of searches) {
        const result = await this.doSearch(search, track)
        if (result != null) {
          this.cache[track.LibraryId] = result
          return result
        }
      }
      const result = new NotFoundTrack(track)
      this.cache[track.LibraryId] = result
      return result
    } finally {
      await this.searchSemaphore.release(token)
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
