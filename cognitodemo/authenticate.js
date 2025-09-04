const Cognito = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require("aws-jwt-verify");
const crypto = require("crypto");

const userPoolId = "ap-southeast-2_T2L2DKRt2"; // Obtain from the AWS console
const clientId = "1sj3n6nat7chs6v6sv81jt6kng";  // Obtain from the AWS console
const clientSecret = "63rmmb50kjabsi9nhimq1s5vff0d4jmr36rhkhfa9orlida7gom";  // Obtain from the AWS console
const username = "barry";
const password = "Passw0rd!";
const email = "n11547227@qut.edu.au";

function secretHash(clientId, clientSecret, username) {
  const hasher = crypto.createHmac('sha256', clientSecret);
  hasher.update(`${username}${clientId}`);
  return hasher.digest('base64');
}


const accessVerifier = jwt.CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "access",
  clientId: clientId,
});

const idVerifier = jwt.CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "id",
  clientId: clientId,
});

async function main() {
  const client = new Cognito.CognitoIdentityProviderClient({
    region: "ap-southeast-2",
  });

  console.log("Getting auth token");

  // Get authentication tokens from the Cognito API using username and password
  const command = new Cognito.InitiateAuthCommand({
    AuthFlow: Cognito.AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash(clientId, clientSecret, username),
    },
    ClientId: clientId,
    
  });

  res = await client.send(command);
  console.log(res);

  // ID Tokens are used to authenticate users to your application
  const IdToken = res.AuthenticationResult.IdToken;
  const IdTokenVerifyResult = await idVerifier.verify(IdToken);
  console.log(IdTokenVerifyResult);

  // Access tokens are used to link IAM roles to identities for accessing AWS services
  // Most students will not use these
  const accessToken = res.AuthenticationResult.AccessToken;
  const accessTokenVerifyResult = await accessVerifier.verify(accessToken);
  console.log(accessTokenVerifyResult);
}

main();
