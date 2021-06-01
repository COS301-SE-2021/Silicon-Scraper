/*This class contains getters for Evetech css selectors */ 

module.exports.getTitleSelector = ((index) => {
    const titles = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return titles+pad(index)+"_lblName";
})

module.exports.getTableSelector = (() => {return "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products"})

module.exports.getRowSelector = (() => {return "tbody tr"})

module.exports.getLinkSelector = ((index) => {
    const link = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return link + pad(index) + "_HyperLink2"
})

module.exports.getPriceSelector = (() => {return ".price"})

module.exports.getAvailabilitySelector = ((index) => {
    const availability = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return availability+pad(index)+"_lblStatus"
})

module.exports.getImageSelector = ((index) => {
    const imageUrl = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return imageUrl+pad(index)+"_img_pro";
})

const pad = ((num) => {
    return (num<10? '0':'') + num;
})