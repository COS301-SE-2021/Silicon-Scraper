import { Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { GPU } from "./gpu";

@Entity({ name: 'recommendation_gpu', synchronize: false })
class RecommendationGPU {
    @PrimaryColumn('uuid')
    id!: string;

    @OneToMany(type => GPU, gpu => gpu.id)
    products!: GPU[] ;
}

export default RecommendationGPU;