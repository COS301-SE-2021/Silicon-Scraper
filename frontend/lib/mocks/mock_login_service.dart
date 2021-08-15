import 'package:silicon_scraper/models/product_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MockLoginService
{
  bool success;

  MockLoginService(this.success);

  Future<bool> LoginRequest(String username,password)async
  {
    if(success)
    {
      return true;
    }
    else
    {
      throw Exception("failed to login");
    }

  }

}


//todo get error codes from api and throw exact messages
