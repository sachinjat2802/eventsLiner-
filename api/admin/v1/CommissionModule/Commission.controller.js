import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import CommissionService from "../../../../services/Commission.service.js";
import mongoose from "mongoose";

class CommissionController {
    createCommission(request, response, next) {
        try {
            const Commission = request.body;
            CommissionService.createCommission(Commission, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateCommission", result, "Commission Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateCommissionController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateCommission(request, response, next) {
        try {
            const Commission = request.body;
            
            const id = request.params.id;
            CommissionService.updateCommission(id,Commission, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateCommission", result, "Commission Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateCommissionController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            CommissionService.getMicroWebsiteLink(name, (err, result) => {
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

    addToCommission(request, response, next) {
        try {
            const { CommissionId, role } = request.body;
            const userId = request.currentUser?.id;
            CommissionService.addToCommission(CommissionId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToCommission", result, "Added In Commission", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToCommissionController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteCommission(request, response, next) {
        try {
            const id = request.params.id;
            CommissionService.deleteCommission(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteCommission", result, "Commission Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteCommissionController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getCommissions(request, response, next) {
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
            
            CommissionService.getCommission(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetCommission", result.results, "Commissions Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetCommissionsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyCommission(request, response, next) {
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
            
            CommissionService.getCommission(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Commissions", result.results, "Commissions Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyCommissionsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getCommissionByUid(request, response, next) {
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
            
            CommissionService.getCommission(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Commissions", result.results, "Commissions Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyCommissionsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new CommissionController();