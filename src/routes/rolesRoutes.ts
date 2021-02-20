import { Router } from "express";
import { rolesController } from "../controllers/rolesController";

class RolesRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", rolesController.create);
    this.router.get("/", rolesController.list);
    this.router.get("/:id", rolesController.listById);
    this.router.put("/:id", rolesController.update);
    this.router.delete("/:id", rolesController.delete);
  }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
