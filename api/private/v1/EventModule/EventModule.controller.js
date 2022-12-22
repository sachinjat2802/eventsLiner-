import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventService from "../../../../services/event.service.js";
import mongoose from "mongoose";

class EventController {
    createEvent(request, response, next) {
        try {
            const Event = request.body;
            Event.eventManager =mongoose.Types.ObjectId(request.params.id);
            EventService.createEvent(Event, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEvent", result, "Event Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEvent(request, response, next) {
        try {
            const Event = request.body;
            
            const id = request.params.id;
            EventService.updateEvent(id,Event, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEvent", result, "Event Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteEvent(request, response, next) {
        try {
            const id = request.params.id;
            EventService.deleteEvent(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEvent", result, "Event Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEvents(request, response, next) {
        try {
            
            const query = request.query;
            const sort = {};
            const projections = {};
            let options = {
                limit: 0,
                pageNo: 0
            };
            // eslint-disable-next-line prefer-const
            let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
            if (query.limit, query.pageNo) {
                options = { limit: parseInt(limit ), pageNo: parseInt(pageNo ) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy ] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm ] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
           
            EventService.getEvent(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEvent", result.results, "Events Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEvent(request, response, next) {
        try {
           
            const query = request.query;
            query.eventManager = mongoose.Types.ObjectId(request.params.id)
            const sort = {};
            const projections = {};
            let options = {
                limit: 0,
                pageNo: 0
            };
            // eslint-disable-next-line prefer-const
            let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
            if (query.limit, query.pageNo) {
                options = { limit: parseInt(limit ), pageNo: parseInt(pageNo ) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy ] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm ] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
           console.log(clauses);
            
            EventService.getEvent(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Events", result.results, "Events Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEvent(request, response, next) {
        try {
           
            const query = request.query;
            if(request.params.addOnSellerId){
                query.addOnSeller = mongoose.Types.ObjectId(request.params.addOnSellerId)
            }
            else{
                query._id = mongoose.Types.ObjectId(request.params.id)

            }
            const sort = {};
            const projections = {};
            let options = {
                limit: 0,
                pageNo: 0
            };
            // eslint-disable-next-line prefer-const
            let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
            if (query.limit, query.pageNo) {
                options = { limit: parseInt(limit ), pageNo: parseInt(pageNo ) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy ] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm ] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
           console.log(clauses);
            
            EventService.getEvent(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Events", result.results, "Events Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new EventController();