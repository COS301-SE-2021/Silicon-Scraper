
import 'dart:convert';
import 'package:silicon_scraper/injectors/line_chart_service_injector.dart';
import 'package:silicon_scraper/models/prediction_graph_data_model.dart';

class LineChartViewModel
{
  LineChartInjector injector=LineChartInjector();
  List<PredictionData> data=[];

  Future setData()async
  {
    var json=await injector.dependency.LineChartRequest("", "");
    for(int i=0;i<json.length;i++)
      {
        data.add(PredictionData.fromJSON(json[i]));
      }

    return true;
  }

}