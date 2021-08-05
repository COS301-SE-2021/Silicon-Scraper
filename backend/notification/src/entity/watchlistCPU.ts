import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Index } from "typeorm";
import { CPU } from "./cpu";
import { User } from "./user";

@Entity({name: 'watchlist_cpu', synchronize: false})
@Index(['user_id', 'product_id'], {unique: true})
export class watchlistCPU {
    @PrimaryColumn('uuid')
    user_id: string;

    @PrimaryColumn('uuid')
    product_id: string;
}