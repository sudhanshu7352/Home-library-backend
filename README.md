# Home Library System

The Home Library System is a RESTful API service that allows users to manage their home library. Users can create, read, update, and delete data about Artists, Tracks, and Albums, and add them to their Favorites in their own Home Library.

## Features

- **User Management**: Create, read, update, and delete user accounts.
- **Artist Management**: Create, read, update, and delete artist records.
- **Album Management**: Create, read, update, and delete album records.
- **Track Management**: Create, read, update, and delete track records.
- **Favorites Management**: Manage favorite artists, albums, and tracks.

## Endpoints

### Users
- `GET /user` - Get all users
- `GET /user/:id` - Get a single user by ID
- `POST /user` - Create a new user
- `PUT /user/:id` - Update user's password
- `DELETE /user/:id` - Delete a user

### Artists
- `GET /artist` - Get all artists
- `GET /artist/:id` - Get a single artist by ID
- `POST /artist` - Create a new artist
- `PUT /artist/:id` - Update artist info
- `DELETE /artist/:id` - Delete an artist

### Albums
- `GET /album` - Get all albums
- `GET /album/:id` - Get a single album by ID
- `POST /album` - Create a new album
- `PUT /album/:id` - Update album info
- `DELETE /album/:id` - Delete an album

### Tracks
- `GET /track` - Get all tracks
- `GET /track/:id` - Get a single track by ID
- `POST /track` - Create a new track
- `PUT /track/:id` - Update track info
- `DELETE /track/:id` - Delete a track

### Favorites
- `GET /favs` - Get all favorites
- `POST /favs/track/:id` - Add a track to favorites
- `DELETE /favs/track/:id` - Remove a track from favorites
- `POST /favs/album/:id` - Add an album to favorites
- `DELETE /favs/album/:id` - Remove an album from favorites
- `POST /favs/artist/:id` - Add an artist to favorites
- `DELETE /favs/artist/:id` - Remove an artist from favorites

## Running the Service

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sudhanshu7352/Home-library-backend.git
    cd Home-library-backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and set the `PORT` value (default is 4000):
    ```env
    PORT=4000
    ```

### Starting the Service

To run the service, use the following command:
```sh
npm start
