import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnProductOrderService from "../../../../services/AddOnProductOrder.service.js";
import mongoose from "mongoose";

class AddOnProductOrderController {
    createAddOnProductOrder(request, response, next) {
        try {
            const AddOnProductOrder = request.body;
            AddOnProductOrder.userId= mongoose.Types.ObjectId(request?.currentUser?.id);
            AddOnProductOrder.venue =mongoose.Types.ObjectId(request.params.id);
            AddOnProductOrderService.createAddOnProductOrder(AddOnProductOrder, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnProductOrder", result, "AddOnProductOrder Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnProductOrderController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnProductOrder(request, response, next) {
        try {
            const AddOnProductOrder = request.body;
            
            const id = request.params.id;
            AddOnProductOrderService.updateAddOnProductOrder(id,AddOnProductOrder, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnProductOrder", result, "AddOnProductOrder Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnProductOrderController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    
    

    

    deleteAddOnProductOrder(request, response, next) {
        try {
            const id = request.params.id;
            AddOnProductOrderService.deleteAddOnProductOrder(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnProductOrder", result, "AddOnProductOrder Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnProductOrderController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnProductOrders(request, response, next) {
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
            
            AddOnProductOrderService.getAddOnProductOrder(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnProductOrder", result.results, "AddOnProductOrders Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnProductOrdersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnProductOrder(request, response, next) {
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
            
            AddOnProductOrderService.getAddOnProductOrder(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnProductOrders", result.results, "AddOnProductOrders Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnProductOrdersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnProductOrder(request, response, next) {
        try {
           
            const query = request.query;
            if(request.params.userId){
                query.userId = mongoose.Types.ObjectId(request.params.userId)
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
            
            AddOnProductOrderService.getAddOnProductOrder(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnProductOrders", result.results, "AddOnProductOrders Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnProductOrdersController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
   
}

export default new AddOnProductOrderController();