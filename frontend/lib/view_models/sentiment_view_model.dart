import 'package:silicon_scraper/injectors/sentiment_service_injector.dart';
import 'package:silicon_scraper/models/sentiment_model.dart';
import 'package:silicon_scraper/views/widgets/sentiment_widget.dart';
import 'package:flutter/material.dart';

class SentimentViewModel
{
  SentimentInjector injector= SentimentInjector();
  List <SentimentWidget> sentiments=[];

  Future getSentiment(String brand,String model)async
  {
    var json=await injector.dependency.SentimentRequest(brand, model);
    for(int i=0;i<json.length;i++)
    {
      sentiments.add(SentimentWidget(Sentiment.fromJSON(json[i])));
    }
    return true;
  }

  Widget sentimentList()
  {
    return Column(
      children:sentiments
    );
  }

}