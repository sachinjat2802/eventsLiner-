

import { HttpException, HttpResponse } from "../../../../utils/index.js";
import userServices from "../../../../services/user.services.js";
import  logger  from "../../../../logger/logger.js";
import { User} from "../../../../models/userSchema.js";
import CrudOperations  from "../../../../utils/db/mongo.crud.js";
import {JwtGenerator} from "../../../../utils/index.js";
import dotenv from "dotenv";
import process from "node:process"
dotenv.config({ silent: process.env });

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
            
            
            userServices.signIn(request, email, password, (err, result) => {
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

      //import { passport } from "passport"; 
      //import GoogleStrategy from ('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   callbackURL: `http://localhost:5500/auth/google/redirect`,  //same URI as registered in Google console portal
//   clientID: process.env.GOOGLE_CLIENT_ID, //replace with copied value from Google console
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user_email = profile.emails && profile.emails[0].value; //profile object has the user info
//       let [user] = await db('users').select(['id', 'name', 'email']).where('email', user_email); //check whether user exist in database
//       let redirect_url = "";
//       if (user) {
//         const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' }); //generating token
//         redirect_url = `http://localhost:3000/${token}` //registered on FE for auto-login
//         return done(null, redirect_url);  //redirect_url will get appended to req.user object : passport.js in action
//       } else {
//         redirect_url = `http://localhost:3000/user-not-found/`;  // fallback page
//         return done(null, redirect_url);
//       }
//     } catch (error) {
//       done(error)
//     }
//   }
// ));

async socialSignIn(user, typeOfLogin, state, next) {
    const loginId = user.id;
    if (state.type === "LOGIN") {
      const existingUser = await new CrudOperations(User).getDocument({ email: user.email }, {});
      if (existingUser) {
        if (!existingUser.typeOfLogin.includes(typeOfLogin)) {
          await new CrudOperations(User).updateDocument({ email: user.email }, { $push: { typeOfLogin: typeOfLogin } });
        }
        const userJwt = new JwtGenerator(process.env.JWT_KEY).generateJwtClient(existingUser._id, existingUser.username);
        const userData = { redirectQuery: state, accessToken: userJwt, user: existingUser, refreshToken: "" };
        next(null, userData);
      } else {
        return next("Account Does Not Exist! Please SignUp");
      }
    } else {
      
      
      let username = user.email ? user.email.replace(/@.*$/, "") : `${user.name.replace(/ /g, "")}${Math.floor(1000 + Math.random() * 9000)}`;
      if (await new CrudOperations(User).getDocument({ username: username }, {})) {
        username = `${username}${Math.floor(1000 + Math.random() * 9000)}`;
      }
      const userModel = new User({
        username: username,
        name: user.name ?? username,
        email: user.email,
        isBanned: false,
        profilePicture: user.profilePicture ? {
          url: user.profilePicture,
          name: "Default-Avatar",
          size: 300000,
          type: "img/jpg",
          createdAt: new Date()
        } : {
          url: "https://media.istockphoto.com/id/587805078/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=sUCdx-Likqe7eBEcbn1FT8ybOQQHXDgBKLsJc99MtCA=",
          name: "Default-Avatar",
          size: 300000,
          type: "img/jpg",
          createdAt: new Date(),
        },
        is18AndAbove: true,
        isDeleted: false,
        isEmailVerified: user.email ? true : false,
      });
      userModel.typeOfLogin.push(typeOfLogin);
      userModel.ssouid = [];
      userModel.ssouid.push(loginId);
      const savedUser = await new CrudOperations(User).save(userModel);
    
     
      const userJwt = new JwtGenerator(process.env.JWT_KEY).generateJwtClient(savedUser._id, savedUser.username);
      const userData = { redirectQuery: state, accessToken: userJwt, user: savedUser, refreshToken: "" };
      next(null, userData);
    }
  }




}

export default new UserController();