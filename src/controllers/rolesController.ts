import { Request, Response } from "express";
import pool from "../database";

class RolesController {
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO fundavida_db.roles set ?", [req.body]);
    res.json({ message: "THE ROLE WAS INSERTED SUCCESFFULLY" });
  }

  public async list(req: Request, res: Response) {
    const listRoles = await pool.query("SELECT * FROM fundavida_db.roles;");
    res.json(listRoles);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query(
      "UPDATE fundavida_db.roles SET ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
      [req.body, id]
    );
    res.json({ message: "THE ROLE WAS UPDATED" });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await pool.query("DELETE FROM fundavida_db.role WHERE id = ?", [id]);
    res.json({ message: "THE ROLE WAS DELETED" });
  }

  public async listById(req: Request, res: Response) {
    const { id } = req.params;
    const role = await pool.query(
      "SELECT * FROM fundavida_db.roles WHERE id = ?",
      [id]
    );

    if (role.length > 0) {
      return res.json(role[0]);
    } else {
      res.status(404).json({ message: `THE ROLE ${role[0]} DOES NOT EXIST` });
    }
  }
}

export const rolesController = new RolesController();
