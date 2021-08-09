import { randomUUID } from "crypto";
import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";

@Entity({name: 'users', synchronize: false})
export class User {
    @PrimaryColumn('uuid')
    id!: string;

    @Column()
    username!: string;

    @Column()
    hash!: string;

    @BeforeInsert() 
    generate() {
        this.id = randomUUID();
    }
}