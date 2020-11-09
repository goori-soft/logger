const logger = require('./index');

const config = {
    message: 'Here is my message to you!',
};
const arr = ['My message', 'My Error'];

//console.log(logger.getNewFilePath());
logger
    .setConfig(config)
    .debug("It's working fine!")
    .err("It's an error message for test.")
    .warn("This is a warning!")
    .mark()
    .log('File size is now ' + logger.getFileSize(true) + ' MB')
    .debug(arr)
    .debug(config);
