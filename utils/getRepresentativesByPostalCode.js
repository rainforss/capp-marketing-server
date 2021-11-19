import { retrieveMultiple } from "dataverse-webapi/lib/node.js";

const getRepresentativeByPostalCode = async (
  pledgeForm,
  config,
  postalCode,
  representativeList
) => {
  let postcodeMap;
  switch (pledgeForm.bsi_type) {
    case 861560000:
      postcodeMap = (
        await retrieveMultiple(
          config,
          "bsi_postalcodefederalmaps",
          `$filter=bsi_postalcode eq '${postalCode}' and bsi_federalelectoralid ne null&$select=bsi_postalcode,bsi_federalelectoralid`
        )
      ).value;
      if (postcodeMap.length !== 0) {
        const representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=bsi_federalelectoralid eq '${
              postcodeMap[0].bsi_federalelectoralid
            }' and bsi_startdate le ${new Date().toISOString()}`
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
      }
      break;

    case 861560001:
      postcodeMap = (
        await retrieveMultiple(
          config,
          "bsi_postalcodefederalmaps",
          `$filter=bsi_postalcode eq '${postalCode}' and bsi_provincialelectoralid ne null&$select=bsi_postalcode,bsi_provincialelectoralid`
        )
      ).value;
      if (postcodeMap.length !== 0) {
        const representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=bsi_federalelectoralid eq '${
              postcodeMap[0].bsi_provincialelectoralid
            }' and bsi_startdate le ${new Date().toUTCString()}`
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
      }
      break;

    case 861560002:
      postcodeMap = (
        await retrieveMultiple(
          config,
          "bsi_postalcodefederalmaps",
          `$filter=bsi_postalcode eq '${postalCode}' and bsi_municipalelectoralid ne null&$select=bsi_postalcode,bsi_municipalelectoralid`
        )
      ).value;
      if (postcodeMap.length !== 0) {
        const representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=bsi_federalelectoralid eq '${
              postcodeMap[0].bsi_municipalelectoralid
            }' and bsi_startdate le ${new Date().toUTCString()}`
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
      }
      break;

    case 861560003:
      postcodeMap = (
        await retrieveMultiple(
          config,
          "bsi_postalcodefederalmaps",
          `$filter=bsi_postalcode eq '${postalCode}' and bsi_provincialridingelectoralid ne null&$select=bsi_postalcode,bsi_provincialridingectoralid`
        )
      ).value;
      if (postcodeMap.length !== 0) {
        const representatives = (
          await retrieveMultiple(
            config,
            "bsi_representatives",
            `$filter=bsi_federalelectoralid eq '${
              postcodeMap[0].bsi_provincialridingelectoralid
            }' and bsi_startdate le ${new Date().toUTCString()}`
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
      }
      break;
  }

  return representativeList;
};

export default getRepresentativeByPostalCode;
