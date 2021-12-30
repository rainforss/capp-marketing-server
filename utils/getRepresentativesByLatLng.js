import fetch from "node-fetch";
export const getRepresentativesByLatLng = async (
  lat,
  lng,
  representativeList
) => {
  const result = await fetch(
    `${process.env.CIVIC_INFO_URL}/representatives/house-of-commons/?point=${lat},${lng}`
  );
  const jsonResult = await result.json();
  const representatives = jsonResult.objects;
  representatives.forEach((r, index) =>
    representativeList.push({
      id: index,
      firstName: r.first_name,
      lastName: r.last_name,
      emailAddress: r.email,
      salutation: r.gender === "F" ? "Ms." : r.gender === "M" ? "Mr." : null,
      title: null,
      photoURL: r.photo_url,
      sequenceNumber: index,
      isPrimary: true,
    })
  );
};
