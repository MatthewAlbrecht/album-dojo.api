module.exports.normalizeSpotifyAlbumData = album => {
  let {
    artists,
    id: spotifyId,
    images,
    name,
    release_date,
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

  let releaseDate = new Date(release_date)
  releaseDate = releaseDate.setDate(releaseDate.getDate() + 1)
  if (release_date === '0000') {
    releaseDate = null
  }

  tracks = tracks.items.map(({ name }) => name)

  return {
    artists,
    spotifyId,
    images,
    name,
    releaseDate,
    totalTracks,
    durationInMs,
    tracks,
  }
}
