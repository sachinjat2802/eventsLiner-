import logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import ProductReviewsService from "../../../../services/AddOnSellerProductReview.service.js";
import mongoose from "mongoose";

class ProductReviewsController {
    createProductReviews(request, response, next) {
        try {
            const ProductReviews = request.body;
            ProductReviews.Product = mongoose.Types.ObjectId(request.params.id);
            ProductReviews.userId = mongoose.Types.ObjectId(request.currentUser.id);
            ProductReviewsService.createProductReviews(ProductReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateProductReviews", result, "ProductReviews Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateProductReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateProductReviews(request, response, next) {
        try {
            const ProductReviews = request.body;

            const id = request.params.id;
            ProductReviewsService.updateProductReviews(id, ProductReviews, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateProductReviews", result, "ProductReviews Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateProductReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }


    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            ProductReviewsService.getMicroWebsiteLink(name, (err, result) => {
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

    addToProductReviews(request, response, next) {
        try {
            const { ProductReviewsId, role } = request.body;
            const userId = request.currentUser?.id;
            ProductReviewsService.addToProductReviews(ProductReviewsId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToProductReviews", result, "Added In ProductReviews", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToProductReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }



    deleteProductReviews(request, response, next) {
        try {
            const id = request.params.id;
            logger.info(id)
            ProductReviewsService.deleteProductReviews(id, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteProductReviews", result, "ProductReviews Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteProductReviewsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getProductReviews(request, response, next) {
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
                options = { limit: parseInt(limit), pageNo: parseInt(pageNo) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
            //clauses.userId = request.currentUser?.id;

            ProductReviewsService.getProductReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetProductReviews", result.results, "ProductReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetProductReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyProductReviews(request, response, next) {
        try {

            const query = request.query;
            query.Product = mongoose.Types.ObjectId(request.params.id)
            const sort = {};
            const projections = {};
            let options = {
                limit: 0,
                pageNo: 0
            };
            // eslint-disable-next-line prefer-const
            let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
            if (query.limit, query.pageNo) {
                options = { limit: parseInt(limit), pageNo: parseInt(pageNo) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
            console.log(clauses);

            ProductReviewsService.getProductReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My ProductReviewss", result.results, "ProductReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyProductReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    async getProductReviewsByUid(request, response, next) {
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
                options = { limit: parseInt(limit), pageNo: parseInt(pageNo) };
                delete clauses.limit; delete clauses.pageNo;
            }
            if (sortBy && orderBy) {
                sort[sortBy] = orderBy === "desc" ? -1 : 1;
            }
            if (clauses.searchTerm && clauses.searchValue) {
                const searchTerm = {};
                searchTerm[clauses.searchTerm] = new RegExp(`^${clauses.searchValue}`, "i");
                clauses = { ...clauses, ...searchTerm };
                delete clauses.searchTerm, delete clauses.searchValue;
            }
            console.log(clauses);

            ProductReviewsService.getProductReviews(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My ProductReviewss", result.results, "ProductReviewss Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetMyProductReviewssController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new ProductReviewsController();