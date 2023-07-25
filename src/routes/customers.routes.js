import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schemas.js";
import { listAllCustomers, listCustomerById } from "../controllers/customers.controllers.js";

const customersRouter = Router();
customersRouter.get('/customers', listAllCustomers);
customersRouter.get('/customers/:id', listCustomerById);
customersRouter.post('/customers', validateSchema(customerSchema), );
customersRouter.put('/customers', validateSchema(customerSchema), );

export default customersRouter;