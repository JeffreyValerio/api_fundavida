import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

// IMPORTS
import usersRoutes from "./routes/usersRoutes";
import programsRoutes from "./routes/programsRoutes";
import workshopsRoutes from "./routes/workshopsRoutes";
import rolesRoutes from "./routes/rolesRoutes";
import associatesRoutes from "./routes/associatesRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);

    // ***MIDDLEWARES***
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
  }

  routes(): void {
    this.app.use("/api/users", usersRoutes);
    this.app.use("/api/programs", programsRoutes);
    this.app.use("/api/workshops", workshopsRoutes);
    this.app.use("/api/roles", rolesRoutes);
    this.app.use("/api/associates", associatesRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port: " + this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
