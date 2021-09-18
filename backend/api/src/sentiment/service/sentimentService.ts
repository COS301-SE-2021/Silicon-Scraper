import { ReviewSentiment } from "../../entity/reviewSentiment"
import {RetrieveSentimentRequest } from "../../types/Requests";
import {RetrieveSentimentResponse} from "../../types/Responses";
import {Repository} from "typeorm";

export default class SentimentService{
    constructor(
        private readonly sentimentRepository: Repository<ReviewSentiment>
    ){}

    async retrieveSentiments(request: RetrieveSentimentRequest): Promise<RetrieveSentimentResponse>{

        let sentiments = await this.sentimentRepository.createQueryBuilder("reviewSentiment")
            .where(":model like '%' || reviewSentiment.model || '%'", {model: request.model} )
            .andWhere("reviewSentiment.brand = :brand", {brand: request.brand})
            .getOne()

        const response: RetrieveSentimentResponse = <RetrieveSentimentResponse>{};
        response.sentiments = sentiments?.characteristics || [];
        return response;

    }

}
