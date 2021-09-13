import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/prediction_graph_data_model.dart';

class LineChart extends StatefulWidget {
  List<PredictionData> data;

  LineChart(this.data);

  @override
  _LineChartState createState() => _LineChartState(data);
}

class _LineChartState extends State<LineChart> {
  List<PredictionData> data;

  _LineChartState(this.data);

  bool visible=false;
  double animateChart=16000;
  @override
  Widget build(BuildContext context) {
    final List<SalesData> chartData = [
      SalesData(DateTime(2010), 10),
      SalesData(DateTime(2011), 50),
      SalesData(DateTime(2012), 34),
      SalesData(DateTime(2013), 70),
      SalesData(DateTime(2014), 40),
      SalesData(DateTime(2015), 10),
      SalesData(DateTime(2016), 50),
      SalesData(DateTime(2017), 34),
      SalesData(DateTime(2018), 70),
      SalesData(DateTime(2019), 40),
      SalesData(DateTime(2020), 10),
      SalesData(DateTime(2021), 50),
      SalesData(DateTime(2022), 34),
      SalesData(DateTime(2023), 70),
      SalesData(DateTime(2024), 40),
      SalesData(DateTime(2025), 10),
      SalesData(DateTime(2026), 50),
      SalesData(DateTime(2027), 34),
      SalesData(DateTime(2028), 70),
      SalesData(DateTime(2029), 40)
    ];
    delayTrendline();
    return
      Container(
        key: UniqueKey(),
        height:MediaQuery.of(context).size.height/2.5 ,
          child: SfCartesianChart(
              key: UniqueKey(),
              enableAxisAnimation: true,
              tooltipBehavior:TooltipBehavior(enable: true),
            title: ChartTitle(text: "Price Trend"),
              margin:EdgeInsets.only(left:20,right:20,top:20),
              primaryXAxis: DateTimeAxis(),
              series: <ChartSeries>[
                // Renders line chart
                LineSeries<PredictionData, DateTime>(
                  key: ValueKey("Key"),
                  animationDuration: animateChart,
                    dataSource: data,
                    xValueMapper: (PredictionData data, _) => data.time,
                    yValueMapper: (PredictionData data, _) => data.price,
                  enableTooltip: true,
            trendlines:<Trendline>[
              Trendline(
                isVisible:visible,
                forwardForecast:3,
                  animationDuration: 8000,
                  type: TrendlineType.polynomial,
                  polynomialOrder: 3,
                  color: Colors.red,
                  name:'trendline',
//                  enableTooltip: true,
//                  markerSettings: MarkerSettings(
//                  height:3,
//                  width:3,
//                  isVisible: true,
//                ),
              )
            ],
                    markerSettings: MarkerSettings(
                        height:3,
                        width:3,
                        isVisible: true,

                        /*shape: DataMarkerType.image,
                        // Renders the image as marker
                        image: AssetImage("assets/images/gpu_icon.png"),*/
                    )
                ),
//                ColumnSeries<SalesData, DateTime>(
//                    dataSource: chartData,
//                    xValueMapper: (SalesData sales, _) => sales.year,
//                    yValueMapper: (SalesData sales, _) => sales.sales
//                )
              ]
          )
      );
  }
  Future delayTrendline()async
  {
    await Future.delayed(Duration(seconds:14));
    setState(() {
      visible=true;
      animateChart=0.0;
    });
  }
}


class SalesData {
  SalesData(this.year, this.sales);
  final DateTime year;
  final double sales;
}