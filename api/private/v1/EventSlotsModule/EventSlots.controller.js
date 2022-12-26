import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventSlotsService from "../../../../services/EventSlots.service.js";
import mongoose from "mongoose";

class EventSlotsController {
    createEventSlots(request, response, next) {
        try {
            const EventSlots = request.body;
            EventSlots.event =mongoose.Types.ObjectId(request.params.id);
            EventSlotsService.createEventSlots(EventSlots, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEventSlots", result, "EventSlots Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEventSlots(request, response, next) {
        try {
            const EventSlots = request.body;
            
            const id = request.params.id;
            EventSlotsService.updateEventSlots(id,EventSlots, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEventSlots", result, "EventSlots Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            EventSlotsService.getMicroWebsiteLink(name, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("getMicroWebsiteLink", result, "Link Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("getMicroWebsiteLinkController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    addToEventSlots(request, response, next) {
        try {
            const { EventSlotsId, role } = request.body;
            const userId = request.currentUser?.id;
            EventSlotsService.addToEventSlots(EventSlotsId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToEventSlots", result, "Added In EventSlots", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToEventSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteEventSlots(request, response, next) {
        try {
            const id = request.params.id;
            EventSlotsService.deleteEventSlots(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEventSlots", result, "EventSlots Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventSlotss(request, response, next) {
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
            clauses.members = request.currentUser?.id;
            
            EventSlotsService.getEventSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEventSlots", result.results, "EventSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEventSlots(request, response, next) {
        try {
           
            const query = request.query;
            query.event = mongoose.Types.ObjectId(request.params.id)
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
            
            EventSlotsService.getEventSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventSlotss", result.results, "EventSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getEventSlotsByUid(request, response, next) {
        try {
           
            const query = request.query;
            query.userId = mongoose.Types.ObjectId(request.params.id)
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
            
            EventSlotsService.getEventSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventSlotss", result.results, "EventSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new EventSlotsController();