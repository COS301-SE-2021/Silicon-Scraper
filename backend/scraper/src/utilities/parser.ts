

var j = "/web/";
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
 * @return {object}
 */

export const titleParser = (title: string) =>{
    let detailedTitle = title.replace(/,/g,"" ).split(' ')
    let model = ''
    let brand = '';
    const graphics = ["GEFORCE", "RTX", "RX", "RADEON", "AMD", "GTX", "GT" ]
    const cpus = ["RYZEN", "ATHLON", "PENTIUM", "CORE", "A12", "A10", "A8", "A6", "DUAL", "CELERON"]
    const temp = ["A12", "A10", "A8", "A6", "i9", "i5", "i3", "i7"]
    if(detailedTitle[0] == "RYZEN")
        brand = "AMD "
    for (let i = 0; i < detailedTitle.length; i++) {
        if(detailedTitle[i].toUpperCase() === "AMD" && (cpus.some(x => detailedTitle[i+1].toUpperCase().includes(x)) || graphics.some(x => x === detailedTitle[i+1].toUpperCase())))
            brand += detailedTitle[i] + " "
        else if(graphics.some(x => x === detailedTitle[i].toUpperCase()) || cpus.some(x => detailedTitle[i].toUpperCase().includes(x))){
            
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

    //return "2021-01-27"
    return d
}
