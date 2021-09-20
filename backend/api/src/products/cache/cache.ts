import { CPU } from "../../entity/cpu";
import { GPU } from "../../entity/gpu";

const cache = {};

export function addCache(request: string, products: CPU[] | GPU[]) {
    cache['hello'] = {message: 'there'};
}

export function fetchCache(request: string) {

}
