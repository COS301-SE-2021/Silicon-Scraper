import {CronJob} from 'cron';
import {exec} from 'shelljs'

let env = require('../../config')
let cronJob: CronJob;
let cron_time = '0 0,6,12,18 * * *'
cron_time = '* * * * * *'
let dev_script = 'ts-node scraperDbOp.ts'
let prod_script = 'node build/main/scraperDbOp.js'
let environment = env.scraper_env

cronJob = new CronJob(cron_time, () => {
    console.log("______Webscraper running______")
    if(environment === dev_script){
        exec(dev_script)
    }else{
        exec(prod_script)
    }
})

cronJob.start()