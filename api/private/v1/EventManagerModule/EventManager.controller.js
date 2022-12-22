import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventManagerService from "../../../../services/EventManager.service.js";
import mongoose from "mongoose";
class EventManagerController {
    createEventManager(request, response, next) {
        try {
            const EventManager = request.body;
             EventManager.members = [request?.currentUser?.id] ;
            EventManagerService.createEventManager(EventManager, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEventManager", result, "EventManager Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventManagerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEventManager(request, response, next) {
        try {
            const EventManager = request.body;
            const userId =request.currentUser.id;
            const id = request.params.id;
            EventManagerService.updateEventManager(id, userId,EventManager, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEventManager", result, "EventManager Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventManagerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    

    
    

    deleteEventManager(request, response, next) {
        try {
            const id = request.params.id;
            EventManagerService.deleteEventManager(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEventManager", result, "EventManager Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventManagerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventManagers(request, response, next) {
        try {
           
            
            const query = request.query;
            if(request.params.id){
             query.organization = mongoose.Types.ObjectId(request.params.id);
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
            
            EventManagerService.getEventManager(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEventManager", result.results, "EventManagers Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventManagersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEventManagers(request, response, next) {
        try {
            const id = request.currentUser?.id;
            logger.info(id);
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
            clauses = {
                ...clauses, ...{
                    $or: [{ "members.admin": id }, { "members.owner": id }],
                }
            };
            EventManagerService.getEventManager(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventManagers", result, "EventManagers Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventManagersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new EventManagerController();