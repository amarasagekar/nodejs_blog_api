const getTokenFromHeader = (req) => {
  //get token form header
  const headerObj = req.headers;

  if (headerObj["authorization"] != null) {
    const token = headerObj["authorization"].split(" ")[1];
    if (token !== undefined) {
      return token;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = getTokenFromHeader;
