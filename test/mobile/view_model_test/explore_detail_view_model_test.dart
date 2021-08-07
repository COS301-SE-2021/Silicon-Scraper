import 'package:flutter_test/flutter_test.dart';
import 'package:silicon_scraper/view_models/explore_detail_view_model.dart';

void main(){
  ExplorePageViewModelSingleton explore = ExplorePageViewModelSingleton.getState();

  group("testing explore page view model", (){
    group("test explore detail get title", (){
      test("test for cpu product type", (){
        expect(explore.getTitle("cpu"), "CPUs");
      });
      test("test for gpu product type", (){
        expect(explore.getTitle("gpu"), "GPUs");
      });
    });
  });
}