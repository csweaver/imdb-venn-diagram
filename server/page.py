import os
from flask import Blueprint, render_template, send_from_directory

page = Blueprint(
	"page",
	__name__,
	url_prefix="/",
	static_url_path="/static",
	static_folder="templates/built-templates/static/"
)

@page.route('/')
def main_page():
	return render_template('built-templates/index.html')

@page.route("/favicon.ico")
def favicon():
	print(page.root_path)
	return send_from_directory(os.path.join(page.root_path, "templates/built-templates"), "favicon.ico")


