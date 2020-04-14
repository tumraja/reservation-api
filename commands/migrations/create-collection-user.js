"use strict";
exports.__esModule = true;
var database_service_1 = require("../../app/services/database.service");
database_service_1.clientService.connect();
database_service_1.clientService.db().createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "password", "age"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "must be valid email and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must contain uppercase, lowercase and special character"
                },
                age: {
                    bsonType: "int",
                    description: "must be a int and is required"
                },
                id: {
                    bsonType: "int"
                }
            }
        }
    }
});
database_service_1.clientService.close();
