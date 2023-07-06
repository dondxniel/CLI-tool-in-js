#!/usr/bin/env node
const logger = require('../src/logger')('bin')
const arg = require('arg');
const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr')
const start = require('../src/commands/start')

const args = arg({
    '--start': Boolean,
    '--build': Boolean
})

try{
    if(args['--start']){
        const config = getConfig()
        start(config)
    }

    logger.debug('Received args', args)
    
}catch(e) {
    logger.warning(e.message);
    console.log()
    usage()
}

function usage() {
    console.log(`${chalk.whiteBright('tool [CMD]')} 
        ${chalk.greenBright('--start')}\tStarts the app
        ${chalk.greenBright('--build')}\tBuilds the app
    `)
}