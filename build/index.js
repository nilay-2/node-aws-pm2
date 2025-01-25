"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
const port = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// const rule = new schedule.RecurrenceRule();
// rule.second = new schedule.Range(0, 59, 10);
// const job = schedule.scheduleJob(rule, () => {
//     console.log(moment().format('LL'))
//     console.log("File executed successfully")
// });
app.get("/logs", (req, res, next) => {
    try {
        console.log((0, moment_1.default)().format('LL'), (0, moment_1.default)().format('hh:mm:ss'));
        console.log(":::::::::::ENTER IN LOGS SERVICE::::::::::::");
        const { body } = req;
        const data = {
            accountNUmber: 'xxxxxx34343',
            bankName: 'UNION BANK OF INDIA',
            beneNameMatchScore: 98
        };
        console.log(data);
        // throw {message: "something went wrong"}
        res.status(200).json({
            message: 'success',
            data
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Service error occured",
            errorMessage: error.message,
            error
        });
    }
});
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
