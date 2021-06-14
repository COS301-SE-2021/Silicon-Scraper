module.exports.getEveTecUrl =  () => {
    return "https://www.evetech.co.za/";
}

module.exports.getEveTecGpuUrl=  () => {
    return  {
        "urls":["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"],
        "type":"gpu"
        };
}

module.exports.getEveTecCpuUrl=  () => {
    return {
        "urls":["https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx"],
         "type":"cpu"
    };
}

module.exports.getAmpTekUrl = () =>{
    return "https://amptek.co.za/";
}

module.exports.getAmpTekGpuUrl = () =>{
    return {
        "urls":["https://amptek.co.za/product-category/hardware/computer-components/graphic-cards-gpu/?count=36&paged=",
        "https://amptek.co.za/product-category/hardware/computer-components/graphic-cards-gpu/page/2/?count=36"],

        "type":"gpu"
    }
}

module.exports.getAmpTekCpuUrl = () =>{
    return{
        "urls":["https://amptek.co.za/product-category/hardware/computer-components/cpus-processors/?count=36&paged=",
            "https://amptek.co.za/product-category/hardware/computer-components/cpus-processors/page/2/?count=36"],

        "type":"cpu"
    }
}

module.exports.getDreamwareUrl = () =>{
    return "https://www.dreamwaretech.co.za/";
}

module.exports.getDreamwareGpuUrl = () =>{
    return {
        "urls":["https://www.dreamwaretech.co.za/c/graphics-cards-gpus/nvidia-graphics-cards/",
    "https://www.dreamwaretech.co.za/c/graphics-cards-gpus/amd-graphics-cards/",
    "https://www.dreamwaretech.co.za/c/graphics-cards-gpus/workstation-cards/"],

        "type":"gpu"
    }
}

module.exports.getDreamwareCpuUrl = () =>{
    return {
        "urls":["https://www.dreamwaretech.co.za/c/computer-components/processors-cpus/intel-processors/",
    "https://www.dreamwaretech.co.za/c/computer-components/processors-cpus/amd-processors/"],

        "type":"cpu"
    }

}