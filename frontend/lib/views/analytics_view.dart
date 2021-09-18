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
        appBar: AppBar(
          iconTheme: IconThemeData(color: Colors.black),
          backgroundColor: Colors.green[400],
          elevation: 0,
          automaticallyImplyLeading: true,
          flexibleSpace: Container(
            margin: EdgeInsets.only(top: 25),
            height: MediaQuery.of(context).size.height / 10,
            width: MediaQuery.of(context).size.width,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment(0.0, 1.0),
                colors: <Color>[  Colors.green[400],
                  Color(0xffffffff)],
                tileMode: TileMode.clamp,
              ),
            ),

            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ///title
                Container(
                  margin: EdgeInsets.only(left: 45, top: 12),
                  width: MediaQuery.of(context).size.width / 1.6,
                  child: Text(
                    "Analytics",
                    textAlign: TextAlign.left,
                    maxLines: 1,
                    overflow: TextOverflow.fade,
                    style: TextStyle(
                        fontSize: 28,
                        color: Colors.black,
                        fontWeight: FontWeight.bold, letterSpacing: 0),
                  ),
                ),

              ],
            ),
          ),),
      body: ListView
      (
        children: [Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Center(
              child: Container(
                child: FutureBuilder
                (
                  future: chartData.setData(p),
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
                    else if(snapshot.hasError)
                    {
                      return Container(
                          margin: EdgeInsets.only(top:50),
                          child: Text("No Graph data to display")
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
                          margin:EdgeInsets.only(top:30),
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