import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerProductPhotoService from "../../../../services/AddOnSellerProductPhoto.service.js";
import mongoose from "mongoose";
class AddOnSellerProductPhotoController {
    createAddOnSellerProductPhoto(request, response, next) {
        console.log(request.body)
        try {
            const AddOnSellerProductPhoto = request.body;
            AddOnSellerProductPhotoService.createAddOnSellerProductPhoto(AddOnSellerProductPhoto, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSellerProductPhoto", result, "AddOnSellerProductPhoto Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerProductPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSellerProductPhoto(request, response, next) {
        try {
            const AddOnSellerProductPhoto = request.body;
            const id = request.params.id;
            AddOnSellerProductPhotoService.updateAddOnSellerProductPhoto(id,AddOnSellerProductPhoto, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSellerProductPhoto", result, "AddOnSellerProductPhoto Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerProductPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

  
    

    

    deleteAddOnSellerProductPhoto(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerProductPhotoService.deleteAddOnSellerProductPhoto(id ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSellerProductPhoto", result, "AddOnSellerProductPhoto Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerProductPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerProductPhotos(request, response, next) {
        try {
            
            const query = request.query;
            query.product = mongoose.Types.ObjectId(request.params.id);
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
            
            AddOnSellerProductPhotoService.getAddOnSellerProductPhoto(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSellerProductPhoto", result.results, "AddOnSellerProductPhotos Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellerProductPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellerProductPhotos(request, response, next) {
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
            AddOnSellerProductPhotoService.getAddOnSellerProductPhoto(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerProductPhotos", result, "AddOnSellerProductPhotos Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerProductPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new AddOnSellerProductPhotoController();