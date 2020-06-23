const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
 //   endpoint: "http://192.168.0.177:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    let body = JSON.parse(event.body);

    let params = {
        TableName: "clientes",
        Item:{
            "identificacion": parseInt(body.identificacion),
            "tipo_identificacion": body.tipo_identificacion,
            "edad": parseInt(body.edad),
            "nombres": body.nombres,
            "apellidos": body.apellidos,
            "ciudad_nacimiento": body.ciudad_nacimiento
        }
        
    };

    docClient.put(params, (err, data) => {
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