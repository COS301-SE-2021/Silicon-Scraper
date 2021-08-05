import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({name: 'users', synchronize: false})
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    hash: string;
}