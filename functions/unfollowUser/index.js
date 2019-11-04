const azure = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=minitwittercosmosdb;AccountKey=G3OBirvqkI3Ws8PHd5v2cT7PqbqB3i8u5B4xKu3aMDRgTbCbYHeNSD0S9QUeDD1CbAfPQX3osbeKxhYJdgFgog==;TableEndpoint=https://minitwittercosmosdb.table.cosmos.azure.com:443/;";
const tableService = azure.createTableService(connectionString);

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let entGen = azure.TableUtilities.entityGenerator;

    if (req.body.username) {
        let entity = {
            PartitionKey: entGen.String('part1'),
            RowKey: entGen.String(`${req.body.username}-${req.body.unfollowed}`)
        };

        const deleteData = () => new Promise((resolve, reject) => {
            tableService.deleteEntity('Followers', entity, function(error, result, response) {
                if (error) {
                    return reject(error)
                }
                resolve(result)
              });
        })

        deleteData()
        .then(result => {
            context.res = {
                // status: 200, /* Defaults to 200 */
                status: 200,
                body: {
                    username: req.body.username
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            context.done();
        })
        .catch(error => {
            context.res = {
                // status: 200, /* Defaults to 200 */
                status: 200,
                body: {
                    error: "Some error occurred."
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            context.done();
        })
    }
    else {
        context.res = {
            status: 400,
            body: {error: "Some error occurred."},
            headers: {
                'Content-Type': 'application/json'
            }
        };
        context.done();
    }
};