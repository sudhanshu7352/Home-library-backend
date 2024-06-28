import { Request, Response } from "express";
import { albums, artists, tracks } from "../services/dataStore";
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { Album } from "../models/album";

export const getAllAlbums = (req: Request, res: Response) => {
    res.status(200).json(albums);
}

export const getAlbumById = (req: Request, res: Response) => {
    const { id } = req.params;
    const album = tracks.find(t => t.id === id);

    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid trackId' });
    }
    if (!album) {
        return res.status(404).json({ message: `Album with id ${id} not found.` })
    }
    res.status(200).json(album);
}

export const createAlbum = (req: Request, res: Response) => {
    const { name, year, artistId } = req.body;
    
    if (!name || year === undefined) {
        return res.status(400).json({ message: `Missing required fields` });
    }
    if (artistId && !artists.find(a => a.id === artistId)) {
        return res.status(400).json({ message: `Artist with id ${artistId} does not exist` });
    }
    const newAlbum: Album = {
        id: uuidv4(),
        name,
        year,
        artistId: artistId || null
    };

    albums.push(newAlbum);
    res.status(201).json(newAlbum);
}


export const updateAlbum = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, year, artistId } = req.body;

    const album = albums.find(t => t.id === id);
    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (!album) {
        return res.status(404).json({ message: `Track with id ${id} not found` });
    }

    if (artistId && !artists.find(a => a.id === artistId)) {
        return res.status(404).json({ message: `Artist with id ${artistId} does not exist` });
    }
    if (name) album.name = name;
    album.artistId = artistId || null;
    if (year !== undefined) album.year = year;
    res.status(200).json(album);
};

export const deleteAlbum = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = tracks.findIndex(t => t.id === id);
    
    if (!isUuid(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }
    if (index === -1) {
        return res.status(404).json({ message: `Track with id ${id} not found.` })
    }
    albums.splice(index, 1);
    res.status(204).end();
}  