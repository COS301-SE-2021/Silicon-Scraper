import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CPU } from "./cpu";

@Entity({ name: 'recommendation_cpu', synchronize: false })
class RecommendationCPU {
    @PrimaryColumn('uuid')
    id!: string;

    @OneToMany(type => CPU, cpu => cpu.id,  { eager: true })
    products!: CPU[] ;
}

export default RecommendationCPU;