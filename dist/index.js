"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = __importDefault(require("winston"));
const entity_list_json_1 = __importDefault(require("./entity-list.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console({})
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    // data: true, // optional: control whether you want to log the data about the response (default to true)
    //expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    // colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));
app.get('/', (req, res) => {
    /// read the request querystring name parameter into a variable named name
    const name = req.query.name;
    const dataRequested = req.query.dataRequested;
    console.log(`Hello ${name}!`);
    console.log(`dataRequested ${dataRequested}!`);
    if (dataRequested == 'pathways') {
        res.json({ pathways: `Hello ${name}!`, count: 22, data: { applicantStatus: 'authorized', step2CSExam: '02-JAN-22' } });
    }
    else {
        res.json({ gender: `Hello ${name}!`, count: 22, data: { name: 'test', age: 22 } });
    }
    //res.send('Express + TypeScript Server22');
});
app.get('/entities', (req, res) => {
    const entities = getAllEntities();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(entities);
});
app.get('/entities/search', (req, res) => {
    console.log(req.query);
    const searchCriteria = req.query.searchCriteria;
    console.log(searchCriteria);
    const entities = searchEntities(searchCriteria);
    console.log(entities);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(entities);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
function getAllEntities() {
    const entityListFeed = entity_list_json_1.default;
    return entityListFeed.entities;
}
function searchEntities(searchCriteria) {
    const entities = getAllEntities();
    const filteredEntities = entities.filter(entity => entity.name.toUpperCase().includes(searchCriteria.toUpperCase()));
    return filteredEntities;
}
