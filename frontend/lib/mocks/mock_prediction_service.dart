import 'package:silicon_scraper/models/prediction_model.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/prediction_service.dart';

class MockPredictionService extends PredictionService
{
  bool fail;

  MockPredictionService(this.fail);

  @override
  Future predictionRequest(Product p, DateTime t)async
  {
    if(fail)
      {
        throw Exception("Could not receive a response from the server");
      }
    else
      {
       return Prediction(true, 100000.0);
      }
  }
}