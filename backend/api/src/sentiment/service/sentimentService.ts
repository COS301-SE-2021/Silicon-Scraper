import { ReviewSentiment } from "../../entity/reviewSentiment"
import {RetrieveSentimentRequest } from "../../types/Requests";
import { RetrieveSentimentResponse } from "../../types/Responses";
import { getRepository, Repository } from "typeorm";
import {RequestError} from "../../types/CustomErrors";


export default class SentimentService{
    constructor(
        private readonly sentimentRepository: Repository<ReviewSentiment>
    ){}

    async retrieveSentiments(request: RetrieveSentimentRequest): Promise<RetrieveSentimentResponse>{
        let sentiments: {}

        sentiments = await this.sentimentRepository.createQueryBuilder('review_sentiment')
            .where({model:request.model, brand:request.brand}).select(['characteristics'])
            .getOne();

    }

}
