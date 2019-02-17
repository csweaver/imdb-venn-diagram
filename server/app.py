from flask import Flask, render_template
from flask_cors import CORS

from .api import api
from .cache import cache

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config.update(SECRET_KEY="ThisIsAMagicKey")
CORS(app)
cache.init_app(app, config={"CACHE_TYPE": "simple", "CACHE_DEFAULT_TIMEOUT": 860_000})

@app.route('/')
def hello_world():
	return render_template('index.html', content='IMDB Venn')

app.register_blueprint(api)
