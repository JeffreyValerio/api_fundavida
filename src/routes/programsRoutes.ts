import { Router } from "express";
import { programsController } from "../controllers/programsController";

class ProgramsRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", programsController.create);
    this.router.get("/", programsController.list);
    this.router.get("/:id", programsController.listById);
    this.router.put("/:id", programsController.update);
    this.router.delete("/:id", programsController.delete);
  }
}

const programsRoutes = new ProgramsRoutes();
export default programsRoutes.router;
