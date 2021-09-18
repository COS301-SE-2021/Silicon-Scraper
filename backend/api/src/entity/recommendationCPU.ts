import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'recommendation_cpu', synchronize: false })
class RecommendationCPU {
    @PrimaryColumn('uuid')
    id!: string;

    @Column('uuid', {array: true})
    products!: string[];
}

export default RecommendationCPU;