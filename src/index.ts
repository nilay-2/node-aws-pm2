import express, {Express, NextFunction, Request, Response} from "express";
import schedule from 'node-schedule'
import moment from 'moment'
import { ApiResponse } from "./types";
import morgan from "morgan";
import axios from 'axios'

const port = 5000;

const app: Express = express()

app.use(express.json())
app.use(morgan('dev'))


// const rule = new schedule.RecurrenceRule();
// rule.second = new schedule.Range(0, 59, 10);


// const job = schedule.scheduleJob(rule, () => {
//     console.log(moment().format('LL'))
    
//     console.log("File executed successfully")
// });

const apiUrl = "http://localhost:5000/logs"; // Assuming this API is hosted locally on the same port

app.get("/logs", (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(moment().utc().utcOffset('+05:30').format('LL'), moment().utc().utcOffset('+05:30').format('hh:mm:ss'))
        console.log(":::::::::::ENTER IN LOGS SERVICE::::::::::::")
        const {body} = req

        const data: ApiResponse = {
            accountNUmber: 'xxxxxx34343',
            bankName: 'UNION BANK OF INDIA',
            beneNameMatchScore: 98
        }

        console.log(data)

        // throw {message: "something went wrong"}

        res.status(200).json({
            message: 'success',
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Service error occured",
            errorMessage: (error as Error).message,
            error
        })
    }
})

setInterval(() => {
    console.log('loading....')
    axios.get(apiUrl)
        .then(response => {
            console.log("API response:", response.data);
            // Handle the response data here (like logging or processing it)
        })
        .catch(error => {
            console.error("Error while calling /logs API:", error.message);
            // Optionally handle the error or retry the request
        });
}, 60000); // Run every 60 seconds (1 minute)


app.listen(port, () => {
    console.log(`App running on port ${port}`)
})