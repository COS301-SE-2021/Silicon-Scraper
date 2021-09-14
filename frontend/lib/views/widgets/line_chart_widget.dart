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

  bool visible=true;
  double animateChart;

  @override
  void initState()
  {
    // TODO: implement initState
    animateChart=((data.length/2)*1000);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return
      Container(
        key: UniqueKey(),
        height:MediaQuery.of(context).size.height/2.5 ,
          child: SfCartesianChart(
              key: UniqueKey(),
              enableAxisAnimation: true,
              tooltipBehavior:TooltipBehavior(
                  enable: true,
                  activationMode:ActivationMode.singleTap,
                header:"Prediction",

              ),
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
//                  dataLabelSettings: DataLabelSettings
//                  (
//                    isVisible:true,
//                  ),
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
   void delayTrendline()async
  {
    await Future.delayed(Duration(seconds:(animateChart/1000).toInt()));
    setState(() {
      visible=true;
      animateChart=0.0;
    });
  }
}
