from api.views import app

if __name__ == '__main__':

    print("Starting web service...")
    app.run(host = '0.0.0.0', debug=True,  port=int(os.environ.get('PORT', 5000)))
