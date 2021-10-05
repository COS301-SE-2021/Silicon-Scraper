import {Page, Browser} from 'puppeteer'

export const stubPuppeteer = {
    launch() {
        return Promise.resolve(stubBrowser)
    }
} as unknown as any

export const stubBrowser = {
    newPage() {
        return Promise.resolve(stubPage)
    },
    close() {
        return Promise.resolve()
    }
} as unknown as Browser

export const stubPage = {
    goto(url: string) {
        return Promise.resolve()
    },
    content() {
        return Promise.resolve('')
    }

} as unknown as Page
