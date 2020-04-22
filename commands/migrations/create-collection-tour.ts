import { clientService } from "../../src/services/database.service";
import { config } from "../../config/config";
const assert = require('assert');

clientService.connect((err, client) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    client.db(config().mongoAtlas.dbname).createCollection("tours", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "type", "description", "price", "duration", "size", "imageUrl", "include", "operatorId"],
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    type: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    description: {
                        bsonType: "string",
                        description: "must be valid email and is required"
                    },
                    price: {
                        bsonType: "string",
                        description: "must contain uppercase, lowercase and special character"
                    },
                    imageUrl: {
                        bsonType: "string",
                        description: "must be string and is required"
                    },
                    include: {
                        bsonType: ["array"],
                        uniqueItems: true,
                        description: "must be string and is required"
                    },
                    duration: {
                        bsonType: "int",
                        description: "must be integer and is required"
                    },
                    size: {
                        bsonType: "int",
                        description: "must be a integer and is required"
                    },
                    operatorId: {
                        bsonType: "int",
                        description: "must be a integer and is required"
                    }
                }
            }
        }
    }, (err, r) => {
        if (r) {
            console.log("collection was created successfull: ");
        } else {
            console.log("Failed to create a collection: ", err);
        }
       client.close();
    });
});
