/*This class contains getters for Evetech css selectors */ 

const getTitleSelector = ((index) => {
    const titles = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return titles+pad(index)+"_lblName";
})

const getTableSelector = () => {return "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products"}

const getRowSelector = () => {return "tbody tr"}

const getLinkSelector = ((index) => {
    const link = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return link + pad(index) + "_HyperLink2"
})

const getPriceSelector = (() => {return ".price"})

const getAvailabilitySelector = ((index) => {
    const availability = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return availability+pad(index)+"_lblStatus"
})

const getImageSelector = ((index) => {
    const imageUrl = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
    return imageUrl+pad(index)+"_img_pro";
})

const pad = ((num) => {
    return (num<10? '0':'') + num;
})

module.exports = {
    getLinkSelector,
    getAvailabilitySelector,
    getImageSelector,
    getPriceSelector,
    getTableSelector,
    getTitleSelector,
    getRowSelector
}