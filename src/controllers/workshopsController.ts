import { Request, Response } from "express";
import pool from "../database";

class WorkshopsController {
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO fundavida_db.workshops set ?", [req.body]);
    res.json({ message: "THE WORKSHOP WAS INSERTED SUCCESFFULLY" });
  }

  public async list(req: Request, res: Response) {
    const listWorkshops = await pool.query(
      "SELECT * FROM fundavida_db.workshops;"
    );
    res.json(listWorkshops);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(
      "UPDATE fundavida_db.workshops SET ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
      [req.body, id]
    );
    res.json({ message: "THE WORKSHOP WAS UPDATED" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("DELETE FROM fundavida_db.workshops WHERE id = ?", [id]);
    res.json({ message: "THE WORKSHOP WAS DELETED" });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;
    const workshop = await pool.query(
      "SELECT * FROM fundavida_db.workshops WHERE id = ?",
      [id]
    );

    if (workshop.length > 0) {
      return res.json(workshop[0]);
    } else {
      res
        .status(404)
        .json({ message: `THE WORKSHOP ${workshop[0]} DOES NOT EXIST` });
    }
  }
}

export const workshopsController = new WorkshopsController();
