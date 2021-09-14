"use strict";
const axios = require("axios");

const { builder } = require("./sources/fantasypros");

module.exports.getplayerdatajobs = async (event) => {
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(
    //         {
    //             message:
    //                 "Go Serverless v1.0! Your function executed successfully!",
    //             input: event,
    //         },
    //         null,
    //         2
    //     ),
    // };
    // const { data } = await axios.get(
    //     "https://www.fantasypros.com/nfl/adp/overall.php"
    // );
    await await builder();
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "hey",
            },
            null,
            2
        ),
    };
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
