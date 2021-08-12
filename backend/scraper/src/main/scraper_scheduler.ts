import {CronJob} from 'cron';
import {exec} from 'shelljs'

let env = require('../../config')
let cronJob: CronJob;
let cron_time = '0 0,6,12,18 * * *'
cron_time = '* * * * * *'
let dev_script = 'ts-node scraperDbOp.ts'
let prod_script = 'node scraperDbOp.js'
let environment = env.scraper_env

cronJob = new CronJob(cron_time, () => {
    console.log("______Webscraper running______")
    if(environment === dev_script){
        exec('ts-node scraperDbOp.ts')
    }else{
        exec('node scraperDbOp.js')
    }
})

cronJob.start()