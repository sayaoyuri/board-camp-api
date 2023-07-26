import { db } from "../database/database.connection.js";

export const getAllGames = async (req, res) => {
  try {
    const games = await db.query('SELECT * FROM GAMES');
  
    res.send(games.rows);
  } catch (err) {
    return res.status(500).send(e.message);
  };
};

export const createGame = async (req, res) => {
  try {
    const { name, image, stockTotal, pricePerDay } = req.body;
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