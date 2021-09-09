import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({name: 'review_sentiment', synchronize: false})
export class ReviewSentiment{
    @Column()
    brand!: string;

    @Column()
    model!: string;



}