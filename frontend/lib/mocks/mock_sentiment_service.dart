import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:silicon_scraper/mocks/json/sentiments.dart';

class SentimentService
{
  bool success = true;

  SentimentService(this.success);

  Future SentimentRequest(String username, String password) async
  {
    return sentimentData();
  }
}


//todo get error codes from api and throw exact messages