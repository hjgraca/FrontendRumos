const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 8080;
const aikey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "fake";
const version = process.env.FRONTEND_VERSION;
const deployedTo = process.env.FRONTEND_ENV;
const apiUrl = process.env.API_SERVICE_HOST + ':' + process.env.API_SERVICE_PORT;
const apiPublicUrl = process.env.API_URL;

const appInsights = require("applicationinsights");
appInsights.setup(aikey).start();

let client = appInsights.defaultClient;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    var username = req.query.username;

    appInsights.defaultClient.trackNodeHttpRequest({request: req, response: res});
    var success = false;
    let startTime = Date.now();

    axios.get('http://' + apiUrl + '/api/users?username=' + username)
   .then(function (response) {
        //console.log(response.data.results);
        let duration = Date.now() - startTime;
        success = true;
        client.trackDependency({dependencyTypeName: "API", name: "Get Users", duration: duration, success: success});

        res.render('home.ejs',{message:"Hello from " + deployedTo + " v: " + version , aikey: aikey, apiUrl: apiPublicUrl, apiData: response.data});
    });
});

console.log(process.env.API_SERVICE_HOST);
console.log(process.env.API_SERVICE_PORT);

let start = Date.now();
app.listen(port, () =>{

    let duration = Date.now() - start;
    appInsights.defaultClient.trackMetric({name: "server startup time", value: duration});

    console.log('Application listening on port 8080!')
});
module.exports = app;
