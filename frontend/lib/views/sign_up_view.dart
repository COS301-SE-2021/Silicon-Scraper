import 'package:flutter/material.dart';
import 'package:silicon_scraper/services/login_service.dart';
import 'package:silicon_scraper/view_models/login_view_model.dart';

class SignUpView extends StatefulWidget {
  @override
  _SignUpViewState createState() => _SignUpViewState();
}

class _SignUpViewState extends State<SignUpView> {
  LoginViewModelSingleton login=LoginViewModelSingleton.getState();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(10),
          child: AppBar(
              brightness: Brightness.light,
              backgroundColor: Colors.white,
              elevation:0
          ),
        ),
        backgroundColor: Colors.white,
        body: Padding(
            padding: EdgeInsets.all(10),
            child: ListView(
              children: <Widget>[
                Container(
                    alignment: Alignment.center,
                    height: MediaQuery.of(context).size.height / 4,
                    child:Image.asset(
                        'assets/images/silicon_scraper_logo.png'
                    ) ),
                Container(
                    alignment: Alignment.center,
                    padding: EdgeInsets.all(10),
                    child: Text(
                      'Welcome ',
                      style: TextStyle(fontSize: 20),
                    )),
                Container(
                  padding: EdgeInsets.all(10),
                  child: TextField(
                    controller: nameController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Email',
                    ),
                  ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                    obscureText: true,
                    controller: passwordController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                    ),
                  ),
                ),
                SizedBox(height: 20,),
                Container(
                    height: 50,
                    padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: RaisedButton(
                      textColor: Colors.white,
                      color: Colors.blue,
                      child: Text('Sign Up'),
                      onPressed: () async{
                        print(nameController.text);
                        print(passwordController.text);
                        await login.login(nameController.text, passwordController.text, context);
                      },
                    )),
              ],
            )));
  }
}

