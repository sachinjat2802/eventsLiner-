import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AdminAuthService from "../../../../services/adminAuth.service.js";
//import  logger  from "../../../../logger/logger.js";

export class AdminUserController {
   getAdmins(request, response, next) {
    try {
        const query = request.query;
        const sort = {};
        let projections = {};
        let options= {
            limit: 0,
            pageNo: 0
        };
        // eslint-disable-next-line prefer-const
        let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
        if (query.limit, query.pageNo) {
            options = { limit: parseInt(limit), pageNo: parseInt(pageNo ) };
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
        projections = {
            password: 0
        };
        AdminAuthService.getAdmins(clauses, projections, options, sort, (err, result) => {
            if (err) {
                next(new HttpException(400, err));
            } else {
                response.status(200).send(new HttpResponse(null, result.result, null, null, result.totalResult, query.pageNo));
            }
        });
    } catch (error) {
        next(new HttpException(400, "Something went wrong"));
    }
}

 updateAdminUser(request, response, next) {
  try {
    const id= request.currentUser?.id;
    const userData = request.body;
   
    AdminAuthService.updateAdminUser(id, userData, (err, result) => {
      if (err) {
        next(new HttpException(400, err));
      } else {
        response.status(200).send(new HttpResponse("update profile", result, "Profile Updated", null, null, null));
      }
    });
  } catch (err) {
    next(new HttpException(400, "Something went wrong in Update Profile"));
  }
}

changePassword(request, response, next) {
  try {
      const { email, oldPassword, newPassword, } = request.body;
      AdminAuthService.changePassword(email, oldPassword, newPassword, (err, result) => {
          if (err) {
              next(new HttpException(400, err));
          } else {
              response.status(200).send(new HttpResponse(null, result, null, null, null, null));
          }
      });

  } catch (error) {
      next(new HttpException(400, "Something went wrong"));
  }
}

//remove admin user
 removeUser(request, response, next) {
  try {
      const id = request.params.id; 
      AdminAuthService.removeAdminUser(id, (err, result) => {
          if (err) {
              next(new HttpException(400, err));
          } else {
              response.status(200).send(new HttpResponse(null, result, null, null, null, null));
          }
      });

  } catch (error) {
      next(new HttpException(400, "Something went wrong"));
  }
}

}

export default new AdminUserController();