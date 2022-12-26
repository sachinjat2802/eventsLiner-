import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueSlotsService from "../../../../services/EventSlots.service.js";
import mongoose from "mongoose";

class VenueSlotsController {
    createVenueSlots(request, response, next) {
        try {
            const VenueSlots = request.body;
            VenueSlots.venue =mongoose.Types.ObjectId(request.params.id);
            VenueSlotsService.createVenueSlots(VenueSlots, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenueSlots", result, "VenueSlots Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenueSlots(request, response, next) {
        try {
            const VenueSlots = request.body;
            
            const id = request.params.id;
            VenueSlotsService.updateVenueSlots(id,VenueSlots, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenueSlots", result, "VenueSlots Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            VenueSlotsService.getMicroWebsiteLink(name, (err, result) => {
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

    addToVenueSlots(request, response, next) {
        try {
            const { VenueSlotsId, role } = request.body;
            const userId = request.currentUser?.id;
            VenueSlotsService.addToVenueSlots(VenueSlotsId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToVenueSlots", result, "Added In VenueSlots", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToVenueSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteVenueSlots(request, response, next) {
        try {
            const id = request.params.id;
            VenueSlotsService.deleteVenueSlots(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenueSlots", result, "VenueSlots Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueSlotsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenueSlotss(request, response, next) {
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
            
            VenueSlotsService.getVenueSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenueSlots", result.results, "VenueSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenueSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenueSlots(request, response, next) {
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
            
            VenueSlotsService.getVenueSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueSlotss", result.results, "VenueSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getVenueSlotsByUid(request, response, next) {
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
            
            VenueSlotsService.getVenueSlots(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueSlotss", result.results, "VenueSlotss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueSlotssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueSlotsController();