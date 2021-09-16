import { getRepository } from "typeorm";
import RecommendationCPU from "../../entity/recommendationCPU";
import RecommendationGPU from "../../entity/recommendationGPU";
import { watchlistCPU } from "../../entity/watchlistCPU";
import { watchlistGPU } from "../../entity/watchlistGPU";

async function getRecommendations(id: string) {
    const [wl_cpu, wl_gpu] = await fetchUserWatchlist(id);
    return {};
}

async function fetchUserWatchlist(id: string) {
    const wl_cpu = await fetchWatchlistCPU(id);
    const wl_gpu = await fetchWatchlistGPU(id);
    return [wl_cpu, wl_gpu];
}

async function fetchWatchlistCPU(id: string) {
    return await getRepository(watchlistCPU).createQueryBuilder('wl_cpu')
    .innerJoinAndSelect(RecommendationCPU, 'recommendation', 'wl_cpu.product_id = recommendation.id')
    .where('wl_cpu.user_id = :id', { id: id })
    .getMany();
}

async function fetchWatchlistGPU(id: string) {
    return await getRepository(watchlistGPU).createQueryBuilder('wl_gpu')
    .innerJoinAndSelect(RecommendationGPU, 'recommendation', 'wl_gpu.product_id = recommendation.id')
    .where('wl_gpu.user_id = :id', { id: id })
    .getMany();
}

const service = {
    getRecommendations
}

export default service;