from flask import Flask, render_template
from flask_cors import CORS

from .api import api
from .cache import cache
from .page import page

app = Flask(__name__, static_url_path="/resources",)
app.config.update(DEBUG=True)
app.config.update(SECRET_KEY="ThisIsAMagicKey")
CORS(app)
cache.init_app(app, config={"CACHE_TYPE": "simple", "CACHE_DEFAULT_TIMEOUT": 860_000})

app.register_blueprint(page)
app.register_blueprint(api)
