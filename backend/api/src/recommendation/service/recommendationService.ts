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
        hashed_recommendations[cpu.recommended.id] = cpu.recommended;
    }
    for(let gpu of wl_gpu) {
        hashed_recommendations[gpu.recommended.id] = gpu.recommended;
    }
    for(let product in hashed_recommendations) {
        recommendations.push(hashed_recommendations[product]);
    }
    return recommendations;
}

async function fetchWatchlistCPU(id: string) {
    try {
        return await getRepository(RecommendationCPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistCPU, 'wl_cpu', 'wl_cpu.product_id = recommendation.product_id')
        .where('wl_cpu.user_id = :user_id', {user_id: id})
        .getMany();
    } catch(error) {
        return [];
    }
}

async function fetchWatchlistGPU(id: string) {
    try {
        return await getRepository(RecommendationGPU).createQueryBuilder('recommendation')
        .innerJoinAndSelect(watchlistGPU, 'wl_gpu', 'wl_gpu.product_id = recommendation.product_id')
        .where('wl_gpu.user_id = :user_id', {user_id: id})
        .getMany();
    } catch(error) {
        return [];
    }
}

const service = {
    getRecommendations,
    fetchRecommendations,
    fetchWatchlistCPU,
    fetchWatchlistGPU
}

export default service;