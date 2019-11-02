const azure = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=minitwittercosmosdb;AccountKey=G3OBirvqkI3Ws8PHd5v2cT7PqbqB3i8u5B4xKu3aMDRgTbCbYHeNSD0S9QUeDD1CbAfPQX3osbeKxhYJdgFgog==;TableEndpoint=https://minitwittercosmosdb.table.cosmos.azure.com:443/;";
const tableService = azure.createTableService(connectionString);

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if(req.body.username){
        const retrieveData = () => new Promise((resolve, reject) => {
            tableService.retrieveEntity('Users', 'part1', req.body.username, function(error, result, response) {
                if (error) {
                    return reject(error)
                }
                resolve(result)
              });
        })

        retrieveData()
        .then(result => {
            if(req.body.password === result.password._){
                context.res = {
                    status: 200,
                    body: {
                        username: req.body.username
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                context.done();
            }else{
                context.res = {
                    status: 200,
                    body: {
                        error: "Invalid credentials"
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                context.done();
            }
        })
        .catch(error => {
            context.res = {
                status: 200,
                body: {
                    error: "Invalid credentials"
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            context.done();
        })
    }else{

    }
};