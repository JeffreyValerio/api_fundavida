import { Router } from "express";
import { associatesController } from "../controllers/associatesController";

class AssociatesRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", associatesController.create);
    this.router.get("/", associatesController.list);
    this.router.get("/:id", associatesController.listById);
    this.router.put("/:id", associatesController.update);
    this.router.delete("/:id", associatesController.delete);
  }
}

const associatesRoutes = new AssociatesRoutes();
export default associatesRoutes.router;
