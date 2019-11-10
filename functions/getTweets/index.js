const azure = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=minitwittercosmosdb;AccountKey=G3OBirvqkI3Ws8PHd5v2cT7PqbqB3i8u5B4xKu3aMDRgTbCbYHeNSD0S9QUeDD1CbAfPQX3osbeKxhYJdgFgog==;TableEndpoint=https://minitwittercosmosdb.table.cosmos.azure.com:443/;";
const tableService = azure.createTableService(connectionString);

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.username) {
        const queryData = () => new Promise((resolve, reject) => {
            let query = new azure.TableQuery();
            tableService.queryEntities('Tweets', query, null, function(error, result, response) {
                if (error) {
                    return reject(error)
                }
                resolve(result)
              });
        })

        queryData()
        .then(result => {
            let unstructuredTweets = []
            result.entries.map(entity => {
                let rowkey = entity.RowKey._;
                let arr = rowkey.split('-')

                unstructuredTweets.push({
                    user: entity.user._,
                    tweet: entity.tweet._,
                    timestamp: entity.Timestamp._,
                    dateId: arr[arr.length -1]
                })
            });
            let structuredTweets = unstructuredTweets.filter(entity => req.body.followed.includes(entity.user) || entity.user === req.body.username);
            structuredTweets.sort((a,b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

            context.res = {
                // status: 200, /* Defaults to 200 */
                status: 200,
                body: {
                    tweets: structuredTweets

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
            body: {
                error: "Some error occurred."
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        context.done();
    }
};