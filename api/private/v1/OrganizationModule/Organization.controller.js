import  logger from "../../../../logger/logger.js";
import { HttpException, HttpResponse } from "../../../../utils/index.js";
import OrganizationService from "../../../../services/organization.service.js";

class OrganizationController {
    createOrganization(request, response, next) {
        try {
            const organization = request.body;
             organization.members = [request?.currentUser?.id] ;
            OrganizationService.createOrganization(organization, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("CreateOrganization", result, "Organization Created", null, null, null));
                }
            });
        } catch (err) {
            logger.error("CreateOrganizationController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    updateOrganization(request, response, next) {
        try {
            const Organization = request.body;
            const userId =request.currentUser.id;
            const id = request.params.id;
            OrganizationService.updateOrganization(id, userId,Organization, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("UpdateOrganization", result, "Organization Updated", null, null, null));
                }
            });
        } catch (err) {
            logger.error("UpdateOrganizationController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
    

    getMicroWebsiteLink(request, response, next) {
        try {
            const { name } = request.body;
            OrganizationService.getMicroWebsiteLink(name, (err, result) => {
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

    addToOrganization(request, response, next) {
        try {
            const { organizationId, role } = request.body;
            const userId = request.currentUser?.id;
            OrganizationService.addToOrganization(organizationId, role, userId, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("AddToOrganization", result, "Added In Organization", null, null, null));
                }
            });
        } catch (err) {
            logger.error("addToOrganizationController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    

    deleteOrganization(request, response, next) {
        try {
            const id = request.params.id;
            const userId = request.currentUser?.id
            OrganizationService.deleteOrganization(id,userId ,(err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("DeleteOrganization", result, "Organization Delted", null, null, null));
                }
            });
        } catch (err) {
            logger.error("DeleteOrganizationController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getOrganizations(request, response, next) {
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
            
            OrganizationService.getOrganization(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("GetOrganization", result.results, "Organizations Returned", null, result.totalResult, null));
                }
            });
        } catch (err) {
            logger.error("GetOrganizationsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }

    async getMyOrganizations(request, response, next) {
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
            OrganizationService.getOrganization(clauses, projections, options, sort, (err, result) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse("My Organizations", result, "Organizations Returned", null, null, null));
                }
            });
        } catch (err) {
            logger.error("GetMyOrganizationsController->", err);
            next(new HttpException(400, "Something went wrong"));
        }
    }
}

export default new OrganizationController();