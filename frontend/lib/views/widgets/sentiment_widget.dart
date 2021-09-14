import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';

class SentimentWidget extends StatefulWidget {
  @override
  _SentimentWidgetState createState() => _SentimentWidgetState();
}

class _SentimentWidgetState extends State<SentimentWidget> {
  @override
  Widget build(BuildContext context)
  {
    return Container(
      margin: EdgeInsets.only(top:20,),
      child: LinearPercentIndicator(
        width: 100.0,
        lineHeight: 8.0,
        percent: 0.9,
        progressColor: Colors.blue,
      ),
    );
  }
}
