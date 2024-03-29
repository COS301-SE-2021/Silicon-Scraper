import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/sign_up_service_injector.dart';
import 'package:silicon_scraper/views/login_view.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignUpViewModel extends ChangeNotifier
{
  SignUpInjector signup= SignUpInjector();

  Future signUp(String username,String pw,context)async
  {
    try
    {
      showDialog(context: context, builder: (_)=> AlertDialog(
        title: Center(
            child:CircularProgressIndicator()
        ),
      ));
      //todo need to recieve and save a jwt token with shared prefrences
      Map<String,dynamic> isIn=await signup.dependency.signUpRequest(username, pw);
      if(isIn['token'].isNotEmpty)
      {
        SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
        sharedPreferences.setString("token", isIn['token']);
//        sharedPreferences.setBool("loggedIn",true);
        sharedPreferences.setString("userId", isIn['user']['id']);
        print(isIn['user']['id']);
        Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => LoginView()),(Route<dynamic> route)  => false);
      }
      else
      {
        //todo push error screen or show incorrect pw
      }
    }
    catch(e)
    {
      print(e);
      Navigator.pop(context); /// remove the loading dialog before error is shown
      return showDialog(context: context, builder: (_)=> AlertDialog(
          title: Text("${e.message}")),);
    }
  }

  goToLogin(context)
  {
    Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => LoginView()),(Route<dynamic> route)  => false);
  }

}

class SignUpViewModelSingleton extends SignUpViewModel
{
  static SignUpViewModelSingleton _instance;

  SignUpViewModelSingleton._internal();

  static SignUpViewModelSingleton getState()
  {
    if(_instance==null)
    {
      _instance=SignUpViewModelSingleton._internal();
    }
    return _instance;
  }
}