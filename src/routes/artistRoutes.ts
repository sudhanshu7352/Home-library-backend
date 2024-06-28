import { Router } from "express";
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from "../controllers/artistController";

const router = Router();

router.get('/artist', getAllArtists);
router.get('/artist/:id', getArtistById);
router.post('/artist', createArtist);
router.put('/artist/:id', updateArtist);
router.delete('/artist/:id', deleteArtist);

export default router;