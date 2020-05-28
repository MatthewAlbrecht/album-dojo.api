const merge = require('lodash.merge')
const rp = require('request-promise')
const { GraphQLList } = require('graphql')
const {
  getAlbumUrl,
  getPlaylistTracksUrl,
  getIdFromURI,
  getSeveralAlbumsUrl,
} = require('../../../utils/spotify')
const { ALBUM_TYPE } = require('../../../utils/constants')
const { normalizeSpotifyAlbumData } = require('../../../normalizers')
const { AlbumType } = require('../types')
const { Album } = require('../../models')
const { AlbumInputType } = require('../inputTypes')

const createAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to create a new Album',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('create'),
    },
  },
  resolve: async (_, { album }) => {
    const createdAlbum = await Album.create(album)

    if (!createdAlbum) {
      throw new Error('Album could not be created!')
    }

    return createdAlbum
  },
}

const createAlbumById = {
  type: AlbumType,
  description:
    'The mutation that allows you to create a new Album by spotify id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('createById'),
    },
  },
  resolve: async (_, { album }) => {
    const spotifyId = getIdFromURI(album.spotifyId)
    const requestOptions = {
      url: getAlbumUrl(spotifyId),
      method: 'GET',
      headers: {
        Authorization: `Bearer ${album.spotifyAccessToken}`,
      },
      json: true,
    }

    console.log('requestOptions ==='.toUpperCase(), requestOptions)

    let requestedAlbum
    try {
      requestedAlbum = await rp(requestOptions)
    } catch (error) {
      if (error.statusCode === 401) {
        console.log('ACCESS TOKEN')
        console.log(error)
      }
      throw new Error('Album could not be created.')
    }

    if (requestedAlbum.total_tracks <= 2) {
      throw new Error('Singles cannot be added as albums.')
    }

    const albumObject = normalizeSpotifyAlbumData(requestedAlbum)

    console.log('albumObject ==='.toUpperCase(), albumObject)
    let createdAlbum
    try {
      createdAlbum = await Album.create(albumObject)
    } catch (error) {
      throw new Error(error)
    }
    return createdAlbum
  },
}

const createAlbumsByPlaylist = {
  type: new GraphQLList(AlbumType),
  description:
    'The mutation that allows you to bulk create albums from a spotify plalist id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('createByPlaylistId'),
    },
  },
  resolve: async (_, { album }) => {
    console.log(album)
    const spotifyPlaylistId = getIdFromURI(album.spotifyPlaylistId)
    const requestOptions = {
      url: getPlaylistTracksUrl(spotifyPlaylistId),
      method: 'GET',
      headers: {
        Authorization: `Bearer ${album.spotifyAccessToken}`,
      },
      json: true,
    }

    // Getting the first 100 tracks from the playlist
    let requestedTracks
    try {
      requestedTracks = await rp(requestOptions)
    } catch (error) {
      console.log(error)
      throw new Error('Error retrieving playlist.')
    }

    const { total } = requestedTracks
    let remainingRequests = []
    for (let i = 100; i < total; i += 100) {
      remainingRequests.push(
        rp({
          ...requestOptions,
          url: getPlaylistTracksUrl(spotifyPlaylistId, i),
        })
      )
    }

    // getting the remaining tracks if there are more than 100
    let remainingTracks
    try {
      remainingTracks = await Promise.all(remainingRequests)
    } catch (error) {
      console.log(error)
      throw new Error('Error retrieving playlist.')
    }

    remainingTracks.unshift(requestedTracks)

    // getting all of the track's album's ids
    let validAlbums = remainingTracks
      .map(set => set.items)
      .flat(1)
      .map(item => item.track.album)
      .filter(item => item.total_tracks > 2)
      .map(album => album.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )

    let albumIdGroups = []
    while (validAlbums.length) {
      albumIdGroups.push(validAlbums.splice(0, 20).join(','))
    }
    let albumRequests = albumIdGroups.map(getSeveralAlbumsUrl).map(url =>
      rp({
        ...requestOptions,
        url,
      })
    )

    let requestedAlbums
    try {
      requestedAlbums = await Promise.all(albumRequests)
    } catch (error) {
      console.log(error)
      throw new Error('Error retrieving albums.')
    }

    albums = requestedAlbums
      .map(item => item.albums)
      .flat(1)
      .map(normalizeSpotifyAlbumData)

    let savedAlbums
    try {
      savedAlbums = await Album.bulkCreate(albums, { ignoreDuplicates: true })
    } catch (error) {
      console.log(error)
      throw new Error('Error bulk inserting albums.')
    }

    // When bulk create is given both existing and non-existing instances
    // It will return duplicated non-existant instances in place of the
    // instances that already exist in the db. I think it's an error
    // It doesn't happen iff ALL albums already exist???
    let uniqueAlbums = savedAlbums
      .map(album => album.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return savedAlbums.find(album => id === album.id)
      })
    return uniqueAlbums
  },
}

const updateAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to update an existing Album by Id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('update'),
    },
  },
  resolve: async (_, { id, ...rest }) => {
    const foundAlbum = await Album.findByPk(id)

    if (!foundAlbum) {
      throw new Error(`Album with id: ${id} not found!`)
    }

    const updatedAlbum = merge(foundAlbum, {
      spotifyId,
      ...rest,
    })

    return foundAlbum.update(updatedAlbum)
  },
}

const deleteAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to delete a existing Album by Id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundAlbum = await Album.findByPk(id)

    if (!foundAlbum) {
      throw new Error(`Album with id: ${id} not found!`)
    }

    await Album.destroy({
      where: {
        id,
      },
    })

    return foundAlbum
  },
}

module.exports = {
  createAlbum,
  createAlbumById,
  createAlbumsByPlaylist,
  updateAlbum,
  deleteAlbum,
}
