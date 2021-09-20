import { Url } from "url";
import { getAmd, getSapphire, getNvidia, getIntel } from "./url";

var j = "/web/";
let url = require("../utilities/url");
/**
 * This function concatenates the given url to the base url of the specific Website
 * @param urlRES
 * @returns {string}
 */
export const concatUrl = (urlRES: string | undefined, baseUrl: string) =>{
    if(urlRES !== undefined) {
        let base = urlRES.split('../')[1]

        if(base !== undefined) {
            base = baseUrl + base;
            return base
        }else if(urlRES.includes(j)){
            return "https://web.archive.org"+urlRES;
        } else {
            let base1 = urlRES.split('/p/')[1]
            if(base1 !== undefined) {
                base1 = baseUrl + "/p/" + base1
                return base1
            }
        }

        return urlRES;
    }else{
        return url.getEveTecUrl()
    }


}


/**
 * This function changes a given price to the desired format 
 * @param price 
 * @returns 
 */
export const trimPrice = (price: string) =>{

    let price_ = price.split('\n')[0].split('R')[1];
    if(price_ !== undefined ){
        return parseFloat(price.split('\n')[0].split('R')[1].replace(",", ""));
    }else{
        return price_
    }
}

/**
 * get the name , model and brand from the title
 * \\R
 *
 *
 *
 * @return {object} type: {brand: string, model: string} : Object
 */

export const titleParser = (title: string) =>{
    let detailedTitle = title.replace(/,/g,"" ).split(' ')
    let model = ''
    let brand = '';
    const graphics = ["GEFORCE", "QUADRO", "RTX", "RX", "RADEON", "AMD", "GTX", "GT" , "NITRO+"]
    const cpus = ["RYZEN", "ATHLON", "PENTIUM", "CORE", "A12", "A10", "A8", "A6", "DUAL", "CELERON"]
    const temp = ["A12", "A10", "A8", "A6", "i9", "i5", "i3", "i7"]

    if(detailedTitle[0] == "RYZEN")
        brand = "AMD "

    detailedTitle.forEach((item, index) => {
        if(item.toUpperCase() === "SAPPHIRE") {
            detailedTitle.splice(index, 1)
            brand = "Sapphire "
        }

        if(item.toUpperCase().includes("NITRO")){
            detailedTitle.splice(index, 1)
            detailedTitle.unshift(item)
            
        }

        if(item.includes("Intel")){
            let pos = detailedTitle.indexOf("Core")
            if(pos != -1 && pos > index+1){
                detailedTitle.splice(pos, 1)
                detailedTitle.splice(index+1, 0, "Core")
            }else if (pos == -1 && temp.some(x => model.toUpperCase().includes(x.toUpperCase()))) detailedTitle.splice(index+1, 0, "Core")
        }
    })


    for (let i = 0; i < detailedTitle.length; i++) {
        if(detailedTitle[i].toUpperCase() === "AMD" && (cpus.some(x => detailedTitle[i+1].toUpperCase().includes(x)) || graphics.some(x => x === detailedTitle[i+1].toUpperCase())))
            brand += detailedTitle[i] + " "
        else if(graphics.some(x => detailedTitle[i].toUpperCase().includes(x)) || cpus.some(x => detailedTitle[i].toUpperCase().includes(x) && !detailedTitle[i+1].toUpperCase().includes("RADEON")) ){
            
            for (let k = i ; k< detailedTitle.length && !detailedTitle[k].includes("..."); k++){
                if(temp.some(x => x.toUpperCase() === detailedTitle[k].toUpperCase())){
                    model += " " + detailedTitle[k] + "-" + detailedTitle[k+1]
                    k = k+1
                }else
                    model += " " + detailedTitle[k]
            }
            break;
        }else{
            brand += detailedTitle[i] + " "
        }

    }

    let mod = model.substring(1)

    for(let x in graphics){
        if(mod.includes(graphics[x]) && mod[graphics[x].length+1] != " "){
            //mod = mod.replace(graphics[x], " ")
            let str_before = mod.substring(0, mod.indexOf(graphics[x]) + graphics[x].length).trim()
            
            let str_after = mod.substring(mod.indexOf(graphics[x]) + graphics[x].length).trim()
            let str = str_before + " " + str_after
            model = str
            // mod = model.slice(model.indexOf(graphics[x]), graphics[x].length+1 ) + " " + model.slice(graphics[x].length+1)
            // model = mod
            break;
        }
    }

    if(brand === "") brand = "Gigabyte "

    let detailedTitleObj = {
        'brand' : brand.slice(0,-1), //detailedTitle[0],
        'model' : model.trim()
    }
    return detailedTitleObj
}

