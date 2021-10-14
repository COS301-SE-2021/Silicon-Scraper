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
    const hashed_recommendations = {};
    for(let cpu of wl_cpu) {
        hashed_recommendations[cpu.id] = cpu;
    }
    for(let gpu of wl_gpu) {
        hashed_recommendations[gpu.id] = gpu;
    }
    for(let product in hashed_recommendations) {
        recommendations.push(hashed_recommendations[product]);
    }
    return recommendations;
}

async function fetchWatchlistCPU(id: string) {
    try {
        const cpus = await getRepository(RecommendationCPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistCPU, 'wl_cpu', 'wl_cpu.cpu.id = recommendation.cpu.id')
        .where('wl_gpu.user_id = :user_id', {user_id: id})
        .getRawMany();

        const cpu_ids: string[] = []
        for(let cpu of cpus) {
            cpu_ids.push(cpu.recommendation_recommended_id);
        }

        return await fetchCPU(cpu_ids);
    } catch(error) {
        return [];
    }
}

async function fetchWatchlistGPU(id: string) {
    try {
        const gpus = await getRepository(RecommendationGPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistGPU, 'wl_gpu', 'wl_gpu.product_id = recommendation.gpu.id')
        .where('wl_gpu.user_id = :user_id', {user_id: id})
        .getRawMany();

        const gpu_ids: string[] = []
        for(let gpu of gpus) {
            gpu_ids.push(gpu.recommendation_recommended_id);
        }
        
        return await fetchGPU(gpu_ids);
    } catch(error) {
        return [];
    }
}

async function fetchGPU(productIds: string[]) {
    return await getRepository(GPU).createQueryBuilder('gpus')
    .where('gpus.id IN (:...ids)', {ids: productIds}).getMany();
}

async function fetchCPU(productIds: string[]) {
    return await getRepository(CPU).createQueryBuilder('cpus')
    .where('cpus.id IN (:...ids)', {ids: productIds}).getMany();
}

const service = {
    getRecommendations,
    fetchRecommendations,
    fetchWatchlistCPU,
    fetchWatchlistGPU
}

export default service;