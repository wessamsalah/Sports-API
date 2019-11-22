import express from "express";
import mongoose from "mongoose";

//routing
import *as SportEventRoutes from "./routes/sportEvent.route";

class App {

    public app: express.Application = express();
    public mongoUrl: string = 'mongodb://user:pass@mongo-db:27017/gns-api?authMechanism=SCRAM-SHA-1&authSource=admin';

    constructor() {
        this.config();
        this.mongoSetup();
        SportEventRoutes.Routes(this.app);
    }

    private config(): void {
        this.app.set("port", 3000);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

export default new App().app;
