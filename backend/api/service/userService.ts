import {Product} from "../routes/product";

//TO DO: Insert this data into a database

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