// favoritesRoutes.ts
import express from 'express';
import {
  getFavorites,
  addTrackToFavorites,
  deleteTrackFromFavorites,
  addAlbumToFavorites,
  deleteAlbumFromFavorites,
  addArtistToFavorites,
  deleteArtistFromFavorites,
} from '../controllers/favoritesController';

const router = express.Router();

router.get('/favs', getFavorites);
router.post('/favs/track/:id', addTrackToFavorites);
router.delete('/favs/track/:id', deleteTrackFromFavorites);
router.post('/favs/album/:id', addAlbumToFavorites);
router.delete('/favs/album/:id', deleteAlbumFromFavorites);
router.post('/favs/artist/:id', addArtistToFavorites);
router.delete('/favs/artist/:id', deleteArtistFromFavorites);

export default router;
