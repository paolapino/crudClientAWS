const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
   // endpoint: "http://192.168.0.177:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    let identificacion=event.queryStringParameters.identificacion;
    let tipo_identificacion= event.queryStringParameters.tipo_identificacion;

    let params = {
        TableName: "clientes",
        Key: {
            "identificacion": parseInt(identificacion, 10),
            "tipo_identificacion": tipo_identificacion
        }
    };

    docClient.delete(params, (err, data) => {
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