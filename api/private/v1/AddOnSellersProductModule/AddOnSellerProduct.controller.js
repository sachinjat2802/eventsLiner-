import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerProductService from "../../../../services/addOnSellerProducts.service.js";
import mongoose from "mongoose";

class AddOnSellerProductController {
    createAddOnSellerProduct(request, response, next) {
        try {
            const AddOnSellerProduct = request.body;
            AddOnSellerProduct.addOnSeller =mongoose.Types.ObjectId(request.params.id);
            AddOnSellerProductService.createAddOnSellerProduct(AddOnSellerProduct, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSellerProduct", result, "AddOnSellerProduct Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerProductController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSellerProduct(request, response, next) {
        try {
            const AddOnSellerProduct = request.body;
            
            const id = request.params.id;
            AddOnSellerProductService.updateAddOnSellerProduct(id,AddOnSellerProduct, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSellerProduct", result, "AddOnSellerProduct Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerProductController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteAddOnSellerProduct(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerProductService.deleteAddOnSellerProduct(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSellerProduct", result, "AddOnSellerProduct Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerProductController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerProducts(request, response, next) {
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
           
            AddOnSellerProductService.getAddOnSellerProduct(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSellerProduct", result.results, "AddOnSellerProducts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellerProductsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellerProduct(request, response, next) {
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
            
            AddOnSellerProductService.getAddOnSellerProduct(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerProducts", result.results, "AddOnSellerProducts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerProductsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerProduct(request, response, next) {
        try {
           
            const query = request.query;
            if(request.params.addOnSellerId){
                query.addOnSeller = mongoose.Types.ObjectId(request.params.addOnSellerId)
            }
            else{
                query._id = mongoose.Types.ObjectId(request.params.id)

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
            
            AddOnSellerProductService.getAddOnSellerProduct(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerProducts", result.results, "AddOnSellerProducts Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerProductsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new AddOnSellerProductController();