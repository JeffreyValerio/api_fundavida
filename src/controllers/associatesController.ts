import { Request, Response } from "express";
import pool from "../database";

class AssociatesController {
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO fundavida_db.associates set ?", [req.body]);
    res.json({ message: "THE ASSOCIATE WAS INSERTED SUCCESFFULLY" });
  }

  public async list(req: Request, res: Response) {
    const listAssociates = await pool.query(
      "SELECT * FROM fundavida_db.associates;"
    );
    res.json(listAssociates);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(
      "UPDATE fundavida_db.associates SET ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
      [req.body, id]
    );
    res.json({ message: "THE ASSOCIATE WAS UPDATED" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("DELETE FROM fundavida_db.associates WHERE id = ?", [id]);
    res.json({ message: "THE ASSOCIATE WAS DELETED" });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;
    const associate = await pool.query(
      "SELECT * FROM fundavida_db.associates WHERE id = ?",
      [id]
    );

    if (associate.length > 0) {
      return res.json(associate[0]);
    } else {
      res
        .status(404)
        .json({ message: `THE ASSOCIATE ${associate[0]} DOES NOT EXIST` });
    }
  }
}

export const associatesController = new AssociatesController();
