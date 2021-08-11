import { Entity, PrimaryColumn, Index, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { CPU } from "./cpu";
import { User } from "./user";

@Entity({name: 'watchlist_cpu', synchronize: false})
@Index(['user', 'cpu'], {unique: true})
export class watchlistCPU {
    @OneToOne(type => User, user => user.id, {primary: true, eager: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(type => CPU, cpu => cpu.id, {primary: true, eager: true})
    @JoinColumn({name: 'product_id'})
    cpu: CPU;
}