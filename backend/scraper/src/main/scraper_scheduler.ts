import {CronJob} from 'cron';
import {exec} from 'shelljs'

let cronJob: CronJob;
let cron_time = '0 0,6,12,18 * * *'
cron_time = '* * * * * *'

cronJob = new CronJob(cron_time, () => {
    console.log("______Webscraper running______")
    exec('npm start')
})

cronJob.start()