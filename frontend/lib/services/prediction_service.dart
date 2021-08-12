import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:intl/intl.dart';

class PredictionService
{
   Future predictionRequest(Product p,DateTime t)async
   {
     //todo change endpoint
     var url = Uri.parse("http://10.0.2.2:3000/watchlist");
     Map <String,String> headers=
     {
       "Content-Type":"application/json; charset=utf-8",
       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI4MTY5MDY3LCJleHAiOjE2NTk3MDUwNjd9.LzjoAKcGmYrwf-27ZFPtCxWAxnDuSSYlBMgIfA6nW1g',
     };

     final DateFormat format=DateFormat('yyyMMddHHmmss');
     final String date=format.format(t);

     Map <String,dynamic> body=
     {
       "brand":p.brand,
       "model":p.model,
       "availability":p.stockAvailability.toString(),
       "date":date,
       "type":p.type,
       "price":p.price
     };

     final response = await http.post(url,headers: headers,body: body);
     var responseData = json.decode(response.body);

//        print(response.statusCode);
//        print(responseData);

     if(response.statusCode==200)
     {
       return Prediction.fromJson(responseData);
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