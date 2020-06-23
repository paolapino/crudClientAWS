const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
   // endpoint: "http://192.168.0.177:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    let body = JSON.parse(event.body);
    let identificacion=event.queryStringParameters.identificacion;
    let tipo_identificacion= event.queryStringParameters.tipo_identificacion;

    let params = {
        TableName: "clientes",
        Key: {
            "identificacion": parseInt(identificacion, 10),
            "tipo_identificacion": tipo_identificacion
        },
        UpdateExpression: "set edad = :edad, nombres = :nombres, apellidos = :apellidos, ciudad_nacimiento = :ciudad_nacimiento",
        ExpressionAttributeValues: {
            ":edad": parseInt(body.edad, 10),
            ":nombres": body.nombres,
            ":apellidos": body.apellidos,
            ":ciudad_nacimiento": body.ciudad_nacimiento
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
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