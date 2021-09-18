import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { CPU } from "./cpu";
import { User } from "./user";

@Entity({ name: 'watchlist_cpu', synchronize: false })
class WatchlistCPUNew {
    @ManyToOne(type => User, user => user.id, { primary: true, eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(type => CPU, cpu => cpu.id, { primary: true, eager: true })
    @JoinColumn({ name: 'product_id' })
    cpu!: CPU;
}

export default WatchlistCPUNew;