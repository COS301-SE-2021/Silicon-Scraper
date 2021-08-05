import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Index } from "typeorm";
import { GPU } from "./gpu";
import { User } from "./user";

@Entity({name: 'watchlist_gpu', synchronize: false})
@Index(['user_id', 'product_id'], {unique: true})
export class watchlistGPU {
    @PrimaryColumn('uuid')
    user_id: string;

    @PrimaryColumn('uuid')
    product_id: string;
}