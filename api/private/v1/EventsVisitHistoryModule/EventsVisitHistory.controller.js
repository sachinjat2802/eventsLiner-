import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventVisitHistoryService from "../../../../services/EventVisitHistory.service.js";
import mongoose from "mongoose";

class EventVisitHistoryController {
    createEventVisitHistory(request, response, next) {
        try {
            const EventVisitHistory={};
            EventVisitHistory.event =mongoose.Types.ObjectId(request.params.id);
            EventVisitHistory.userId=mongoose.Types.ObjectId(request.currentUser.id);
            EventVisitHistoryService.createEventVisitHistory(EventVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEventVisitHistory", result, "EventVisitHistory Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEventVisitHistory(request, response, next) {
        try {
            const EventVisitHistory = request.body;
            
            const id = request.params.id;
            EventVisitHistoryService.updateEventVisitHistory(id,EventVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEventVisitHistory", result, "EventVisitHistory Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            EventVisitHistoryService.getMicroWebsiteLink(name, (err, result) => {
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

    addToEventVisitHistory(request, response, next) {
        try {
            const { EventVisitHistoryId, role } = request.body;
            const userId = request.currentUser?.id;
            EventVisitHistoryService.addToEventVisitHistory(EventVisitHistoryId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToEventVisitHistory", result, "Added In EventVisitHistory", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToEventVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteEventVisitHistory(request, response, next) {
        try {
            const id = request.params.id;
            EventVisitHistoryService.deleteEventVisitHistory(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEventVisitHistory", result, "EventVisitHistory Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventVisitHistorys(request, response, next) {
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
            
            EventVisitHistoryService.getEventVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEventVisitHistory", result.results, "EventVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEventVisitHistory(request, response, next) {
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
            
            EventVisitHistoryService.getEventVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventVisitHistorys", result.results, "EventVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getEventVisitHistoryByUid(request, response, next) {
        try {
           
            const query = request.query;
            query.userId = mongoose.Types.ObjectId(request.params.userId)
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
            
            EventVisitHistoryService.getEventVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventVisitHistorys", result.results, "EventVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new EventVisitHistoryController();