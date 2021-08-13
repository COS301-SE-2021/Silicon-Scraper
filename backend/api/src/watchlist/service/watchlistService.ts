import { getRepository, Repository } from "typeorm";
import { CPU } from "../../entity/cpu";
import { GPU } from "../../entity/gpu";
import { watchlistCPU } from "../../entity/watchlistCPU";
import { watchlistGPU } from "../../entity/watchlistGPU";
import { ProductNotFound, RequestError } from "../../types/CustomErrors";
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from "../../types/Requests";
import { RetrieveWatchlistResponse } from "../../types/Responses";

export default class WatchlistService {

    constructor(
        private readonly gpuWatchlistRepository: Repository<watchlistGPU>,
        private readonly cpuWatchlistRepository: Repository<watchlistCPU>,
        private readonly cpuRepository: Repository<CPU>,
        private readonly gpuRepository: Repository<GPU>
    ) {}

    async addProduct(request: AddProductRequest): Promise<void> {
        if (request.productID === undefined || request.type === undefined || request.userID === undefined)
            throw new RequestError();
        switch (request.type.toUpperCase()) {
            case 'CPU':
                const cpu: CPU | undefined = await this.cpuRepository.findOne({
                    where: {
                        id: request.productID
                    }
                });
                if (cpu === undefined)
                    throw new ProductNotFound();
                const watchCPU: watchlistCPU = new watchlistCPU();
                watchCPU.user_id = request.userID;
                watchCPU.product_id = request.productID;
                this.cpuWatchlistRepository.save(watchCPU);
                break;
            case 'GPU':
                const gpu: GPU | undefined = await this.gpuRepository.findOne({
                    where: {
                        id: request.productID
                    }
                });
                if (gpu === undefined)
                    throw new ProductNotFound();
                const watchGPU: watchlistGPU = new watchlistGPU();
                watchGPU.user_id = request.userID;
                watchGPU.product_id = request.productID;
                this.gpuWatchlistRepository.save(watchGPU);
                break;
            default:
                throw new RequestError('Invalid product type');
                
        }
    }

    async retrieveWatchlist(request: RetrieveWatchlistRequest): Promise<RetrieveWatchlistResponse> {
        if (request.userID === undefined)
            throw new RequestError();
        let cpus: any[];
        let gpus: any[];
        cpus = []
        cpus = await this.cpuRepository.createQueryBuilder("cpu")
        .innerJoinAndSelect(watchlistCPU, "wcpu", "wcpu.product_id = cpu.id")
        .getMany();

        gpus = await this.gpuRepository.createQueryBuilder("gpu")
        .innerJoinAndSelect(watchlistGPU, "wgpu", " wgpu.product_id = gpu.id")
        .getMany();
        const products: any[] = [];
        products.push(...cpus);
        products.push(...gpus);
        products.map((product) => {
            product.watch = true;
        });
        const response: RetrieveWatchlistResponse = <RetrieveWatchlistResponse>{};
        response.products = products;
        return response;
    }

    async removeProduct(request: RemoveProductRequest): Promise<void> {
        if (request.productID === undefined || request.type === undefined || request.userID === undefined)
            throw new RequestError();
        switch (request.type.toUpperCase()) {
            case 'CPU':
                await this.cpuWatchlistRepository.delete({
                    product_id: request.productID,
                    user_id: request.userID
                });
                break;
            case 'GPU':
                await this.gpuWatchlistRepository.delete({
                    product_id: request.productID,
                    user_id: request.userID
                });
                break;
            default:
                throw new RequestError('Invalid product type');
        }
    }
}