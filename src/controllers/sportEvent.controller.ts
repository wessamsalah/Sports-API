import { SportEvent, ISportEventResponse } from '../models/sportEvent.model';
import { Request, Response } from 'express';


// GET /sportsevents 
export const getSportEvent = async (req: Request, res: Response) => {
    let id = req.params.id;
    let sportsEventsResponse: ISportEventResponse[] = await getSportEventsById(id);

    let sportEventResponse = sportsEventsResponse[0];
    sportEventResponse.children = generateTreeHierarchy(sportEventResponse.children, id);
    res.send(sportsEventsResponse);
}

const getSportEventsById = async (id: string) => {
    return await SportEvent.aggregate([
        { $match: { "_id": id } },
        {
            $graphLookup: {
                from: "sports-event",
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "directParentSportsEventId",
                as: "children"
            }
        },
        {
            $project: {
                _id: 0,
                id: 1,
                directParentSportsEventId: 1,
                name: 1,
                eventType: 1,
                scheduleStatus: 1,
                resultStatus: 1
                , children: {
                    id: 1,
                    directParentSportsEventId: 1,
                    name: 1,
                    eventType: 1,
                    scheduleStatus: 1,
                    resultStatus: 1
                }
            }
        }
    ]);
}

const generateTreeHierarchy = (sportEvents: ISportEventResponse[], parentId: string): ISportEventResponse[] =>
    sportEvents
        .filter(sportEvent => sportEvent.directParentSportsEventId === parentId)
        .map(sportEvent => ({ ...sportEvent, children: generateTreeHierarchy(sportEvents, sportEvent.id) }));