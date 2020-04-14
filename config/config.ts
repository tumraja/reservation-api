const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

export const config = () => {
   try {
     return yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'enviroment.yaml')));
   } catch(e) {
       console.log('error reading yaml file: ', e);
   }
} 