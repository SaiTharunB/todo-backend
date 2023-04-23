const AWS=require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region:process.env.aws_region,
    accessKeyId:process.env.aws_access_key_id,
    secretAccessKey:process.env.aws_secret_access_key,
    sessionToken:process.env.aws_session_token,
})

const dbClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME="todo"

const getTasks = async(userId) =>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            userId
        }
    };
    const todoList= await dbClient.get(params).promise().then(resp=>{
        return resp;
    }).catch(err=>console.error(err));
    ;
    return todoList;
}


const updateTasks = async(item) =>{
    const params={
        TableName:TABLE_NAME,
        Item:item
    };
    return await dbClient.put(params).promise();
}

module.exports ={
    dbClient,
    updateTasks,
    getTasks,
}


