import { getRepository } from "typeorm";
import { CPU } from "../../entity/cpu";
import { GPU } from "../../entity/gpu";
import RecommendationCPU from "../../entity/recommendationCPU";
import RecommendationGPU from "../../entity/recommendationGPU";
import { watchlistCPU } from "../../entity/watchlistCPU";
import { watchlistGPU } from "../../entity/watchlistGPU";

async function getRecommendations(id: string) {
    const recommendations = await fetchRecommendations(id);
    return recommendations;
}

async function fetchRecommendations(id: string) {
    const wl_cpu = await fetchWatchlistCPU(id);
    const wl_gpu = await fetchWatchlistGPU(id);
    const recommendations: GPU[] | CPU[] = [];
    for(let cpu of wl_cpu) {
        const cpus = await fetchCPUs(cpu.products);
        recommendations.push(...cpus);
    }
    for(let gpu of wl_gpu) {
        const gpus = await fetchGPUs(gpu.products);
        recommendations.push(...gpus);
    }
    return recommendations;
}

async function fetchWatchlistCPU(id: string) {
    try {
        return await getRepository(RecommendationCPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistCPU, 'wl_cpu', 'wl_cpu.product_id = recommendation.id')
        .where('wl_cpu.user_id = :user_id', {user_id: id})
        .getMany();
    } catch(error) {
        return [];
    }
}

async function fetchWatchlistGPU(id: string) {
    try {
        return await getRepository(RecommendationGPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistGPU, 'wl_gpu', 'wl_gpu.product_id = recommendation.id')
        .where('wl_gpu.user_id = :user_id', {user_id: id})
        .getMany();
    } catch(error) {
        return [];
    }
}

async function fetchGPUs(productIds: string[]) {
    return await getRepository(GPU).createQueryBuilder('gpus')
    .where('gpus.id IN (:...ids)', {ids: productIds}).getMany();
}

async function fetchCPUs(productIds: string[]) {
    return await getRepository(CPU).createQueryBuilder('cpus')
    .where('cpus.id IN (:...ids)', {ids: productIds}).getMany();
}

const service = {
    getRecommendations
}

export default service;