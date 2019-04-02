from flask import Flask, render_template
from flask_cors import CORS

from server.api import api
from server.cache import cache
from server.page import page


def create_app():
	app = Flask(__name__, static_url_path="/resources",)
	app.config.update(DEBUG=True)
	app.config.update(SECRET_KEY="ThisIsAMagicKey")
	app.logger.info("starting imdb venn diagram")
	CORS(app)
	cache.init_app(app, config={"CACHE_TYPE": "simple", "CACHE_DEFAULT_TIMEOUT": 860_000})

	app.register_blueprint(page)
	app.register_blueprint(api)
	return app
