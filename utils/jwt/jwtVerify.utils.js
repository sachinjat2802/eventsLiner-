import jwt from "jsonwebtoken";
import logger from "../../logger/logger.js";

class JwtVerify {
    jwtKey;

    constructor(jwtKey) {
        this.jwtKey = jwtKey;
    }

     decodeJwt(token) {
        try {
            const payload = jwt.decode(token);
            return payload;
        } catch (error) {
            logger.error(
                "-------------ERROR:: decoding the token :: Start-----------"
            );
            logger.error(error);
            throw new Error("Error decoding the payload");
        }
    }

     verfyJwtClient(token, next) {
        const payload = this.decodeJwt(token);
        const verifyOptions = {
            issuer: "eventsliner-api-client",
            subject: payload.sub,
            audience: payload.aud, // roles/scope of the token *Have to be replaced by regex
            algorithms: ["HS256"],
        };

        jwt.verify(token, this.jwtKey, verifyOptions, (err, decodeJwt) => {
            if (err) {
                next(err);
            } else {
                next(null, decodeJwt);
            }
        });
    }

     verfyJwtAdmin(token, next){
        const payload = this.decodeJwt(token);
        const verifyOptions = {
            issuer: "eventsliner-api-admin",
            subject: payload.sub,
            audience: payload.aud, // roles/scope of the token *Have to be replaced by regex
            algorithms: ["HS256"],
        };
        jwt.verify(token, this.jwtKey, verifyOptions, (err, decodeJwt) => {
            if (err) {
                next(err);
            } else {
                next(null, decodeJwt);
            }
        });
    }
}

export default JwtVerify;
