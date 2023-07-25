import { db } from "../database/database.connection.js";

export const getAllGames = async (req, res) => {
  const games = await db.query('SELECT * FROM GAMES');

  res.send(games.rows);
};

export const createGame = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const existingGame = await db.query('SELECT * FROM games WHERE name = $1', [name] );
  
    if(existingGame.rowCount > 0) return res.sendStatus(409);
  
    const newGame = await db.query(
      `INSERT INTO games
        ("name", "image", "stockTotal", "pricePerDay")
        VALUES($1, $2, $3, $4)`
        , [name, image, stockTotal, pricePerDay]
    );
  
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  };
};