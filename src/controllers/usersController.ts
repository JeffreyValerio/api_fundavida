import { Request, Response } from "express";
import pool from "../database";

class UsersController {
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO fundavida_db.users set ?", [req.body]);
    res.json({ message: "THE USER WAS INSERTED SUCCESFFULLY" });
  }

  public async list(req: Request, res: Response) {
    const listUsers = await pool.query("SELECT * FROM fundavida_db.users;");
    res.json(listUsers);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(
      "UPDATE fundavida_db.users SET ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
      [req.body, id]
    );
    res.json({ message: "THE USER WAS UPDATED" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("DELETE FROM fundavida_db.users WHERE id = ?", [id]);
    res.json({ message: "THE USER WAS DELETED" });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM fundavida_db.users WHERE id = ?",
      [id]
    );

    if (user.length > 0) {
      return res.json(user[0]);
    } else {
      res.status(404).json({ message: `THE USER ${user[0]} DOES NOT EXIST` });
    }
  }
}

export const usersController = new UsersController();
