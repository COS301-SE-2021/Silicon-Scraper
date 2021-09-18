import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:silicon_scraper/models/product_model.dart';

class LineChartService
{

  Future LineChartRequest(Product p)async
  {

    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    String token=sharedPreferences.get('token');

    print("here");
    //todo change endpoint
    var url = Uri.parse("https://silicon-scraper-ai-api.herokuapp.com/predict/graph-data");
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': "Bearer "+token,
    };

    final DateFormat format=DateFormat('yyyMMddHHmmss');
    DateTime t=DateTime.now();
    final String date=format.format(t);
    String av;
    if(p.stockAvailability==availability.outOfStock)
    {
      av="Out of Stock";
    }
    else
    {
      av="In Stock";
    }
    Map <String,dynamic> body=
    {
      "brand":p.brand,
      "model":p.model.toUpperCase(),
      "availability":av,
      "date":date,
      "type":p.type,
      "price":p.price
    };
    var data=jsonEncode(body);

    print(body);
    final response = await http.post(url,headers: headers,body: data);
    print(response.statusCode);

    if(response.statusCode==200)
    {
      var responseData=jsonDecode(response.body);
      print(responseData);
      return responseData["data"];
    }
    else if(response.statusCode==404||response.statusCode==500)
    {
      var responseData=jsonDecode(response.body);
      throw Exception("${responseData["message"]}");
    }
    throw Exception('No graph data to display');
  }

}

class LineChartSingleton extends LineChartService
{
  static LineChartSingleton _instance;

  LineChartSingleton._internal();

  static LineChartSingleton getState()
  {
    if(_instance==null)
    {
      _instance=LineChartSingleton._internal();
    }
    return _instance;
  }
}

//todo get error codes from api and throw exact messages
