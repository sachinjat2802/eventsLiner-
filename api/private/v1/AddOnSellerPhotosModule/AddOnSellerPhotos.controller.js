import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AddOnSellerPhotoService from "../../../../services/addOnSellerPhoto.service.js";
import mongoose from "mongoose";
class AddOnSellerPhotoController {
    createAddOnSellerPhoto(request, response, next) {
        console.log(request.body)
        try {
            const AddOnSellerPhoto = request.body;
            AddOnSellerPhotoService.createAddOnSellerPhoto(AddOnSellerPhoto, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateAddOnSellerPhoto", result, "AddOnSellerPhoto Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateAddOnSellerPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateAddOnSellerPhoto(request, response, next) {
        try {
            const AddOnSellerPhoto = request.body;
            const id = request.params.id;
            AddOnSellerPhotoService.updateAddOnSellerPhoto(id,AddOnSellerPhoto, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateAddOnSellerPhoto", result, "AddOnSellerPhoto Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateAddOnSellerPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

  
    

    

    deleteAddOnSellerPhoto(request, response, next) {
        try {
            const id = request.params.id;
            AddOnSellerPhotoService.deleteAddOnSellerPhoto(id ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteAddOnSellerPhoto", result, "AddOnSellerPhoto Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteAddOnSellerPhotoController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getAddOnSellerPhotos(request, response, next) {
        try {
            
            const query = request.query;
            query.addOnSeller = mongoose.Types.ObjectId(request.params.id);
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
            
            AddOnSellerPhotoService.getAddOnSellerPhoto(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetAddOnSellerPhoto", result.results, "AddOnSellerPhotos Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetAddOnSellerPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyAddOnSellerPhotos(request, response, next) {
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
            AddOnSellerPhotoService.getAddOnSellerPhoto(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My AddOnSellerPhotos", result, "AddOnSellerPhotos Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyAddOnSellerPhotosController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new AddOnSellerPhotoController();