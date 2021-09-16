import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'recommendation_gpu', synchronize: false })
class RecommendationGPU {
    @PrimaryColumn('uuid')
    id!: string;

    @Column('uuid', {array: true})
    products!: string[];
}

export default RecommendationGPU;