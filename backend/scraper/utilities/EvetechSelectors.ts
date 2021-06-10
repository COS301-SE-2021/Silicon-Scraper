// /*This class contains getters for Evetech css selectors */
// import * as Selectors from './selectors';
//
// const pad = ((num: number) => {
//     return (num<10? '0':'') + num;
// })
//
// class EvetechSelectors extends Selectors {
//
//     constructor() {
//         super();
//         console.log("Made and Evetech selector ")
//     }
//
//      getTitleSelector = ((index: number) => {
//         const titles = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
//         return titles+pad(index)+"_lblName";
//     })
//
//      getLinkSelector = ((index: number) => {
//         const link = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
//         return link + pad(index) + "_HyperLink2"
//     })
//
//      getPriceSelector = () => {return ".price"}
//
//      getAvailabilitySelector = ((index: number) => {
//         const availability = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
//         return availability+pad(index)+"_lblStatus"
//     })
//
//      getImageSelector = ((index: number) => {
//         const imageUrl = "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products_ctl"
//         return imageUrl+pad(index)+"_img_pro";
//     })
//
//     getTableSelector = () => {return "#ctl00_ContentPlaceHolder1_Component_List_V2_IDs1_dl_products"}
//
//     getRowSelector = () => {return "tbody tr"}
//
// }
//
// module.exports = EvetechSelectors
