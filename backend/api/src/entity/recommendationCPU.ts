import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { CPU } from "./cpu";

@Entity({ name: 'recommendation_cpu', synchronize: false })
class RecommendationCPU {
    @ManyToOne(type => CPU, cpu => cpu.id, { primary: true, eager: true })
    @JoinColumn({ name: 'product_id' })
    cpu!: CPU

    @ManyToOne(type => CPU, cpu => cpu.id, { primary: true, eager: true })
    @JoinColumn({ name: 'recommended_id' })
    recommended!: CPU;
}

export default RecommendationCPU;