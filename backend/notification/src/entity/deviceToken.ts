import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity({name: "device_tokens", synchronize: false})
export class deviceToken {
    @PrimaryColumn()
    token: string;

    @OneToOne(type => User, user => user.id) 
    @JoinColumn({name: 'user_id'})
    user: User;
}