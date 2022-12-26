

import { HttpException, HttpResponse } from "../../../../utils/index.js";
import userServices from "../../../../services/User.service.js";

export class UserController {
    getSearch(request, response, next) {
       
    try {
        const user = request.params.id;
       
       
        userServices.getSearch(user ,(err, result, saveSearch) => {
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