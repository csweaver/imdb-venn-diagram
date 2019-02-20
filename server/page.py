from flask import Blueprint, render_template

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


