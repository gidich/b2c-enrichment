import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import winston from 'winston';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({

          })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
  // data: true, // optional: control whether you want to log the data about the response (default to true)
   //expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  // colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));


app.get('/', (req: Request, res: Response) => {
  /// read the request querystring name parameter into a variable named name
  const name = req.query.name;
  const dataRequested = req.query.dataRequested
  console.log(`Hello ${name}!`);
  console.log(`dataRequested ${dataRequested}!`);
  if(dataRequested == 'pathways'){
    res.json({ pathways: `Hello ${name}!`, count:22, data: {applicantStatus: 'authorized', step2CSExam: '02-JAN-22'} });
  }else{
    res.json({ gender: `Hello ${name}!`, count:22, data: {name: 'test', age: 22} });
  }
  
  
  //res.send('Express + TypeScript Server22');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});