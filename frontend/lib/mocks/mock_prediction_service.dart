import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/prediction_service.dart';

class MockPredictionService extends PredictionService
{
  bool fail;

  MockPredictionService(this.fail);

  @override
  Future predictionRequest(Product p, DateTime t)
  {
    if(fail)
      {
        // todo throw exception
      }
    else
      {
       // todo return object
      }
  }
}