import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';
import 'package:silicon_scraper/view_models/recommendation_view_model.dart';

class Recommendation extends StatefulWidget {
  @override
  _RecommendationState createState() => _RecommendationState();
}

class _RecommendationState extends State<Recommendation> {
  RecommendationPageViewModelSingleton recommendation = RecommendationPageViewModelSingleton.getState();
  LoginViewModelSingleton login = LoginViewModelSingleton.getState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: MediaQuery.of(context).size.width,
        margin: EdgeInsets.fromLTRB(15, 0, 15, 0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            /// little text
            Container(
              //height: MediaQuery.of(context).size.height / 10,
              margin: EdgeInsets.fromLTRB(0, 0, 0, 15),
              child: Text(
                "Recommendations based on items in your watchlist.",
                style: TextStyle(color: Colors.black, fontSize: 12),
              ),
            ),
            // /// sort and filter buttons
            // Container(
            //
            // ),
            /// the products
            Expanded(child: recommendation.getRecommendationPageProducts(),
            )
          ],
        ),
      ),
    );
  }
}
