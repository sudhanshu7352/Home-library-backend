import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import trackRoutes from './routes/trackRoutes';
import albumRoutes from './routes/albumRoutes';
import artistRoutes from './routes/artistRoutes';
import favoritesRouter from './routes/favoritesRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(userRoutes);
app.use(trackRoutes);
app.use(albumRoutes);
app.use(artistRoutes);
app.use(favoritesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
