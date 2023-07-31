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

export const createRental = async (req, res) => {
  try {
    const { customerId, gameId, daysRented } = req.body;

    const validCustomer = await db.query(`
      SELECT * FROM customers WHERE id = $1;
    `, [customerId]);

    if(validCustomer.rowCount === 0) return res.status(400).send('Invalid user ID');

    const validGame = await db.query(`
      SELECT * FROM games WHERE id = $1;
    `, [gameId]);

    if(validGame.rowCount === 0 ) return res.status(400).send('Invalid game ID');

    const isAvailable = await db.query(`
      SELECT COUNT(rentals.*) AS "activeRentals", games."stockTotal" FROM rentals
        JOIN games ON rentals."gameId" = games.id
        WHERE rentals."gameId" = $1 AND rentals."returnDate" IS NULL
        GROUP BY games."stockTotal";
    `, [gameId]);

    if(isAvailable.rows[0] && isAvailable.rows[0].activeRentals >= isAvailable.rows[0].stockTotal) return res.status(400).send('game is out of stock');

    const result = await db.query(`
      INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES (
          $1,
          $2,
          NOW(),
          $3,
          NULL, 
          (SELECT SUM("pricePerDay" * $3) FROM games WHERE id = $2),
          NULL
        );
    `, [customerId, gameId, daysRented]);
  
    return res.status(201).send();
  } catch (err) {
    return res.status(500).send(err.message);
  };
};

export const returnRentals = async (req, res) => {
  try {
    const { id } = req.params;

    const rental = await db.query(`
      SELECT *, NOW() AS "currentDate" FROM rentals 
      WHERE id = 1;
    `, [id]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};