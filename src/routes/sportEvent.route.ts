
import * as SportController from "../controllers/sportEvent.controller";

export const Routes = (app: any) => {
    app.route('/sportsevents/:id')
        .get(SportController.getSportEvent)
}