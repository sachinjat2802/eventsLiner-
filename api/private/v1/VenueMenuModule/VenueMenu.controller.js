import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueMenusService from "../../../../services/venueMenus.service.js";
import mongoose from "mongoose";
class VenueMenusController {
    createVenueMenus(request, response, next) {
        try {
            const venueMenus = request.body;
            VenueMenusService.createVenueMenus(venueMenus, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenueMenus", result, "VenueMenus Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueMenusController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenueMenus(request, response, next) {
        try {
            const VenueMenus = request.body;
            const id = mongoose.Types.ObjectId(request.params.id) ;
            VenueMenusService.updateVenueMenus(id,VenueMenus, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenueMenus", result, "VenueMenus Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueMenusController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

   
    

    deleteVenueMenus(request, response, next) {
        try {
            const id = request.params.id;
            VenueMenusService.deleteVenueMenus(id ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenueMenus", result, "VenueMenus Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueMenusController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenueMenus(request, response, next) {
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
            
            VenueMenusService.getVenueMenus(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenueMenus", result.results, "VenueMenuss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenueMenussController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenueMenuss(request, response, next) {
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
            VenueMenusService.getVenueMenus(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueMenuss", result, "VenueMenuss Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueMenussController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueMenusController();