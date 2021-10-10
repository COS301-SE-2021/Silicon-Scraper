import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class NotificationService
{
  Future register(String id,String FBtoken)async
  {
    var url = Uri.parse("https://notification-silicon-scraper.herokuapp.com/subscribe");
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    String token=sharedPreferences.get('token');
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer '+token,
    };

    Map <String,String> data={
      "userId": id,
      "token": FBtoken
    };
    print("here");
    var body=jsonEncode(data);
    final response = await http.post(url,headers: headers,body: body);
    print(response.statusCode);
  }
}