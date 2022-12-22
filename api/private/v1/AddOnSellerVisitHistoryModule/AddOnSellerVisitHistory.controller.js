import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerVisitHistoryService from "../../../../services/AddOnSellerVisitHistory.service.js";
import mongoose from "mongoose";

class AddOnSellerVisitHistoryController {
    createAddOnSellerVisitHistory(request, response, next) {
        try {
            const addOnSellerVisitHistory={};
            addOnSellerVisitHistory.addOnSeller =mongoose.Types.ObjectId(request.params.id);
            addOnSellerVisitHistory.userId=mongoose.Types.ObjectId(request.currentUser.id);
            AddOnSellerVisitHistoryService.createAddOnSellerVisitHistory(addOnSellerVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSellerVisitHistory", result, "AddOnSellerVisitHistory Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSellerVisitHistory(request, response, next) {
        try {
            const AddOnSellerVisitHistory = request.body;
            
            const id = request.params.id;
            AddOnSellerVisitHistoryService.updateAddOnSellerVisitHistory(id,AddOnSellerVisitHistory, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSellerVisitHistory", result, "AddOnSellerVisitHistory Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            AddOnSellerVisitHistoryService.getMicroWebsiteLink(name, (err, result) => {
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

    addToAddOnSellerVisitHistory(request, response, next) {
        try {
            const { AddOnSellerVisitHistoryId, role } = request.body;
            const userId = request.currentUser?.id;
            AddOnSellerVisitHistoryService.addToAddOnSellerVisitHistory(AddOnSellerVisitHistoryId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToAddOnSellerVisitHistory", result, "Added In AddOnSellerVisitHistory", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToAddOnSellerVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteAddOnSellerVisitHistory(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerVisitHistoryService.deleteAddOnSellerVisitHistory(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSellerVisitHistory", result, "AddOnSellerVisitHistory Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerVisitHistoryController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerVisitHistorys(request, response, next) {
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
            
            AddOnSellerVisitHistoryService.getAddOnSellerVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSellerVisitHistory", result.results, "AddOnSellerVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellerVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellerVisitHistory(request, response, next) {
        try {
           
            const query = request.query;
            query.addOnSeller = mongoose.Types.ObjectId(request.params.id)
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
            
            AddOnSellerVisitHistoryService.getAddOnSellerVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerVisitHistorys", result.results, "AddOnSellerVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getAddOnSellerVisitHistoryByUid(request, response, next) {
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
            
            AddOnSellerVisitHistoryService.getAddOnSellerVisitHistory(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerVisitHistorys", result.results, "AddOnSellerVisitHistorys Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerVisitHistorysController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new AddOnSellerVisitHistoryController();