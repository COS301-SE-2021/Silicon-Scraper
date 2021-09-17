
import 'package:silicon_scraper/mocks/json/line_chart_data.dart';
import 'package:silicon_scraper/services/line_chart_service.dart';
import 'package:silicon_scraper/models/product_model.dart';

class MockLineChartService extends LineChartService
{
  bool success=true;

  MockLineChartService(this.success);

  Future LineChartRequest(Product p)async
  {

    if(success)
    {
      return lineChartData();
    }
    else
    {
      throw Exception('This user name is already taken');
    }
  }

}