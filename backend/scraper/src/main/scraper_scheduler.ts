import {CronJob} from 'cron';
import {exec} from 'shelljs'

let cronJob: CronJob;

cronJob = new CronJob('0 0,6,12,18 * * *', () => {
    console.log("______Webscraper running______")
    exec('node start')
})