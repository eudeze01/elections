/* Amplify Params - DO NOT EDIT
	AUTH_ELECTIONAPP731F1737_USERPOOLID
	ENV
	FUNCTION_ELECTIONAPP731F1737CUSTOMMESSAGE_NAME
	FUNCTION_ELECTIONAPP731F1737POSTCONFIRMATION_NAME
	FUNCTION_ELECTIONAPP731F1737PRESIGNUP_NAME
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
