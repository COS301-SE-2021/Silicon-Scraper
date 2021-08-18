import 'package:silicon_scraper/models/product_model.dart';
import 'getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ExplorePageService {
  static int page=0;
  static int limit=20;

  List<Product> items=[];

  ExplorePageService() {
    //setItems();
  }

  Future explorePageRequest(String productType)async {
      var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/products/?type="+productType+"&userId=c8a93f30-fe1b-4cea-a7e2-49c37e908133");
      Map <String,String> headers={
        "Content-Type":"application/json; charset=utf-8",
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ'};
      final response = await http.get(url,headers: headers);
      //print(response.statusCode);
      var responseData = json.decode(response.body);

      if(response.statusCode==200) {
        return addProducts(responseData["products"]);
      }
      return false;
  }

  Future setItems(String productType) async {
    items = await explorePageRequest(productType);
    //print("setItems");
    return items;
  }

  void nextPage()
  {
    page++;
  }

}

class ExplorePageSingleton extends ExplorePageService
{
  static ExplorePageSingleton _instance;
  ExplorePageSingleton._internal(){
//
  }
  static ExplorePageSingleton getState()
  {
    if(_instance==null)
    {
      _instance=ExplorePageSingleton._internal();
    }
    return _instance;
  }
}