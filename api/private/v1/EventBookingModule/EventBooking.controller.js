import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import EventBookingService from "../../../../services/eventBooking.service.js";
import mongoose from "mongoose";

class EventBookingController {
    createEventBooking(request, response, next) {
        try {
            const EventBooking = request.body;
            EventBooking.userId= mongoose.Types.ObjectId(request?.currentUser?.id);
            EventBooking.event =mongoose.Types.ObjectId(request.params.id);
            EventBookingService.createEventBooking(EventBooking, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateEventBooking", result, "EventBooking Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateEventBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateEventBooking(request, response, next) {
        try {
            const EventBooking = request.body;
            
            const id = request.params.id;
            EventBookingService.updateEventBooking(id,EventBooking, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateEventBooking", result, "EventBooking Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateEventBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteEventBooking(request, response, next) {
        try {
            const id = request.params.id;
            EventBookingService.deleteEventBooking(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteEventBooking", result, "EventBooking Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteEventBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventBookings(request, response, next) {
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
            
            EventBookingService.getEventBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetEventBooking", result.results, "EventBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetEventBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyEventBooking(request, response, next) {
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
            
            EventBookingService.getEventBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventBookings", result.results, "EventBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getEventBooking(request, response, next) {
        try {
           
            const query = request.query;
            if(request.params.userId){
                query.userId = mongoose.Types.ObjectId(request.params.userId)
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
            
            EventBookingService.getEventBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My EventBookings", result.results, "EventBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyEventBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new EventBookingController();