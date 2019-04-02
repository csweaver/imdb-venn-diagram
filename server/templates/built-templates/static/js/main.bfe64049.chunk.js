(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    175: function(e, t, n) {
      e.exports = n(315);
    },
    180: function(e, t, n) {},
    182: function(e, t, n) {},
    315: function(e, t, n) {
      "use strict";
      n.r(t);
      var a,
        r,
        o,
        c,
        l = n(0),
        i = n.n(l),
        s = n(43),
        u = n.n(s),
        h = (n(180), n(181), n(23)),
        m = n(24),
        d = n(26),
        p = n(25),
        v = n(27),
        f = (n(182), n(31)),
        g = "http://localhost:5000/api",
        b = "".concat(g, "/search"),
        E = "".concat(g, "/venn"),
        y = "".concat(g, "/select"),
        j = function() {
          return { type: "start searching for movie" };
        },
        O = function(e) {
          return function(t) {
            return (
              t(j),
              console.log("".concat(b, "?title=").concat(e)),
              fetch("".concat(b, "?title=").concat(e), {
                credentials: "same-origin"
              })
                .then(function(e) {
                  if (e.status >= 400 && e.status < 600)
                    throw new Error("Uhhh... IDK? No  movie");
                  return e.json();
                })
                .then(function(e) {
                  t(
                    (function(e) {
                      return {
                        type: "got movie search results",
                        movies: e.possibilities,
                        receivedAt: Date.now()
                      };
                    })(e)
                  );
                })
                .catch(function(e) {
                  t({ type: "failed searching for movie" }),
                    console.log(e),
                    console.log("something went wrong");
                })
            );
          };
        },
        w = function() {
          return { type: "clear movie search results" };
        },
        k = function(e) {
          return function(t) {
            t(_(e.id)), t(C(e));
          };
        },
        C = function(e) {
          return { type: "add movie to selection", selected: e };
        },
        _ = function(e) {
          return function(t) {
            return (
              console.log("".concat(y, "?movie=").concat(e)),
              fetch("".concat(y, "?movie=").concat(e), {
                credentials: "same-origin"
              })
                .then(function(t) {
                  return { type: "prefetch movie", movie: e };
                })
                .catch(function(e) {
                  console.log(e),
                    console.log("something went wrong with prefetch");
                })
            );
          };
        },
        S = function(e) {
          return {
            type: "got venn results",
            results: e,
            receivedAt: Date.now()
          };
        },
        A = function() {
          return { type: "start venn" };
        },
        R = function() {
          return { type: "failed venn" };
        },
        N = function() {
          return { type: "clear all unchosen movies" };
        },
        T = function() {
          return { type: "clear all selected movies" };
        },
        D = n(323),
        W = n(327),
        I = n(326),
        M =
          Object(f.b)(function(e) {
            return {
              movies: e.movies,
              overlap_movies: e.overlap.movies,
              overlap_actors: e.overlap.actors,
              loading: e.overlap.loading
            };
          })(
            (a = (function(e) {
              function t() {
                return (
                  Object(h.a)(this, t),
                  Object(d.a)(this, Object(p.a)(t).apply(this, arguments))
                );
              }
              return (
                Object(v.a)(t, e),
                Object(m.a)(t, [
                  {
                    key: "handleVenn",
                    value: function() {
                      var e;
                      (0, this.props.dispatch)(
                        ((e = this.props.movies.chosen),
                        function(t) {
                          t(A());
                          var n = e.map(function(e) {
                            return "movies=".concat(e);
                          });
                          return (
                            (n = n.join("&")),
                            console.log("".concat(E, "?").concat(n)),
                            fetch("".concat(E, "?").concat(n), {
                              credentials: "same-origin"
                            })
                              .then(function(e) {
                                if (e.status >= 400 && e.status < 600)
                                  throw new Error("Uhhh... IDK? No  movie");
                                return e.json();
                              })
                              .then(function(e) {
                                console.log(e), t(S(e));
                              })
                              .catch(function(e) {
                                t(R()),
                                  console.log(e),
                                  console.log("something went wrong");
                              })
                          );
                        })
                      );
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      var e = "",
                        t = this.props.movies.chosen.length < 2;
                      if (this.props.overlap_movies.length) {
                        var n = Math.floor(
                            14 / this.props.overlap_movies.length
                          ),
                          a = this.props.overlap_movies.map(function(e) {
                            return i.a.createElement(
                              D.a.HeaderCell,
                              { width: "".concat(n), key: e.id },
                              i.a.createElement("img", {
                                alt: e.title,
                                src: e.image,
                                height: "54",
                                width: "40"
                              }),
                              " ",
                              i.a.createElement(
                                "a",
                                {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  href: e.url
                                },
                                e.title
                              ),
                              " ",
                              "- ",
                              e.kind
                            );
                          }),
                          r = i.a.createElement(
                            D.a.Row,
                            null,
                            i.a.createElement(D.a.Cell, null, "No overlap")
                          );
                        this.props.overlap_actors.length &&
                          (r = this.props.overlap_actors.map(function(e, t) {
                            var n = i.a.createElement(
                                D.a.Cell,
                                { key: e[0].id },
                                i.a.createElement(
                                  "a",
                                  {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    href: e[0].url
                                  },
                                  e[0].actor
                                )
                              ),
                              a = e.map(function(e, t) {
                                return i.a.createElement(
                                  D.a.Cell,
                                  {
                                    key: "".concat(e.character, "-").concat(t)
                                  },
                                  e.character
                                );
                              });
                            return i.a.createElement(D.a.Row, { key: t }, n, a);
                          })),
                          (e = i.a.createElement(
                            D.a,
                            { color: "teal", compact: !0, celled: !0 },
                            i.a.createElement(
                              D.a.Header,
                              null,
                              i.a.createElement(
                                D.a.Row,
                                null,
                                i.a.createElement(
                                  D.a.HeaderCell,
                                  { width: 2 },
                                  "Actor"
                                ),
                                a
                              )
                            ),
                            i.a.createElement(D.a.Body, null, r)
                          ));
                      }
                      return i.a.createElement(
                        "div",
                        { className: "section" },
                        i.a.createElement(
                          W.a,
                          { color: "teal", as: "h2" },
                          "Character Overlap",
                          i.a.createElement(
                            I.a,
                            {
                              className: "section-button",
                              color: "teal",
                              disabled: t,
                              loading: this.props.loading,
                              onClick: this.handleVenn.bind(this)
                            },
                            " ",
                            "Calculate"
                          )
                        ),
                        e
                      );
                    }
                  }
                ]),
                t
              );
            })(l.Component))
          ) || a,
        B = n(321),
        F = n(325),
        U = n(159),
        V = n.n(U),
        H = (function(e) {
          function t() {
            return (
              Object(h.a)(this, t),
              Object(d.a)(this, Object(p.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(v.a)(t, e),
            Object(m.a)(t, [
              {
                key: "render",
                value: function() {
                  return i.a.createElement(
                    "div",
                    null,
                    i.a.createElement(
                      "label",
                      { htmlFor: "m_search" },
                      "Search Movie or TV show "
                    ),
                    i.a.createElement(B.a, null, i.a.createElement(K, null))
                  );
                }
              }
            ]),
            t
          );
        })(l.Component),
        K =
          Object(f.b)(function(e) {
            return { search_results: e.search_results };
          })(
            (r = (function(e) {
              function t() {
                var e, n;
                Object(h.a)(this, t);
                for (
                  var a = arguments.length, r = new Array(a), o = 0;
                  o < a;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((n = Object(d.a)(
                    this,
                    (e = Object(p.a)(t)).call.apply(e, [this].concat(r))
                  )).resetComponent = function() {
                    var e = n.props.dispatch;
                    n.setState({ isLoading: !1, value: "", showNoResults: !1 }),
                      e(w());
                  }),
                  (n.handleChange = function(e, t) {
                    var a = t.value;
                    n.setState({ value: a }), n.search();
                  }),
                  (n.handleSearch = function(e) {
                    13 === e.charCode && n.search();
                  }),
                  (n.search = V.a.debounce(
                    function() {
                      var e = n.props.dispatch;
                      e(w()), e(O(n.state.value));
                    },
                    1e3,
                    { leading: !0, trailing: !0 }
                  )),
                  (n.handleSelect = function(e, t) {
                    var a = t.result;
                    (0, n.props.dispatch)(k(a)), n.resetComponent();
                  }),
                  n
                );
              }
              return (
                Object(v.a)(t, e),
                Object(m.a)(t, [
                  {
                    key: "componentWillMount",
                    value: function() {
                      this.resetComponent();
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      return i.a.createElement(F.a, {
                        input: { fluid: !0 },
                        fluid: !0,
                        loading: this.props.search_results.loading,
                        onResultSelect: this.handleSelect,
                        onKeyPress: this.handleSearch,
                        onSearchChange: this.handleChange,
                        showNoResults: this.state.showNoResults,
                        results: this.props.search_results.movies,
                        resultRenderer: P,
                        value: this.state.value
                      });
                    }
                  }
                ]),
                t
              );
            })(l.Component))
          ) || r,
        P = function(e) {
          return i.a.createElement(
            "span",
            null,
            i.a.createElement("span", { key: e.id }, e.title),
            " - ",
            i.a.createElement("span", null, e.kind)
          );
        },
        x = n(324),
        z = n(322),
        G =
          Object(f.b)(function(e) {
            return { movies: e.movies };
          })(
            (o = (function(e) {
              function t() {
                var e, n;
                Object(h.a)(this, t);
                for (
                  var a = arguments.length, r = new Array(a), o = 0;
                  o < a;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((n = Object(d.a)(
                    this,
                    (e = Object(p.a)(t)).call.apply(e, [this].concat(r))
                  )).handleClearUnselected = function(e) {
                    (0, n.props.dispatch)(N());
                  }),
                  (n.handleClearAll = function(e) {
                    (0, n.props.dispatch)(T());
                  }),
                  n
                );
              }
              return (
                Object(v.a)(t, e),
                Object(m.a)(t, [
                  {
                    key: "render",
                    value: function() {
                      var e = this,
                        t = this.props.movies.selected.map(function(t) {
                          var n = e.props.movies.chosen.includes(t.id);
                          return i.a.createElement(J, {
                            mid: t.id,
                            key: "".concat(t.title, "_movie"),
                            title: t.title,
                            kind: t.kind,
                            selected: n
                          });
                        });
                      return (
                        t.length || (t = "please search for a movie"),
                        i.a.createElement(
                          "div",
                          { className: "section" },
                          i.a.createElement(
                            W.a,
                            { color: "teal", as: "h2" },
                            "Movies",
                            " ",
                            i.a.createElement(
                              I.a,
                              {
                                basic: !0,
                                className: "section-button",
                                onClick: this.handleClearAll
                              },
                              "Remove All"
                            ),
                            i.a.createElement(
                              I.a,
                              {
                                basic: !0,
                                className: "section-button",
                                onClick: this.handleClearUnselected
                              },
                              "Remove Unselected"
                            )
                          ),
                          i.a.createElement(x.a, { relaxed: !0 }, t)
                        )
                      );
                    }
                  }
                ]),
                t
              );
            })(l.Component))
          ) || o,
        J =
          Object(f.b)(function(e) {
            return {};
          })(
            (c = (function(e) {
              function t() {
                var e, n;
                Object(h.a)(this, t);
                for (
                  var a = arguments.length, r = new Array(a), o = 0;
                  o < a;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((n = Object(d.a)(
                    this,
                    (e = Object(p.a)(t)).call.apply(e, [this].concat(r))
                  )).state = { checked: !1 }),
                  n
                );
              }
              return (
                Object(v.a)(t, e),
                Object(m.a)(t, [
                  {
                    key: "handleCheck",
                    value: function(e) {
                      var t = this.props.dispatch;
                      this.setState({ checked: !this.state.checked }),
                        this.state.checked
                          ? t({
                              type: "add movie to chosen for venn",
                              chosen: this.props.mid
                            })
                          : t(
                              (function(e) {
                                return {
                                  type: "remove movie from chosen for venn",
                                  unchosen: e
                                };
                              })(this.props.mid)
                            );
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      var e = ""
                        .concat(this.props.title, " - ")
                        .concat(this.props.kind);
                      return i.a.createElement(
                        x.a.Item,
                        null,
                        i.a.createElement(z.a, {
                          onClick: this.handleCheck.bind(this),
                          label: e,
                          defaultChecked: this.props.selected
                        })
                      );
                    }
                  }
                ]),
                t
              );
            })(l.Component))
          ) || c,
        L = n(328),
        q = n(329),
        $ = n(36);
      function Q() {
        return i.a.createElement(
          L.a,
          { vertical: !0, id: "footer" },
          i.a.createElement(
            B.a,
            { id: "footer-container" },
            i.a.createElement(
              q.a,
              { stackable: !0 },
              i.a.createElement(
                q.a.Row,
                null,
                i.a.createElement(
                  q.a.Column,
                  { width: 6 },
                  i.a.createElement(
                    "p",
                    null,
                    i.a.createElement($.a, { name: "github square" }),
                    i.a.createElement(
                      "a",
                      { href: "https://github.com/csweaver/cast_overlap" },
                      "source"
                    )
                  )
                ),
                i.a.createElement(
                  q.a.Column,
                  { width: 6 },
                  i.a.createElement(
                    "p",
                    null,
                    " \xa9 2019 - 2020 \xa0 Charlotte Weaver"
                  )
                )
              )
            )
          )
        );
      }
      var X = (function(e) {
        function t() {
          return (
            Object(h.a)(this, t),
            Object(d.a)(this, Object(p.a)(t).apply(this, arguments))
          );
        }
        return (
          Object(v.a)(t, e),
          Object(m.a)(t, [
            {
              key: "render",
              value: function() {
                return i.a.createElement(
                  "div",
                  { id: "app", className: "App" },
                  i.a.createElement(
                    B.a,
                    { id: "main" },
                    i.a.createElement(
                      W.a,
                      { as: "h1", dividing: !0, color: "teal" },
                      "IMDB Venn Diagram"
                    ),
                    i.a.createElement(
                      "p",
                      null,
                      "Figure out which actors overlap in the movies and TV shows that you watch? Think of it like the center of a venn diagram. Search for and select two or more movies/tv shows/video games and then calculate the overlap; sometimes it can surprise you."
                    ),
                    i.a.createElement("p", null, "Suggested searches:"),
                    i.a.createElement(
                      "ul",
                      null,
                      i.a.createElement(
                        "li",
                        null,
                        i.a.createElement(
                          "i",
                          null,
                          "Three Flavours Cornetto "
                        ),
                        "Shaun of the Dead, Hot Fuzz, & The World's End (8 actors)"
                      ),
                      i.a.createElement(
                        "li",
                        null,
                        i.a.createElement(
                          "i",
                          null,
                          "Early vs. Late Wes Anderson "
                        ),
                        "The Royal Tenenbaums & Isle of Dogs (3 actors)"
                      ),
                      i.a.createElement(
                        "li",
                        null,
                        i.a.createElement(
                          "i",
                          null,
                          "From Baltimore to Westeros "
                        ),
                        '"The Wire" & "Game of Thrones (1 actor)'
                      ),
                      i.a.createElement(
                        "li",
                        null,
                        i.a.createElement(
                          "i",
                          null,
                          "A spinoff with doppelgangers "
                        ),
                        '"Grey\'s Anatomy" &"Private Practice" (302 actors - but not in the same roles)'
                      )
                    ),
                    i.a.createElement(H, null),
                    i.a.createElement(G, null),
                    i.a.createElement(M, null)
                  ),
                  i.a.createElement(Q, null)
                );
              }
            }
          ]),
          t
        );
      })(l.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      var Y = n(34),
        Z = n(163),
        ee = n(17),
        te = Object(Y.combineReducers)({
          search_results: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { movies: [], loading: !1, error: !1 },
              t = arguments.length > 1 ? arguments[1] : void 0;
            if ("start searching for movie" === t.type)
              return Object(ee.a)({}, e, { loading: !0, error: !1 });
            if ("got movie search results" === t.type) {
              var n = e.movies;
              return (
                (n = n.concat(t.movies)),
                Object(ee.a)({}, e, { movies: n, loading: !1 })
              );
            }
            if ("failed searching for movie" === t.type)
              return Object(ee.a)({}, e, { loading: !1, error: !0 });
            if ("clear movie search results" === t.type)
              return Object(ee.a)({}, e, { movies: [] });
            return e;
          },
          movies: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { selected: [], chosen: [] },
              t = arguments.length > 1 ? arguments[1] : void 0;
            if ("add movie to selection" === t.type) {
              var n = e.selected,
                a = e.chosen;
              return (
                n.push(t.selected),
                a.push(t.selected.id),
                Object(ee.a)({}, e, { selected: n, chosen: a })
              );
            }
            if ("remove movie from selection" === t.type) {
              var r = e.selected;
              return (
                (r = r.filter(function(e) {
                  return e.id !== t.deselected;
                })),
                Object(ee.a)({}, e, { selected: r })
              );
            }
            if ("add movie to chosen for venn" === t.type) {
              var o = e.chosen;
              return o.push(t.chosen), Object(ee.a)({}, e, { chosen: o });
            }
            if ("remove movie from chosen for venn" === t.type) {
              var c = e.chosen;
              return (
                (c = c.filter(function(e) {
                  return e !== t.unchosen;
                })),
                Object(ee.a)({}, e, { chosen: c })
              );
            }
            if ("clear all unchosen movies" === t.type) {
              var l = e.selected.filter(function(t) {
                return e.chosen.includes(t.id);
              });
              return Object(ee.a)({}, e, { selected: l });
            }
            return "clear all selected movies" === t.type
              ? Object(ee.a)({}, e, { chosen: [], selected: [] })
              : e;
          },
          overlap: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { movies: [], actors: [], loading: !1, error: !1 },
              t = arguments.length > 1 ? arguments[1] : void 0;
            return "got venn results" === t.type
              ? Object(ee.a)({}, e, {
                  movies: t.results.movies,
                  actors: t.results.actors,
                  loading: !1
                })
              : "start venn" === t.type
              ? Object(ee.a)({}, e, { loading: !0, error: !1 })
              : "failed venn" === t.type
              ? Object(ee.a)({}, e, { loading: !1, error: !0 })
              : e;
          }
        }),
        ne = n(164),
        ae = Object(Y.createStore)(
          te,
          Object(ne.composeWithDevTools)(Object(Y.applyMiddleware)(Z.a))
        );
      u.a.render(
        i.a.createElement(f.a, { store: ae }, i.a.createElement(X, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    }
  },
  [[175, 1, 2]]
]);
//# sourceMappingURL=main.bfe64049.chunk.js.map
