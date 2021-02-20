import { Router } from "express";
import { workshopsController } from "../controllers/workshopsController";

class WorkshopsRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", workshopsController.create);
    this.router.get("/", workshopsController.list);
    this.router.get("/:id", workshopsController.listById);
    this.router.put("/:id", workshopsController.update);
    this.router.delete("/:id", workshopsController.delete);
  }
}

const workshopsRoutes = new WorkshopsRoutes();
export default workshopsRoutes.router;
