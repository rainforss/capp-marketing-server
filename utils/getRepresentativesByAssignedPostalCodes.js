import { retrieveMultiple } from "dataverse-webapi/lib/node.js";

const getRepresentativesByAssignedPostalCodes = async (
  pledgeForm,
  config,
  representativeList
) => {
  try {
    const assignedPostalCodes = (
      await retrieveMultiple(
        config,
        "bsi_postalcodefederalmaps",
        `$filter=bsi_PledgeForm_bsi_PostalCodeFederalMap_b/any(a:a/bsi_pledgeformid eq ${pledgeForm.bsi_pledgeformid})`
      )
    ).value;

    if (assignedPostalCodes.length === 0) {
      return representativeList;
    }

    let queryString = "";
    let representatives;

    switch (pledgeForm.bsi_type) {
      case 861560000:
        assignedPostalCodes.forEach((p, index) => {
          if (index === 0) {
            queryString += `bsi_federalelectoralid eq '${p.bsi_federalelectoralid}'`;
          } else {
            queryString += `or bsi_federalelectoralid eq '$${p.bsi_federalelectoralid}'`;
          }
        });

        representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=${queryString} and bsi_startdate le ${new Date().toISOString()}`
          )
        ).value;
        representatives.forEach((r) => {
          representativeList.push({
            id: r.bsi_representativeid,
            firstName: r.bsi_firstname,
            lastName: r.bsi_lastname,
            emailAddress: r.bsi_emailaddress,
            salutation: r.bsi_salutation,
            title: r.bsi_title,
            photoURL: r.bsi_photourl,
            sequenceNumber: r.bsi_sequencenumber,
          });
        });

        break;

      case 861560001:
        assignedPostalCodes.forEach((p, index) => {
          if (index === 0) {
            queryString += `bsi_federalelectoralid eq '${p.bsi_provincialelectoralid}'`;
          } else {
            queryString += `or bsi_federalelectoralid eq '$${p.bsi_provincialelectoralid}'`;
          }
        });

        representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=${queryString} and bsi_startdate le ${new Date().toISOString()}`
          )
        ).value;
        representatives.forEach((r) => {
          representativeList.push({
            id: r.bsi_representativeid,
            firstName: r.bsi_firstname,
            lastName: r.bsi_lastname,
            emailAddress: r.bsi_emailaddress,
            salutation: r.bsi_salutation,
            title: r.bsi_title,
            photoURL: r.bsi_photourl,
            sequenceNumber: r.bsi_sequencenumber,
          });
        });

        break;

      case 861560002:
        assignedPostalCodes.forEach((p, index) => {
          if (index === 0) {
            queryString += `bsi_federalelectoralid eq '${p.bsi_municipalelectoralid}'`;
          } else {
            queryString += `or bsi_federalelectoralid eq '$${p.bsi_municipalelectoralid}'`;
          }
        });

        representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=${queryString} and bsi_startdate le ${new Date().toISOString()}`
          )
        ).value;
        representatives.forEach((r) => {
          representativeList.push({
            id: r.bsi_representativeid,
            firstName: r.bsi_firstname,
            lastName: r.bsi_lastname,
            emailAddress: r.bsi_emailaddress,
            salutation: r.bsi_salutation,
            title: r.bsi_title,
            photoURL: r.bsi_photourl,
            sequenceNumber: r.bsi_sequencenumber,
          });
        });

        break;

      case 861560003:
        assignedPostalCodes.forEach((p, index) => {
          if (index === 0) {
            queryString += `bsi_federalelectoralid eq '${p.bsi_provincialridingelectoralid}'`;
          } else {
            queryString += `or bsi_federalelectoralid eq '$${p.bsi_provincialridingelectoralid}'`;
          }
        });

        representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=${queryString} and bsi_startdate le ${new Date().toISOString()}`
          )
        ).value;
        representatives.forEach((r) => {
          representativeList.push({
            id: r.bsi_representativeid,
            firstName: r.bsi_firstname,
            lastName: r.bsi_lastname,
            emailAddress: r.bsi_emailaddress,
            salutation: r.bsi_salutation,
            title: r.bsi_title,
            photoURL: r.bsi_photourl,
            sequenceNumber: r.bsi_sequencenumber,
          });
        });

        break;
    }
    return representativeList;
  } catch (error) {
    throw error;
  }
};

export default getRepresentativesByAssignedPostalCodes;
