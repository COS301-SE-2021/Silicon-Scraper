import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:silicon_scraper/mocks/json/sentiments.dart';
import 'package:silicon_scraper/services/sentiment_service.dart';

class MockSentimentService extends SentimentService
{
  bool success = true;

  MockSentimentService(this.success);

  Future SentimentRequest(String username, String password) async
  {
    return sentimentData();
  }
}


//todo get error codes from api and throw exact messages