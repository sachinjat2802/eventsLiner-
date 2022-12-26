import  logger  from "../logger/logger.js";
import { AdminUser} from "../Models/AdminUser.entity.js";
import CrudOperations  from "../utils/db/mongo.crud.js";
import {Password,JwtGenerator} from "../utils/index.js"
import dotenv from "dotenv";
import process from "node:process"
dotenv.config({ silent: process.env });
import _ from "lodash";






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
            let savedAdminUser = await new CrudOperations(AdminUser).save(admin);
            savedAdminUser=savedAdminUser.toObject()
            delete savedAdminUser.password;
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
            const userData = { accessToken: userJwt, user: adminUser.toObject(), refreshToken: "" };
            delete userData.user.password;
            next(null, userData);
        } catch (error) {
            logger.error("Error signing in", error);
            next("Something went wrong");
        }
    }

     async getAdmins(clauses, projections, options, sort, next) {
        try {
            const count = await new CrudOperations(AdminUser).countAllDocuments({ ...clauses, isDeleted: false });
            const results = await new CrudOperations(AdminUser).getAllDocuments({ ...clauses, isDeleted: false }, projections, options, sort);
            const response = {
                result: results,
                totalResult: count
            };
            next(null, response);
        } catch (error) {
            next("Something went wrong");
        }
    }

     async updateAdminUser(id, AdminUserDoc, next) {
        try {
            const oldAdminUser = await new CrudOperations(AdminUser).getDocument({ _id: id }, {});
           const updatedAdminUser = _.extend(oldAdminUser, AdminUserDoc);
           await new CrudOperations(AdminUser).updateDocument({ _id: id }, updatedAdminUser).then((result) => { next(null, result); }).catch((error) => { next(error); });
        }
        catch (err) {
            logger.error("UpdateAdminUser->", err);
            next("Something went wrong");
        }
    }

     //remove admin user
      async removeAdminUser(id, next) {
        try {
            const adminUser = await new CrudOperations(AdminUser).getDocument({ _id: id }, {});
            if (adminUser) {
                await new CrudOperations(AdminUser).updateDocument({ _id: id }, { isDeleted: true });
                return next(null, "Admin Removed");
            } else {
                next("No User Found To Remove!");
            }
            
        } catch (error) {
            logger.error("Error removing admin user", error);
            next("Something went wrong");
        }
    }

    //change admin password
     async changePassword(email, oldPassword, newPassword, next) {
        try {
            const adminUser = await new CrudOperations(AdminUser).getDocument({ email: email }, {});
            const passwordMatch = await Password.compare(adminUser.password, oldPassword);
            if (!passwordMatch) {
                return next("Wrong Password! Please Try Again!");
            }
            adminUser.password = newPassword;
            const savedAdminUser = await new CrudOperations(AdminUser).save(adminUser);
            next(null, savedAdminUser);
        } catch (error) {
            logger.error("Error resetting password", error);
            next("Something went wrong");
        }
    }




}






export default new AdminAuthService(process.env.jwtKey);