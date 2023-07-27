import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export const listAllRentals = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT rentals.*, games.name AS "gameName", customers.name AS "customerName" FROM rentals 
        JOIN games ON games.id = rentals."gameId" 
        JOIN customers ON customers.id = rentals."customerId";
    `);

    const rentals = result.rows.map(rental => {
      const formatedRental = { ... rental, 
        rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
        customer: { id: rental.customerId, name: rental.customerName },
        game: { id: rental.gameId, name: rental.gameName }
      };

      delete formatedRental.customerName;
      delete formatedRental.gameName;

      return formatedRental;
    });

    return res.send(rentals);
  } catch (err) {
    return res.status(500).send(err.message);
  };
};