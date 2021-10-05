import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { GPU } from "./gpu";

@Entity({ name: 'recommendation_gpu', synchronize: false })
class RecommendationGPU {
    @ManyToOne(type => GPU, gpu => gpu.id, { primary: true, eager: true })
    @JoinColumn({ name: 'product_id' })
    gpu!: GPU

    @ManyToOne(type => GPU, gpu => gpu.id, { primary: true, eager: true })
    @JoinColumn({ name: 'recommended_id' })
    recommended!: GPU;
}

export default RecommendationGPU;