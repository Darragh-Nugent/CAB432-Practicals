SecretsManager = require("@aws-sdk/client-secrets-manager");

const secret_name = "n11547227-demosecret";
const client = new SecretsManager.SecretsManagerClient({ region: "ap-southeast-2" });

async function main() {
   try {
      response = await client.send(
         new SecretsManager.GetSecretValueCommand({
            SecretId: secret_name
         })
      );
      const secret = response.SecretString;
      console.log(secret);
   } catch (error) {
      console.log(error);
   }
}

main();
