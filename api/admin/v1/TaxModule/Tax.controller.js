import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import TaxService from "../../../../services/Tax.service.js";
import mongoose from "mongoose";

class TaxController {
    createTax(request, response, next) {
        try {
            const Tax = request.body;
            logger.info(Tax)
            TaxService.createTax(Tax, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateTax", result, "Tax Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateTaxController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateTax(request, response, next) {
        try {
            const Tax = request.body;
            
            const id = request.params.id;
            TaxService.updateTax(id,Tax, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateTax", result, "Tax Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateTaxController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            TaxService.getMicroWebsiteLink(name, (err, result) => {
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

    addToTax(request, response, next) {
        try {
            const { TaxId, role } = request.body;
            const userId = request.currentUser?.id;
            TaxService.addToTax(TaxId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToTax", result, "Added In Tax", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToTaxController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteTax(request, response, next) {
        try {
            const id = request.params.id;
            TaxService.deleteTax(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteTax", result, "Tax Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteTaxController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getTaxs(request, response, next) {
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
            
            TaxService.getTax(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetTax", result.results, "Taxs Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetTaxsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyTax(request, response, next) {
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
            
            TaxService.getTax(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Taxs", result.results, "Taxs Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyTaxsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getTaxByUid(request, response, next) {
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
            
            TaxService.getTax(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Taxs", result.results, "Taxs Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyTaxsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new TaxController();