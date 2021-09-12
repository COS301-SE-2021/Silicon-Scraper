
import 'package:silicon_scraper/mocks/json/line_chart_data.dart';
import 'package:silicon_scraper/services/line_chart_service.dart';

class MockLineChartService extends LineChartService
{
  bool success=false;

  MockLineChartService(this.success);

  Future LineChartRequest(String username,String password)async
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