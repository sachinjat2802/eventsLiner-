import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventPhotosService from "../../../../services/eventPhoto.service.js";
import mongoose from "mongoose";
class EventPhotosController {
    createEventPhotos(request, response, next) {
        console.log(request.body)
        try {
            const EventPhotos = request.body;
            EventPhotosService.createEventPhotos(EventPhotos, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEventPhotos", result, "EventPhotos Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEventPhotos(request, response, next) {
        try {
            const EventPhotos = request.body;
            const id = request.params.id;
            EventPhotosService.updateEventPhotos(id,EventPhotos, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEventPhotos", result, "EventPhotos Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

  
    

    

    deleteEventPhotos(request, response, next) {
        try {
            const id = request.params.id;
            EventPhotosService.deleteEventPhotos(id ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEventPhotos", result, "EventPhotos Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventPhotoss(request, response, next) {
        try {
            
            const query = request.query;
            query.event = mongoose.Types.ObjectId(request.params.id);
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
            
            EventPhotosService.getEventPhotos(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEventPhotos", result.results, "EventPhotoss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventPhotossController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEventPhotoss(request, response, next) {
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
            EventPhotosService.getEventPhotos(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventPhotoss", result, "EventPhotoss Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventPhotossController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new EventPhotosController();