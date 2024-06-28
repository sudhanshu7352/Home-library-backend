import { Router } from "express";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, updateAlbum } from "../controllers/albumController";

const router = Router();

router.get('/album', getAllAlbums);
router.get('/album/:id', getAlbumById);
router.post('/album', createAlbum);
router.put('/album/:id', updateAlbum);
router.delete('/album/:id', deleteAlbum);

export default router;