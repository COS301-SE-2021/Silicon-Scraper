import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';

class Recommendation extends StatefulWidget {

  @override
  _RecommendationState createState() => _RecommendationState();
}

class _RecommendationState extends State<Recommendation> {
  //RecommendationPageViewModelSingleton recommendation = RecommendationPageViewModelSingleton.getState();
  LoginViewModelSingleton login = LoginViewModelSingleton.getState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Text("data"),
    );
  }
}
