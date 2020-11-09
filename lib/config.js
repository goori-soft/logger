const dotenv = require('dotenv');
dotenv.config();

const config = {
    //about the lig file
    filename: process.env.LOG_FILENAME ? process.env.LOG_FILENAME: 'logger.log',
    path: process.env.LOG_PATH ?  process.env.LOG_PATH : '.',
    encoding: process.env.LOG_ENCODING ? process.env.LOG_ENCODING : 'utf8',
    tab: process.env.LOG_TAB ? process.env.LOG_TAB : '    ',
    eol: '\n',
    fileMaxSize: process.env.LOG_FILEMAXSIZE ? process.env.LOG_FILEMAXSIZE : '0.0007', //MB

    //about the debug tool
    debugForConsole: process.env.LOG_DEBUG_CONSOLE ? process.env.LOG_DEBUG_CONSOLE : true,
    debugForFile: process.env.LOG_DEBUG_FILE ? process.env.LOG_DEBUG_FILE : true,

    //
    mark: process.env.LOG_MARK ? process.env.LOG_MARK : '----------------------------------------------------------',
};


module.exports = config;