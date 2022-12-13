

import { HttpException, HttpResponse } from "../../../../utils/index.js";
import userServices from "../../../../services/user.services.js";
import  logger  from "../../../../logger/logger.js";

export class UserController {
   createUser(request, response, next) {
    try {
        const user = request.body;
       
        userServices.createUser(user, (err, result,savedUser) => {
            if (err) {
                next(new HttpException(400, err));
            } else {
                response.status(200).send(new HttpResponse(" user Created", savedUser, result, null, null, null));
            }
        });

    } catch (error) {
        next(new HttpException(400, "Something went wrong"));
    }
}

     signIn(request, response, next) {
        try {
            const { email, password } = request.body;
            //console.log(request.body)
            userServices.signIn(email, password, (err, result) => {
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

    async  getUser(request,response,next){
        try{
            const {id} = request.body;
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







     async changePasswordThroughLink(request, response, next) {
        try {
          const { token, newPassword } = request.body;
          logger.info(token, newPassword);
          userServices.resetPasswordThroughLink(token, newPassword, (err, result) => {
            if (err) {
              next(new HttpException(400, err));
            } else {
              response.status(200).send(new HttpResponse("Change Password Through Link", result, "Password Changed", null, null, null));
            }
          });
        } catch (err) {
          next(new HttpException(400, "Something went wrong"));
        }
      }
}

export default new UserController();