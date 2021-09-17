import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/sentiment_view_model.dart';
import 'package:silicon_scraper/views/widgets/line_chart_widget.dart';
import 'package:silicon_scraper/view_models/line_chart_view_model.dart';

class AnalyticsView extends StatelessWidget
{
  Product p;
  AnalyticsView(this.p);

  LineChartViewModel chartData=new LineChartViewModel();
  SentimentViewModel sentiment=new SentimentViewModel();
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
      body: ListView
      (
        children: [Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Center(
              child: Container(
                child: FutureBuilder
                (
                  future: chartData.setData(),
                  builder: (BuildContext context, AsyncSnapshot snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting)
                    {
                       return Container(
                           margin: EdgeInsets.only(top:50),
                           child: CircularProgressIndicator()
                       );
                    }
                    else if (snapshot.data != null)
                    {
                      return LineChart(chartData.data);
                    }
                    else
                    {
                      return Container(
                          margin: EdgeInsets.only(top:50),
                          child: CircularProgressIndicator()
                      );
                    }
                  }
                ),
              ),
            ),
            Center(
              child: Container(
                child: FutureBuilder
                  (
                    future: sentiment.getSentiment(p.brand,p.model),
                    builder: (BuildContext context, AsyncSnapshot snapshot)
                    {
                      if (snapshot.connectionState == ConnectionState.waiting)
                      {
                        return Container(
                            margin: EdgeInsets.only(top:50),
                            child: CircularProgressIndicator()
                        );
                      }
                      else if (snapshot.data != null)
                      {
                        return Container(
                          margin:EdgeInsets.only(top:20),
                            child: Column(
                              children: [
                                sentiment.sentimentList(),
                              ],
                            )
                        );
                      }
                      else
                      {
                        return Container(
                            margin: EdgeInsets.only(top:50),
                            child: CircularProgressIndicator()
                        );
                      }
                    }


                  // check if the product array is not empty (ie no products)

                ),
              ),
            ),
          ],
        )
        ]
      ),
    );
  }
}

Future test()async
{
  await Future.delayed(Duration(seconds: 5));
  return true;
}