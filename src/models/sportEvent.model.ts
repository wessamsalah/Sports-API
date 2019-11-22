import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const SportEventSchema: mongoose.Schema = new Schema({
    _id: {
        type: String
    },
    id: {
        type: String
    },
    sportId: {
        type: String
    },
    name: {
        type: String
    },
    eventType: {
        type: String
    },
    scheduleStatus: {
        type: String
    },
    resultStatus: {
        type: String
    },

    parentSportsEventIds: {
        type: [String]
    },

    siblingOrder: {
        type: Number
    },
    directParentSportsEventId: {
        type: String
    },

});


export interface ISportEvent extends mongoose.Document {
    _id: string
    id: string
    sportId: string
    name: string
    eventType: string
    scheduleStatus: string
    resultStatus: string
    parentSportsEventIds: string[],
    siblingOrder: number,
    directParentSportsEventId: string
}
 
export interface ISportEventResponse {
    id: string,
    name: string,
    eventType: string,
    scheduleStatus: string,
    resultStatus: string,
    directParentSportsEventId: string,
    children: ISportEventResponse[]
}




export const SportEvent = mongoose.model<ISportEvent>("SportEvent", SportEventSchema, "sports-event");
