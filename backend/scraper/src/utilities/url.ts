
export const getSiliconWebUrl = () => {
    return {
        urls:["https://siliconweb.herokuapp.com/"],
        "type":"gpu"
    };

}

export const getEveTecUrl =  () => {
    return "https://www.evetech.co.za/";
}

export const getEveTecGpuUrl=  () => {
    return  {
        urls:["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"],
        "type":"gpu"
        };
}

export const getEveTecCpuUrl=  () => {
    return {
        urls:["https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx"],
         "type":"cpu"
    };
}

export const getAmpTekUrl = () =>{
    return "https://amptek.co.za/";
}

export const getAmpTekGpuUrl = () =>{
    return {
        urls:["https://amptek.co.za/product-category/hardware/computer-components/graphic-cards-gpu/?count=36&paged=",
        "https://amptek.co.za/product-category/hardware/computer-components/graphic-cards-gpu/"],

        "type":"gpu"
    }
}

export const getAmpTekCpuUrl = () =>{
    return{
        urls:["https://amptek.co.za/product-category/hardware/computer-components/cpus-processors/?count=36&paged=",
            "https://amptek.co.za/product-category/hardware/computer-components/cpus-processors/page/2/?count=36"],

        "type":"cpu"
    }
}

export const getDreamwareUrl = () =>{
    return "https://www.dreamwaretech.co.za/";
}

export const getDreamwareGpuUrl = () =>{
    return {
        urls:["https://www.dreamwaretech.co.za/c/graphics-cards-gpus/nvidia-graphics-cards/",
    "https://www.dreamwaretech.co.za/c/graphics-cards-gpus/amd-graphics-cards/",
    "https://www.dreamwaretech.co.za/c/graphics-cards-gpus/workstation-cards/"],

        "type":"gpu"
    }
}

export const getDreamwareCpuUrl = () =>{
    return {
        urls:["https://www.dreamwaretech.co.za/c/computer-components/processors-cpus/intel-processors/",
    "https://www.dreamwaretech.co.za/c/computer-components/processors-cpus/amd-processors/"],

        "type":"cpu"
    }

}