import 'package:flutter/material.dart';
import 'package:silicon_scraper/views/widgets/line_chart_widget.dart';

class AnalyticsView extends StatelessWidget
{
  @override
  Widget build(BuildContext context)
  {
    return Scaffold(
        appBar: AppBar(
          title: Text("Analytics"),
          centerTitle: true,
        ),
      body: LineChart(),
    );
  }
}
