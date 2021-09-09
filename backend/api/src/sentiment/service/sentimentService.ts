import { ReviewSentiment } from "../../entity/reviewSentiment"
import {RetrieveSentimentRequest } from "../../types/Requests";
import { RetrieveSentimentResponse } from "../../types/Responses";
import { getRepository, Repository } from "typeorm";


export default class SentimentService{
    constructor(
        private readonly sentimentRepository: Repository<ReviewSentiment>
    ){}
}
