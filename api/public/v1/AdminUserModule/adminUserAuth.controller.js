import { HttpException, HttpResponse } from "../../../../utils/index.js";
import AdminAuthService from "../../../../services/adminAuth.service.js";
import  logger  from "../../../../logger/logger.js";

export class AdminUserController {
   createAdminUser(request, response, next) {
    try {
        const adminUser = request.body;
        AdminAuthService.createAdminUser(adminUser, (err, result,savedAdminUser) => {
            if (err) {
                next(new HttpException(400, err));
            } else {
                response.status(200).send(new HttpResponse("admin user Created", savedAdminUser, result, null, null, null));
            }
        });

    } catch (error) {
        next(new HttpException(400, "Something went wrong"));
    }
}

     signIn(request, response, next) {
        try {
            const { email, password } = request.body;
            AdminAuthService.signIn(email, password, (err, result) => {
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
     async changePasswordThroughLink(request, response, next) {
        try {
          const { token, newPassword } = request.body;
          logger.info(token, newPassword);
          AdminAuthService.resetPasswordThroughLink(token, newPassword, (err, result) => {
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

export default new AdminUserController();