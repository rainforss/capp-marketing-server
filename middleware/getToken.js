import { getClientCredentialsToken } from "../utils/getClientCredentialsToken.js";

const getToken = async (req, res, next) => {
  try {
    const cca = req.app.get("cca");
    const tokenResponse = await getClientCredentialsToken(cca);
    res.locals.accessToken = tokenResponse.accessToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default getToken;
