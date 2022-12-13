import  logger  from "../logger/logger.js";
import { AdminUser} from "../models/adminUser.entity.js";
import CrudOperations  from "../utils/db/mongo.crud.js";
import {Password,JwtGenerator} from "../utils/index.js"
import dotenv from "dotenv";
import process from "node:process"
dotenv.config({ silent: process.env });





class AdminAuthService {

  jwtKey;
  jwtGenerator;
  redisCrudOperations
    constructor(jwtKey) {
        this.jwtKey = jwtKey;
        this.jwtGenerator = new JwtGenerator(this.jwtKey);
     }
    async createAdminUser(adminUser, next) {
        try {
           const existingUser = await new CrudOperations(AdminUser).getDocument({ email: adminUser.email }, {});
            if (existingUser && existingUser.isDeleted == false) {
                next("There is already a user with this email");
            } else if (existingUser && existingUser.isDeleted == true) {
                await new CrudOperations(AdminUser).deleteDocument({ email: existingUser.email });
            }
            adminUser.isDeleted = false;
            const admin = new AdminUser(adminUser);
            const savedAdminUser = await new CrudOperations(AdminUser).save(admin);
             next(null, "User Created",savedAdminUser);
        } catch (error) {
            logger.error("Error creating admin user", error);
            next("Something went wrong");
        }
    }

    async signIn(email, password, next) {
        try {
            const adminUser = await new CrudOperations(AdminUser).getDocument({ email: email, isDeleted: false }, {});
            if (!adminUser) {
                return next("No User Found");
            }
            const passwordMatch = await Password.compare(adminUser.password, password);
            if (passwordMatch == false) {
                return next("Invalid Credentials");
            }
            const userJwt = this.jwtGenerator.generateJwtAdmin(adminUser._id, adminUser.email);
            const userData = { accessToken: userJwt, user: adminUser, refreshToken: "" };
            next(null, userData);
        } catch (error) {
            logger.error("Error signing in", error);
            next("Something went wrong");
        }
    }
}






export default new AdminAuthService(process.env.jwtKey);