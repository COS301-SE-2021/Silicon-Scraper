export abstract class Selectors {
    constructor(ret:string) {
        this.retailer = ret;
    }

    retailer: string

    abstract getLinkSelector(index?: number): any

    abstract getAvailabilitySelector(index?: number): any

    abstract getImageSelector(index?: number): any

    abstract getPriceSelector(): any

    abstract getTitleSelector(index?: number): any

    abstract getTableSelector(): any

    abstract getRowSelector(): any

}


/*This class contains getters for Evetech css selectors */

const pad = ((num: number) => {
    return (num<10? '0':'') + num;
})

class EvetechSelectors extends Selectors {

    constructor(ret:string) {
        super(ret);
    }


    getTitleSelector = ((index: number) => {
        const titles = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
        return titles+pad(index)+"_lblName";
    })

    getLinkSelector = ((index: number) => {
        const link = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
        return link + pad(index) + "_HyperLink2"
    })

    getPriceSelector = () => {return ".price"}

    getAvailabilitySelector = ((index: number) => {
        const availability = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
        return availability+pad(index)+"_lblStatus"
    })

    getImageSelector = ((index: number) => {
        const imageUrl = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
        return imageUrl+pad(index)+"_img_pro";
    })

    getTableSelector = () => {return "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products"}

    getRowSelector = () => {return "tbody tr"}

}

class PclinkSelectors extends Selectors {
    constructor(ret:string) {
        super(ret);
    }

    getAvailabilitySelector(index?: number):any {
        return undefined;
    }

    getImageSelector(index?: number):any {
        return undefined;
    }

    getLinkSelector(index?: number):any {
        return undefined;
    }

    getPriceSelector():any {
        return undefined;
    }

    getTitleSelector(index?: number):any {
        return undefined;
    }

    getTableSelector = () => {
        return undefined;
    }

    getRowSelector(): any {
        return undefined;
    }

}

class RebalgamingSelectors extends Selectors {
    constructor(ret:string) {
        super(ret);
    }

    getAvailabilitySelector(index?: number):any {
        return undefined;
    }

    getImageSelector(index?: number):any {
        return undefined;
    }

    getLinkSelector(index?: number):any {
        return undefined;
    }

    getPriceSelector():any {
        return undefined;
    }

    getTitleSelector(index?: number):any {
        return undefined;
    }

    getTableSelector = () => {
        return undefined;
    }

    getRowSelector(): any {
        return undefined;
    }
}

let evetechSelector: Selectors = new EvetechSelectors("Evetech")
let pclinkSelector: Selectors = new PclinkSelectors("Pclink")
let rebalgamingSelector: Selectors = new RebalgamingSelectors("Rebalgaming")
let selectorsArray: Selectors[] = [evetechSelector, pclinkSelector,rebalgamingSelector  ]

module.exports = {
    selectorsArray
}
