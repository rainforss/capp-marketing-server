import msal from "@azure/msal-node";
import { cachePluginFunc } from "./utils/cachePlugin.js";
import dotenv from "dotenv";
import express from "express";
import getToken from "./middleware/getToken.js";
import pledgeFormsRoute from "./routes/pledgeForm.js";

dotenv.config();

const cacheLocation = "./data/cache.json";

const cachePlugin = cachePluginFunc(cacheLocation);

const clientConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
  },
  cache: {
    cachePlugin,
  },
};

const confidentialClientApplication = new msal.ConfidentialClientApplication(
  clientConfig
);

const Main = async () => {
  const app = express();
  app.set("cca", confidentialClientApplication);
  app.use(getToken);
  app.use("/api/pledgeforms", pledgeFormsRoute);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started at port ${process.env.PORT || 5000}`);
  });
};

Main().catch((error) => console.log(error));
