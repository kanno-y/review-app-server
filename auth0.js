import fetch from "node-fetch";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-pv66jkz3.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: "https://calm-wave-38804.herokuapp.com/",
  issuer: `https://dev-pv66jkz3.us.auth0.com`,
  algorithms: ["RS256"],
});

export async function getUser(token) {
  const auth0Request = await fetch(
    "https://dev-pv66jkz3.us.auth0.com/userinfo",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return auth0Request.json();
}
