import imdb

from server.cache import cache
from server.utils import clean_name, intense_get

ia = imdb.IMDb()

class MovieCast(object):
	def __init__(self, mid):
		self.movie = ia.get_movie(mid, ["main", "full credits"])
		self.cast = self._init_cast()
		self.cast_ids = set(self.cast.keys())

	def _init_cast(self):
		return {c.getID(): c for c in self.movie["cast"] if c.getID() is not None}

	def serialize(self):
		return SearchMovie(self.movie).serialize()


class Role(object):
	def __init__(self, c):
		self.aid = c.getID()
		self.cid = None
		self.actor = clean_name(intense_get(c, ["long imdb name", "name"], "long imdb name"))
		self.character = clean_name(self._init_char(c))
		self.actor_url = None
		self.character_url = None
		self.img = None
		if self.aid:
			self.actor_url = f"https://www.imdb.com/name/nm{self.aid}"
			self.img = c.get_fullsizeURL()

	def serialize(self):
		return {
			"id": self.aid,
			"actor": self.actor,
			"character": self.character,
			"url": self.actor_url,
			"img": self.img
		}

	def _init_char(self, c):
		role = c.currentRole
		name = ""
		try:
			for r in role:
				rid = r.getID()
				if rid and not self.cid:
					self.cid = rid
				if name:
					name = f"{name}; {r.get('name', 'unamed role')}"
				else:
					name = r.get('name', 'unamed role')

		except (TypeError, KeyError):
			name = role.get("name", "unnamed role")
		return name



class SearchMovie(object):
	def __init__(self, m):
		self.mid = m.getID()
		self.title = intense_get(m, ["long imdb title", "title", "smart long imdb canonical title", "canonical title"], ""),
		self.year = m.get("year", 0),
		self.kind = m.get("kind", "unknown")
		self.imdb_url = f"https://www.imdb.com/title/tt{self.mid}/"
		self.image = m.get("cover url", "")
		self._flatten_attr()

	def serialize(self):
		movie_dict = {
			"id": self.mid,
			"title": self.title,
			"year": self.year,
			"url": self.imdb_url,
			"image": self.image,
			"kind": self.kind
		}
		return movie_dict

	def _flatten_attr(self):
		try:
			if type(self.title) != str:
				self.title = self.title[0]
				self.year = self.year[0]
		except TypeError as e:
			print(e)



def venn_cast(movie_list):
	if len(movie_list) < 2:
		return []
	overlap = movie_list[0].cast_ids.intersection(*[m.cast_ids for m in movie_list[1:]])
	return overlap


@cache.memoize()
def get_full_cast(movie):
	return MovieCast(movie)
