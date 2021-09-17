import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class SentimentService
{

  Future SentimentRequest(String brand,String model)async
  {
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    String token=sharedPreferences.get('token');
    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/sentiment");
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': "Bearer "+token,
    };

    Map <String,String> data={
      "brand": brand,
      "model": model
    };

    var body=jsonEncode(data);
    final response = await http.post(url,headers: headers,body: body);
    print(response.statusCode);
    if(response.statusCode==201)
    {
      var responseData=jsonDecode(response.body);
      print(responseData);
      return responseData;
    }
    else if(response.statusCode==404||response.statusCode==500)
    {
      var responseData=jsonDecode(response.body);
      throw Exception("${responseData["message"]}");
    }
    else if(response.statusCode==409)
    {
      throw Exception('This user name is already taken');
    }
    throw Exception('Unable to sign up');
  }

}

class SentimentSingleton extends SentimentService
{
  static SentimentSingleton _instance;

  SentimentSingleton._internal();

  static SentimentSingleton getState()
  {
    if(_instance==null)
    {
      _instance=SentimentSingleton._internal();
    }
    return _instance;
  }
}

//todo get error codes from api and throw exact messages