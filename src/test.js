var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var myResponse = {};
    var config = {
        authentication: {
            options: {
                userName: 'azureuser',
                password: 'bV?]Cz24C8@H+n_q'
            },
            type: 'default'
        },
        server: 'minitwittersqlserver.database.windows.net',
        options: {
            encrypt: true,
            database: 'minitwitterdb'
        }
    };


    context.log('Connecting...');
    var connection = new Connection(config);

    context.log('Connection created.');

    connection.on('connect', function(err){
        context.log('Connected');
        getUsers();
    });

    context.log('Connecting finished.');

    function getUsers(){
        request = new Request("select firstname, surname FROM Users;", function(err){
            if(err){
                context.log('ERROR!');
                context.res = {
                    status: 500,
                    body: "Error executing request: " + (err)
                };
                context.log(err);
                context.done();
            }
        });

        request.on('row', function(columns){
            myResponse = columns[0].value;
            context.log(myResponse);            
        });

        request.on('requestCompleted', function(){
            context.res = {
                status: 200,
                body: "My name is " + (myResponse)
            };
            context.done();
        });

        connection.execSql(request);
    }

    // context.res = {
    //     body: { data: "Hi" },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };
    // context.done();
};