module.exports.normalizeSpotifyAlbumData = album => {
  let {
    artists,
    id: spotifyId,
    images,
    name,
    release_date: releaseDate,
    release_date_precision: releaseDatePrecision,
    total_tracks: totalTracks,
    tracks,
  } = album

  artists = artists.map(({ name, id }) => ({
    name,
    spotifyId: id,
  }))

  let durationInMs = tracks.items.reduce(
    (totalMs, { duration_ms }) => totalMs + duration_ms,
    0
  )

  tracks = tracks.items.map(({ name }) => name)

  return {
    artists,
    spotifyId,
    images,
    name,
    releaseDate,
    releaseDatePrecision,
    totalTracks,
    durationInMs,
    tracks,
  }
}
