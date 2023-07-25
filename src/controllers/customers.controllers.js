import { db } from "../database/database.connection.js";

export const listAllCustomers = async (req, res) => {
  try {
    const customers = await db.query('SELECT * FROM customers');

    return res.send(customers.rows);
  } catch (err) {
    return res.status(500).send(e.message);
  };
};

export const listCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await db.query('SELECT * FROM customers WHERE id = $1', [id] );
    
    if(customer.rowCount === 0) return res.sendStatus(404);

    return res.send(customer.rows);
  } catch (err) {
    return res.status(500).send(e.message);
  };
};