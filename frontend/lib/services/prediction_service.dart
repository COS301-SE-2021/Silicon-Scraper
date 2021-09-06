import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PredictionService
{
   Future predictionRequest(Product p,DateTime t)async
   {
     SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
     String token=sharedPreferences.get('token');

     print("here");
     //todo change endpoint
     var url = Uri.parse("https://silicon-scraper-ai-api.herokuapp.com/predict/price-and-availability");
     Map <String,String> headers=
     {
       "Content-Type":"application/json; charset=utf-8",
       'Authorization': "Bearer "+token,
     };

     final DateFormat format=DateFormat('yyyMMddHHmmss');
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
     print(data);
     final response = await http.post(url,headers: headers,body: data);

     print("here now"+response.body+response.statusCode.toString());
     var responseData = json.decode(response.body);

        print(response.statusCode);
        print(responseData);

     if(response.statusCode==200)
     {
       return Prediction.fromJson(responseData);
//     return responseData;
     }
     else if(responseData.success==false)
       {
         throw Exception(responseData.message);
       }
     else
     {
       throw Exception("Could not receive a response from the server");
     }
   }
}

class PredictionServiceSingleton extends PredictionService
{
  static PredictionServiceSingleton _instance;
  PredictionServiceSingleton._internal(){
//
  }
  static PredictionServiceSingleton getState()
  {
    if(_instance==null)
    {
      _instance=PredictionServiceSingleton._internal();
    }
    return _instance;
  }
}