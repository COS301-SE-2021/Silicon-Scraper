import { Entity, PrimaryColumn, Index, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { GPU } from "./gpu";
import { User } from "./user";

@Entity({name: 'watchlist_gpu', synchronize: false})
export class watchlistGPU {
    @ManyToOne(type => User, user => user.id, {primary: true, eager: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(type => GPU, gpu => gpu.id, {primary: true, eager: true})
    @JoinColumn({name: 'product_id'})
    gpu: GPU;
}