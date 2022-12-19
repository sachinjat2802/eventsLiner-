import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenuePhotosService from "../../../../services/venuePhoto.service.js";
import mongoose from "mongoose";
class VenuePhotosController {
    createVenuePhotos(request, response, next) {
        console.log(request.body)
        try {
            const VenuePhotos = request.body;
             VenuePhotos.members = [request?.currentUser?.id] ;
            VenuePhotosService.createVenuePhotos(VenuePhotos, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenuePhotos", result, "VenuePhotos Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenuePhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenuePhotos(request, response, next) {
        try {
            const VenuePhotos = request.body;
            const id = request.params.id;
            VenuePhotosService.updateVenuePhotos(id,VenuePhotos, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenuePhotos", result, "VenuePhotos Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenuePhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

  
    

    

    deleteVenuePhotos(request, response, next) {
        try {
            const id = request.params.id;
            VenuePhotosService.deleteVenuePhotos(id ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenuePhotos", result, "VenuePhotos Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenuePhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenuePhotoss(request, response, next) {
        try {
            
            const query = request.query;
            query.venue = mongoose.Types.ObjectId(request.params.id);
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
            
            VenuePhotosService.getVenuePhotos(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenuePhotos", result.results, "VenuePhotoss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenuePhotossController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenuePhotoss(request, response, next) {
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
            VenuePhotosService.getVenuePhotos(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenuePhotoss", result, "VenuePhotoss Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenuePhotossController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenuePhotosController();