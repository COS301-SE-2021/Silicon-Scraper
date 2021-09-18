import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:silicon_scraper/models/sentiment_model.dart';

class SentimentWidget extends StatefulWidget {
  Sentiment sentiment;

  SentimentWidget(this.sentiment);

  @override
  _SentimentWidgetState createState() => _SentimentWidgetState(sentiment);
}

class _SentimentWidgetState extends State<SentimentWidget> {
  Sentiment sentiment;

  _SentimentWidgetState(this.sentiment);

  @override
  Widget build(BuildContext context)
  {
    return Container(
      margin: EdgeInsets.only(top:20,right:25),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
        Text("${sentiment.type}: ",style:TextStyle(fontWeight: FontWeight.bold))  ,
        LinearPercentIndicator(
            width: 200,
            lineHeight: 15.0,
            percent:(sentiment.value),
            animation:true,animationDuration:2000,
            progressColor: sentiment.polarity? Colors.green : Colors.red,
            center: sentiment.polarity? Text("+${sentiment.value*100}%"):Text("-${sentiment.value*100}%") ,
          ),
        ],
      ),
    );

  }
}
