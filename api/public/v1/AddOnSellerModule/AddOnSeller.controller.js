import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerService from "../../../../services/AddOnSeller.service.js";
import mongoose from "mongoose";
class AddOnSellerController {
    createAddOnSeller(request, response, next) {
        try {
            const AddOnSeller = request.body;
             AddOnSeller.members = [request?.currentUser?.id] ;
            AddOnSellerService.createAddOnSeller(AddOnSeller, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSeller", result, "AddOnSeller Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSeller(request, response, next) {
        try {
            const AddOnSeller = request.body;
            const userId =request.currentUser.id;
            const id = request.params.id;
            AddOnSellerService.updateAddOnSeller(id, userId,AddOnSeller, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSeller", result, "AddOnSeller Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    

    
    

    deleteAddOnSeller(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerService.deleteAddOnSeller(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSeller", result, "AddOnSeller Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellers(request, response, next) {
        try {
           
            
            const query = request.query;
            if(request.params.id){
             query.organization = mongoose.Types.ObjectId(request.params.id);
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
            
            AddOnSellerService.getAddOnSeller(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSeller", result.results, "AddOnSellers Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellers(request, response, next) {
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
            AddOnSellerService.getAddOnSeller(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellers", result, "AddOnSellers Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new AddOnSellerController();