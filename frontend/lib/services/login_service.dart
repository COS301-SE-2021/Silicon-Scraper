import 'package:http/http.dart' as http;
import 'dart:convert';

class LoginService
{

  Future LoginRequest(String username,String password)async
  {
    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/users/login");
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ',
    };

    Map <String,String> data={
      "username": username,
      "password": password
    };
   print("here");
    var body=jsonEncode(data);
    final response = await http.post(url,headers: headers,body: body);
    print(response.statusCode);
    if(response.statusCode==200)
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
    throw Exception('Unable to log in');
  }
  
}

class LoginSingleton extends LoginService
{
  static LoginSingleton _instance;

  LoginSingleton._internal();

  static LoginSingleton getState()
  {
    if(_instance==null)
    {
      _instance=LoginSingleton._internal();
    }
    return _instance;
  }
}

//todo get error codes from api and throw exact messages
