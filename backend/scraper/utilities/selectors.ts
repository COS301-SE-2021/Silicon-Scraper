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
    
    //says Add To cart when available and Out of stock when not 
    getAvailabilitySelector(index?: number):any {
        return ".button-container span";
    }

    getImageSelector(index?: number):any {
        return '.abt-single-image > img';
    }

    getLinkSelector(index?: number):any {
        return ".abt-single-image";
    }

    getPriceSelector():any {
        return ".ty-price > bdi";
    }

    getTitleSelector(index?: number):any {
        return ".product-title";
    }

    getTableSelector = () => { //not a table - its a div - iterate through its children to get each component. Also, page number changes
        return "#product_list_page1";
    }

    // not a row - for each of the chlidren of the above div, find item with this class first - if this is not present, its the incorrect child 
    getRowSelector(): any {
        return ".ty-grid-list__item";
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
        return "container > row products";
    }

    getRowSelector(): any {//not a row but the class each child of the above div needs to be a part of - this is because after every couple of children, theres a child thats not a product
        return ".col-md-4";
    }
}

let evetechSelector: Selectors = new EvetechSelectors("Evetech")
let pclinkSelector: Selectors = new PclinkSelectors("Pclink")
let dreamwareSelector: Selectors = new DreamwareSelectors("Dreamware")
let selectorsArray: Selectors[] = [evetechSelector, pclinkSelector,dreamwareSelector ]

module.exports = {
    selectorsArray
}
