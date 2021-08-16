import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/views/login_view.dart';
import 'package:silicon_scraper/views/mainNavigator.dart';

class LoginWrapper extends StatelessWidget
{
  Future<bool> checkLoginStatus() async{
    SharedPreferences sharedPreferences= await SharedPreferences.getInstance();
    if(sharedPreferences.get("loggedIn")==null||sharedPreferences.get("loggedIn")==false)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  @override
  Widget build(BuildContext context)
  {
    print( checkLoginStatus());
    return FutureBuilder(
      future: checkLoginStatus(),
      builder: (BuildContext context,AsyncSnapshot snapshot){
        print("==================================");
        if(snapshot.connectionState==ConnectionState.none)
        {
          return Center(child: CircularProgressIndicator());
        }
        else if(snapshot.data!=null && snapshot.data==true){
          return MainNavigator();
        }
        else if(snapshot.data!=null && snapshot.data==false) {
          return LoginView();
        }
        else{
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }

}