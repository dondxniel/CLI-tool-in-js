
const logger = require('../logger')('config:mgr');

const {cosmiconfigSync} = require('cosmiconfig')
const configLoader = cosmiconfigSync('tool')

const schema = require('./schema.json');
const Ajv = require('ajv').default
const ajv = new Ajv();

module.exports = function getConfig() {
    const result = configLoader.search(process.cwd())
    // * fetching config from user's working directory
    if(!result) {
        logger.warning('Could not fid configuration, using default.');
        return {port: 1234}
    }
    // * Validating config coming from user's working directory
    const isValid = ajv.validate(schema, result.config);
    if(!isValid){
        logger.warning('Invalid config was supplied.');
        return process.exit(1);
    }

    logger.debug('Found configuration', result.config);
    return result.config
    
}