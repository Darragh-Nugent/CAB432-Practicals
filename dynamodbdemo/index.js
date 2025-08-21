require("dotenv").config();
const DynamoDB = require("@aws-sdk/client-dynamodb");
const DynamoDBLib = require("@aws-sdk/lib-dynamodb");

const qutUsername = "n11547227@qut.edu.au";
const tableName = "n11547227-kitties";
const sortKey = "name";

async function main() {
   const client = new DynamoDB.DynamoDBClient({ region: "ap-southeast-2" });
   const docClient = DynamoDBLib.DynamoDBDocumentClient.from(client);

   // Create a new table
   command = new DynamoDB.CreateTableCommand({
      TableName: tableName,
      AttributeDefinitions: [
         {
            AttributeName: "qut-username",
            AttributeType: "S",
         },
         {
            AttributeName: sortKey,
            AttributeType: "S", // Setting the sort key to String type
         },
      ],
      KeySchema: [
         {
            AttributeName: "qut-username",
            KeyType: "HASH",
         },
         {
            AttributeName: sortKey,
            KeyType: "RANGE",
         },
      ],
      ProvisionedThroughput: {
         ReadCapacityUnits: 1,
         WriteCapacityUnits: 1,
      },
   });

   // Send the command to create the table
   try {
      const response = await client.send(command);
      console.log("Create Table command response:", response);
   } catch (err) {
      console.log(err);
   }

   // Put an object
   command = new DynamoDBLib.PutCommand({
      TableName: tableName,
      Item: {
         "qut-username": qutUsername,
         [sortKey]: "Boots",
         colour: "black and white",
      },
   });

   // Send the command to put an item
   try {
      const response = await docClient.send(command);
      console.log("Put command response:", response);
   } catch (err) {
      console.log(err);
   }

   // Get an object
   command = new DynamoDBLib.GetCommand({
      TableName: tableName,
      Key: {
         "qut-username": qutUsername,
         [sortKey]: "Boots",
      },
   });

   // Send the command to get an item
   try {
      const response = await docClient.send(command);
      console.log("Item data:", response.Item);
   } catch (err) {
      console.log(err);
   }

   // Query
   command = new DynamoDBLib.QueryCommand({
      TableName: tableName,
      KeyConditionExpression:
         "#partitionKey = :username AND begins_with(#sortKey, :nameStart)",
      ExpressionAttributeNames: {  
         "#partitionKey": "qut-username",
         "#sortKey": sortKey,
      },
      ExpressionAttributeValues: {
         ":username": qutUsername,
         ":nameStart": "Boo",
      },
   });

   // Send the command to run a query
   try {
      const response = await docClient.send(command);
      console.log("Query found these items: ", response.Items);
   } catch (err) {
      console.log(err);
   }
}

main();
