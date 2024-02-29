const jwt = require("jsonwebtoken");

function authenticateToken(request, response, next) {
  // Bearer TOKEN (the token is sent in the header, authorization)
  const authHeader = request.headers[`authorization`];
  // Format:
  // authHeader = Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(401);
  // Verify the token with the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return response.sendStatus(403);
    request.user = user;
    next();
  });
}

module.exports = authenticateToken;
