import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnProductCartService from "../../../../services/AddOnProductCart.service.js";
import mongoose from "mongoose";

class AddOnProductCartController {
    createAddOnProductCart(request, response, next) {
        try {
            const AddOnProductCart = request.body;
            AddOnProductCart.userId= mongoose.Types.ObjectId(request?.currentUser?.id);
            AddOnProductCartService.createAddOnProductCart(AddOnProductCart, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnProductCart", result, "AddOnProductCart Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnProductCartController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnProductCart(request, response, next) {
        try {
            const AddOnProductCart = request.body;
            
            const id = request.params.id;
            AddOnProductCartService.updateAddOnProductCart(id,mongoose.Types.ObjectId(request.currentUser.id),AddOnProductCart, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnProductCart", result, "AddOnProductCart Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnProductCartController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteAddOnProductCart(request, response, next) {
        try {
            const id = request.params.id;
            AddOnProductCartService.deleteAddOnProductCart(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnProductCart", result, "AddOnProductCart Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnProductCartController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnProductCarts(request, response, next) {
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
            
            AddOnProductCartService.getAddOnProductCart(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnProductCart", result.results, "AddOnProductCarts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnProductCartsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnProductCart(request, response, next) {
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
            
            AddOnProductCartService.getAddOnProductCart(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnProductCarts", result.results, "AddOnProductCarts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnProductCartsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnProductCart(request, response, next) {
        try {
           
            const query = request.query;
            if(request.params.userId){
                query.userId = mongoose.Types.ObjectId(request.currentUser.id)
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
           console.log(clauses);
            
            AddOnProductCartService.getAddOnProductCart(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnProductCarts", result.results, "AddOnProductCarts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnProductCartsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new AddOnProductCartController();