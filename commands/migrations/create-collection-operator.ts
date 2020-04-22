import { clientService } from "../../src/services/database.service";
import { config } from "../../config/config";
const assert = require('assert');

clientService.connect((err, client) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    client.db(config().mongoAtlas.dbname).createCollection("operators", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "country"],
                properties: {
                    _id: {},
                    name: {
                        type: "string",
                        description: "must be a string and is required"
                    },
                    country: {
                        bsonType: "string",
                        description: "must be valid email and is required"
                    },
                    isVerified: {
                        bsonType: "bool",
                        description: "must be boolean and is not required"
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
