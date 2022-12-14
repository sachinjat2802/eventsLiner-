

import { HttpException, HttpResponse } from "../../../../utils/index.js";
import userServices from "../../../../services/user.services.js";

export class UserController {
   search(request, response, next) {
    try {
        const user = request.currentUser?.id;
        const search = request.body.search;
       
        userServices.search(user, search ,(err, result, saveSearch) => {
            if (err) {
                next(new HttpException(400, err));
            } else {
                response.status(200).send(new HttpResponse(" search created", saveSearch, result, null, null, null));
            }
        });

    } catch (error) {
        next(new HttpException(400, "Something went wrong"));
    }
}

    
}

export default new UserController();