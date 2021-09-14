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
      margin: EdgeInsets.only(top:20,right:25),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
        Text("Price: ",style:TextStyle(fontWeight: FontWeight.bold))  ,
        LinearPercentIndicator(
            width: 200,
            lineHeight: 15.0,
            percent: 0.3,
            animation:true,animationDuration:2000,
            progressColor: Colors.green,
            center: Text("+30%") ,
          ),

      ],
      ),
    );

  }
}
