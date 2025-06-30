import winston from "winston";
import morgan from "morgan";



const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        stream: { write: (message) => console.log(message.trim()) },
    }
);

export  {logger,morganMiddleware};
