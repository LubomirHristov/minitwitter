const azure = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=minitwittercosmosdb;AccountKey=G3OBirvqkI3Ws8PHd5v2cT7PqbqB3i8u5B4xKu3aMDRgTbCbYHeNSD0S9QUeDD1CbAfPQX3osbeKxhYJdgFgog==;TableEndpoint=https://minitwittercosmosdb.table.cosmos.azure.com:443/;";
const tableService = azure.createTableService(connectionString);

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const retrieveData = () => new Promise((resolve, reject) => {
        let query = new azure.TableQuery().where('PartitionKey eq ?', 'part1')
        tableService.queryEntities('Users', query, null, function(error, result, response) {
            if (error) {
                return reject(error)
            }
            resolve(result)
          });
    })

    retrieveData()
    .then(result => {
        let users = [];
        result.entries.map(entity => users.push(entity.RowKey._));
        context.res = {
            body: {
                users: users
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        context.done();
    })
    .catch(error => {
        context.res = {
            status: 400,
            body: {
                error: "Some error occurred."
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        context.done();
    })
};