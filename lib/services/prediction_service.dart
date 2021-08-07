import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:silicon_scraper/models/product_model.dart';

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
     final response = await http.get(url,headers: headers);
     var responseData = json.decode(response.body);

//        print(response.statusCode);
//        print(responseData);

     if(response.statusCode==200)
     {
       //todo check return object
       return responseData;
     }
     else
     {
//        todo    throw
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