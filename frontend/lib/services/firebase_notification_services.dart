import 'package:http/http.dart' as http;
import 'dart:convert';

class NotificationService
{
  Future register(String id,String token)async
  {
    var url = Uri.parse("https://notification-silicon-scraper.herokuapp.com/subscribe");
    Map <String,String> headers=
    {
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ',
    };

    Map <String,String> data={
      "userId": id,
      "token": token
    };
    print("here");
    var body=jsonEncode(data);
    final response = await http.post(url,headers: headers,body: body);
    print(response.statusCode);
  }
}