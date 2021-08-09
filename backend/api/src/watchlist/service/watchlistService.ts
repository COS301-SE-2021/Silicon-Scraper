import { getRepository, Repository } from "typeorm";
import { CPU } from "../../entity/cpu";
import { GPU } from "../../entity/gpu";
import { watchlistCPU } from "../../entity/watchlistCPU";
import { watchlistGPU } from "../../entity/watchlistGPU";
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from "../../types/Requests";
import { RetrieveWatchlistResponse } from "../../types/Responses";

export default class WatchlistService {

    constructor(
        private readonly gpuWatchlistRepository: Repository<watchlistGPU>,
        private readonly cpuWatchlistRepository: Repository<watchlistCPU>
    ) {}

    async addProduct(request: AddProductRequest): Promise<void> {
        if (request.productID === undefined || request.type === undefined)
            throw new Error('Missing parameter(s) in request body');
        try {
            switch (request.type) {
                case 'CPU':
                    const cpu: CPU | undefined = await getRepository(CPU).findOne({
                        where: {
                            id: request.productID
                        }
                    });
                    if (cpu === undefined)
                        throw new Error('Invalid product ID');
                    const watchCPU: watchlistCPU = new watchlistCPU();
                    watchCPU.user_id = request.userID;
                    watchCPU.product_id = request.productID;
                    getRepository(watchlistCPU).save(watchCPU);
                    break;
                case 'GPU':
                    const gpu: GPU | undefined = await getRepository(GPU).findOne({
                        where: {
                            id: request.productID
                        }
                    });
                    if (gpu === undefined)
                        throw new Error('Invalid product ID');
                    const watchGPU: watchlistGPU = new watchlistGPU();
                    watchGPU.user_id = request.userID;
                    watchGPU.product_id = request.productID;
                    getRepository(watchlistGPU).save(watchGPU);
                    break;
                default:
                    throw new Error('Invalid product type');
                    
            }
        }
        catch (error) {
            throw error;
        }
    }

    async retrieveWatchlist(request: RetrieveWatchlistRequest): Promise<RetrieveWatchlistResponse> {
        let cpus: any[];
        let gpus: any[];
        try {
            cpus = await getRepository(watchlistCPU).find({
                where: {
                    user_id: request.userID
                }
            });
            gpus = await getRepository(watchlistGPU).find({
                where: {
                    user_id: request.userID
                }
            });
            
        }
        catch (error) {
            throw error;
        }

        const products: any[] = [];
        products.push(...cpus);
        products.push(...gpus);
        const response: RetrieveWatchlistResponse = <RetrieveWatchlistResponse>{};
        response.products = products;
        return response;
    }

    async removeProduct(request: RemoveProductRequest): Promise<void> {
        if (request.productID === undefined || request.type === undefined || request.userID === undefined)
            throw new Error('Missing parameter(s)');
        switch (request.type) {
            case 'CPU':
                await getRepository(watchlistCPU).delete({
                    product_id: request.productID,
                    user_id: request.userID
                });
                break;
            case 'GPU':
                await getRepository(watchlistGPU).delete({
                    product_id: request.productID,
                    user_id: request.userID
                });
                break;
            default:
                throw new Error('Invalid product type');
        }
    }
}