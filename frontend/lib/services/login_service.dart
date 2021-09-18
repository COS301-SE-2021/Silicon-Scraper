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
    };

    Map <String,String> data={
      "username": username,
      "password": password
    };
   print("here");
    var body=jsonEncode(data);
    final response = await http.post(url,headers: headers,body: body);
    print(response.statusCode);
    print(response.body);
    if(response.statusCode==200)
    {
      var responseData=jsonDecode(response.body);
      print(responseData);
        return responseData;
    }
    else if(response.statusCode==404||response.statusCode==500||response.statusCode==401)
    {
        var responseData=jsonDecode(response.body);
        throw Exception("${responseData["error"]}");
    }
    var responseData=jsonDecode(response.body);
    print(responseData);
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
