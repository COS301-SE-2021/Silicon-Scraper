import 'package:silicon_scraper/views/widgets/sentiment_widget.dart';

class SentimentViewModel
{
  List <SentimentWidget> sentiments=[];

  Future getSentiment()async
  {
    await Future.delayed(Duration(seconds: 4));

  }

}