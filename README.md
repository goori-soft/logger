# logger
Simple debug tool

## Instalação
Para instalar a ferramenta entre com o seguinte comando no terminal
```
$ npm install @goori-soft/logger
```

## Configurações
Para inicializar a ferramenta em seu projeto:
```javascript
const logger = require('@goori-soft/logger');
logger
    .debug('This is a test message!')
    .error('This is an error message!');
```

Um objeto de configuração pode ser fornecido para o logger:
```javascript
const config = {
    debugForFile: true,
    filename: 'mylog.log',
    path: './myfolder'
};

const logger = require('@goori-soft/logger');

logger
    .setConfig(config)
    .debug('This message is now registred on the log file!');
```
## Variáveis de ambiente
As configurações podem ser feitas através de variáveis de ambiente. A tabela a seguir exibe as variáveis de ambiente disponíveis para configuração da ferramenta.

| Ambiente | Código | Padrão | Observações |
| --- | --- | --- | --- |
| LOG_FILENAME | filename | logger.log | String |
| LOG_PATH | path | . | String |
| LOG_FILEMAXSIZE | fileMaxSize | 1 | MB, este valor não é estritamente confiável | 
| LOG_ENCODING | encoding | utf8 | String |
| LOG_TAB | tab | "   " | String |
| LOG_DEBUG_CONSOLE | debugForConsole | true | Boolean |
| LOG_DEBUG_FILE | debugForFile | true | Boolean |
| LOG_MARK | mark | "--" | String |

## Autor e contato
Autor: Lucas Machado Rodrigues

Goori Soft Studio

daumgrito@goori.com.br