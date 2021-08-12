import {CronJob} from 'cron';
import {exec} from 'shelljs'

let env = require('../../config')
let cronJob: CronJob;
let cron_time = '0 0,6,12,18 * * *'
cron_time = '* * * * * *'
let dev_script = 'ts-node scrape.ts'
let prod_script = 'node build/main/scrape.js'
let environment = env.scraper_env

cronJob = new CronJob(cron_time, () => {
    console.log("______Webscraper running______")
    console.log(environment)
    if(environment === "dev"){
        exec(dev_script)
    }else if (environment === "prod"){
        exec(prod_script)
    }
})

cronJob.start()