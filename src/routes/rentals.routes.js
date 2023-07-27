import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";
import { listAllRentals } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();
rentalsRouter.get('/rentals', listAllRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), );
rentalsRouter.post('/rentals/:id/return', );
rentalsRouter.delete('/rentals/:id', );

export default rentalsRouter;