export const getClientCredentialsToken = async (cca) => {
  try {
    const clientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };

    const response = await cca.acquireTokenByClientCredential(
      clientCredentialRequest
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
