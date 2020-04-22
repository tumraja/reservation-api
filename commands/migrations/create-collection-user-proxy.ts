import { clientService } from "../../src/services/database.service";
import { config } from "../../config/config";
const assert = require('assert');

function create(client) {
    const db = client.db(config().mongoAtlas.dbname);
    db.createCollection("users_proxy", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["email"],
                properties: {
                    _id: {},
                    email: {
                        bsonType: "string",
                        description: "must be valid email and is required"
                    }
                }
            }
        }
    }, (err, r) => {
        if (r) {
            console.log("collection was created successfull: ");
            console.log(".......processing....");
            console.log("creating index ");
            db.collection('users_proxy').createIndex( { "email" : 1 }, { unique : true }, (err, r) => {
                console.log('done..!');
                client.close()
            })

        } else {
            console.log("Failed to create a collection: ", err);
            client.close();
        }
    });
}

clientService.connect((err, client) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    create(client);
});