/**
 * This function classifies a given string into 'In stock' or 'Out of Stock'
 * @param availability 
 * @returns type: string
 */
export const availability = (availability:string) => {
    if(availability.includes("In Stock") || availability.includes("add")){
        return "In Stock"
    }else{
        return "Out of Stock"
    }
}

export const date = (d:string)=>{
    return d
}

/** 
* This function creates a url to a specific products page on its manufacturers website given its brand name and model name 
* @param brand
* @param model
* @return type: {url: string, manufacturer: string}
*/

export const manufacturerUrl: any = (brand: string, model: string) => {
    model = model.trim()
    brand = brand.trim()
    if (brand == "Sapphire"){
        return getUrlObject(sapphireUrl(model), 'sapphire')

    } else if (model.toUpperCase().includes("RADEON") || model.toUpperCase().includes("RYZEN") || model.includes("RX")){
        
        return getUrlObject(amdUrl(model), 'amd')

    }else if (brand === "Intel"){

        return getUrlObject(intelUrl(model), 'intel')

    }else if(model.includes("RTX") || model.includes("GTX") || model.includes("GT") || model.toLocaleLowerCase().includes("quadro") || brand.toLocaleLowerCase() === "nvidia"){

        return getUrlObject( nvidiaUrl(model), 'nvidia')
    }
    else return getUrlObject()
}

const getUrlObject = (url = '', manufacturer = '') => {
    return {
        url: url,
        manufacturer: manufacturer
    }
}


/**
 * This function creates urls for products manufacturered by Sapphire using the products model name
 * @param model 
 * @returns {url} type: string
 */
const sapphireUrl = (model: string) => {
    model = model.replace(/\+/g, '')
    let modelSplit = model.split(' ')
    let change = false

    modelSplit = removeWord("AMD", modelSplit)
    modelSplit.forEach((item, index) => {
        
        if(!isNaN(+item) && +item < 6000){
            change = true
        }

        if(item.includes("GB")){
            modelSplit[index] = modelSplit[index].slice(0,-1)
        } 
        
        if(item.includes('GDDR')){
            if(change == true) {
                modelSplit[index] = modelSplit[index].replace('DDR', '')
            }
            modelSplit.splice(index+1, modelSplit.length-(index+1))
        }
    })

    if(change) {
        modelSplit = removeWord("RADEON", modelSplit)
    }

    url = getSapphire().urls + modelSplit.join('-').toLowerCase()

    return url
}


/**
 * This function creates urls for products manufacturered by Amd using the products model name
 * @param model 
 * @returns {url} type: string
 */
const amdUrl = (model: string) => {
    let cpu = model.toUpperCase().includes("RYZEN")
    let modelSplit = model.split(' ')
    let add = false
    let rad = false
    let url = ""


    modelSplit.forEach((item, index) => {
        let extra = item.toUpperCase().includes("XT")

        if(!isNaN(+item) && +item >5000){
            add = true
        }

        if(cpu == true){
            let sliced = +(item.slice(0,-1))
            if( (!isNaN(sliced) && sliced != 0) || item.toUpperCase().includes("WX") ){
                modelSplit.splice(index+1, modelSplit.length-(index+1))
            }
            if((model.includes("PRO") && !model.includes("Threadripper")) || (sliced > 5000 && item.slice(item.length-1) === "G")){
                url = getAmd().urls[3]
            }else url = getAmd().urls[1]
            add = true

        }else if(extra == true || (!isNaN(+item) && modelSplit[index+1].toUpperCase().includes("XT") == false) ){
                modelSplit.splice(index+1, modelSplit.length-(index+1))
                if(model.toUpperCase().includes("PRO")){
                    url = getAmd().urls[2]
                    add = false
                }else url = getAmd().urls[0]

                if(!model.includes("Radeon")){
                    rad = true 
                }
        }

    })
    
    if(rad){
        modelSplit.unshift("Radeon")
    }
    if(modelSplit[0] !== "AMD" && add) {
        modelSplit.unshift("AMD")
    }

    url += modelSplit.join('-').toLowerCase()

    return url
}

/**
 * This function creates urls for products manufacturered by Nvidia using the products model name
 * @param model 
 * @returns {url} type: string
 */
