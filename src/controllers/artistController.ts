import { Request, Response } from "express";
import { albums, artists, favorites, tracks } from "../services/dataStore";
import { Artist } from '../models/artist';
import { v4 as uuidv4, validate as isUuid } from 'uuid';


export const getAllArtists = (req: Request, res: Response) => {
    res.status(200).json(artists);
}

export const getArtistById = (req: Request, res: Response) => {
    const { id } = req.params;
    const artist = artists.find(t => t.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (!artist) {
        return res.status(404).json({ message: `Artist with id ${id} not found.` })
    }
    res.status(200).json(artist);
}

export const createArtist = (req: Request, res: Response) => {
    const { name, grammy } = req.body;

    if (!name || grammy === undefined) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    const newArtist: Artist = {
        id: uuidv4(),
        name,
        grammy
    };

    artists.push(newArtist);
    res.status(201).json(newArtist);
}


export const updateArtist = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, grammy } = req.body;

    const artist = artists.find(a => a.id === id);
    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (!artist) {
        return res.status(404).json({ message: `Artist with id ${id} not found` });
    }
    if (name) artist.name = name;
    if (grammy !== undefined) artist.grammy = grammy;
    res.status(200).json(artist);
};

export const deleteArtist = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = artists.findIndex(a => a.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (index === -1) {
        return res.status(404).json({ message: `Artist with id ${id} not found.` })
    }

    // Removing artist from favorites
    favorites.artists = favorites.artists.filter((a) => a !== id);

    albums.forEach((album) => {
        if (album.artistId === id) {
            album.artistId = null;
        }
    });

    tracks.forEach((track) => {
        if (track.artistId === id) {
            track.artistId = null;
        }
    });
    artists.splice(index, 1);
    res.status(204).end();
}  