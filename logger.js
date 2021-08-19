const winston = require('winston');

const colours = {
  info: 'blue',
  bar: 'green',
  warn: 'yellow',
  error: 'red',
};

winston.addColors(colours);

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './logs/error-log.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/log.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      humanreadableUnhandledException: true,
      colorize: true,
    }),
  );
}

module.exports = logger;
