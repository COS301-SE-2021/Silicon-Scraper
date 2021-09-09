import express, { Router } from "express";
import { RetrieveSentimentRequest} from "../../types/Requests";
import { RetrieveSentimentResponse } from "../../types/Responses";
import jwtUtil from "../../utilities/jwtUtil";
import SentimentService from "../service/sentimentService";



export default class sentimentContoller{

    private router: Router;

    constructor(private readonly sentimentService: SentimentService){
        this.router = Router;
    }

    async retrieveSentiments(request: RetrieveSentimentRequest): Promise<RetrieveSentimentResponse>{
        return await this.sentimentService.retrieveSentiments(request)
    }


}