import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueVisitHistoryService from "../../../../services/VenueVisitHistory.service.js";
import mongoose from "mongoose";

class VenueVisitHistoryController {
    createVenueVisitHistory(request, response, next) {
        try {
            const VenueVisitHistory={};
            VenueVisitHistory.venue =mongoose.Types.ObjectId(request.params.id);
            VenueVisitHistory.userId=mongoose.Types.ObjectId(request.currentUser.id);
            VenueVisitHistoryService.createVenueVisitHistory(VenueVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenueVisitHistory", result, "VenueVisitHistory Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenueVisitHistory(request, response, next) {
        try {
            const VenueVisitHistory = request.body;
            
            const id = request.params.id;
            VenueVisitHistoryService.updateVenueVisitHistory(id,VenueVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenueVisitHistory", result, "VenueVisitHistory Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            VenueVisitHistoryService.getMicroWebsiteLink(name, (err, result) => {
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

    addToVenueVisitHistory(request, response, next) {
        try {
            const { VenueVisitHistoryId, role } = request.body;
            const userId = request.currentUser?.id;
            VenueVisitHistoryService.addToVenueVisitHistory(VenueVisitHistoryId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToVenueVisitHistory", result, "Added In VenueVisitHistory", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToVenueVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteVenueVisitHistory(request, response, next) {
        try {
            const id = request.params.id;
            VenueVisitHistoryService.deleteVenueVisitHistory(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenueVisitHistory", result, "VenueVisitHistory Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenueVisitHistorys(request, response, next) {
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
            
            VenueVisitHistoryService.getVenueVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenueVisitHistory", result.results, "VenueVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenueVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenueVisitHistory(request, response, next) {
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
            
            VenueVisitHistoryService.getVenueVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueVisitHistorys", result.results, "VenueVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getVenueVisitHistoryByUid(request, response, next) {
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
            
            VenueVisitHistoryService.getVenueVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueVisitHistorys", result.results, "VenueVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueVisitHistoryController();