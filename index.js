const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');

/**
 * Configurações padrão para armaeznar e processar as informações de debug
 */
const config = require('./lib/config');
const { filename } = require('./lib/config');

/***********************************************
Funções estáticas deste componente
***********************************************/

/**
 * Converte uma mensagem de log em uma linha de texto para ser grada em um arquivo
 * @param {String | Array | Object} msg 
 * @param {Object} options 
 * @param {Object} config
 */
const msgToLine = (msg, options, config)=>{
    let line = [];

    if(msg == '..' || msg == '--' || msg == '.' || msg == '-'){
        let mark = '----------------------------------------------------------';
        if(config.mark) mark = config.mark;
        return mark + config.eol + mark;
    }

    line.push(dateFormat());
    let tab = (config.tab) ? config.tab : '    ';
    if(typeof(msg) == 'string'){
        line.push(msg);
    }
    else if(Array.isArray(msg)){
        line.push(msg.join(tab));
    }
    else if(typeof(msg) == 'object'){
        let out = false;
        if(typeof(msg.message) == 'string' || typeof(msg.message) == 'number'){
            line.push(msg.message);
            out = true;
        }

        if(typeof(msg.error) == 'string' || typeof(msg.error) == 'number'){
            line.push(msg.error);
            out= true;
        }

        if(!out){
            line.push('[object] No message in here!');
        }
    }

    return line.join(tab);
}


const logger = {

    /**
     * Reserva o objeto de configuração
     */
    config: {
        filename: null,
        path: null,
        tab: '    ',
        eol: '\n' //end of line string
    },

    state: {
        streamFile: null
    },

    /**
     * Cria uma linha em branco no console
     */
    blank: ()=>{
        console.log('');
    },

    /**
     * Trata um erro de acordo com as configurações de config
     */
    err: (err, options)=>{
        err = '[ERROR] ' + err;
        if(logger.config.debugForConsole) console.error(err);
        if(logger.config.debugForFile) logger.write(err, options); 

        return logger;
    },

    error: (err, options)=>{
        return logger.err(err, options);
    },

    getFilePath: ()=>{
        return path.join(logger.config.path, logger.config.filename);
    },

    /**
     * Retorna o tamanho atual do arquivo de log
     */
    getFileSize: (toMega)=>{
        let filename = logger.getFilePath();
        if(!fs.existsSync(filename)) return 0;

        let stats = fs.statSync(filename);
        let fileSize = stats.size;
        
        if(toMega){
            fileSize = fileSize / (1024*1024);
            fileSize = fileSize.toFixed(4);
        }

        return fileSize;
    },

    /**
     * Retorna a entidade de Stream de arquivo para armazenar o log
     */
    getLogStreamFile: ()=>{
        let filename = logger.getFilePath();
        let fileSize = logger.getFileSize(true);
        if(fileSize > parseFloat(logger.config.fileMaxSize)){
            let newFilename = logger.getNewFilePath();
            fs.renameSync(filename, newFilename);
            logger.state.streamFile = null;
        }

        //Verifica se um stream já existe neste objeto
        if(!logger.state.streamFile || logger.state.streamFile == null){
            //vamos criar um novo streamFile;
            //criando o nome do arquivo;
            let streamFile = fs.createWriteStream(filename, {flags: 'a', encoding: logger.config.encoding});
            logger.state.streamFile = streamFile;
        }

        return logger.state.streamFile;
    },

    /**
     * Cria um novo nome de arquivo para renomear o antigo arquivo de log
     */
    getNewFilePath: ()=>{
        let date = dateFormat('ddmmyyyyHHMMss');
        return path.join(logger.config.path, date + '.' + logger.config.filename);
    },

    /**
     * Imprime uma mensagem na tela
     */
    log: (message, options)=>{
        console.log(message);
        return logger;
    },

    mark: ()=>{
        return logger.debug('--');
    },

    /**
     * Percorre o processo de debug da mensagem,
     * - Imprime na tela se for recomendado;
     * - Grava arquivo de log se for recomendado;
     */
    debug: (message, options)=>{
        if(logger.config.debugForConsole) logger.log(message, options);
        if(logger.config.debugForFile) logger.write(message, options);

        return logger;
    },

    /**
     * Seta informações de configuração
     */
    setConfig: (config)=>{
        for(let i in config){
            logger.config[i] = config[i];
        }
        return logger;
    },

    warn: (msg, options)=>{
        msg = '[WARNING] ' + msg;
        if(logger.config.debugForConsole) console.warn(msg);
        if(logger.config.debugForFile) logger.write(msg, options);

        return logger;
    },

    /**
     * Escreve a mensagem de log em um arquivo edfinido em config
     */
    write: (message, options)=>{
        let line = msgToLine(message, options, logger.config);
        let streamFile = logger.getLogStreamFile();
        streamFile.write(line + logger.config.eol);
        return logger;
    }
};

logger.setConfig(config);

module.exports = logger;