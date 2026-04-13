import cors from "cors";
import express, { Express } from "express";
import { prisma } from "./lib/prisma.js";
import { AuthRouter } from "./modules/auth/auth.router.js";
import { AuthController } from "./modules/auth/auth.controller.js";
import { AuthService } from "./modules/auth/auth.service.js";
import { EventRouter } from "./modules/event/event.router.js";
import { EventController } from "./modules/event/event.controller.js";
import { EventService } from "./modules/event/event.service.js";
import { TransactionRouter } from "./modules/transaction/transaction.router.js";
import { TransactionController } from "./modules/transaction/transaction.controller.js";
import { TransactionService } from "./modules/transaction/transaction.service.js";
import { globalError, notFoundError } from "./utils/errors.js";

export class App {
  app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.registerModules();
    this.errors();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private registerModules() {
    // services
    const authService = new AuthService(prisma);
    const eventService = new EventService(prisma);
    const transactionService = new TransactionService(prisma);

    // controllers
    const authController = new AuthController(authService);
    const eventController = new EventController(eventService);
    const transactionController = new TransactionController(transactionService);

    // routes
    const authRouter = new AuthRouter(authController);
    const eventRouter = new EventRouter(eventController);
    const transactionRouter = new TransactionRouter(transactionController);

    // entry point
    this.app.use("/auth", authRouter.getRouter());
    this.app.use("/events", eventRouter.getRouter());
    this.app.use("/transactions", transactionRouter.getRouter());
  }

  private errors() {
    this.app.use(globalError);
    this.app.use(notFoundError);
  }

  start() {
    const PORT = process.env.PORT;
    this.app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  }
}
