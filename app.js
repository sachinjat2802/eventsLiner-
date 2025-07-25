/**
 * 
 * @file initilize the express application
 * 
 */
import express from "express";
import process from "node:process";
import session from "express-session";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import logger from "./logger/logger.js";
import MongoDBConnection from "./utils/db/mongodb.connection.js";
import { errorMiddleware } from "../middleware/index.js";
import cors from "cors";
import passport from "passport";
import initializeAPIs from "./api/routes/index.js";
import dotenv from "dotenv";
import swaggerDocs from "./utils/swagger.js";
dotenv.config({ silent: process.env });

export default class App {
   app;
   port;
   mongoDbConnection;

  constructor(port) {
    this.app = express();
    this.port = port;
    this.mongoDbConnection = new MongoDBConnection(process.env.MONGO_URL);
    this.initializeMiddlewares();
    this.initializeAPIs();
    this.initializeErrorHandling();
    this.echo();
    swaggerDocs(this.app);
  }

    initializeAPIs(){
    initializeAPIs(this.app);
}
   initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

   initializeMiddlewares() {
     this.app.use(passport.initialize());
     this.app.use(cookieParser());
     this.app.enable("trust proxy");
     this.app.use(bodyParser.json());
     
     this.app.use(cors({
      origin: process.env
        .CORS_OPTIONS
        .WHITELISTDOMAINS
    }));
     morgan.token("time", () => Date().toString());
     this.app.use(morgan("[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"));
     this.app.use(helmet());
     this.app.disable('x-powered-by');
     this.app.use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true ,
    }));
    
  }




  


  echo(){
    this.app.get("/version", (req, res) => {
      res.status(200).send({ "eventsLiner": process.env.npm_package_version });
    });
    this.app.get("/:ping", (req, res) => {
      if (req.params.ping === "ping") {
        res.status(200).send({
          ping: "pong",
        });
      } else {
        res.status(400).send({ message: "Invalid Request" });
      }
    });
  }

   listen() {
    this.app.listen(this.port, () => {
      logger.debug(`Server Started At Port ${this.port}`);
    });
  }
}