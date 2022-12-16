import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import VenueReviewsService from "../../../../services/venueReview.service.js";
import mongoose from "mongoose";

class VenueReviewsController {
    createVenueReviews(request, response, next) {
        try {
            const VenueReviews = request.body;
            VenueReviews.venue =mongoose.Types.ObjectId(request.params.id);
            VenueReviews.userId=mongoose.Types.ObjectId(request.currentUser.id);
            VenueReviewsService.createVenueReviews(VenueReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateVenueReviews", result, "VenueReviews Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateVenueReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateVenueReviews(request, response, next) {
        try {
            const VenueReviews = request.body;
            
            const id = request.params.id;
            VenueReviewsService.updateVenueReviews(id,VenueReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateVenueReviews", result, "VenueReviews Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateVenueReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            VenueReviewsService.getMicroWebsiteLink(name, (err, result) => {
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

    addToVenueReviews(request, response, next) {
        try {
            const { VenueReviewsId, role } = request.body;
            const userId = request.currentUser?.id;
            VenueReviewsService.addToVenueReviews(VenueReviewsId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToVenueReviews", result, "Added In VenueReviews", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToVenueReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteVenueReviews(request, response, next) {
        try {
            const id = request.params.id;
            const userId = request.currentUser?.id
            VenueReviewsService.deleteVenueReviews(id,userId ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteVenueReviews", result, "VenueReviews Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteVenueReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getVenueReviewss(request, response, next) {
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
            
            VenueReviewsService.getVenueReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetVenueReviews", result.results, "VenueReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetVenueReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyVenueReviews(request, response, next) {
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
            
            VenueReviewsService.getVenueReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueReviewss", result.results, "VenueReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getVenueReviewsByUid(request, response, next) {
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
            
            VenueReviewsService.getVenueReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My VenueReviewss", result.results, "VenueReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyVenueReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new VenueReviewsController();