const nvidiaUrl = (model: string) => {
    let modelSplit = model.split(' ')
    let url = getNvidia().urls[0]
    let extra = ["TI", "SUPER"]
    let workstation = ["QUADRO P", "QUADRO G", "NVIDIA T"]
    let addDouble = false

    if(model.includes("GTX 10")){
        return ""//getNvidia().urls[3]
    }else if(model.includes("GT 7") || model.includes("GT 10")){
        return ""
    }
    if(model.includes("RTX 30")){
        url += "30-series/"
        addDouble = true
    }else if(model.toUpperCase().includes("QUADRO RTX")){
        modelSplit = removeWord("QUADRO", modelSplit)
        url = getNvidia().urls[1] 
        url = !model.includes("RTX A")? url+  "quadro/": url 
    }else if (workstation.some(x => model.toUpperCase().includes(x))){
        url = getNvidia().urls[2]
        return ""
    }

    if(modelSplit[0].toUpperCase() == "GEFORCE"){
        modelSplit.shift()
    }

    modelSplit.forEach((item, index) => {
        if( extra.some(x => item.toUpperCase().includes(x)) || (!isNaN(+item) && !extra.some(x => modelSplit[index+1] === undefined || modelSplit[index+1].toUpperCase().includes(x))) || item.slice(0,1) === "A"){
            modelSplit.splice(index+1, modelSplit.length-(index+1))
        }
    })

    if(addDouble == true && !modelSplit.some(x => x.includes("3090")) ){
        let pos = modelSplit.length-1
        if(modelSplit[pos].toUpperCase() === "TI"){
            modelSplit[pos] = modelSplit[pos-1]+modelSplit[pos]
        }else{
            modelSplit[pos] = modelSplit[pos] + "-" + modelSplit[pos]+"ti"
        }
    }

    return (url + modelSplit.join('-').toLowerCase())
  
}

/**
 * This function creates urls for products manufacturered by Intel using the products model name
 * @param model 
 * @returns {url} type: string
 */
const intelUrl = (model: string) => {
    let modelSplit = model.split(' ')//model.replace(/ /g, '%20')
    let extra = ["Skylake", "Quad", "Gold"]

    modelSplit.forEach((item, index) => {
        if(extra.some(x => item.includes(x))){
            modelSplit.splice(index+2, modelSplit.length-(index+2))
        }else if(item.includes('-') && (!modelSplit[index+1].includes("Skylake") || !modelSplit[index+1].includes("Quad"))){
            modelSplit.splice(index+1, modelSplit.length-(index+1))
        }
    })

    let url = getIntel().urls + modelSplit.join('%20') + "&t=Specifications"
    return url
}

/**
 * This is a helper function that removes a specified word from an array then shifts the remaining elements to cover up the gap
 * @param word 
 * @param arr 
 * @returns {Array} type: string[]
 */
const removeWord = (word: string, arr:string[]) => {
    arr.forEach((item, index) => {
        if(item.toUpperCase() == word ) {
            arr.splice(index, 1)
            return index
        }
    })

    return arr
}

// let title = titleParser("MSI RX 6900 XT 16GB Top Gaming")
// console.log(title)
// console.log(manufacturerUrl(title.brand, title.model))

/**
 * This function aids with filtering the description and drawing out the needed data, whilst adding consistency
 * to the description object
 *
 * @param descriptions
 * @param manufacturer
 * @returns {description} type: {[k: string]: any}
 */
export const getDescriptions = (descriptions: string [], manufacturer:string) => {
   // console.log(descriptions, manufacturer)
    let descriptionObj: {[k: string]: any} = { }

    descriptions.forEach((item) => {
        let itemSplitArray = item.split("//")
        if (itemSplitArray.length > 1) {
            let key:string = itemSplitArray[0]

            if(itemSplitArray.length > 2){
                let tiValue = itemSplitArray[1]
                let nonetiValue = itemSplitArray[2]

                // Differentiate between ti and ~ti
                //possible solution to include the ti in the manufacture type
                if(manufacturer.includes("ti")){
                    descriptionObj[key] = tiValue
                }else{
                    descriptionObj[key] = nonetiValue
                }
            }else{
                descriptionObj[key] = itemSplitArray[1]
            }
        }
    })

    return descriptionObj
}

// const title = titleParser('MSI Radeon RX 580 Gaming X 8GB')
// console.log(title)
// console.log(manufacturerUrl(title.brand, title.model))