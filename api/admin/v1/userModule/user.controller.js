

import { HttpException, HttpResponse } from "../../../../utils/index.js";
import userServices from "../../../../services/user.services.js";

export class UserController {
  

     

    async  getUser(request,response,next){
        try{
            const id = request.params.id;
            userServices.getUser(id, (err, result)=>{
                if(err){
                    next(new HttpException(400, err));
                }
                else {
                    response.status(200).send(new HttpResponse("getUserById", result, null, null, null, null))
                }
            })
        }
        catch(error){
            next(new HttpException(400, "Something went Wrong"))
        }
     }

     async updateUser(request, response, next) {
        try {
          const id= request.params.id;
          const userData = request.body;
         
          userServices.updateUser(id, userData, (err, result) => {
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



      async   getAllUsers(request, response, next) {
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
                password: 0,
                __v:0
            };
            userServices.getAllUsers(clauses, projections, options, sort, (err, result) => {
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
    
    async removeUser(request, response, next) {
        try {
            const id  = request.params.id;
            userServices.removeUser(id, (err, result,user) => {
                if (err) {
                    next(new HttpException(400, err));
                } else {
                    response.status(200).send(new HttpResponse( result, user, null,null, null, null));
                }
            });
      
        } catch (error) {
            next(new HttpException(400, "Something went wrong"));
        }
      }



     
}

export default new UserController();