import { db } from "../database/database.connection.js";

export const getAllGames = async (req, res) => {
  const games = await db.query('SELECT * FROM GAMES');

  res.send(games.rows);
};