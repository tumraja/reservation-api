import { clientService } from "../../src/services/database.service";
import { config } from "../../config/config";
const assert = require('assert');

function create(client) {
    client.db(config().mongoAtlas.dbname).createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email", "password", "age"],
                properties: {
                    _id: {},
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
                    bookings: {
                        bsonType: ["array"],
                        uniqueItems: true,
                        items: {
                            bsonType: ["object"],
                            required: ["tourId", "email", "from", "to", "comment"],
                            additionalProperties: false,
                            description: "'items' must contain the stated fields.",
                            properties: {
                                _id: {},
                                tourId: {
                                    bsonType: "int",
                                    description: "tour id is required"
                                },
                                email: {
                                    bsonType: "string",
                                    description: "must be valid email and is required"
                                },
                                from: {
                                    bsonType: "date",
                                    description: "must be valid date and is required"
                                },
                                to: {
                                    bsonType: "date",
                                    description: "must be valid date and is required"
                                },
                                comment: {
                                    bsonType: "string",
                                    description: "comment field is required"
                                }
                            }
                        }
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

