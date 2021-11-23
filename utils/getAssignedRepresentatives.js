import { retrieveMultiple } from "dataverse-webapi/lib/node.js";

const getAssignedRepresentatives = async (
  pledgeForm,
  config,
  representativeList
) => {
  try {
    const representatives = (
      await retrieveMultiple(
        config,
        "bsi_representatives",
        `$filter=statecode eq 0 and bsi_PledgeForm_bsi_Representative_bsi_Rep/any(a:a/bsi_pledgeformid eq ${pledgeForm.bsi_pledgeformid})`
      )
    ).value;

    representatives.forEach((r) => {
      representativeList.push({
        id: r.bsi_representativeid,
        firstName: r.bsi_firstname,
        lastName: r.bsi_lastname,
        emailAddress: r.bsi_email,
        salutation: r.bsi_salutation,
        title: r.bsi_title,
        photoURL: r.bsi_photourl,
        sequenceNumber: r.bsi_sequencenumber,
      });
    });

    return representativeList;
  } catch (error) {
    throw error;
  }
};

export default getAssignedRepresentatives;
