const getIdFromURI = uri => {
  if (uri.startsWith('spotify')) return uri.split(':')[2]
  return uri
}

const getAlbumUrl = id => `https://api.spotify.com/v1/albums/${id}`
const getPlaylistTracksUrl = (id, offset = 0) =>
  `https://api.spotify.com/v1/playlists/${id}/tracks?fields=total,items(track(album(name, album_type, id, total_tracks)))&offset=${
    offset || 0
  }`
const getSeveralAlbumsUrl = ids =>
  `https://api.spotify.com/v1/albums?ids=${ids}`

module.exports = {
  getIdFromURI,
  getAlbumUrl,
  getPlaylistTracksUrl,
  getSeveralAlbumsUrl,
  refreshUrl: 'https://accounts.spotify.com/api/token',
}
