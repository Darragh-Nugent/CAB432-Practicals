const Cognito = require("@aws-sdk/client-cognito-identity-provider");
const crypto = require("crypto");

const clientId = "1sj3n6nat7chs6v6sv81jt6kng";  // Obtain from the AWS console
const clientSecret = "63rmmb50kjabsi9nhimq1s5vff0d4jmr36rhkhfa9orlida7gom";  // Obtain from the AWS console
const username = "barry";
const confirmationCode = "282010"; // obtain from your email

function secretHash(clientId, clientSecret, username) {
  const hasher = crypto.createHmac('sha256', clientSecret);
  hasher.update(`${username}${clientId}`);
  return hasher.digest('base64');
}


async function main() {
    const client = new Cognito.CognitoIdentityProviderClient({ region: 'ap-southeast-2' });
  const command2 = new Cognito.ConfirmSignUpCommand({
    ClientId: clientId,
    SecretHash: secretHash(clientId, clientSecret, username),
    Username: username,
    ConfirmationCode: confirmationCode,
  });

  res2 = await client.send(command2);
  console.log(res2);

}

main();
