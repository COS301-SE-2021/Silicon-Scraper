import express, { Router } from "express";
import { RetrieveSentimentRequest} from "../../types/Requests";
import { RetrieveSentimentResponse } from "../../types/Responses";
import jwtUtil from "../../utilities/jwtUtil";
import SentimentService from "../service/sentimentService";


export default class SentimentContoller{

    private readonly router: Router;

    constructor(private readonly sentimentService: SentimentService){
        this.router = Router();
    }

    async retrieveSentiments(request: RetrieveSentimentRequest): Promise<RetrieveSentimentResponse>{
        return await this.sentimentService.retrieveSentiments(request)
    }

    routes(): Router{
       // this.router.use(jwtUtil.verifyToken);
        this.router.post('/', async (req, res, next) =>  {
            res.status(200).json(await this.retrieveSentiments(<RetrieveSentimentRequest>req.body).catch(err => next(err)))

            // await this.retrieveSentiments(<RetrieveSentimentRequest>req.body)
            // res.status(200).send();
        })
        return this.router;
    }


}