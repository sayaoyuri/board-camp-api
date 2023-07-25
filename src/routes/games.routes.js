import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schemas.js";

const gamesRouter = Router();
gamesRouter.get('/games', );
gamesRouter.post('/games', validateSchema(gameSchema), );

export default gamesRouter;