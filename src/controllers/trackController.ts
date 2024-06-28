import { Request, Response } from "express";
import { albums, artists, tracks } from "../services/dataStore";
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Track } from "../models/track";

export const getAllTracks = (req: Request, res: Response) => {
    res.status(200).json(tracks);
}

export const getTrackById = (req: Request, res: Response) => {
    const { id } = req.params;
    const track = tracks.find(t => t.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (!track) {
        return res.status(404).json({ message: `Track with id ${id} not found.` })
    }
    res.status(200).json(track);
}

export const createTrack = (req: Request, res: Response) => {
    const { name, artistId, albumId, duration } = req.body;

    if (!name || duration === undefined) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    if (artistId && !artists.find(a => a.id === artistId)) {
        return res.status(422).json({ message: `Artist with id ${artistId} does not exist` });
    }

    if (albumId && !albums.find(a => a.id === albumId)) {
        return res.status(422).json({ message: `Album with id ${albumId} does not exist` });
    }

    const newTrack: Track = {
        id: uuidv4(),
        name,
        artistId: artistId || null,
        albumId: albumId || null,
        duration
    };

    tracks.push(newTrack);
    res.status(201).json(newTrack);
}


export const updateTrack = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, artistId, albumId, duration } = req.body;

    const track = tracks.find(t => t.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (!track) {
        return res.status(404).json({ message: `Track with id ${id} not found` });
    }

    if (artistId && !artists.find(a => a.id === artistId)) {
        return res.status(404).json({ message: `Artist with id ${artistId} does not exist` });
    }

    if (albumId && !albums.find(a => a.id === albumId)) {
        return res.status(404).json({ message: `Album with id ${albumId} does not exist` });
    }

    if (name) track.name = name;
    track.artistId = artistId || null;
    track.albumId = albumId || null;
    if (duration !== undefined) track.duration = duration;

    res.status(200).json(track);
};

export const deleteTrack = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = tracks.findIndex(t => t.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (index === -1) {
        return res.status(404).json({ message: `Track with id ${id} not found.` })
    }
    tracks.splice(index, 1);
    res.status(204).end();
}  