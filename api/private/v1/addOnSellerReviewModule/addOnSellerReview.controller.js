import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerReviewsService from "../../../../services/AddOnSellerReview.service.js";
import mongoose from "mongoose";

class AddOnSellerReviewsController {
    createAddOnSellerReviews(request, response, next) {
        try {
            const AddOnSellerReviews = request.body;
            AddOnSellerReviews.addOnSeller =mongoose.Types.ObjectId(request.params.id);
            AddOnSellerReviews.userId=mongoose.Types.ObjectId(request.currentUser.id);
            AddOnSellerReviewsService.createAddOnSellerReviews(AddOnSellerReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSellerReviews", result, "AddOnSellerReviews Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSellerReviews(request, response, next) {
        try {
            const AddOnSellerReviews = request.body;
            
            const id = request.params.id;
            AddOnSellerReviewsService.updateAddOnSellerReviews(id,AddOnSellerReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSellerReviews", result, "AddOnSellerReviews Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            AddOnSellerReviewsService.getMicroWebsiteLink(name, (err, result) => {
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

    addToAddOnSellerReviews(request, response, next) {
        try {
            const { AddOnSellerReviewsId, role } = request.body;
            const userId = request.currentUser?.id;
            AddOnSellerReviewsService.addToAddOnSellerReviews(AddOnSellerReviewsId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToAddOnSellerReviews", result, "Added In AddOnSellerReviews", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToAddOnSellerReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteAddOnSellerReviews(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerReviewsService.deleteAddOnSellerReviews(id,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSellerReviews", result, "AddOnSellerReviews Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerReviews(request, response, next) {
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
            //clauses.userId = request.currentUser?.id;
            
            AddOnSellerReviewsService.getAddOnSellerReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSellerReviews", result.results, "AddOnSellerReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellerReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellerReviews(request, response, next) {
        try {
           
            const query = request.query;
            query.AddOnSeller = mongoose.Types.ObjectId(request.params.id)
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
            
            AddOnSellerReviewsService.getAddOnSellerReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerReviewss", result.results, "AddOnSellerReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getAddOnSellerReviewsByUid(request, response, next) {
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
            
            AddOnSellerReviewsService.getAddOnSellerReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerReviewss", result.results, "AddOnSellerReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new AddOnSellerReviewsController();