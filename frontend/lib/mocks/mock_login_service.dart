import 'package:silicon_scraper/services/login_service.dart';

class MockLoginService extends LoginService
{
  bool success;

  MockLoginService(this.success);
  @override
  Future LoginRequest(String username,password)async
  {

    if(success)
    {
      print('in');

      Map <String,String> data={
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ"
      };
      return data;
    }
    else
    {
      throw Exception("failed to login");
    }

  }

}


//todo get error codes from api and throw exact messages
