import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:flutter/material.dart';
class LineChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<SalesData> chartData = [
      SalesData(DateTime(2010), 10),
      SalesData(DateTime(2011), 50),
      SalesData(DateTime(2012), 34),
      SalesData(DateTime(2013), 70),
      SalesData(DateTime(2014), 40)
    ];

    return
      Container(
        height:MediaQuery.of(context).size.height/2.5 ,
          child: SfCartesianChart(
              tooltipBehavior:TooltipBehavior(enable: true),
            title: ChartTitle(text: "Price Trend"),
              margin:EdgeInsets.only(left:20,right:20,top:20),
              primaryXAxis: DateTimeAxis(),
              series: <ChartSeries>[
                // Renders line chart
                LineSeries<SalesData, DateTime>(
                  animationDuration: 8000,
                    dataSource: chartData,
                    xValueMapper: (SalesData sales, _) => sales.year,
                    yValueMapper: (SalesData sales, _) => sales.sales,
                  enableTooltip: true,
            trendlines:<Trendline>[
              Trendline(
                  type: TrendlineType.linear,
                  color: Colors.green)
            ],
                    markerSettings: MarkerSettings(
                        height:3,
                        width:3,
                        isVisible: true,

                        /*shape: DataMarkerType.image,
                        // Renders the image as marker
                        image: AssetImage("assets/images/gpu_icon.png"),*/
                    )
                )
              ]
          )
      );
  }
}


class SalesData {
  SalesData(this.year, this.sales);
  final DateTime year;
  final double sales;
}