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

    getBaseUrl() : string {
        return "https://www.evetech.co.za/"
    }

}

class SiliconwebSelectors extends Selectors {

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

    getBaseUrl() : string {
        return "https://www.evetech.co.za/"
    }

}

class AmpTekSelectors extends Selectors {
    constructor(ret:string) {
        super(ret);
    }
    
    //says Add To cart when available and Out of stock when not 
    getAvailabilitySelector = ((index?: number) => {
        return ".add-links-wrap > div > a";
    })

    getImageSelector(index?: number):any {
        return '.product-image > a > div > img.wp-post-image';
    }

    getLinkSelector(index?: number):any {
        return ".product-image > a ";
    }

    getPriceSelector():any {
        return ".price > span > bdi";
    }

    getTitleSelector(index?: number):any {
        return ".product-loop-title > h3";
    }

    getTableSelector = () => { //not a table - its a div - iterate through its children to get each component. Also, page number changes
        return "#content > div.archive-products";
    }

    // not a row - for each of the chlidren of the above div, find item with this class first - if this is not present, its the incorrect child 
    getRowSelector(): any {
        return "ul";
    }

    getBaseUrl() : string {
        return "https://amptek.co.za/"
    }
}

class DreamwareSelectors extends Selectors {
    constructor(ret:string) {
        super(ret);
    }

    getAvailabilitySelector(index?: number):any {//Says I Stock with Supplier when in stock 
        return ".prod-availability";
    }

    getImageSelector(index?: number):any {
        return ".product-image img";
    }

    getLinkSelector(index?: number):any {
        return ".product-image > a";
    }

    getPriceSelector():any {// returns "from R300".
        return ".product-price";
    }

    getTitleSelector(index?: number):any {
        return ".product-box-name";
    }

    getTableSelector = () => {// not a table - its a div - iterate through each child 
        return "body > div.categories-content > div > div > div.col-md-9 > div > div";
    }

    getRowSelector(): any {//not a row but the class each child of the above div needs to be a part of - this is because after every couple of children, theres a child thats not a product
        return ".col-md-4";
    }

    getBaseUrl() : string {
        return "https://www.dreamwaretech.co.za/"
    }
}

const evetechSelector: Selectors = new EvetechSelectors("Evetech")
const amptekSelector: Selectors = new AmpTekSelectors("Amptek")
const dreamwareSelector: Selectors = new DreamwareSelectors("Dreamware")
const siliconwebSelector: Selectors = new SiliconwebSelectors("Siliconweb")
export const selectorsArray: Selectors[] = [evetechSelector, amptekSelector,dreamwareSelector, siliconwebSelector ]