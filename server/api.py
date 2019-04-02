from flask import Blueprint, current_app, jsonify, request, Response
import imdb

from server.helpers import SearchMovie, get_full_cast, venn_cast, Role

ia = imdb.IMDb()

api = Blueprint("api", __name__, url_prefix="/api")

@api.route('search', methods=["GET"])
def search():
	title = request.args.get("title", "")
	search_results = ia.search_movie(title)
	current_app.logger.info(f"SEARCH - searching movie: {title}")
	search_results = [SearchMovie(m).serialize() for m in search_results]
	return jsonify({"possibilities": search_results})


@api.route('venn', methods=["GET"])
def venn():
	movies = request.args.getlist("movies")
	venn_movies = [get_full_cast(m) for m in movies]
	overlapping_cast_ids = venn_cast(venn_movies)
	actors = []
	for cid in overlapping_cast_ids:
		actor = []
		for m in venn_movies:
			cast_member = m.cast[cid]
			character = Role(cast_member)
			actor.append(character.serialize())
		actors.append(actor)
	result = {
		"movies": [m.serialize() for m in venn_movies],
		"actors": actors
	}
	num_movies = len(venn_movies)
	titles = ", ".join([m.serialize()["title"] for m in venn_movies])
	num_overlap = len(actors)
	current_app.logger.info(f"VENN - cast overlap for {num_movies} movies: {titles}")
	current_app.logger.info(f"VENN - num overlap: {num_overlap}")
	return jsonify(result)

@api.route('select', methods=["GET"])
def select():
	movie = request.args.get("movie")
	current_app.logger.info(f"SELECT - selected movie: {movie}")
	get_full_cast(movie)
	return Response(status=200)
