import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { CPU } from "./cpu";
import { User } from "./user";

@Entity({name: 'watchlist_cpu', synchronize: false})
export class watchlistCPU {
    @PrimaryColumn('uuid')
    user_id: string;

    @PrimaryColumn('uuid')
    product_id: string;
    
    @ManyToOne(type => User, user => user.id) 
    @JoinColumn({name: 'user_id'})
    public user!: User;

    @ManyToOne(type => CPU, cpu => cpu.id) 
    @JoinColumn({name: 'product_id'})
    public cpu!: CPU;
}