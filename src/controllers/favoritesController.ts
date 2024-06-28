import { Request, Response } from 'express';
import { validate as isUuid } from 'uuid';
import { artists, tracks, albums, favorites } from '../services/dataStore';
// import { Album } from '../models/album';
// import { Track } from '../models/track';
// import { Artist } from '../models/artist';

export const getFavorites = (req: Request, res: Response) => {
  const favoriteArtists = artists.filter(artist => favorites.artists.includes(artist.id));
  const favoriteAlbums = albums.filter(album => favorites.albums.includes(album.id));
  const favoriteTracks = tracks.filter(track => favorites.tracks.includes(track.id));

  const response = {
    artists: favoriteArtists,
    albums: favoriteAlbums,
    tracks: favoriteTracks,
  };

  res.status(200).json(response);
};

// Adding track to favorites
export const addTrackToFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid trackId' });
  }

  const track = tracks.find(t => t.id === id);
  if (!track) {
    return res.status(422).json({ message: `Track with id ${id} doesn't exist` });
  }

  if (!favorites.tracks.includes(id)) {
    favorites.tracks.push(id);
  }

  res.status(201).json({ message: `Track with id ${id} added to favorites` });
};

// Deleting track from favorites
export const deleteTrackFromFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid trackId' });
  }

  const trackIndex = favorites.tracks.indexOf(id);
  if (trackIndex === -1) {
    return res.status(404).json({ message: `Track with id ${id} is not a favorite` });
  }

  favorites.tracks.splice(trackIndex, 1);
  res.status(204).send();
};

// Adding album to favorites
export const addAlbumToFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid albumId' });
  }

  const album = albums.find(a => a.id === id);
  if (!album) {
    return res.status(422).json({ message: `Album with id ${id} doesn't exist` });
  }

  if (!favorites.albums.includes(id)) {
    favorites.albums.push(id);
  }

  res.status(201).json({ message: `Album with id ${id} added to favorites` });
};

// Deleting album from favorites
export const deleteAlbumFromFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid albumId' });
  }

  const albumIndex = favorites.albums.indexOf(id);
  if (albumIndex === -1) {
    return res.status(404).json({ message: `Album with id ${id} is not a favorite` });
  }

  favorites.albums.splice(albumIndex, 1);
  res.status(204).send();
};

// Adding artist to favorites
export const addArtistToFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid artistId' });
  }

  const artist = artists.find(a => a.id === id);
  if (!artist) {
    return res.status(422).json({ message: `Artist with id ${id} doesn't exist` });
  }

  if (!favorites.artists.includes(id)) {
    favorites.artists.push(id);
  }

  res.status(201).json({ message: `Artist with id ${id} added to favorites` });
};

// Deleting artist from favorites
export const deleteArtistFromFavorites = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: 'Invalid artistId' });
  }

  const artistIndex = favorites.artists.indexOf(id);
  if (artistIndex === -1) {
    return res.status(404).json({ message: `Artist with id ${id} is not a favorite` });
  }

  favorites.artists.splice(artistIndex, 1);
  res.status(204).send();
};
