require("dotenv").config();
const S3 = require("@aws-sdk/client-s3");

async function main() {
    // Creating a client for sending commands to EC2
    client = new S3.S3Client({ region: 'ap-southeast-2' });

    // Example of a command for finding out information on EC2 instances
    const command = new S3.ListBucketsCommand({});

    // It's good practice to use try/catch for error handling
    try {
        // Sending the command
        const response = await client.send(command);
        console.log(response);

    } catch (err) {
        console.log(err);
    }
}

main();
