import { User } from '../models/user';
import { Artist } from '../models/artist';
import { Track } from '../models/track';
import { Album } from '../models/album';
import { Favorites } from '../models/favorites';

export const users: User[] = [];
export const artists: Artist[] = [];
export const tracks: Track[] = [];
export const albums: Album[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: []
};
