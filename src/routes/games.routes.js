import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schemas.js";
import { createGame, getAllGames } from "../controllers/games.controllers.js";

const gamesRouter = Router();
gamesRouter.get('/games', getAllGames);
gamesRouter.post('/games', validateSchema(gameSchema), createGame);

export default gamesRouter;