import  logger  from "../logger/logger.js";
import { User} from "../models/userSchema.js";
import CrudOperations  from "../utils/db/mongo.crud.js";
import {Password,JwtGenerator} from "../utils/index.js"
import dotenv from "dotenv";
import process from "node:process"
import _ from "lodash";
import satelize from 'satelize'
dotenv.config({ silent: process.env });
import ipware from 'ipware'





class userService {

  jwtKey;
  jwtGenerator;
  //redisCrudOperations
    constructor(jwtKey) {
        this.jwtKey = jwtKey;
        this.jwtGenerator = new JwtGenerator(this.jwtKey);
     }
    async createUser(user, next) {
        
        try {
           const existingUser = await new CrudOperations(User).getDocument({ email: user.email }, {});
            if (existingUser && existingUser.isDeleted == false) {
                next("There is already a user with this email");
            } else if (existingUser && existingUser.isDeleted == true) {
                await new CrudOperations(User).deleteDocument({ email: existingUser.email });
            }
            user.isDeleted = false;
            const newUser = new User(user);
            const savedUser = await new CrudOperations(User).save(newUser);
            console.log(savedUser)
            next(null, "User Created",savedUser);
        }   catch (error) {
            logger.error("Error creating admin user", error);
            next("Something went wrong");
        }
    }

    async signIn(req, email, password, next) {
        try {
            console.log(req)
            let user = await new CrudOperations(User).getDocument({ email: email, isDeleted: false }, {});
            
            if (!user) {
                return next("No User Found");
            }
            const passwordMatch = await Password.compare(user.password, password);
            if (passwordMatch == false) {
                return next("Invalid Credentials");
            }

            
            let getIP = ipware().get_ip;
            
            let location = {}
            let ipInfo = getIP(req)
            console.log(ipInfo)
            satelize.satelize({ip:'49.204.165.186'}, (err, payload) => {
              if (err)
                res.status(500).send({ "error": err })
              else {
                console.log(payload)
               
                //result = result.payload.country
                location={
                  "continent":payload.continent.en,
                  "country_code":payload.country_code,
                  "country":payload.country.en
        
                }
                console.log(location)
              }
            })
            user.location =location

            user.save()
            const userJwt = this.jwtGenerator.generateJwtClient(user._id, user.email);
            const userData = { accessToken: userJwt, user: user, refreshToken: "" };
            next(null, userData);
        } catch (error) {
            logger.error("Error signing in", error);
            next("Something went wrong");
        }
    }
    
   


    async getUser(id,next){
        try{
        const user = await new CrudOperations(User).getDocument({_id:id, isDeleted: false}, {});

        if(!user){
            return next('No User Found');
        }
       next(null, user);
    }
    catch (error) {
        logger.error("Error ", error);
        next("Something went wrong");
    }
    }


    async updateUser(id, UserDoc, next) {
        try {
            const oldUser = await new CrudOperations(User).getDocument({ _id: id }, {});
           const updatedUser = _.extend(oldUser, UserDoc);
           await new CrudOperations(User).updateDocument({ _id: id }, updatedUser).then((result) => {
             next(null, result); }).catch((error) => { next(error); });
        }
        catch (err) {
            logger.error("UpdateUser->", err);
            next("Something went wrong");
        }
    }


    async getAllUsers(clauses, projections, options, sort, next) {
        try {
            logger.info(clauses)
            const count = await new CrudOperations(User).countAllDocuments({ ...clauses, isDeleted: false });
            const results = await new CrudOperations(User).getAllDocuments({ ...clauses, isDeleted: false }, projections, options, sort);
            const response = {
                result: results,
                totalResult: count
            };
            next(null, response);
        } catch (error) {
            next("Something went wrong");
        }
    }
     

    async removeUser(id, next) {
        //console.log(id)
        try {
            const user = await new CrudOperations(User).getDocument({ _id: id }, {});
            if (user) {
              const user = await new CrudOperations(User).updateDocument({ _id: id }, { isDeleted: true });
                return next(null, "User Removed",user);
            } else {
                next("No User Found To Remove!");
            }
        } catch (error) {
            logger.error("Error removing admin user", error);
            next("Something went wrong");
        }
    }
}






export default new userService(process.env.jwtKey);