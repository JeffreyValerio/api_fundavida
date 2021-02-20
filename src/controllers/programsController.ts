import { Request, Response } from "express";
import pool from "../database";

class ProgramsController {
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO fundavida_db.programs set ?", [req.body]);
    res.json({ message: "THE PROGRAM WAS INSERTED SUCCESFFULLY" });
  }

  public async list(req: Request, res: Response) {
    const listPrograms = await pool.query("SELECT * FROM fundavida_db.programs;");
    res.json(listPrograms);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(
      "UPDATE fundavida_db.programs SET ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
      [req.body, id]
    );
    res.json({ message: "THE PROGRAM WAS UPDATED" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("DELETE FROM fundavida_db.programs WHERE id = ?", [id]);
    res.json({ message: "THE PROGRAM WAS DELETED" });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;
    const program = await pool.query(
      "SELECT * FROM fundavida_db.programs WHERE id = ?",
      [id]
    );

    if (program.length > 0) {
      return res.json(program[0]);
    } else {
      res
        .status(404)
        .json({ message: `THE PROGRAM ${program[0]} DOES NOT EXIST` });
    }
  }
}

export const programsController = new ProgramsController();
