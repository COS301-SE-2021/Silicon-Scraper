import 'package:flutter/material.dart';
import 'package:silicon_scraper/view_models/sign_up_view_model.dart';

class SignUpView extends StatefulWidget {
  @override
  _SignUpViewState createState() => _SignUpViewState();
}

class _SignUpViewState extends State<SignUpView> {
  SignUpViewModelSingleton signUp = SignUpViewModelSingleton.getState();
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
              elevation: 0),
        ),
        backgroundColor: Colors.white,
        body: Padding(
            padding: EdgeInsets.all(10),
            child: ListView(
              children: <Widget>[
                Container(
                    margin: EdgeInsets.only(bottom: 10),
                    alignment: Alignment.center,
                    height: MediaQuery.of(context).size.height / 3.5,
                    child: Image.asset('assets/images/transparent_logo.png')),
                // Container(
                //     alignment: Alignment.center,
                //     padding: EdgeInsets.all(10),
                //     child: Text(
                //       'Welcome ',
                //       style: TextStyle(fontSize: 20),
                //     )),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                    controller: nameController,
                    decoration: InputDecoration(
                      //border: OutlineInputBorder(),
                      labelText: 'Email',
                    ),
                      style: TextStyle(
                          fontSize: 20, height: 1, letterSpacing: 1, color: Colors.black),
                ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                    obscureText: true,
                    controller: passwordController,
                    decoration: InputDecoration(
                      //border: OutlineInputBorder(),
                      labelText: 'Password',
                    ),
                      style: TextStyle(
                          fontSize: 20, height: 1, letterSpacing: 1, color: Colors.black)
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                    height: 60,
                    padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: ElevatedButton(
                      child: Text('SIGN UP', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),),
                      onPressed: () async {
                        print(nameController.text);
                        print(passwordController.text);
                        await signUp.signUp(nameController.text,
                            passwordController.text, context);
                      },
                    )),
                Container(
                    child: Row(
                  children: <Widget>[
                    Text('Already have an account ?'),
                    FlatButton(
                      textColor: Colors.blue,
                      child: Text(
                        'Log In',
                        style: TextStyle(fontSize: 20),
                      ),
                      onPressed: () {
                        signUp.goToLogin(context);
                      },
                    )
                  ],
                  mainAxisAlignment: MainAxisAlignment.center,
                ))
              ],
            )));
  }
}
