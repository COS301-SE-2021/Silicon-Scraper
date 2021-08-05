import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { GPU } from "./gpu";
import { User } from "./user";

@Entity({name: 'watchlist_gpu', synchronize: false})
export class watchlistGPU {
    @PrimaryColumn('uuid')
    user_id: string;

    @PrimaryColumn('uuid')
    product_id: string;
    
    @ManyToOne(type => User, user => user.id) 
    @JoinColumn({name: 'user_id'})
    public user!: User;

    @ManyToOne(type => GPU, gpu => gpu.id) 
    @JoinColumn({name: 'product_id'})
    public gpu!: GPU;
}