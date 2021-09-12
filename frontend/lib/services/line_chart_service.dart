import 'package:http/http.dart' as http;
import 'dart:convert';

class LineChartService
{

  Future LineChartRequest(String username,String password)async
  {

    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/users/");
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
    };

    Map <String,String> data={
      "username": username,
      "password": password
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
