import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";
import { createRental, listAllRentals, returnRentals } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();
rentalsRouter.get('/rentals', listAllRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), createRental);
rentalsRouter.post('/rentals/:id/return', returnRentals);
rentalsRouter.delete('/rentals/:id', );

export default rentalsRouter;