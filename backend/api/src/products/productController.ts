import express from "express";
import { getRepository } from "typeorm";
import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { addCache, fetchCache } from "./cache/cache";
import fetchData from "./repo";

interface Response {
    products: any[]
}

interface RetailerResponse {
    retailers: string[]
}

/**
 * @param {*} req 
 * @param {*} res 
 * @description Finds the product in the database with the id value specified in request.
 */
const getProductByID = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const response: Response = {products: []};
    if(req.query.userId) {
        let data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description, watch from 
        (select * from gpus union all select * from cpus) as tbl left join
        (select product_id as watch from (select * from watchlist_gpu union all select * from watchlist_cpu) as wl 
        where wl.user_id = '${req.query.userId}') as watchlist on tbl.id = watchlist.watch where id = '${id}'`);
        data.forEach((x) => {
            if(x.watch === null)
                x.watch = false;
            else 
                x.watch = true;
        })
        response.products = data;
    }
    else {
        let data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description from (select * from gpus union all select * FROM cpus) AS tbl WHERE id = '${id}'`);
        response.products = data;
    }
    res.status(200).json(response);
}

/**
 * @param {*} req 
 * @param {*} res 
 * @description Searches db for key included in request object. 
 * Page number and Limit number can be specified to increase or decrease the number of products returned.
 */
const search = async (req: express.Request, res: express.Response) => {
    const query = req.query;
    const queryObj = {
        key: '',
        page: 1,
        limit: 20
    };

    const result: any[] = [];
    const response: Response = {products: []};
    if(query.key && query.key !== '') {
        query.key = query.key.toString().toLowerCase();
        if(query.userId) {
            const data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description, watch from 
                (select * from (select * from gpus union all select * from cpus) as tbl
                where concat(lower(tbl.brand),' ',lower(tbl.model)) like '%${query.key}%') as res left join 
                (select product_id as watch from (select * from watchlist_gpu union all select * from watchlist_cpu) as wl 
                where wl.user_id = '${query.userId}') as wl2 on wl2.watch = res.id`);
            data.forEach((x) => {
                if(x.watch === null)
                    x.watch = false;
                else 
                    x.watch = true;
            })
            response.products = data;
        } 
        else {
            const data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description from 
            (select * from gpus union all select * from cpus) as tbl
            where concat(lower(tbl.brand),' ',lower(tbl.model)) like '%${query.key}%'`);
            response.products = data;
        }
    }
    res.status(200).json(response);
}

/**
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @description Fetches products from the database. Default GPU but can specify type as either cpu or gpu.
 * Page number and Limit number can be specified to increase or decrease the number of products returned.
 */
const getProducts = async (req: express.Request, res: express.Response) => {
    const query = req.query;
    const values = ['gpus', 1, 20];

    let cacheKey = 'products';

    let response: Response = {products: []};
    let table = '(select * from gpus union all select * from cpus)';
    if(query.type) {
        switch(query.type.toString().toLowerCase()) {
            case 'gpu':
                cacheKey = 'gpu';
                table = '(select * from gpus)';
                break;
            case 'cpu':
                cacheKey = 'cpu';
                table = '(select * from cpus)';
                break;
            default:
                break;
        }
    }
    if(query.userId) {
        const data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description, watch from ${table} as tbl 
        left join (select product_id as watch from (select * from watchlist_cpu union all select * from watchlist_gpu)
        as wl where wl.user_id = '${query.userId}') as watchlist on tbl.id = watchlist.watch`);
        data.forEach((x) => {
            if(x.watch === null)
                 x.watch = false;
            else 
                x.watch = true;
        })
        response.products = data;
    }
    else {
        const cache = fetchCache(cacheKey);
        if(cache) {
            response.products = cache;
        }
        else {
            const data = await fetchData(`select id, brand, model, image, price, availability, retailer, link, type, description from 
            ${table} as tbl`);            
            response.products = data;
            addCache(cacheKey, data);
        }
    }
    res.status(200).json(response);
}

const getRetailers = async (req: express.Request, res: express.Response) => {
    const response: RetailerResponse = { retailers: [] };
    const gpus = getRepository(GPU);
    let result = await gpus.createQueryBuilder('gpu').select('gpu.retailer').distinct(true).getRawMany();
    for(let retailer of result) {
        response.retailers.push(retailer.gpu_retailer);
    }
    res.status(200).json(response);
}

export const controllers = {
    getProducts,
    search,
    getProductByID,
    getRetailers
}