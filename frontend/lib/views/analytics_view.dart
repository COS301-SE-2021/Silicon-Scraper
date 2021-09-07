import 'package:flutter/material.dart';
import 'package:silicon_scraper/views/widgets/line_chart_widget.dart';

class AnalyticsView extends StatelessWidget
{
  @override
  Widget build(BuildContext context)
  {
    return Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(35.0),
          child: AppBar(
            // Here we take the value from the MyHomePage object that was created by
            // the App.build method, and use it to set our appbar title.
            title: Container(
//              padding: EdgeInsets.only(bottom:15) ,
                child: Text("Analytics",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)
            ),
            centerTitle: true,
          ),
        ),
      body: LineChart(),
    );
  }
}
