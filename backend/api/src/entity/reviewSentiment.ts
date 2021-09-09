import { Entity, Column} from "typeorm";

@Entity({name: 'review_sentiment', synchronize: false})
export class ReviewSentiment{
    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column({
        name: 'characteristics',
        type: 'jsonb',
        default: () => "'{}'",
        nullable: false,
    })
    characteristics!: any;

}