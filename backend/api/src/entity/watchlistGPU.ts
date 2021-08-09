import { Entity, PrimaryColumn, Index } from "typeorm";

@Entity({name: 'watchlist_gpu', synchronize: false})
@Index(['user_id', 'product_id'], {unique: true})
export class watchlistGPU {
    @PrimaryColumn('uuid')
    user_id!: string;

    @PrimaryColumn('uuid')
    product_id!: string;
}