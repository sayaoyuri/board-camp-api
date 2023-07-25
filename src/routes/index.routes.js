import { Router } from "express";
import gamesRouter from "./games.routes.js";
import rentalsRouter from "./rentals.routes.js";
import customersRouter from "./customers.routes.js";

const router = Router();

router.use(customersRouter);
router.use(gamesRouter);
router.use(rentalsRouter);

export default router;