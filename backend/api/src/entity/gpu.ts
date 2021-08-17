import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({name: 'gpus', synchronize: false})
export class GPU {
    @PrimaryColumn('uuid')
    id!: string;

    @Column()
    image!: string;

    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column()
    price!: number;

    @Column()
    availability!: string;

    @Column()
    retailer!: string;

    @Column('jsonb')
    details!: {};

    @Column()
    type!: string;

    @Column()
    description!: string;

    @Column()
    link!: string;
}