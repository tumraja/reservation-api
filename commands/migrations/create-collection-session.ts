import { clientService } from "../../src/services/database.service";
import { config } from "../../config/config";
const assert = require('assert');

function create(client) {
    client.db(config().mongoAtlas.dbname).createCollection("sessions", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["userId"],
                properties: {
                    _id: {},
                    userId: {
                        bsonType: "int",
                        description: "must contain int and is required"
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
        client.close()
    });
}

clientService.connect((err, client) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    create(client);
});

