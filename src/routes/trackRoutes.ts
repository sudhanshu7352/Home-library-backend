import { Router } from "express";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../controllers/trackController";

const router = Router();

router.get('/track', getAllTracks);
router.get('/track/:id', getTrackById);
router.post('/track', createTrack);
router.put('/track/:id', updateTrack);
router.delete('/track/:id', deleteTrack);

export default router;