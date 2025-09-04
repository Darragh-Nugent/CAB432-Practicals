const Cognito = require("@aws-sdk/client-cognito-identity-provider");
const crypto = require("crypto");

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

async function main() {
  console.log("Signing up user");
  const client = new Cognito.CognitoIdentityProviderClient({ region: 'ap-southeast-2' });
  const command = new Cognito.SignUpCommand({
    ClientId: clientId,
    SecretHash: secretHash(clientId, clientSecret, username),
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });
  const res = await client.send(command);
  console.log(res);
}

main();
