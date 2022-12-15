import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueService from "../../../../services/venue.service.js";

class VenueController {
    createVenue(request, response, next) {
        try {
            const Venue = request.body;
             Venue.members = [request?.currentUser?.id] ;
            VenueService.createVenue(Venue, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenue", result, "Venue Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenue(request, response, next) {
        try {
            const Venue = request.body;
            const userId =request.currentUser.id;
            const id = request.params.id;
            VenueService.updateVenue(id, userId,Venue, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenue", result, "Venue Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            VenueService.getMicroWebsiteLink(name, (err, result) => {
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

    addToVenue(request, response, next) {
        try {
            const { VenueId, role } = request.body;
            const userId = request.currentUser?.id;
            VenueService.addToVenue(VenueId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToVenue", result, "Added In Venue", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToVenueController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteVenue(request, response, next) {
        try {
            const id = request.params.id;
            const userId = request.currentUser?.id
            VenueService.deleteVenue(id,userId ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenue", result, "Venue Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenues(request, response, next) {
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
            
            VenueService.getVenue(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenue", result.results, "Venues Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenuesController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenues(request, response, next) {
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
            VenueService.getVenue(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Venues", result, "Venues Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenuesController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueController();