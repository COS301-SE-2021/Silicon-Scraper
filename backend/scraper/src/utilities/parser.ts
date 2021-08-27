import { getAmd, getSapphire, getNvidia } from "./url";

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
 * @return {object}
 */

export const titleParser = (title: string) =>{
    let detailedTitle = title.replace(/,/g,"" ).split(' ')
    let model = ''
    let brand = '';
    const graphics = ["GEFORCE", "RTX", "RX", "RADEON", "AMD", "GTX", "GT" , "NITRO+"]
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
    })


    for (let i = 0; i < detailedTitle.length; i++) {
        if(detailedTitle[i].toUpperCase() === "AMD" && (cpus.some(x => detailedTitle[i+1].toUpperCase().includes(x)) || graphics.some(x => x === detailedTitle[i+1].toUpperCase())))
            brand += detailedTitle[i] + " "
        else if(graphics.some(x => x === detailedTitle[i].toUpperCase()) || cpus.some(x => detailedTitle[i].toUpperCase().includes(x) && !detailedTitle[i+1].toUpperCase().includes("RADEON")) ){
            
            for (let k = i ; k< detailedTitle.length && !detailedTitle[k].includes("..."); k++){
                if(temp.some(x => x === detailedTitle[k])){
                    model += " " + detailedTitle[k] + "-" + detailedTitle[k+1]
                    k = k+2
                }else
                    model += " " + detailedTitle[k]
            }
            break;
        }else{
            brand += detailedTitle[i] + " "
        }

    }

    if(brand === "") brand = "Gigabyte "

    let detailedTitleObj = {
        'brand' : brand.slice(0,-1), //detailedTitle[0],
        'model' : model.substring(1)
    }
    return detailedTitleObj
}

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

export const manufacturerUrl = (brand: string, model: string) => {
    if (brand == "Sapphire"){
        return sapphireUrl(model)
    } else if (model.includes("Radeon") || model.includes("Ryzen")){
        return amdUrl(model)
    }else return nvidiaUrl(model)
}

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



const amdUrl = (model: string) => {
    let modelSplit = model.split(' ')
    let add = false

    modelSplit.forEach((item, index) => {
        let extra = item.toUpperCase().includes("XT")

        if(!isNaN(+item) && +item >5000){
            add = true
        }

        if(extra == true || (!isNaN(+item) && modelSplit[index+1].toUpperCase().includes("XT") == false) ){
            modelSplit.splice(index+1, modelSplit.length-(index+1))
        }
    })
    
    if(modelSplit[0] !== "AMD" && add) {
        modelSplit.unshift("AMD")
    }

    let url = getAmd().urls + modelSplit.join('-').toLowerCase()
    return url
}

const nvidiaUrl = (model: string) => {

}

const removeWord = (word: string, arr:string[]) => {
    arr.forEach((item, index) => {
        if(item.toUpperCase() == word ) {
            arr.splice(index, 1)
            return index
        }
    })

    return arr
}

let title = titleParser("Gigabyte AMD Radeon Vega Frontier Edition Liquid-cooled 16GB HBM2 Graphics Card")
console.log(title)
console.log(manufacturerUrl(title.brand, title.model))