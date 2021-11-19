import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node.js";
import express from "express";
import getAssignedRepresentatives from "../utils/getAssignedRepresentatives.js";
import getRepresentativesByAssignedPostalCodes from "../utils/getRepresentativesByAssignedPostalCodes.js";
import getRepresentativeByPostalCode from "../utils/getRepresentativesByPostalCode.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { formName, postalCode } = req.query;

    const representativeList = [];

    const config = new WebApiConfig(
      "9.1",
      res.locals.accessToken,
      `${process.env.CLIENT_URL}`
    );

    const result = await retrieveMultiple(
      config,
      "bsi_pledgeforms",
      `$filter=bsi_name eq '${formName}' and statecode eq 0`
    );

    if (!result || result.value.length === 0) {
      return res.status(200).json({});
    }

    const pledgeForm = result.value[0];

    if (pledgeForm.bsi_ignorerepslookup === false) {
      await getRepresentativeByPostalCode(
        pledgeForm,
        config,
        postalCode,
        representativeList
      );
    }

    if (pledgeForm.bsi_assignedrepsonly === true) {
      await getAssignedRepresentatives(pledgeForm, config, representativeList);
    }

    if (pledgeForm.bsi_assignedpostalcodes === true) {
      await getRepresentativesByAssignedPostalCodes(
        pledgeForm,
        config,
        representativeList
      );
    }

    const response = {
      success: true,
      form: {
        id: pledgeForm.bsi_pledgeformid,
        name: encodeURIComponent(pledgeForm.bsi_name),
        title: encodeURIComponent(pledgeForm.bsi_title),
        subtitle1: encodeURIComponent(pledgeForm.bsi_subtitle),
        subtitle2: encodeURIComponent(pledgeForm.bsi_subtitle2),
        emailSubject: encodeURIComponent(pledgeForm.bsi_emailsubject),
        emailContent: encodeURIComponent(pledgeForm.bsi_emailcontent),
        modifyEmailAllowed: pledgeForm.bsi_modifyemailallowed,
      },
      emails: representativeList,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

export default router;
