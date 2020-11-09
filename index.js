const config ={
    filename: 'logger.log',
    path: '.',
    tab: '    ',
};

const logger = {

    /**
     * Reserva o objeto de configuração
     */
    config: {},

    /**
     * Trata um erro de acordo com as configurações de config
     */
    err: (err)=>{
        logger.log(err);
    },

    /**
     * Imprime uma mensagem na tela
     */
    log: (message, options)=>{

    },

    /**
     * Percorre o processo de debug da mensagem,
     * - Imprime na tela se for recomendado;
     * - Grava arquivo de log se for recomendado;
     */
    debug: (message, options)=>{
        logger.log(message, options);
        logger.write(message, options);
    },

    /**
     * Seta informações de configuração
     */
    setConfig: (config)=>{

    },

    /**
     * Escreve a mensagem de log em um arquivo edfinido em config
     */
    write: (message, options)=>{

    }
};

module.export = logger;