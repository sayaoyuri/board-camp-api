import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();
customersRouter.get('/customers', );
customersRouter.get('/customers/:id', );
customersRouter.post('/customers', validateSchema(customerSchema), );
customersRouter.put('/customers', validateSchema(customerSchema), );

export default customersRouter;