import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({name: 'reviewSentiment', synchronize: false})
export class ReviewSentiment{
    @PrimaryColumn()
    brand!: string;

    @PrimaryColumn()
    model!: string;

    @Column("jsonb", {
     array: true
    })
    characteristics!: any [];

}