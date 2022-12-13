import jwt from "jsonwebtoken";

class JwtGenerator {
     jwtKey;

    constructor(jwtKey) {
        this.jwtKey = jwtKey;
    }

    generateJwtClient(userid, username, roleName) {
        const payload = {
            id: userid,
            username: username,
            role: roleName,
        };

        const signoptions = {
            issuer: "eventsliner-api-client",
            subject: userid.toString(),
            algorithm: "HS256",
        };

        const token = jwt.sign(
            payload,
            this.jwtKey,
            signoptions
        );

        return token;
    }

     generateJwtAdmin(userid, email) {
        const payload = {
            id: userid,
            email: email,
        };

        const signoptions = {
            issuer: "eventliners-api-admin",
            subject: userid.toString(),
            algorithm: "HS256",
        };

        const token = jwt.sign(
            payload,
            this.jwtKey,
            signoptions
        );

        return token;
    }
}

export default JwtGenerator;
