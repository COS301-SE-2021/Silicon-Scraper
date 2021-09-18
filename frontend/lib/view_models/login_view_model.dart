import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/login_service_injector.dart';
import 'package:silicon_scraper/views/login_view.dart';
import 'package:silicon_scraper/views/mainNavigator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:silicon_scraper/views/sign_up_view.dart';

class LoginViewModel extends ChangeNotifier
{
    LoginInjector logIn= LoginInjector();

    Future login(String username,String pw,context)async
    {
        try
        {
          showDialog(context: context, builder: (_)=> AlertDialog(
            title: Center(
                child:CircularProgressIndicator()
            ),
          ));
          //todo need to recieve and save a jwt token with shared prefrences
           Map<String,dynamic> isIn=await logIn.dependency.LoginRequest(username, pw);
           if(isIn['token'].isNotEmpty)
           {
             SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
             sharedPreferences.setString("token", isIn['token']);
             sharedPreferences.setBool("loggedIn",true);
             sharedPreferences.setString("userId", isIn['user']['id']);
             Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => MainNavigator()),(Route<dynamic> route)  => false);
           }
           else
           {
               throw Exception("Incorrect username or password");
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

    goToSignUp(context)
    {
      Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => SignUpView()),(Route<dynamic> route)  => false);
    }

    forgotPassword(context,String email)
    {
        // todo push forgot pw screen
    }

    logout(context)async
    {
      SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
      sharedPreferences.setBool("loggedIn",false);
      Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => LoginView()),(Route<dynamic> route)  => false);
    }
}

class LoginViewModelSingleton extends LoginViewModel
{
    static LoginViewModelSingleton _instance;

    LoginViewModelSingleton._internal();

    static LoginViewModelSingleton getState()
    {
        if(_instance==null)
        {
            _instance=LoginViewModelSingleton._internal();
        }
        return _instance;
    }
}