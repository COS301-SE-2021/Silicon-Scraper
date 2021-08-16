import 'package:flutter/material.dart';
import 'package:silicon_scraper/injectors/login_service_injector.dart';
import 'package:silicon_scraper/views/mainNavigator.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginViewModel extends ChangeNotifier
{
    LoginInjector logIn= LoginInjector();

    Future login(String username,String pw,context)async
    {
        try
        {
          //todo need to recieve and save a jwt token with shared prefrences
           Map<String,String> isIn=await logIn.dependency.LoginRequest(username, pw);
           if(isIn['token'].isNotEmpty)
           {
             SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
             sharedPreferences.setString("token", isIn['token']);
             print(isIn['token']);
             Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (BuildContext context) => MainNavigator()),(Route<dynamic> route)  => false);
           }
           else
           {
               //todo push error screen or show incorrect pw
           }

        }
        catch(e)
        {
            //todo push error screen
          print(e);
        }
    }

    goToSignUp(context)
    {
        // todo push home screen
    }

    forgotPassword(context,String email)
    {
        // todo push forgot pw screen
    }

    logout()
    {

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