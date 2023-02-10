import jwt_decode from "jwt-decode";

export function decodeJwt(token) {

    if(token === null) return null;

    return jwt_decode(token);
};

// export function getJwt(token) {

//     if(token === null) return null;

//     return token;
// };
