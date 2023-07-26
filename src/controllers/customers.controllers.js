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

    return res.send(customer.rows[0]);
  } catch (err) {
    return res.status(500).send(e.message);
  };
};

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, cpf, birthday } = req.body;

    const existingCpf = await db.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
    if(existingCpf.rowCount > 0) return res.sendStatus(409);
    
    const newCustomer = await db.query(
      `INSERT INTO 
        customers (name, phone, cpf, birthday) 
        VALUES($1, $2, $3, $4);
      `, [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  };
};