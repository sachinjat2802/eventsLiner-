import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenuePackageService from "../../../../services/venuePackage.service.js";
import mongoose from "mongoose";

class VenuePackageController {
    createVenuePackage(request, response, next) {
        try {
            const VenuePackage = request.body;
           
            VenuePackage.venue =mongoose.Types.ObjectId(request.params.id);
            VenuePackageService.createVenuePackage(VenuePackage, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenuePackage", result, "VenuePackage Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenuePackageController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenuePackage(request, response, next) {
        try {
            const VenuePackage = request.body;
            
            const id = request.params.id;
            VenuePackageService.updateVenuePackage(id,VenuePackage, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenuePackage", result, "VenuePackage Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenuePackageController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteVenuePackage(request, response, next) {
        try {
            const id = request.params.id;
            VenuePackageService.deleteVenuePackage(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenuePackage", result, "VenuePackage Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenuePackageController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenuePackages(request, response, next) {
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
            
            VenuePackageService.getVenuePackage(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenuePackage", result.results, "VenuePackages Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenuePackagesController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenuePackage(request, response, next) {
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
            
            VenuePackageService.getVenuePackage(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenuePackages", result.results, "VenuePackages Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenuePackagesController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenuePackage(request, response, next) {
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
           console.log(clauses);
            
            VenuePackageService.getVenuePackage(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenuePackages", result.results, "VenuePackages Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenuePackagesController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new VenuePackageController();