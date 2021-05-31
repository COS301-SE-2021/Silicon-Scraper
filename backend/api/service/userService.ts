import {Product} from "../routes/product";

export class UserService {

    private products: Product[] = []

    addToWatchList(req) {
        const product = {
            "id": 1,
            "brand": "",
            "model": "",
            "url": "",
            "img": "",
            "description": "",
            "retailer": "",
            "price": 0,
            "availability": 1
        };

        this.products.push(product);

    }
}