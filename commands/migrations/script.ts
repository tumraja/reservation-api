const yargs = require('yargs');

const argv = yargs.command('collection', '-- Used to create a collection', {
        name: {
            description: '-- Name of the collection',
            alias: 'n',
            type: 'string',
        }
    })
    .usage("collection name=collection_name")
    .argv;

console.log(argv._.includes('lyr'));