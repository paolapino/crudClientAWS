const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
   // endpoint: "http://192.168.0.177:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    let params = {
        TableName: "clientes",
        KeyConditionExpression: "identificacion = :id and tipo_identificacion = :tipo",
        ExpressionAttributeValues: {
            ":id": parseInt(event.queryStringParameters.identificacion),
            ":tipo": event.queryStringParameters.tipo_identificacion
        }
    };

    docClient.query(params, (err, data) => {
        if(err) {
            console.log(JSON.stringify(err, null, 2));
            callback({
                statusCode: 500,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(err)
            }, null);
        } else {
            callback(null, {
                statusCode: 200,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }
    });
}