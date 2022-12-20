import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueBookingService from "../../../../services/venueBooking.service.js";
import mongoose from "mongoose";

class VenueBookingController {
    createVenueBooking(request, response, next) {
        try {
            const VenueBooking = request.body;
            VenueBooking.venue =mongoose.Types.ObjectId(request.params.id);
            VenueBookingService.createVenueBooking(VenueBooking, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenueBooking", result, "VenueBooking Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenueBooking(request, response, next) {
        try {
            const VenueBooking = request.body;
            
            const id = request.params.id;
            VenueBookingService.updateVenueBooking(id,VenueBooking, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenueBooking", result, "VenueBooking Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            VenueBookingService.getMicroWebsiteLink(name, (err, result) => {
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

    addToVenueBooking(request, response, next) {
        try {
            const { VenueBookingId, role } = request.body;
            const userId = request.currentUser?.id;
            VenueBookingService.addToVenueBooking(VenueBookingId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToVenueBooking", result, "Added In VenueBooking", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToVenueBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteVenueBooking(request, response, next) {
        try {
            const id = request.params.id;
            VenueBookingService.deleteVenueBooking(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenueBooking", result, "VenueBooking Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueBookingController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenueBookings(request, response, next) {
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
            
            VenueBookingService.getVenueBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenueBooking", result.results, "VenueBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenueBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenueBooking(request, response, next) {
        try {
           
            const query = request.query;
            query.venue = mongoose.Types.ObjectId(request.params.id)
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
            
            VenueBookingService.getVenueBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueBookings", result.results, "VenueBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getVenueBookingByUid(request, response, next) {
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
            
            VenueBookingService.getVenueBooking(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueBookings", result.results, "VenueBookings Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueBookingsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueBookingController();