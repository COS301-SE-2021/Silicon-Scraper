import { CPU } from "../../entity/cpu";
import { GPU } from "../../entity/gpu";

let cache = {};

export function addCache(request: string, products: CPU[] | GPU[]) {
    cache[request] = products;
    setTimeout(() => { cache = {}; }, 60000)
}

export function fetchCache(request: string) {
    return cache[request];
}
