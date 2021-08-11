import { Entity, PrimaryColumn, Index, OneToOne, JoinColumn } from "typeorm";
import { GPU } from "./gpu";
import { User } from "./user";

@Entity({name: 'watchlist_gpu', synchronize: false})
@Index(['user', 'gpu'], {unique: true})
export class watchlistGPU {
    @OneToOne(type => User, user => user.id, {primary: true, eager: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(type => GPU, gpu => gpu.id, {primary: true, eager: true})
    @JoinColumn({name: 'product_id'})
    gpu: GPU;
}