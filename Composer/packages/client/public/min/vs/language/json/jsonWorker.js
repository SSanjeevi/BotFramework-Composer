/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-json version: 2.8.0(3bbef09ccfb2501e6e07453686a994c4cd1ce5b7)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-json/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
!(function (e) {
  if ('object' == typeof module && 'object' == typeof module.exports) {
    var t = e(require, exports);
    void 0 !== t && (module.exports = t);
  } else 'function' == typeof define && define.amd && define('jsonc-parser/impl/scanner', ['require', 'exports'], e);
})(function (e, t) {
  'use strict';
  function n(e) {
    return (
      32 === e ||
      9 === e ||
      11 === e ||
      12 === e ||
      160 === e ||
      5760 === e ||
      (e >= 8192 && e <= 8203) ||
      8239 === e ||
      8287 === e ||
      12288 === e ||
      65279 === e
    );
  }
  function r(e) {
    return 10 === e || 13 === e || 8232 === e || 8233 === e;
  }
  function o(e) {
    return e >= 48 && e <= 57;
  }
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.createScanner = function (e, t) {
      void 0 === t && (t = !1);
      var i = e.length,
        a = 0,
        s = '',
        c = 0,
        u = 16,
        f = 0,
        l = 0,
        d = 0,
        p = 0,
        h = 0;
      function m(t, n) {
        for (var r = 0, o = 0; r < t || !n; ) {
          var i = e.charCodeAt(a);
          if (i >= 48 && i <= 57) o = 16 * o + i - 48;
          else if (i >= 65 && i <= 70) o = 16 * o + i - 65 + 10;
          else {
            if (!(i >= 97 && i <= 102)) break;
            o = 16 * o + i - 97 + 10;
          }
          a++, r++;
        }
        return r < t && (o = -1), o;
      }
      function g() {
        if (((s = ''), (h = 0), (c = a), (l = f), (p = d), a >= i)) return (c = i), (u = 17);
        var t = e.charCodeAt(a);
        if (n(t)) {
          do {
            a++, (s += String.fromCharCode(t)), (t = e.charCodeAt(a));
          } while (n(t));
          return (u = 15);
        }
        if (r(t))
          return (
            a++,
            (s += String.fromCharCode(t)),
            13 === t && 10 === e.charCodeAt(a) && (a++, (s += '\n')),
            f++,
            (d = a),
            (u = 14)
          );
        switch (t) {
          case 123:
            return a++, (u = 1);
          case 125:
            return a++, (u = 2);
          case 91:
            return a++, (u = 3);
          case 93:
            return a++, (u = 4);
          case 58:
            return a++, (u = 6);
          case 44:
            return a++, (u = 5);
          case 34:
            return (
              a++,
              (s = (function () {
                for (var t = '', n = a; ; ) {
                  if (a >= i) {
                    (t += e.substring(n, a)), (h = 2);
                    break;
                  }
                  var o = e.charCodeAt(a);
                  if (34 === o) {
                    (t += e.substring(n, a)), a++;
                    break;
                  }
                  if (92 !== o) {
                    if (o >= 0 && o <= 31) {
                      if (r(o)) {
                        (t += e.substring(n, a)), (h = 2);
                        break;
                      }
                      h = 6;
                    }
                    a++;
                  } else {
                    if (((t += e.substring(n, a)), ++a >= i)) {
                      h = 2;
                      break;
                    }
                    switch (e.charCodeAt(a++)) {
                      case 34:
                        t += '"';
                        break;
                      case 92:
                        t += '\\';
                        break;
                      case 47:
                        t += '/';
                        break;
                      case 98:
                        t += '\b';
                        break;
                      case 102:
                        t += '\f';
                        break;
                      case 110:
                        t += '\n';
                        break;
                      case 114:
                        t += '\r';
                        break;
                      case 116:
                        t += '\t';
                        break;
                      case 117:
                        var s = m(4, !0);
                        s >= 0 ? (t += String.fromCharCode(s)) : (h = 4);
                        break;
                      default:
                        h = 5;
                    }
                    n = a;
                  }
                }
                return t;
              })()),
              (u = 10)
            );
          case 47:
            var g = a - 1;
            if (47 === e.charCodeAt(a + 1)) {
              for (a += 2; a < i && !r(e.charCodeAt(a)); ) a++;
              return (s = e.substring(g, a)), (u = 12);
            }
            if (42 === e.charCodeAt(a + 1)) {
              a += 2;
              for (var y = i - 1, b = !1; a < y; ) {
                var x = e.charCodeAt(a);
                if (42 === x && 47 === e.charCodeAt(a + 1)) {
                  (a += 2), (b = !0);
                  break;
                }
                a++, r(x) && (13 === x && 10 === e.charCodeAt(a) && a++, f++, (d = a));
              }
              return b || (a++, (h = 1)), (s = e.substring(g, a)), (u = 13);
            }
            return (s += String.fromCharCode(t)), a++, (u = 16);
          case 45:
            if (((s += String.fromCharCode(t)), ++a === i || !o(e.charCodeAt(a)))) return (u = 16);
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return (
              (s += (function () {
                var t = a;
                if (48 === e.charCodeAt(a)) a++;
                else for (a++; a < e.length && o(e.charCodeAt(a)); ) a++;
                if (a < e.length && 46 === e.charCodeAt(a)) {
                  if (!(++a < e.length && o(e.charCodeAt(a)))) return (h = 3), e.substring(t, a);
                  for (a++; a < e.length && o(e.charCodeAt(a)); ) a++;
                }
                var n = a;
                if (a < e.length && (69 === e.charCodeAt(a) || 101 === e.charCodeAt(a)))
                  if (
                    (((++a < e.length && 43 === e.charCodeAt(a)) || 45 === e.charCodeAt(a)) && a++,
                    a < e.length && o(e.charCodeAt(a)))
                  ) {
                    for (a++; a < e.length && o(e.charCodeAt(a)); ) a++;
                    n = a;
                  } else h = 3;
                return e.substring(t, n);
              })()),
              (u = 11)
            );
          default:
            for (; a < i && v(t); ) a++, (t = e.charCodeAt(a));
            if (c !== a) {
              switch ((s = e.substring(c, a))) {
                case 'true':
                  return (u = 8);
                case 'false':
                  return (u = 9);
                case 'null':
                  return (u = 7);
              }
              return (u = 16);
            }
            return (s += String.fromCharCode(t)), a++, (u = 16);
        }
      }
      function v(e) {
        if (n(e) || r(e)) return !1;
        switch (e) {
          case 125:
          case 93:
          case 123:
          case 91:
          case 34:
          case 58:
          case 44:
          case 47:
            return !1;
        }
        return !0;
      }
      return {
        setPosition: function (e) {
          (a = e), (s = ''), (c = 0), (u = 16), (h = 0);
        },
        getPosition: function () {
          return a;
        },
        scan: t
          ? function () {
              var e;
              do {
                e = g();
              } while (e >= 12 && e <= 15);
              return e;
            }
          : g,
        getToken: function () {
          return u;
        },
        getTokenValue: function () {
          return s;
        },
        getTokenOffset: function () {
          return c;
        },
        getTokenLength: function () {
          return a - c;
        },
        getTokenStartLine: function () {
          return l;
        },
        getTokenStartCharacter: function () {
          return c - p;
        },
        getTokenError: function () {
          return h;
        },
      };
    });
}),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('jsonc-parser/impl/format', ['require', 'exports', './scanner'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('./scanner');
    function r(e, t) {
      for (var n = '', r = 0; r < t; r++) n += e;
      return n;
    }
    function o(e, t) {
      return -1 !== '\r\n'.indexOf(e.charAt(t));
    }
    (t.format = function (e, t, i) {
      var a, s, c, u, f;
      if (t) {
        for (u = t.offset, f = u + t.length, c = u; c > 0 && !o(e, c - 1); ) c--;
        for (var l = f; l < e.length && !o(e, l); ) l++;
        (s = e.substring(c, l)),
          (a = (function (e, t) {
            var n = 0,
              r = 0,
              o = t.tabSize || 4;
            for (; n < e.length; ) {
              var i = e.charAt(n);
              if (' ' === i) r++;
              else {
                if ('\t' !== i) break;
                r += o;
              }
              n++;
            }
            return Math.floor(r / o);
          })(s, i));
      } else (s = e), (a = 0), (c = 0), (u = 0), (f = e.length);
      var d,
        p = (function (e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t.charAt(n);
            if ('\r' === r) return n + 1 < t.length && '\n' === t.charAt(n + 1) ? '\r\n' : '\r';
            if ('\n' === r) return '\n';
          }
          return (e && e.eol) || '\n';
        })(i, e),
        h = !1,
        m = 0;
      d = i.insertSpaces ? r(' ', i.tabSize || 4) : '\t';
      var g = n.createScanner(s, !1),
        v = !1;
      function y() {
        return p + r(d, a + m);
      }
      function b() {
        var e = g.scan();
        for (h = !1; 15 === e || 14 === e; ) (h = h || 14 === e), (e = g.scan());
        return (v = 16 === e || 0 !== g.getTokenError()), e;
      }
      var x = [];
      function S(t, n, r) {
        !v && n < f && r > u && e.substring(n, r) !== t && x.push({ offset: n, length: r - n, content: t });
      }
      var C = b();
      if (17 !== C) {
        var j = g.getTokenOffset() + c;
        S(r(d, a), c, j);
      }
      for (; 17 !== C; ) {
        for (var T = g.getTokenOffset() + g.getTokenLength() + c, k = b(), O = ''; !h && (12 === k || 13 === k); ) {
          S(' ', T, g.getTokenOffset() + c),
            (T = g.getTokenOffset() + g.getTokenLength() + c),
            (O = 12 === k ? y() : ''),
            (k = b());
        }
        if (2 === k) 1 !== C && (m--, (O = y()));
        else if (4 === k) 3 !== C && (m--, (O = y()));
        else {
          switch (C) {
            case 3:
            case 1:
              m++, (O = y());
              break;
            case 5:
            case 12:
              O = y();
              break;
            case 13:
              O = h ? y() : ' ';
              break;
            case 6:
              O = ' ';
              break;
            case 10:
              if (6 === k) {
                O = '';
                break;
              }
            case 7:
            case 8:
            case 9:
            case 11:
            case 2:
            case 4:
              12 === k || 13 === k ? (O = ' ') : 5 !== k && 17 !== k && (v = !0);
              break;
            case 16:
              v = !0;
          }
          !h || (12 !== k && 13 !== k) || (O = y());
        }
        S(O, T, g.getTokenOffset() + c), (C = k);
      }
      return x;
    }),
      (t.isEOL = o);
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('jsonc-parser/impl/parser', ['require', 'exports', './scanner'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n,
      r = e('./scanner');
    function o(e, t, n) {
      return void 0 === n && (n = !1), (t >= e.offset && t < e.offset + e.length) || (n && t === e.offset + e.length);
    }
    function i(e, t, o) {
      void 0 === o && (o = n.DEFAULT);
      var i = r.createScanner(e, !1);
      function a(e) {
        return e
          ? function () {
              return e(i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter());
            }
          : function () {
              return !0;
            };
      }
      function s(e) {
        return e
          ? function (t) {
              return e(t, i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter());
            }
          : function () {
              return !0;
            };
      }
      var c = a(t.onObjectBegin),
        u = s(t.onObjectProperty),
        f = a(t.onObjectEnd),
        l = a(t.onArrayBegin),
        d = a(t.onArrayEnd),
        p = s(t.onLiteralValue),
        h = s(t.onSeparator),
        m = a(t.onComment),
        g = s(t.onError),
        v = o && o.disallowComments,
        y = o && o.allowTrailingComma;
      function b() {
        for (;;) {
          var e = i.scan();
          switch (i.getTokenError()) {
            case 4:
              x(14);
              break;
            case 5:
              x(15);
              break;
            case 3:
              x(13);
              break;
            case 1:
              v || x(11);
              break;
            case 2:
              x(12);
              break;
            case 6:
              x(16);
          }
          switch (e) {
            case 12:
            case 13:
              v ? x(10) : m();
              break;
            case 16:
              x(1);
              break;
            case 15:
            case 14:
              break;
            default:
              return e;
          }
        }
      }
      function x(e, t, n) {
        if ((void 0 === t && (t = []), void 0 === n && (n = []), g(e), t.length + n.length > 0))
          for (var r = i.getToken(); 17 !== r; ) {
            if (-1 !== t.indexOf(r)) {
              b();
              break;
            }
            if (-1 !== n.indexOf(r)) break;
            r = b();
          }
      }
      function S(e) {
        var t = i.getTokenValue();
        return e ? p(t) : u(t), b(), !0;
      }
      function C() {
        switch (i.getToken()) {
          case 3:
            return (function () {
              l(), b();
              for (var e = !1; 4 !== i.getToken() && 17 !== i.getToken(); ) {
                if (5 === i.getToken()) {
                  if ((e || x(4, [], []), h(','), b(), 4 === i.getToken() && y)) break;
                } else e && x(6, [], []);
                C() || x(4, [], [4, 5]), (e = !0);
              }
              return d(), 4 !== i.getToken() ? x(8, [4], []) : b(), !0;
            })();
          case 1:
            return (function () {
              c(), b();
              for (var e = !1; 2 !== i.getToken() && 17 !== i.getToken(); ) {
                if (5 === i.getToken()) {
                  if ((e || x(4, [], []), h(','), b(), 2 === i.getToken() && y)) break;
                } else e && x(6, [], []);
                (10 !== i.getToken()
                  ? (x(3, [], [2, 5]), 0)
                  : (S(!1), 6 === i.getToken() ? (h(':'), b(), C() || x(4, [], [2, 5])) : x(5, [], [2, 5]), 1)) ||
                  x(4, [], [2, 5]),
                  (e = !0);
              }
              return f(), 2 !== i.getToken() ? x(7, [2], []) : b(), !0;
            })();
          case 10:
            return S(!0);
          default:
            return (function () {
              switch (i.getToken()) {
                case 11:
                  var e = 0;
                  try {
                    'number' != typeof (e = JSON.parse(i.getTokenValue())) && (x(2), (e = 0));
                  } catch (e) {
                    x(2);
                  }
                  p(e);
                  break;
                case 7:
                  p(null);
                  break;
                case 8:
                  p(!0);
                  break;
                case 9:
                  p(!1);
                  break;
                default:
                  return !1;
              }
              return b(), !0;
            })();
        }
      }
      return (
        b(),
        17 === i.getToken()
          ? !!o.allowEmptyContent || (x(4, [], []), !1)
          : C()
          ? (17 !== i.getToken() && x(9, [], []), !0)
          : (x(4, [], []), !1)
      );
    }
    function a(e) {
      switch (typeof e) {
        case 'boolean':
          return 'boolean';
        case 'number':
          return 'number';
        case 'string':
          return 'string';
        case 'object':
          return e ? (Array.isArray(e) ? 'array' : 'object') : 'null';
        default:
          return 'null';
      }
    }
    !(function (e) {
      e.DEFAULT = { allowTrailingComma: !1 };
    })(n || (n = {})),
      (t.getLocation = function (e, t) {
        var n = [],
          r = new Object(),
          o = void 0,
          s = { value: {}, offset: 0, length: 0, type: 'object', parent: void 0 },
          c = !1;
        function u(e, t, n, r) {
          (s.value = e), (s.offset = t), (s.length = n), (s.type = r), (s.colonOffset = void 0), (o = s);
        }
        try {
          i(e, {
            onObjectBegin: function (e, i) {
              if (t <= e) throw r;
              (o = void 0), (c = t > e), n.push('');
            },
            onObjectProperty: function (e, o, i) {
              if (t < o) throw r;
              if ((u(e, o, i, 'property'), (n[n.length - 1] = e), t <= o + i)) throw r;
            },
            onObjectEnd: function (e, i) {
              if (t <= e) throw r;
              (o = void 0), n.pop();
            },
            onArrayBegin: function (e, i) {
              if (t <= e) throw r;
              (o = void 0), n.push(0);
            },
            onArrayEnd: function (e, i) {
              if (t <= e) throw r;
              (o = void 0), n.pop();
            },
            onLiteralValue: function (e, n, o) {
              if (t < n) throw r;
              if ((u(e, n, o, a(e)), t <= n + o)) throw r;
            },
            onSeparator: function (e, i, a) {
              if (t <= i) throw r;
              if (':' === e && o && 'property' === o.type) (o.colonOffset = i), (c = !1), (o = void 0);
              else if (',' === e) {
                var s = n[n.length - 1];
                'number' == typeof s ? (n[n.length - 1] = s + 1) : ((c = !0), (n[n.length - 1] = '')), (o = void 0);
              }
            },
          });
        } catch (e) {
          if (e !== r) throw e;
        }
        return {
          path: n,
          previousNode: o,
          isAtPropertyKey: c,
          matches: function (e) {
            for (var t = 0, r = 0; t < e.length && r < n.length; r++)
              if (e[t] === n[r] || '*' === e[t]) t++;
              else if ('**' !== e[t]) return !1;
            return t === e.length;
          },
        };
      }),
      (t.parse = function (e, t, r) {
        void 0 === t && (t = []), void 0 === r && (r = n.DEFAULT);
        var o = null,
          a = [],
          s = [];
        function c(e) {
          Array.isArray(a) ? a.push(e) : null !== o && (a[o] = e);
        }
        return (
          i(
            e,
            {
              onObjectBegin: function () {
                var e = {};
                c(e), s.push(a), (a = e), (o = null);
              },
              onObjectProperty: function (e) {
                o = e;
              },
              onObjectEnd: function () {
                a = s.pop();
              },
              onArrayBegin: function () {
                var e = [];
                c(e), s.push(a), (a = e), (o = null);
              },
              onArrayEnd: function () {
                a = s.pop();
              },
              onLiteralValue: c,
              onError: function (e, n, r) {
                t.push({ error: e, offset: n, length: r });
              },
            },
            r
          ),
          a[0]
        );
      }),
      (t.parseTree = function (e, t, r) {
        void 0 === t && (t = []), void 0 === r && (r = n.DEFAULT);
        var o = { type: 'array', offset: -1, length: -1, children: [], parent: void 0 };
        function s(e) {
          'property' === o.type && ((o.length = e - o.offset), (o = o.parent));
        }
        function c(e) {
          return o.children.push(e), e;
        }
        i(
          e,
          {
            onObjectBegin: function (e) {
              o = c({ type: 'object', offset: e, length: -1, parent: o, children: [] });
            },
            onObjectProperty: function (e, t, n) {
              (o = c({ type: 'property', offset: t, length: -1, parent: o, children: [] })).children.push({
                type: 'string',
                value: e,
                offset: t,
                length: n,
                parent: o,
              });
            },
            onObjectEnd: function (e, t) {
              (o.length = e + t - o.offset), (o = o.parent), s(e + t);
            },
            onArrayBegin: function (e, t) {
              o = c({ type: 'array', offset: e, length: -1, parent: o, children: [] });
            },
            onArrayEnd: function (e, t) {
              (o.length = e + t - o.offset), (o = o.parent), s(e + t);
            },
            onLiteralValue: function (e, t, n) {
              c({ type: a(e), offset: t, length: n, parent: o, value: e }), s(t + n);
            },
            onSeparator: function (e, t, n) {
              'property' === o.type && (':' === e ? (o.colonOffset = t) : ',' === e && s(t));
            },
            onError: function (e, n, r) {
              t.push({ error: e, offset: n, length: r });
            },
          },
          r
        );
        var u = o.children[0];
        return u && delete u.parent, u;
      }),
      (t.findNodeAtLocation = function (e, t) {
        if (e) {
          for (var n = e, r = 0, o = t; r < o.length; r++) {
            var i = o[r];
            if ('string' == typeof i) {
              if ('object' !== n.type || !Array.isArray(n.children)) return;
              for (var a = !1, s = 0, c = n.children; s < c.length; s++) {
                var u = c[s];
                if (Array.isArray(u.children) && u.children[0].value === i) {
                  (n = u.children[1]), (a = !0);
                  break;
                }
              }
              if (!a) return;
            } else {
              var f = i;
              if ('array' !== n.type || f < 0 || !Array.isArray(n.children) || f >= n.children.length) return;
              n = n.children[f];
            }
          }
          return n;
        }
      }),
      (t.getNodePath = function e(t) {
        if (!t.parent || !t.parent.children) return [];
        var n = e(t.parent);
        if ('property' === t.parent.type) {
          var r = t.parent.children[0].value;
          n.push(r);
        } else if ('array' === t.parent.type) {
          var o = t.parent.children.indexOf(t);
          -1 !== o && n.push(o);
        }
        return n;
      }),
      (t.getNodeValue = function e(t) {
        switch (t.type) {
          case 'array':
            return t.children.map(e);
          case 'object':
            for (var n = Object.create(null), r = 0, o = t.children; r < o.length; r++) {
              var i = o[r],
                a = i.children[1];
              a && (n[i.children[0].value] = e(a));
            }
            return n;
          case 'null':
          case 'string':
          case 'number':
          case 'boolean':
            return t.value;
          default:
            return;
        }
      }),
      (t.contains = o),
      (t.findNodeAtOffset = function e(t, n, r) {
        if ((void 0 === r && (r = !1), o(t, n, r))) {
          var i = t.children;
          if (Array.isArray(i))
            for (var a = 0; a < i.length && i[a].offset <= n; a++) {
              var s = e(i[a], n, r);
              if (s) return s;
            }
          return t;
        }
      }),
      (t.visit = i),
      (t.stripComments = function (e, t) {
        var n,
          o,
          i = r.createScanner(e),
          a = [],
          s = 0;
        do {
          switch (((o = i.getPosition()), (n = i.scan()))) {
            case 12:
            case 13:
            case 17:
              s !== o && a.push(e.substring(s, o)),
                void 0 !== t && a.push(i.getTokenValue().replace(/[^\r\n]/g, t)),
                (s = i.getPosition());
          }
        } while (17 !== n);
        return a.join('');
      }),
      (t.getNodeType = a);
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('jsonc-parser/impl/edit', ['require', 'exports', './format', './parser'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('./format'),
      r = e('./parser');
    function o(e, t, n, o, a) {
      for (
        var s, c = t.slice(), u = r.parseTree(e, []), f = void 0, l = void 0;
        c.length > 0 && ((l = c.pop()), void 0 === (f = r.findNodeAtLocation(u, c)) && void 0 !== n);

      )
        'string' == typeof l ? (((s = {})[l] = n), (n = s)) : (n = [n]);
      if (f) {
        if ('object' === f.type && 'string' == typeof l && Array.isArray(f.children)) {
          var d = r.findNodeAtLocation(f, [l]);
          if (void 0 !== d) {
            if (void 0 === n) {
              if (!d.parent) throw new Error('Malformed AST');
              var p = f.children.indexOf(d.parent),
                h = void 0,
                m = d.parent.offset + d.parent.length;
              if (p > 0) h = (S = f.children[p - 1]).offset + S.length;
              else if (((h = f.offset + 1), f.children.length > 1)) m = f.children[1].offset;
              return i(e, { offset: h, length: m - h, content: '' }, o);
            }
            return i(e, { offset: d.offset, length: d.length, content: JSON.stringify(n) }, o);
          }
          if (void 0 === n) return [];
          var g = JSON.stringify(l) + ': ' + JSON.stringify(n),
            v = a
              ? a(
                  f.children.map(function (e) {
                    return e.children[0].value;
                  })
                )
              : f.children.length,
            y = void 0;
          return i(
            e,
            (y =
              v > 0
                ? { offset: (S = f.children[v - 1]).offset + S.length, length: 0, content: ',' + g }
                : 0 === f.children.length
                ? { offset: f.offset + 1, length: 0, content: g }
                : { offset: f.offset + 1, length: 0, content: g + ',' }),
            o
          );
        }
        if ('array' === f.type && 'number' == typeof l && Array.isArray(f.children)) {
          if (-1 === l) {
            (g = '' + JSON.stringify(n)), (y = void 0);
            if (0 === f.children.length) y = { offset: f.offset + 1, length: 0, content: g };
            else y = { offset: (S = f.children[f.children.length - 1]).offset + S.length, length: 0, content: ',' + g };
            return i(e, y, o);
          }
          if (void 0 === n && f.children.length >= 0) {
            var b = l,
              x = f.children[b];
            y = void 0;
            if (1 === f.children.length) y = { offset: f.offset + 1, length: f.length - 2, content: '' };
            else if (f.children.length - 1 === b) {
              var S,
                C = (S = f.children[b - 1]).offset + S.length;
              y = { offset: C, length: f.offset + f.length - 2 - C, content: '' };
            } else y = { offset: x.offset, length: f.children[b + 1].offset - x.offset, content: '' };
            return i(e, y, o);
          }
          throw new Error('Array modification not supported yet');
        }
        throw new Error(
          'Can not add ' + ('number' != typeof l ? 'index' : 'property') + ' to parent of type ' + f.type
        );
      }
      if (void 0 === n) throw new Error('Can not delete in empty document');
      return i(e, { offset: u ? u.offset : 0, length: u ? u.length : 0, content: JSON.stringify(n) }, o);
    }
    function i(e, t, r) {
      var o = a(e, t),
        i = t.offset,
        s = t.offset + t.content.length;
      if (0 === t.length || 0 === t.content.length) {
        for (; i > 0 && !n.isEOL(o, i - 1); ) i--;
        for (; s < o.length && !n.isEOL(o, s); ) s++;
      }
      for (var c = n.format(o, { offset: i, length: s - i }, r), u = c.length - 1; u >= 0; u--) {
        var f = c[u];
        (o = a(o, f)),
          (i = Math.min(i, f.offset)),
          (s = Math.max(s, f.offset + f.length)),
          (s += f.content.length - f.length);
      }
      return [{ offset: i, length: e.length - (o.length - s) - i, content: o.substring(i, s) }];
    }
    function a(e, t) {
      return e.substring(0, t.offset) + t.content + e.substring(t.offset + t.length);
    }
    (t.removeProperty = function (e, t, n) {
      return o(e, t, void 0, n);
    }),
      (t.setProperty = o),
      (t.applyEdit = a),
      (t.isWS = function (e, t) {
        return -1 !== '\r\n \t'.indexOf(e.charAt(t));
      });
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('jsonc-parser/main', [
          'require',
          'exports',
          './impl/format',
          './impl/edit',
          './impl/scanner',
          './impl/parser',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('./impl/format'),
      r = e('./impl/edit'),
      o = e('./impl/scanner'),
      i = e('./impl/parser');
    (t.createScanner = o.createScanner),
      (t.getLocation = i.getLocation),
      (t.parse = i.parse),
      (t.parseTree = i.parseTree),
      (t.findNodeAtLocation = i.findNodeAtLocation),
      (t.findNodeAtOffset = i.findNodeAtOffset),
      (t.getNodePath = i.getNodePath),
      (t.getNodeValue = i.getNodeValue),
      (t.visit = i.visit),
      (t.stripComments = i.stripComments),
      (t.printParseErrorCode = function (e) {
        switch (e) {
          case 1:
            return 'InvalidSymbol';
          case 2:
            return 'InvalidNumberFormat';
          case 3:
            return 'PropertyNameExpected';
          case 4:
            return 'ValueExpected';
          case 5:
            return 'ColonExpected';
          case 6:
            return 'CommaExpected';
          case 7:
            return 'CloseBraceExpected';
          case 8:
            return 'CloseBracketExpected';
          case 9:
            return 'EndOfFileExpected';
          case 10:
            return 'InvalidCommentToken';
          case 11:
            return 'UnexpectedEndOfComment';
          case 12:
            return 'UnexpectedEndOfString';
          case 13:
            return 'UnexpectedEndOfNumber';
          case 14:
            return 'InvalidUnicode';
          case 15:
            return 'InvalidEscapeCharacter';
          case 16:
            return 'InvalidCharacter';
        }
        return '<unknown ParseErrorCode>';
      }),
      (t.format = function (e, t, r) {
        return n.format(e, t, r);
      }),
      (t.modify = function (e, t, n, o) {
        return r.setProperty(e, t, n, o.formattingOptions, o.getInsertionIndex);
      }),
      (t.applyEdits = function (e, t) {
        for (var n = t.length - 1; n >= 0; n--) e = r.applyEdit(e, t[n]);
        return e;
      });
  }),
  define('jsonc-parser', ['jsonc-parser/main'], function (e) {
    return e;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/utils/objects', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.equals = function e(t, n) {
        if (t === n) return !0;
        if (null == t || null == n) return !1;
        if (typeof t != typeof n) return !1;
        if ('object' != typeof t) return !1;
        if (Array.isArray(t) !== Array.isArray(n)) return !1;
        var r, o;
        if (Array.isArray(t)) {
          if (t.length !== n.length) return !1;
          for (r = 0; r < t.length; r++) if (!e(t[r], n[r])) return !1;
        } else {
          var i = [];
          for (o in t) i.push(o);
          i.sort();
          var a = [];
          for (o in n) a.push(o);
          if ((a.sort(), !e(i, a))) return !1;
          for (r = 0; r < i.length; r++) if (!e(t[i[r]], n[i[r]])) return !1;
        }
        return !0;
      }),
      (t.isNumber = function (e) {
        return 'number' == typeof e;
      }),
      (t.isDefined = function (e) {
        return void 0 !== e;
      }),
      (t.isBoolean = function (e) {
        return 'boolean' == typeof e;
      }),
      (t.isString = function (e) {
        return 'string' == typeof e;
      });
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-languageserver-types/main', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    var n, r, o, i, a, s, c, u, f, l, d, p, h;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (function (e) {
        (e.create = function (e, t) {
          return { line: e, character: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.objectLiteral(t) && S.number(t.line) && S.number(t.character);
          });
      })((n = t.Position || (t.Position = {}))),
      (function (e) {
        (e.create = function (e, t, r, o) {
          if (S.number(e) && S.number(t) && S.number(r) && S.number(o))
            return { start: n.create(e, t), end: n.create(r, o) };
          if (n.is(e) && n.is(t)) return { start: e, end: t };
          throw new Error('Range#create called with invalid arguments[' + e + ', ' + t + ', ' + r + ', ' + o + ']');
        }),
          (e.is = function (e) {
            var t = e;
            return S.objectLiteral(t) && n.is(t.start) && n.is(t.end);
          });
      })((r = t.Range || (t.Range = {}))),
      (function (e) {
        (e.create = function (e, t) {
          return { uri: e, range: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && r.is(t.range) && (S.string(t.uri) || S.undefined(t.uri));
          });
      })((o = t.Location || (t.Location = {}))),
      (function (e) {
        (e.create = function (e, t, n, r) {
          return { targetUri: e, targetRange: t, targetSelectionRange: n, originSelectionRange: r };
        }),
          (e.is = function (e) {
            var t = e;
            return (
              S.defined(t) &&
              r.is(t.targetRange) &&
              S.string(t.targetUri) &&
              (r.is(t.targetSelectionRange) || S.undefined(t.targetSelectionRange)) &&
              (r.is(t.originSelectionRange) || S.undefined(t.originSelectionRange))
            );
          });
      })(t.LocationLink || (t.LocationLink = {})),
      (function (e) {
        (e.create = function (e, t, n, r) {
          return { red: e, green: t, blue: n, alpha: r };
        }),
          (e.is = function (e) {
            var t = e;
            return S.number(t.red) && S.number(t.green) && S.number(t.blue) && S.number(t.alpha);
          });
      })((i = t.Color || (t.Color = {}))),
      (function (e) {
        (e.create = function (e, t) {
          return { range: e, color: t };
        }),
          (e.is = function (e) {
            var t = e;
            return r.is(t.range) && i.is(t.color);
          });
      })(t.ColorInformation || (t.ColorInformation = {})),
      (function (e) {
        (e.create = function (e, t, n) {
          return { label: e, textEdit: t, additionalTextEdits: n };
        }),
          (e.is = function (e) {
            var t = e;
            return (
              S.string(t.label) &&
              (S.undefined(t.textEdit) || u.is(t)) &&
              (S.undefined(t.additionalTextEdits) || S.typedArray(t.additionalTextEdits, u.is))
            );
          });
      })(t.ColorPresentation || (t.ColorPresentation = {})),
      (function (e) {
        (e.Comment = 'comment'), (e.Imports = 'imports'), (e.Region = 'region');
      })(t.FoldingRangeKind || (t.FoldingRangeKind = {})),
      (function (e) {
        (e.create = function (e, t, n, r, o) {
          var i = { startLine: e, endLine: t };
          return (
            S.defined(n) && (i.startCharacter = n),
            S.defined(r) && (i.endCharacter = r),
            S.defined(o) && (i.kind = o),
            i
          );
        }),
          (e.is = function (e) {
            var t = e;
            return (
              S.number(t.startLine) &&
              S.number(t.startLine) &&
              (S.undefined(t.startCharacter) || S.number(t.startCharacter)) &&
              (S.undefined(t.endCharacter) || S.number(t.endCharacter)) &&
              (S.undefined(t.kind) || S.string(t.kind))
            );
          });
      })(t.FoldingRange || (t.FoldingRange = {})),
      (function (e) {
        (e.create = function (e, t) {
          return { location: e, message: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && o.is(t.location) && S.string(t.message);
          });
      })((a = t.DiagnosticRelatedInformation || (t.DiagnosticRelatedInformation = {}))),
      (function (e) {
        (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
      })(t.DiagnosticSeverity || (t.DiagnosticSeverity = {})),
      (function (e) {
        (e.Unnecessary = 1), (e.Deprecated = 2);
      })(t.DiagnosticTag || (t.DiagnosticTag = {})),
      (function (e) {
        (e.create = function (e, t, n, r, o, i) {
          var a = { range: e, message: t };
          return (
            S.defined(n) && (a.severity = n),
            S.defined(r) && (a.code = r),
            S.defined(o) && (a.source = o),
            S.defined(i) && (a.relatedInformation = i),
            a
          );
        }),
          (e.is = function (e) {
            var t = e;
            return (
              S.defined(t) &&
              r.is(t.range) &&
              S.string(t.message) &&
              (S.number(t.severity) || S.undefined(t.severity)) &&
              (S.number(t.code) || S.string(t.code) || S.undefined(t.code)) &&
              (S.string(t.source) || S.undefined(t.source)) &&
              (S.undefined(t.relatedInformation) || S.typedArray(t.relatedInformation, a.is))
            );
          });
      })((s = t.Diagnostic || (t.Diagnostic = {}))),
      (function (e) {
        (e.create = function (e, t) {
          for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
          var o = { title: e, command: t };
          return S.defined(n) && n.length > 0 && (o.arguments = n), o;
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && S.string(t.title) && S.string(t.command);
          });
      })((c = t.Command || (t.Command = {}))),
      (function (e) {
        (e.replace = function (e, t) {
          return { range: e, newText: t };
        }),
          (e.insert = function (e, t) {
            return { range: { start: e, end: e }, newText: t };
          }),
          (e.del = function (e) {
            return { range: e, newText: '' };
          }),
          (e.is = function (e) {
            var t = e;
            return S.objectLiteral(t) && S.string(t.newText) && r.is(t.range);
          });
      })((u = t.TextEdit || (t.TextEdit = {}))),
      (function (e) {
        (e.create = function (e, t) {
          return { textDocument: e, edits: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && m.is(t.textDocument) && Array.isArray(t.edits);
          });
      })((f = t.TextDocumentEdit || (t.TextDocumentEdit = {}))),
      (function (e) {
        (e.create = function (e, t) {
          var n = { kind: 'create', uri: e };
          return void 0 === t || (void 0 === t.overwrite && void 0 === t.ignoreIfExists) || (n.options = t), n;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              t &&
              'create' === t.kind &&
              S.string(t.uri) &&
              (void 0 === t.options ||
                ((void 0 === t.options.overwrite || S.boolean(t.options.overwrite)) &&
                  (void 0 === t.options.ignoreIfExists || S.boolean(t.options.ignoreIfExists))))
            );
          });
      })((l = t.CreateFile || (t.CreateFile = {}))),
      (function (e) {
        (e.create = function (e, t, n) {
          var r = { kind: 'rename', oldUri: e, newUri: t };
          return void 0 === n || (void 0 === n.overwrite && void 0 === n.ignoreIfExists) || (r.options = n), r;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              t &&
              'rename' === t.kind &&
              S.string(t.oldUri) &&
              S.string(t.newUri) &&
              (void 0 === t.options ||
                ((void 0 === t.options.overwrite || S.boolean(t.options.overwrite)) &&
                  (void 0 === t.options.ignoreIfExists || S.boolean(t.options.ignoreIfExists))))
            );
          });
      })((d = t.RenameFile || (t.RenameFile = {}))),
      (function (e) {
        (e.create = function (e, t) {
          var n = { kind: 'delete', uri: e };
          return void 0 === t || (void 0 === t.recursive && void 0 === t.ignoreIfNotExists) || (n.options = t), n;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              t &&
              'delete' === t.kind &&
              S.string(t.uri) &&
              (void 0 === t.options ||
                ((void 0 === t.options.recursive || S.boolean(t.options.recursive)) &&
                  (void 0 === t.options.ignoreIfNotExists || S.boolean(t.options.ignoreIfNotExists))))
            );
          });
      })((p = t.DeleteFile || (t.DeleteFile = {}))),
      (function (e) {
        e.is = function (e) {
          var t = e;
          return (
            t &&
            (void 0 !== t.changes || void 0 !== t.documentChanges) &&
            (void 0 === t.documentChanges ||
              t.documentChanges.every(function (e) {
                return S.string(e.kind) ? l.is(e) || d.is(e) || p.is(e) : f.is(e);
              }))
          );
        };
      })((h = t.WorkspaceEdit || (t.WorkspaceEdit = {})));
    var m,
      g,
      v,
      y,
      b = (function () {
        function e(e) {
          this.edits = e;
        }
        return (
          (e.prototype.insert = function (e, t) {
            this.edits.push(u.insert(e, t));
          }),
          (e.prototype.replace = function (e, t) {
            this.edits.push(u.replace(e, t));
          }),
          (e.prototype.delete = function (e) {
            this.edits.push(u.del(e));
          }),
          (e.prototype.add = function (e) {
            this.edits.push(e);
          }),
          (e.prototype.all = function () {
            return this.edits;
          }),
          (e.prototype.clear = function () {
            this.edits.splice(0, this.edits.length);
          }),
          e
        );
      })(),
      x = (function () {
        function e(e) {
          var t = this;
          (this._textEditChanges = Object.create(null)),
            e &&
              ((this._workspaceEdit = e),
              e.documentChanges
                ? e.documentChanges.forEach(function (e) {
                    if (f.is(e)) {
                      var n = new b(e.edits);
                      t._textEditChanges[e.textDocument.uri] = n;
                    }
                  })
                : e.changes &&
                  Object.keys(e.changes).forEach(function (n) {
                    var r = new b(e.changes[n]);
                    t._textEditChanges[n] = r;
                  }));
        }
        return (
          Object.defineProperty(e.prototype, 'edit', {
            get: function () {
              return this._workspaceEdit;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getTextEditChange = function (e) {
            if (m.is(e)) {
              if (
                (this._workspaceEdit || (this._workspaceEdit = { documentChanges: [] }),
                !this._workspaceEdit.documentChanges)
              )
                throw new Error('Workspace edit is not configured for document changes.');
              var t = e;
              if (!(r = this._textEditChanges[t.uri])) {
                var n = { textDocument: t, edits: o = [] };
                this._workspaceEdit.documentChanges.push(n), (r = new b(o)), (this._textEditChanges[t.uri] = r);
              }
              return r;
            }
            if (
              (this._workspaceEdit || (this._workspaceEdit = { changes: Object.create(null) }),
              !this._workspaceEdit.changes)
            )
              throw new Error('Workspace edit is not configured for normal text edit changes.');
            var r;
            if (!(r = this._textEditChanges[e])) {
              var o = [];
              (this._workspaceEdit.changes[e] = o), (r = new b(o)), (this._textEditChanges[e] = r);
            }
            return r;
          }),
          (e.prototype.createFile = function (e, t) {
            this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(l.create(e, t));
          }),
          (e.prototype.renameFile = function (e, t, n) {
            this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(d.create(e, t, n));
          }),
          (e.prototype.deleteFile = function (e, t) {
            this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(p.create(e, t));
          }),
          (e.prototype.checkDocumentChanges = function () {
            if (!this._workspaceEdit || !this._workspaceEdit.documentChanges)
              throw new Error('Workspace edit is not configured for document changes.');
          }),
          e
        );
      })();
    (t.WorkspaceChange = x),
      (function (e) {
        (e.create = function (e) {
          return { uri: e };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && S.string(t.uri);
          });
      })(t.TextDocumentIdentifier || (t.TextDocumentIdentifier = {})),
      (function (e) {
        (e.create = function (e, t) {
          return { uri: e, version: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && S.string(t.uri) && (null === t.version || S.number(t.version));
          });
      })((m = t.VersionedTextDocumentIdentifier || (t.VersionedTextDocumentIdentifier = {}))),
      (function (e) {
        (e.create = function (e, t, n, r) {
          return { uri: e, languageId: t, version: n, text: r };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && S.string(t.uri) && S.string(t.languageId) && S.number(t.version) && S.string(t.text);
          });
      })(t.TextDocumentItem || (t.TextDocumentItem = {})),
      (function (e) {
        (e.PlainText = 'plaintext'), (e.Markdown = 'markdown');
      })((g = t.MarkupKind || (t.MarkupKind = {}))),
      (function (e) {
        e.is = function (t) {
          var n = t;
          return n === e.PlainText || n === e.Markdown;
        };
      })((g = t.MarkupKind || (t.MarkupKind = {}))),
      (function (e) {
        e.is = function (e) {
          var t = e;
          return S.objectLiteral(e) && g.is(t.kind) && S.string(t.value);
        };
      })((v = t.MarkupContent || (t.MarkupContent = {}))),
      (function (e) {
        (e.Text = 1),
          (e.Method = 2),
          (e.Function = 3),
          (e.Constructor = 4),
          (e.Field = 5),
          (e.Variable = 6),
          (e.Class = 7),
          (e.Interface = 8),
          (e.Module = 9),
          (e.Property = 10),
          (e.Unit = 11),
          (e.Value = 12),
          (e.Enum = 13),
          (e.Keyword = 14),
          (e.Snippet = 15),
          (e.Color = 16),
          (e.File = 17),
          (e.Reference = 18),
          (e.Folder = 19),
          (e.EnumMember = 20),
          (e.Constant = 21),
          (e.Struct = 22),
          (e.Event = 23),
          (e.Operator = 24),
          (e.TypeParameter = 25);
      })(t.CompletionItemKind || (t.CompletionItemKind = {})),
      (function (e) {
        (e.PlainText = 1), (e.Snippet = 2);
      })(t.InsertTextFormat || (t.InsertTextFormat = {})),
      (function (e) {
        e.Deprecated = 1;
      })(t.CompletionItemTag || (t.CompletionItemTag = {})),
      (function (e) {
        e.create = function (e) {
          return { label: e };
        };
      })(t.CompletionItem || (t.CompletionItem = {})),
      (function (e) {
        e.create = function (e, t) {
          return { items: e || [], isIncomplete: !!t };
        };
      })(t.CompletionList || (t.CompletionList = {})),
      (function (e) {
        (e.fromPlainText = function (e) {
          return e.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
        }),
          (e.is = function (e) {
            var t = e;
            return S.string(t) || (S.objectLiteral(t) && S.string(t.language) && S.string(t.value));
          });
      })((y = t.MarkedString || (t.MarkedString = {}))),
      (function (e) {
        e.is = function (e) {
          var t = e;
          return (
            !!t &&
            S.objectLiteral(t) &&
            (v.is(t.contents) || y.is(t.contents) || S.typedArray(t.contents, y.is)) &&
            (void 0 === e.range || r.is(e.range))
          );
        };
      })(t.Hover || (t.Hover = {})),
      (function (e) {
        e.create = function (e, t) {
          return t ? { label: e, documentation: t } : { label: e };
        };
      })(t.ParameterInformation || (t.ParameterInformation = {})),
      (function (e) {
        e.create = function (e, t) {
          for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
          var o = { label: e };
          return S.defined(t) && (o.documentation = t), S.defined(n) ? (o.parameters = n) : (o.parameters = []), o;
        };
      })(t.SignatureInformation || (t.SignatureInformation = {})),
      (function (e) {
        (e.Text = 1), (e.Read = 2), (e.Write = 3);
      })(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
      (function (e) {
        e.create = function (e, t) {
          var n = { range: e };
          return S.number(t) && (n.kind = t), n;
        };
      })(t.DocumentHighlight || (t.DocumentHighlight = {})),
      (function (e) {
        (e.File = 1),
          (e.Module = 2),
          (e.Namespace = 3),
          (e.Package = 4),
          (e.Class = 5),
          (e.Method = 6),
          (e.Property = 7),
          (e.Field = 8),
          (e.Constructor = 9),
          (e.Enum = 10),
          (e.Interface = 11),
          (e.Function = 12),
          (e.Variable = 13),
          (e.Constant = 14),
          (e.String = 15),
          (e.Number = 16),
          (e.Boolean = 17),
          (e.Array = 18),
          (e.Object = 19),
          (e.Key = 20),
          (e.Null = 21),
          (e.EnumMember = 22),
          (e.Struct = 23),
          (e.Event = 24),
          (e.Operator = 25),
          (e.TypeParameter = 26);
      })(t.SymbolKind || (t.SymbolKind = {})),
      (function (e) {
        e.Deprecated = 1;
      })(t.SymbolTag || (t.SymbolTag = {})),
      (function (e) {
        e.create = function (e, t, n, r, o) {
          var i = { name: e, kind: t, location: { uri: r, range: n } };
          return o && (i.containerName = o), i;
        };
      })(t.SymbolInformation || (t.SymbolInformation = {})),
      (function (e) {
        (e.create = function (e, t, n, r, o, i) {
          var a = { name: e, detail: t, kind: n, range: r, selectionRange: o };
          return void 0 !== i && (a.children = i), a;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              t &&
              S.string(t.name) &&
              S.number(t.kind) &&
              r.is(t.range) &&
              r.is(t.selectionRange) &&
              (void 0 === t.detail || S.string(t.detail)) &&
              (void 0 === t.deprecated || S.boolean(t.deprecated)) &&
              (void 0 === t.children || Array.isArray(t.children))
            );
          });
      })(t.DocumentSymbol || (t.DocumentSymbol = {})),
      (function (e) {
        (e.Empty = ''),
          (e.QuickFix = 'quickfix'),
          (e.Refactor = 'refactor'),
          (e.RefactorExtract = 'refactor.extract'),
          (e.RefactorInline = 'refactor.inline'),
          (e.RefactorRewrite = 'refactor.rewrite'),
          (e.Source = 'source'),
          (e.SourceOrganizeImports = 'source.organizeImports'),
          (e.SourceFixAll = 'source.fixAll');
      })(t.CodeActionKind || (t.CodeActionKind = {})),
      (function (e) {
        (e.create = function (e, t) {
          var n = { diagnostics: e };
          return null != t && (n.only = t), n;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              S.defined(t) && S.typedArray(t.diagnostics, s.is) && (void 0 === t.only || S.typedArray(t.only, S.string))
            );
          });
      })(t.CodeActionContext || (t.CodeActionContext = {})),
      (function (e) {
        (e.create = function (e, t, n) {
          var r = { title: e };
          return c.is(t) ? (r.command = t) : (r.edit = t), void 0 !== n && (r.kind = n), r;
        }),
          (e.is = function (e) {
            var t = e;
            return (
              t &&
              S.string(t.title) &&
              (void 0 === t.diagnostics || S.typedArray(t.diagnostics, s.is)) &&
              (void 0 === t.kind || S.string(t.kind)) &&
              (void 0 !== t.edit || void 0 !== t.command) &&
              (void 0 === t.command || c.is(t.command)) &&
              (void 0 === t.isPreferred || S.boolean(t.isPreferred)) &&
              (void 0 === t.edit || h.is(t.edit))
            );
          });
      })(t.CodeAction || (t.CodeAction = {})),
      (function (e) {
        (e.create = function (e, t) {
          var n = { range: e };
          return S.defined(t) && (n.data = t), n;
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && r.is(t.range) && (S.undefined(t.command) || c.is(t.command));
          });
      })(t.CodeLens || (t.CodeLens = {})),
      (function (e) {
        (e.create = function (e, t) {
          return { tabSize: e, insertSpaces: t };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && S.number(t.tabSize) && S.boolean(t.insertSpaces);
          });
      })(t.FormattingOptions || (t.FormattingOptions = {})),
      (function (e) {
        (e.create = function (e, t, n) {
          return { range: e, target: t, data: n };
        }),
          (e.is = function (e) {
            var t = e;
            return S.defined(t) && r.is(t.range) && (S.undefined(t.target) || S.string(t.target));
          });
      })(t.DocumentLink || (t.DocumentLink = {})),
      (function (e) {
        (e.create = function (e, t) {
          return { range: e, parent: t };
        }),
          (e.is = function (t) {
            var n = t;
            return void 0 !== n && r.is(n.range) && (void 0 === n.parent || e.is(n.parent));
          });
      })(t.SelectionRange || (t.SelectionRange = {})),
      (t.EOL = ['\n', '\r\n', '\r']),
      (function (e) {
        (e.create = function (e, t, n, r) {
          return new C(e, t, n, r);
        }),
          (e.is = function (e) {
            var t = e;
            return !!(
              S.defined(t) &&
              S.string(t.uri) &&
              (S.undefined(t.languageId) || S.string(t.languageId)) &&
              S.number(t.lineCount) &&
              S.func(t.getText) &&
              S.func(t.positionAt) &&
              S.func(t.offsetAt)
            );
          }),
          (e.applyEdits = function (e, t) {
            for (
              var n = e.getText(),
                r = (function e(t, n) {
                  if (t.length <= 1) return t;
                  var r = (t.length / 2) | 0,
                    o = t.slice(0, r),
                    i = t.slice(r);
                  e(o, n), e(i, n);
                  var a = 0,
                    s = 0,
                    c = 0;
                  for (; a < o.length && s < i.length; ) {
                    var u = n(o[a], i[s]);
                    t[c++] = u <= 0 ? o[a++] : i[s++];
                  }
                  for (; a < o.length; ) t[c++] = o[a++];
                  for (; s < i.length; ) t[c++] = i[s++];
                  return t;
                })(t, function (e, t) {
                  var n = e.range.start.line - t.range.start.line;
                  return 0 === n ? e.range.start.character - t.range.start.character : n;
                }),
                o = n.length,
                i = r.length - 1;
              i >= 0;
              i--
            ) {
              var a = r[i],
                s = e.offsetAt(a.range.start),
                c = e.offsetAt(a.range.end);
              if (!(c <= o)) throw new Error('Overlapping edit');
              (n = n.substring(0, s) + a.newText + n.substring(c, n.length)), (o = s);
            }
            return n;
          });
      })(t.TextDocument || (t.TextDocument = {}));
    var S,
      C = (function () {
        function e(e, t, n, r) {
          (this._uri = e),
            (this._languageId = t),
            (this._version = n),
            (this._content = r),
            (this._lineOffsets = void 0);
        }
        return (
          Object.defineProperty(e.prototype, 'uri', {
            get: function () {
              return this._uri;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'languageId', {
            get: function () {
              return this._languageId;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'version', {
            get: function () {
              return this._version;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getText = function (e) {
            if (e) {
              var t = this.offsetAt(e.start),
                n = this.offsetAt(e.end);
              return this._content.substring(t, n);
            }
            return this._content;
          }),
          (e.prototype.update = function (e, t) {
            (this._content = e.text), (this._version = t), (this._lineOffsets = void 0);
          }),
          (e.prototype.getLineOffsets = function () {
            if (void 0 === this._lineOffsets) {
              for (var e = [], t = this._content, n = !0, r = 0; r < t.length; r++) {
                n && (e.push(r), (n = !1));
                var o = t.charAt(r);
                (n = '\r' === o || '\n' === o), '\r' === o && r + 1 < t.length && '\n' === t.charAt(r + 1) && r++;
              }
              n && t.length > 0 && e.push(t.length), (this._lineOffsets = e);
            }
            return this._lineOffsets;
          }),
          (e.prototype.positionAt = function (e) {
            e = Math.max(Math.min(e, this._content.length), 0);
            var t = this.getLineOffsets(),
              r = 0,
              o = t.length;
            if (0 === o) return n.create(0, e);
            for (; r < o; ) {
              var i = Math.floor((r + o) / 2);
              t[i] > e ? (o = i) : (r = i + 1);
            }
            var a = r - 1;
            return n.create(a, e - t[a]);
          }),
          (e.prototype.offsetAt = function (e) {
            var t = this.getLineOffsets();
            if (e.line >= t.length) return this._content.length;
            if (e.line < 0) return 0;
            var n = t[e.line],
              r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
            return Math.max(Math.min(n + e.character, r), n);
          }),
          Object.defineProperty(e.prototype, 'lineCount', {
            get: function () {
              return this.getLineOffsets().length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          e
        );
      })();
    !(function (e) {
      var t = Object.prototype.toString;
      (e.defined = function (e) {
        return void 0 !== e;
      }),
        (e.undefined = function (e) {
          return void 0 === e;
        }),
        (e.boolean = function (e) {
          return !0 === e || !1 === e;
        }),
        (e.string = function (e) {
          return '[object String]' === t.call(e);
        }),
        (e.number = function (e) {
          return '[object Number]' === t.call(e);
        }),
        (e.func = function (e) {
          return '[object Function]' === t.call(e);
        }),
        (e.objectLiteral = function (e) {
          return null !== e && 'object' == typeof e;
        }),
        (e.typedArray = function (e, t) {
          return Array.isArray(e) && e.every(t);
        });
    })(S || (S = {}));
  }),
  define('vscode-languageserver-types', ['vscode-languageserver-types/main'], function (e) {
    return e;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-languageserver-textdocument/main', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = (function () {
      function e(e, t, n, r) {
        (this._uri = e), (this._languageId = t), (this._version = n), (this._content = r), (this._lineOffsets = void 0);
      }
      return (
        Object.defineProperty(e.prototype, 'uri', {
          get: function () {
            return this._uri;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, 'languageId', {
          get: function () {
            return this._languageId;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(e.prototype, 'version', {
          get: function () {
            return this._version;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.getText = function (e) {
          if (e) {
            var t = this.offsetAt(e.start),
              n = this.offsetAt(e.end);
            return this._content.substring(t, n);
          }
          return this._content;
        }),
        (e.prototype.update = function (t, n) {
          for (var i = 0, a = t; i < a.length; i++) {
            var s = a[i];
            if (e.isIncremental(s)) {
              var c = o(s.range),
                u = this.offsetAt(c.start),
                f = this.offsetAt(c.end);
              this._content = this._content.substring(0, u) + s.text + this._content.substring(f, this._content.length);
              var l = Math.max(c.start.line, 0),
                d = Math.max(c.end.line, 0),
                p = this._lineOffsets,
                h = r(s.text, !1, u);
              if (d - l === h.length) for (var m = 0, g = h.length; m < g; m++) p[m + l + 1] = h[m];
              else
                h.length < 1e4
                  ? p.splice.apply(p, [l + 1, d - l].concat(h))
                  : (this._lineOffsets = p = p.slice(0, l + 1).concat(h, p.slice(d + 1)));
              var v = s.text.length - (f - u);
              if (0 !== v) for (m = l + 1 + h.length, g = p.length; m < g; m++) p[m] = p[m] + v;
            } else {
              if (!e.isFull(s)) throw new Error('Unknown change event received');
              (this._content = s.text), (this._lineOffsets = void 0);
            }
          }
          this._version = n;
        }),
        (e.prototype.getLineOffsets = function () {
          return void 0 === this._lineOffsets && (this._lineOffsets = r(this._content, !0)), this._lineOffsets;
        }),
        (e.prototype.positionAt = function (e) {
          e = Math.max(Math.min(e, this._content.length), 0);
          var t = this.getLineOffsets(),
            n = 0,
            r = t.length;
          if (0 === r) return { line: 0, character: e };
          for (; n < r; ) {
            var o = Math.floor((n + r) / 2);
            t[o] > e ? (r = o) : (n = o + 1);
          }
          var i = n - 1;
          return { line: i, character: e - t[i] };
        }),
        (e.prototype.offsetAt = function (e) {
          var t = this.getLineOffsets();
          if (e.line >= t.length) return this._content.length;
          if (e.line < 0) return 0;
          var n = t[e.line],
            r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
          return Math.max(Math.min(n + e.character, r), n);
        }),
        Object.defineProperty(e.prototype, 'lineCount', {
          get: function () {
            return this.getLineOffsets().length;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.isIncremental = function (e) {
          var t = e;
          return (
            null != t &&
            'string' == typeof t.text &&
            void 0 !== t.range &&
            (void 0 === t.rangeLength || 'number' == typeof t.rangeLength)
          );
        }),
        (e.isFull = function (e) {
          var t = e;
          return null != t && 'string' == typeof t.text && void 0 === t.range && void 0 === t.rangeLength;
        }),
        e
      );
    })();
    function r(e, t, n) {
      void 0 === n && (n = 0);
      for (var r = t ? [n] : [], o = 0; o < e.length; o++) {
        var i = e.charCodeAt(o);
        (13 !== i && 10 !== i) ||
          (13 === i && o + 1 < e.length && 10 === e.charCodeAt(o + 1) && o++, r.push(n + o + 1));
      }
      return r;
    }
    function o(e) {
      var t = e.start,
        n = e.end;
      return t.line > n.line || (t.line === n.line && t.character > n.character) ? { start: n, end: t } : e;
    }
    function i(e) {
      var t = o(e.range);
      return t !== e.range ? { newText: e.newText, range: t } : e;
    }
    !(function (e) {
      (e.create = function (e, t, r, o) {
        return new n(e, t, r, o);
      }),
        (e.update = function (e, t, r) {
          if (e instanceof n) return e.update(t, r), e;
          throw new Error('TextDocument.update: document must be created by TextDocument.create');
        }),
        (e.applyEdits = function (e, t) {
          for (
            var n = e.getText(),
              r = (function e(t, n) {
                if (t.length <= 1) return t;
                var r = (t.length / 2) | 0,
                  o = t.slice(0, r),
                  i = t.slice(r);
                e(o, n), e(i, n);
                var a = 0,
                  s = 0,
                  c = 0;
                for (; a < o.length && s < i.length; ) {
                  var u = n(o[a], i[s]);
                  t[c++] = u <= 0 ? o[a++] : i[s++];
                }
                for (; a < o.length; ) t[c++] = o[a++];
                for (; s < i.length; ) t[c++] = i[s++];
                return t;
              })(t.map(i), function (e, t) {
                var n = e.range.start.line - t.range.start.line;
                return 0 === n ? e.range.start.character - t.range.start.character : n;
              }),
              o = n.length,
              a = r.length - 1;
            a >= 0;
            a--
          ) {
            var s = r[a],
              c = e.offsetAt(s.range.start),
              u = e.offsetAt(s.range.end);
            if (!(u <= o)) throw new Error('Overlapping edit');
            (n = n.substring(0, c) + s.newText + n.substring(u, n.length)), (o = c);
          }
          return n;
        });
    })(t.TextDocument || (t.TextDocument = {}));
  }),
  define('vscode-languageserver-textdocument', ['vscode-languageserver-textdocument/main'], function (e) {
    return e;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/jsonLanguageTypes', [
          'require',
          'exports',
          'vscode-languageserver-types',
          'vscode-languageserver-textdocument',
          'vscode-languageserver-types',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('vscode-languageserver-types'),
      r = e('vscode-languageserver-textdocument');
    (t.TextDocument = r.TextDocument),
      (function (e) {
        for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
      })(e('vscode-languageserver-types')),
      (function (e) {
        (e[(e.Undefined = 0)] = 'Undefined'),
          (e[(e.EnumValueMismatch = 1)] = 'EnumValueMismatch'),
          (e[(e.UnexpectedEndOfComment = 257)] = 'UnexpectedEndOfComment'),
          (e[(e.UnexpectedEndOfString = 258)] = 'UnexpectedEndOfString'),
          (e[(e.UnexpectedEndOfNumber = 259)] = 'UnexpectedEndOfNumber'),
          (e[(e.InvalidUnicode = 260)] = 'InvalidUnicode'),
          (e[(e.InvalidEscapeCharacter = 261)] = 'InvalidEscapeCharacter'),
          (e[(e.InvalidCharacter = 262)] = 'InvalidCharacter'),
          (e[(e.PropertyExpected = 513)] = 'PropertyExpected'),
          (e[(e.CommaExpected = 514)] = 'CommaExpected'),
          (e[(e.ColonExpected = 515)] = 'ColonExpected'),
          (e[(e.ValueExpected = 516)] = 'ValueExpected'),
          (e[(e.CommaOrCloseBacketExpected = 517)] = 'CommaOrCloseBacketExpected'),
          (e[(e.CommaOrCloseBraceExpected = 518)] = 'CommaOrCloseBraceExpected'),
          (e[(e.TrailingComma = 519)] = 'TrailingComma'),
          (e[(e.DuplicateKey = 520)] = 'DuplicateKey'),
          (e[(e.CommentNotPermitted = 521)] = 'CommentNotPermitted'),
          (e[(e.SchemaResolveError = 768)] = 'SchemaResolveError');
      })(t.ErrorCode || (t.ErrorCode = {})),
      (function (e) {
        e.LATEST = {
          textDocument: {
            completion: {
              completionItem: {
                documentationFormat: [n.MarkupKind.Markdown, n.MarkupKind.PlainText],
                commitCharactersSupport: !0,
              },
            },
          },
        };
      })(t.ClientCapabilities || (t.ClientCapabilities = {}));
  }),
  define('vscode-nls/vscode-nls', ['require', 'exports'], function (e, t) {
    'use strict';
    function n(e, t) {
      for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
      return (function (e, t) {
        return 0 === t.length
          ? e
          : e.replace(/\{(\d+)\}/g, function (e, n) {
              var r = n[0];
              return void 0 !== t[r] ? t[r] : e;
            });
      })(t, n);
    }
    function r(e) {
      return n;
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.loadMessageBundle = r),
      (t.config = function (e) {
        return r;
      });
  }),
  define('vscode-nls', ['vscode-nls/vscode-nls'], function (e) {
    return e;
  });
var __extends =
  (this && this.__extends) ||
  (function () {
    var e = function (t, n) {
      return (e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        })(t, n);
    };
    return function (t, n) {
      function r() {
        this.constructor = t;
      }
      e(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })();
!(function (e) {
  if ('object' == typeof module && 'object' == typeof module.exports) {
    var t = e(require, exports);
    void 0 !== t && (module.exports = t);
  } else
    'function' == typeof define &&
      define.amd &&
      define('vscode-json-languageservice/parser/jsonParser', [
        'require',
        'exports',
        'jsonc-parser',
        '../utils/objects',
        '../jsonLanguageTypes',
        'vscode-nls',
      ], e);
})(function (e, t) {
  'use strict';
  Object.defineProperty(t, '__esModule', { value: !0 });
  var n = e('jsonc-parser'),
    r = e('../utils/objects'),
    o = e('../jsonLanguageTypes'),
    i = e('vscode-nls').loadMessageBundle(),
    a = {
      'color-hex': {
        errorMessage: i('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
        pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/,
      },
      'date-time': {
        errorMessage: i('dateTimeFormatWarning', 'String is not a RFC3339 date-time.'),
        pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
      },
      date: {
        errorMessage: i('dateFormatWarning', 'String is not a RFC3339 date.'),
        pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
      },
      time: {
        errorMessage: i('timeFormatWarning', 'String is not a RFC3339 time.'),
        pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
      },
      email: {
        errorMessage: i('emailFormatWarning', 'String is not an e-mail address.'),
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    s = (function () {
      function e(e, t, n) {
        (this.offset = t), (this.length = n), (this.parent = e);
      }
      return (
        Object.defineProperty(e.prototype, 'children', {
          get: function () {
            return [];
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.toString = function () {
          return (
            'type: ' +
            this.type +
            ' (' +
            this.offset +
            '/' +
            this.length +
            ')' +
            (this.parent ? ' parent: {' + this.parent.toString() + '}' : '')
          );
        }),
        e
      );
    })();
  t.ASTNodeImpl = s;
  var c = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return (r.type = 'null'), (r.value = null), r;
    }
    return __extends(t, e), t;
  })(s);
  t.NullASTNodeImpl = c;
  var u = (function (e) {
    function t(t, n, r) {
      var o = e.call(this, t, r) || this;
      return (o.type = 'boolean'), (o.value = n), o;
    }
    return __extends(t, e), t;
  })(s);
  t.BooleanASTNodeImpl = u;
  var f = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return (r.type = 'array'), (r.items = []), r;
    }
    return (
      __extends(t, e),
      Object.defineProperty(t.prototype, 'children', {
        get: function () {
          return this.items;
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    );
  })(s);
  t.ArrayASTNodeImpl = f;
  var l = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return (r.type = 'number'), (r.isInteger = !0), (r.value = Number.NaN), r;
    }
    return __extends(t, e), t;
  })(s);
  t.NumberASTNodeImpl = l;
  var d = (function (e) {
    function t(t, n, r) {
      var o = e.call(this, t, n, r) || this;
      return (o.type = 'string'), (o.value = ''), o;
    }
    return __extends(t, e), t;
  })(s);
  t.StringASTNodeImpl = d;
  var p = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return (r.type = 'property'), (r.colonOffset = -1), r;
    }
    return (
      __extends(t, e),
      Object.defineProperty(t.prototype, 'children', {
        get: function () {
          return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    );
  })(s);
  t.PropertyASTNodeImpl = p;
  var h = (function (e) {
    function t(t, n) {
      var r = e.call(this, t, n) || this;
      return (r.type = 'object'), (r.properties = []), r;
    }
    return (
      __extends(t, e),
      Object.defineProperty(t.prototype, 'children', {
        get: function () {
          return this.properties;
        },
        enumerable: !0,
        configurable: !0,
      }),
      t
    );
  })(s);
  function m(e) {
    return r.isBoolean(e) ? (e ? {} : { not: {} }) : e;
  }
  (t.ObjectASTNodeImpl = h),
    (t.asSchema = m),
    (function (e) {
      (e[(e.Key = 0)] = 'Key'), (e[(e.Enum = 1)] = 'Enum');
    })(t.EnumMatch || (t.EnumMatch = {}));
  var g = (function () {
      function e(e, t) {
        void 0 === e && (e = -1),
          void 0 === t && (t = null),
          (this.focusOffset = e),
          (this.exclude = t),
          (this.schemas = []);
      }
      return (
        (e.prototype.add = function (e) {
          this.schemas.push(e);
        }),
        (e.prototype.merge = function (e) {
          var t;
          (t = this.schemas).push.apply(t, e.schemas);
        }),
        (e.prototype.include = function (e) {
          return (-1 === this.focusOffset || x(e, this.focusOffset)) && e !== this.exclude;
        }),
        (e.prototype.newSub = function () {
          return new e(-1, this.exclude);
        }),
        e
      );
    })(),
    v = (function () {
      function e() {}
      return (
        Object.defineProperty(e.prototype, 'schemas', {
          get: function () {
            return [];
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.add = function (e) {}),
        (e.prototype.merge = function (e) {}),
        (e.prototype.include = function (e) {
          return !0;
        }),
        (e.prototype.newSub = function () {
          return this;
        }),
        (e.instance = new e()),
        e
      );
    })(),
    y = (function () {
      function e() {
        (this.problems = []),
          (this.propertiesMatches = 0),
          (this.propertiesValueMatches = 0),
          (this.primaryValueMatches = 0),
          (this.enumValueMatch = !1),
          (this.enumValues = null);
      }
      return (
        (e.prototype.hasProblems = function () {
          return !!this.problems.length;
        }),
        (e.prototype.mergeAll = function (e) {
          for (var t = 0, n = e; t < n.length; t++) {
            var r = n[t];
            this.merge(r);
          }
        }),
        (e.prototype.merge = function (e) {
          this.problems = this.problems.concat(e.problems);
        }),
        (e.prototype.mergeEnumValues = function (e) {
          if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
            this.enumValues = this.enumValues.concat(e.enumValues);
            for (var t = 0, n = this.problems; t < n.length; t++) {
              var r = n[t];
              r.code === o.ErrorCode.EnumValueMismatch &&
                (r.message = i(
                  'enumWarning',
                  'Value is not accepted. Valid values: {0}.',
                  this.enumValues
                    .map(function (e) {
                      return JSON.stringify(e);
                    })
                    .join(', ')
                ));
            }
          }
        }),
        (e.prototype.mergePropertyMatch = function (e) {
          this.merge(e),
            this.propertiesMatches++,
            (e.enumValueMatch || (!e.hasProblems() && e.propertiesMatches)) && this.propertiesValueMatches++,
            e.enumValueMatch && e.enumValues && 1 === e.enumValues.length && this.primaryValueMatches++;
        }),
        (e.prototype.compare = function (e) {
          var t = this.hasProblems();
          return t !== e.hasProblems()
            ? t
              ? -1
              : 1
            : this.enumValueMatch !== e.enumValueMatch
            ? e.enumValueMatch
              ? -1
              : 1
            : this.primaryValueMatches !== e.primaryValueMatches
            ? this.primaryValueMatches - e.primaryValueMatches
            : this.propertiesValueMatches !== e.propertiesValueMatches
            ? this.propertiesValueMatches - e.propertiesValueMatches
            : this.propertiesMatches - e.propertiesMatches;
        }),
        e
      );
    })();
  function b(e) {
    return n.getNodeValue(e);
  }
  function x(e, t, n) {
    return void 0 === n && (n = !1), (t >= e.offset && t < e.offset + e.length) || (n && t === e.offset + e.length);
  }
  (t.ValidationResult = y),
    (t.newJSONDocument = function (e, t) {
      return void 0 === t && (t = []), new S(e, t, []);
    }),
    (t.getNodeValue = b),
    (t.getNodePath = function (e) {
      return n.getNodePath(e);
    }),
    (t.contains = x);
  var S = (function () {
    function e(e, t, n) {
      void 0 === t && (t = []), void 0 === n && (n = []), (this.root = e), (this.syntaxErrors = t), (this.comments = n);
    }
    return (
      (e.prototype.getNodeFromOffset = function (e, t) {
        if ((void 0 === t && (t = !1), this.root)) return n.findNodeAtOffset(this.root, e, t);
      }),
      (e.prototype.visit = function (e) {
        if (this.root) {
          var t = function (n) {
            var r = e(n),
              o = n.children;
            if (Array.isArray(o)) for (var i = 0; i < o.length && r; i++) r = t(o[i]);
            return r;
          };
          t(this.root);
        }
      }),
      (e.prototype.validate = function (e, t) {
        if (this.root && t) {
          var n = new y();
          return (
            C(this.root, t, n, v.instance),
            n.problems.map(function (t) {
              var n = o.Range.create(
                e.positionAt(t.location.offset),
                e.positionAt(t.location.offset + t.location.length)
              );
              return o.Diagnostic.create(n, t.message, t.severity, t.code);
            })
          );
        }
        return null;
      }),
      (e.prototype.getMatchingSchemas = function (e, t, n) {
        void 0 === t && (t = -1), void 0 === n && (n = null);
        var r = new g(t, n);
        return this.root && e && C(this.root, e, new y(), r), r.schemas;
      }),
      e
    );
  })();
  function C(e, t, n, s) {
    if (e && s.include(e)) {
      switch (e.type) {
        case 'object':
          !(function (e, t, n, a) {
            for (var s = Object.create(null), c = [], u = 0, f = e.properties; u < f.length; u++) {
              var l = (k = f[u]).keyNode.value;
              (s[l] = k.valueNode), c.push(l);
            }
            if (Array.isArray(t.required))
              for (var d = 0, p = t.required; d < p.length; d++) {
                var h = p[d];
                if (!s[h]) {
                  var g = e.parent && 'property' === e.parent.type && e.parent.keyNode,
                    b = g ? { offset: g.offset, length: g.length } : { offset: e.offset, length: 1 };
                  n.problems.push({
                    location: b,
                    severity: o.DiagnosticSeverity.Warning,
                    message: i('MissingRequiredPropWarning', 'Missing property "{0}".', h),
                  });
                }
              }
            var x = function (e) {
              for (var t = c.indexOf(e); t >= 0; ) c.splice(t, 1), (t = c.indexOf(e));
            };
            if (t.properties)
              for (var S = 0, j = Object.keys(t.properties); S < j.length; S++) {
                h = j[S];
                x(h);
                var T = t.properties[h];
                if ((F = s[h]))
                  if (r.isBoolean(T))
                    if (T) n.propertiesMatches++, n.propertiesValueMatches++;
                    else {
                      var k = F.parent;
                      n.problems.push({
                        location: { offset: k.keyNode.offset, length: k.keyNode.length },
                        severity: o.DiagnosticSeverity.Warning,
                        message: t.errorMessage || i('DisallowedExtraPropWarning', 'Property {0} is not allowed.', h),
                      });
                    }
                  else {
                    var O = new y();
                    C(F, T, O, a), n.mergePropertyMatch(O);
                  }
              }
            if (t.patternProperties)
              for (var A = 0, E = Object.keys(t.patternProperties); A < E.length; A++)
                for (var I = E[A], w = new RegExp(I), P = 0, N = c.slice(0); P < N.length; P++) {
                  h = N[P];
                  if (w.test(h))
                    if ((x(h), (F = s[h]))) {
                      T = t.patternProperties[I];
                      if (r.isBoolean(T))
                        if (T) n.propertiesMatches++, n.propertiesValueMatches++;
                        else {
                          k = F.parent;
                          n.problems.push({
                            location: { offset: k.keyNode.offset, length: k.keyNode.length },
                            severity: o.DiagnosticSeverity.Warning,
                            message:
                              t.errorMessage || i('DisallowedExtraPropWarning', 'Property {0} is not allowed.', h),
                          });
                        }
                      else {
                        O = new y();
                        C(F, T, O, a), n.mergePropertyMatch(O);
                      }
                    }
                }
            if ('object' == typeof t.additionalProperties)
              for (var M = 0, _ = c; M < _.length; M++) {
                h = _[M];
                if ((F = s[h])) {
                  O = new y();
                  C(F, t.additionalProperties, O, a), n.mergePropertyMatch(O);
                }
              }
            else if (!1 === t.additionalProperties && c.length > 0)
              for (var D = 0, V = c; D < V.length; D++) {
                var F;
                h = V[D];
                if ((F = s[h])) {
                  k = F.parent;
                  n.problems.push({
                    location: { offset: k.keyNode.offset, length: k.keyNode.length },
                    severity: o.DiagnosticSeverity.Warning,
                    message: t.errorMessage || i('DisallowedExtraPropWarning', 'Property {0} is not allowed.', h),
                  });
                }
              }
            r.isNumber(t.maxProperties) &&
              e.properties.length > t.maxProperties &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('MaxPropWarning', 'Object has more properties than limit of {0}.', t.maxProperties),
              });
            r.isNumber(t.minProperties) &&
              e.properties.length < t.minProperties &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i(
                  'MinPropWarning',
                  'Object has fewer properties than the required number of {0}',
                  t.minProperties
                ),
              });
            if (t.dependencies)
              for (var L = 0, R = Object.keys(t.dependencies); L < R.length; L++) {
                l = R[L];
                if (s[l]) {
                  var $ = t.dependencies[l];
                  if (Array.isArray($))
                    for (var q = 0, W = $; q < W.length; q++) {
                      var U = W[q];
                      s[U]
                        ? n.propertiesValueMatches++
                        : n.problems.push({
                            location: { offset: e.offset, length: e.length },
                            severity: o.DiagnosticSeverity.Warning,
                            message: i(
                              'RequiredDependentPropWarning',
                              'Object is missing property {0} required by property {1}.',
                              U,
                              l
                            ),
                          });
                    }
                  else if ((T = m($))) {
                    O = new y();
                    C(e, T, O, a), n.mergePropertyMatch(O);
                  }
                }
              }
            var K = m(t.propertyNames);
            if (K)
              for (var B = 0, J = e.properties; B < J.length; B++) {
                var H = J[B];
                (l = H.keyNode) && C(l, K, n, v.instance);
              }
          })(e, t, n, s);
          break;
        case 'array':
          !(function (e, t, n, a) {
            if (Array.isArray(t.items)) {
              for (var s = t.items, c = 0; c < s.length; c++) {
                var u = m(s[c]),
                  f = new y();
                (g = e.items[c])
                  ? (C(g, u, f, a), n.mergePropertyMatch(f))
                  : e.items.length >= s.length && n.propertiesValueMatches++;
              }
              if (e.items.length > s.length)
                if ('object' == typeof t.additionalItems)
                  for (var l = s.length; l < e.items.length; l++) {
                    f = new y();
                    C(e.items[l], t.additionalItems, f, a), n.mergePropertyMatch(f);
                  }
                else
                  !1 === t.additionalItems &&
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      severity: o.DiagnosticSeverity.Warning,
                      message: i(
                        'additionalItemsWarning',
                        'Array has too many items according to schema. Expected {0} or fewer.',
                        s.length
                      ),
                    });
            } else {
              var d = m(t.items);
              if (d)
                for (var p = 0, h = e.items; p < h.length; p++) {
                  var g = h[p];
                  f = new y();
                  C(g, d, f, a), n.mergePropertyMatch(f);
                }
            }
            var x = m(t.contains);
            if (x) {
              e.items.some(function (e) {
                var t = new y();
                return C(e, x, t, v.instance), !t.hasProblems();
              }) ||
                n.problems.push({
                  location: { offset: e.offset, length: e.length },
                  severity: o.DiagnosticSeverity.Warning,
                  message: t.errorMessage || i('requiredItemMissingWarning', 'Array does not contain required item.'),
                });
            }
            r.isNumber(t.minItems) &&
              e.items.length < t.minItems &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('minItemsWarning', 'Array has too few items. Expected {0} or more.', t.minItems),
              });
            r.isNumber(t.maxItems) &&
              e.items.length > t.maxItems &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', t.maxItems),
              });
            if (!0 === t.uniqueItems) {
              var S = b(e);
              S.some(function (e, t) {
                return t !== S.lastIndexOf(e);
              }) &&
                n.problems.push({
                  location: { offset: e.offset, length: e.length },
                  severity: o.DiagnosticSeverity.Warning,
                  message: i('uniqueItemsWarning', 'Array has duplicate items.'),
                });
            }
          })(e, t, n, s);
          break;
        case 'string':
          !(function (e, t, n, s) {
            r.isNumber(t.minLength) &&
              e.value.length < t.minLength &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('minLengthWarning', 'String is shorter than the minimum length of {0}.', t.minLength),
              });
            r.isNumber(t.maxLength) &&
              e.value.length > t.maxLength &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('maxLengthWarning', 'String is longer than the maximum length of {0}.', t.maxLength),
              });
            if (r.isString(t.pattern)) {
              new RegExp(t.pattern).test(e.value) ||
                n.problems.push({
                  location: { offset: e.offset, length: e.length },
                  severity: o.DiagnosticSeverity.Warning,
                  message:
                    t.patternErrorMessage ||
                    t.errorMessage ||
                    i('patternWarning', 'String does not match the pattern of "{0}".', t.pattern),
                });
            }
            if (t.format)
              switch (t.format) {
                case 'uri':
                case 'uri-reference':
                  var c = void 0;
                  if (e.value) {
                    var u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(e.value);
                    u
                      ? u[2] || 'uri' !== t.format || (c = i('uriSchemeMissing', 'URI with a scheme is expected.'))
                      : (c = i('uriMissing', 'URI is expected.'));
                  } else c = i('uriEmpty', 'URI expected.');
                  c &&
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      severity: o.DiagnosticSeverity.Warning,
                      message:
                        t.patternErrorMessage || t.errorMessage || i('uriFormatWarning', 'String is not a URI: {0}', c),
                    });
                  break;
                case 'color-hex':
                case 'date-time':
                case 'date':
                case 'time':
                case 'email':
                  var f = a[t.format];
                  (e.value && f.pattern.exec(e.value)) ||
                    n.problems.push({
                      location: { offset: e.offset, length: e.length },
                      severity: o.DiagnosticSeverity.Warning,
                      message: t.patternErrorMessage || t.errorMessage || f.errorMessage,
                    });
              }
          })(e, t, n);
          break;
        case 'number':
          !(function (e, t, n, a) {
            var s = e.value;
            r.isNumber(t.multipleOf) &&
              s % t.multipleOf != 0 &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('multipleOfWarning', 'Value is not divisible by {0}.', t.multipleOf),
              });
            function c(e, t) {
              return r.isNumber(t) ? t : r.isBoolean(t) && t ? e : void 0;
            }
            function u(e, t) {
              if (!r.isBoolean(t) || !t) return e;
            }
            var f = c(t.minimum, t.exclusiveMinimum);
            r.isNumber(f) &&
              s <= f &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', f),
              });
            var l = c(t.maximum, t.exclusiveMaximum);
            r.isNumber(l) &&
              s >= l &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', l),
              });
            var d = u(t.minimum, t.exclusiveMinimum);
            r.isNumber(d) &&
              s < d &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('minimumWarning', 'Value is below the minimum of {0}.', d),
              });
            var p = u(t.maximum, t.exclusiveMaximum);
            r.isNumber(p) &&
              s > p &&
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('maximumWarning', 'Value is above the maximum of {0}.', p),
              });
          })(e, t, n);
          break;
        case 'property':
          return C(e.valueNode, t, n, s);
      }
      !(function () {
        function a(t) {
          return e.type === t || ('integer' === t && 'number' === e.type && e.isInteger);
        }
        Array.isArray(t.type)
          ? t.type.some(a) ||
            n.problems.push({
              location: { offset: e.offset, length: e.length },
              severity: o.DiagnosticSeverity.Warning,
              message:
                t.errorMessage ||
                i('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', t.type.join(', ')),
            })
          : t.type &&
            (a(t.type) ||
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: t.errorMessage || i('typeMismatchWarning', 'Incorrect type. Expected "{0}".', t.type),
              }));
        if (Array.isArray(t.allOf))
          for (var c = 0, u = t.allOf; c < u.length; c++) {
            var f = u[c];
            C(e, m(f), n, s);
          }
        var l = m(t.not);
        if (l) {
          var d = new y(),
            p = s.newSub();
          C(e, l, d, p),
            d.hasProblems() ||
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                message: i('notSchemaWarning', 'Matches a schema that is not allowed.'),
              });
          for (var h = 0, g = p.schemas; h < g.length; h++) {
            var v = g[h];
            (v.inverted = !v.inverted), s.add(v);
          }
        }
        var x = function (t, r) {
          for (var a = [], c = null, u = 0, f = t; u < f.length; u++) {
            var l = m(f[u]),
              d = new y(),
              p = s.newSub();
            if ((C(e, l, d, p), d.hasProblems() || a.push(l), c))
              if (r || d.hasProblems() || c.validationResult.hasProblems()) {
                var h = d.compare(c.validationResult);
                h > 0
                  ? (c = { schema: l, validationResult: d, matchingSchemas: p })
                  : 0 === h && (c.matchingSchemas.merge(p), c.validationResult.mergeEnumValues(d));
              } else
                c.matchingSchemas.merge(p),
                  (c.validationResult.propertiesMatches += d.propertiesMatches),
                  (c.validationResult.propertiesValueMatches += d.propertiesValueMatches);
            else c = { schema: l, validationResult: d, matchingSchemas: p };
          }
          return (
            a.length > 1 &&
              r &&
              n.problems.push({
                location: { offset: e.offset, length: 1 },
                severity: o.DiagnosticSeverity.Warning,
                message: i('oneOfWarning', 'Matches multiple schemas when only one must validate.'),
              }),
            null !== c &&
              (n.merge(c.validationResult),
              (n.propertiesMatches += c.validationResult.propertiesMatches),
              (n.propertiesValueMatches += c.validationResult.propertiesValueMatches),
              s.merge(c.matchingSchemas)),
            a.length
          );
        };
        Array.isArray(t.anyOf) && x(t.anyOf, !1);
        Array.isArray(t.oneOf) && x(t.oneOf, !0);
        var S = function (t) {
            var r = new y(),
              o = s.newSub();
            C(e, m(t), r, o),
              n.merge(r),
              (n.propertiesMatches += r.propertiesMatches),
              (n.propertiesValueMatches += r.propertiesValueMatches),
              s.merge(o);
          },
          j = m(t.if);
        j &&
          (function (t, n, r) {
            var o = m(t),
              i = new y(),
              a = s.newSub();
            C(e, o, i, a), s.merge(a), i.hasProblems() ? r && S(r) : n && S(n);
          })(j, m(t.then), m(t.else));
        if (Array.isArray(t.enum)) {
          for (var T = b(e), k = !1, O = 0, A = t.enum; O < A.length; O++) {
            var E = A[O];
            if (r.equals(T, E)) {
              k = !0;
              break;
            }
          }
          (n.enumValues = t.enum),
            (n.enumValueMatch = k),
            k ||
              n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                code: o.ErrorCode.EnumValueMismatch,
                message:
                  t.errorMessage ||
                  i(
                    'enumWarning',
                    'Value is not accepted. Valid values: {0}.',
                    t.enum
                      .map(function (e) {
                        return JSON.stringify(e);
                      })
                      .join(', ')
                  ),
              });
        }
        if (r.isDefined(t.const)) {
          T = b(e);
          r.equals(T, t.const)
            ? (n.enumValueMatch = !0)
            : (n.problems.push({
                location: { offset: e.offset, length: e.length },
                severity: o.DiagnosticSeverity.Warning,
                code: o.ErrorCode.EnumValueMismatch,
                message: t.errorMessage || i('constWarning', 'Value must be {0}.', JSON.stringify(t.const)),
              }),
              (n.enumValueMatch = !1)),
            (n.enumValues = [t.const]);
        }
        t.deprecationMessage &&
          e.parent &&
          n.problems.push({
            location: { offset: e.parent.offset, length: e.parent.length },
            severity: o.DiagnosticSeverity.Warning,
            message: t.deprecationMessage,
          });
      })(),
        s.add({ node: e, schema: t });
    }
  }
  (t.JSONDocument = S),
    (t.parse = function (e, t) {
      var a = [],
        s = -1,
        m = e.getText(),
        g = n.createScanner(m, !1),
        v = t && t.collectComments ? [] : void 0;
      function y() {
        for (;;) {
          var t = g.scan();
          switch ((C(), t)) {
            case 12:
            case 13:
              Array.isArray(v) &&
                v.push(
                  o.Range.create(
                    e.positionAt(g.getTokenOffset()),
                    e.positionAt(g.getTokenOffset() + g.getTokenLength())
                  )
                );
              break;
            case 15:
            case 14:
              break;
            default:
              return t;
          }
        }
      }
      function b(t, n, r, i, c) {
        if ((void 0 === c && (c = o.DiagnosticSeverity.Error), 0 === a.length || r !== s)) {
          var u = o.Range.create(e.positionAt(r), e.positionAt(i));
          a.push(o.Diagnostic.create(u, t, c, n, e.languageId)), (s = r);
        }
      }
      function x(e, t, n, r, o) {
        void 0 === n && (n = null), void 0 === r && (r = []), void 0 === o && (o = []);
        var i = g.getTokenOffset(),
          a = g.getTokenOffset() + g.getTokenLength();
        if (i === a && i > 0) {
          for (i--; i > 0 && /\s/.test(m.charAt(i)); ) i--;
          a = i + 1;
        }
        if ((b(e, t, i, a), n && j(n, !1), r.length + o.length > 0))
          for (var s = g.getToken(); 17 !== s; ) {
            if (-1 !== r.indexOf(s)) {
              y();
              break;
            }
            if (-1 !== o.indexOf(s)) break;
            s = y();
          }
        return n;
      }
      function C() {
        switch (g.getTokenError()) {
          case 4:
            return x(i('InvalidUnicode', 'Invalid unicode sequence in string.'), o.ErrorCode.InvalidUnicode), !0;
          case 5:
            return (
              x(i('InvalidEscapeCharacter', 'Invalid escape character in string.'), o.ErrorCode.InvalidEscapeCharacter),
              !0
            );
          case 3:
            return x(i('UnexpectedEndOfNumber', 'Unexpected end of number.'), o.ErrorCode.UnexpectedEndOfNumber), !0;
          case 1:
            return x(i('UnexpectedEndOfComment', 'Unexpected end of comment.'), o.ErrorCode.UnexpectedEndOfComment), !0;
          case 2:
            return x(i('UnexpectedEndOfString', 'Unexpected end of string.'), o.ErrorCode.UnexpectedEndOfString), !0;
          case 6:
            return (
              x(
                i('InvalidCharacter', 'Invalid characters in string. Control characters must be escaped.'),
                o.ErrorCode.InvalidCharacter
              ),
              !0
            );
        }
        return !1;
      }
      function j(e, t) {
        return (e.length = g.getTokenOffset() + g.getTokenLength() - e.offset), t && y(), e;
      }
      function T(t, n) {
        var r = new p(t, g.getTokenOffset()),
          a = k(r);
        if (!a) {
          if (16 !== g.getToken()) return null;
          x(i('DoubleQuotesExpected', 'Property keys must be doublequoted'), o.ErrorCode.Undefined);
          var s = new d(r, g.getTokenOffset(), g.getTokenLength());
          (s.value = g.getTokenValue()), (a = s), y();
        }
        r.keyNode = a;
        var c = n[a.value];
        if (
          (c
            ? (b(
                i('DuplicateKeyWarning', 'Duplicate object key'),
                o.ErrorCode.DuplicateKey,
                r.keyNode.offset,
                r.keyNode.offset + r.keyNode.length,
                o.DiagnosticSeverity.Warning
              ),
              'object' == typeof c &&
                b(
                  i('DuplicateKeyWarning', 'Duplicate object key'),
                  o.ErrorCode.DuplicateKey,
                  c.keyNode.offset,
                  c.keyNode.offset + c.keyNode.length,
                  o.DiagnosticSeverity.Warning
                ),
              (n[a.value] = !0))
            : (n[a.value] = r),
          6 === g.getToken())
        )
          (r.colonOffset = g.getTokenOffset()), y();
        else if (
          (x(i('ColonExpected', 'Colon expected'), o.ErrorCode.ColonExpected),
          10 === g.getToken() && e.positionAt(a.offset + a.length).line < e.positionAt(g.getTokenOffset()).line)
        )
          return (r.length = a.length), r;
        var u = O(r, a.value);
        return u
          ? ((r.valueNode = u), (r.length = u.offset + u.length - r.offset), r)
          : x(i('ValueExpected', 'Value expected'), o.ErrorCode.ValueExpected, r, [], [2, 5]);
      }
      function k(e) {
        if (10 !== g.getToken()) return null;
        var t = new d(e, g.getTokenOffset());
        return (t.value = g.getTokenValue()), j(t, !0);
      }
      function O(e, t) {
        return (
          (function (e) {
            if (3 !== g.getToken()) return null;
            var t = new f(e, g.getTokenOffset());
            y();
            for (var n = 0, r = !1; 4 !== g.getToken() && 17 !== g.getToken(); ) {
              if (5 === g.getToken()) {
                r || x(i('ValueExpected', 'Value expected'), o.ErrorCode.ValueExpected);
                var a = g.getTokenOffset();
                if ((y(), 4 === g.getToken())) {
                  r && b(i('TrailingComma', 'Trailing comma'), o.ErrorCode.TrailingComma, a, a + 1);
                  continue;
                }
              } else r && x(i('ExpectedComma', 'Expected comma'), o.ErrorCode.CommaExpected);
              var s = O(t, n++);
              s
                ? t.items.push(s)
                : x(i('PropertyExpected', 'Value expected'), o.ErrorCode.ValueExpected, null, [], [4, 5]),
                (r = !0);
            }
            return 4 !== g.getToken()
              ? x(
                  i('ExpectedCloseBracket', 'Expected comma or closing bracket'),
                  o.ErrorCode.CommaOrCloseBacketExpected,
                  t
                )
              : j(t, !0);
          })(e) ||
          (function (e) {
            if (1 !== g.getToken()) return null;
            var t = new h(e, g.getTokenOffset()),
              n = Object.create(null);
            y();
            for (var r = !1; 2 !== g.getToken() && 17 !== g.getToken(); ) {
              if (5 === g.getToken()) {
                r || x(i('PropertyExpected', 'Property expected'), o.ErrorCode.PropertyExpected);
                var a = g.getTokenOffset();
                if ((y(), 2 === g.getToken())) {
                  r && b(i('TrailingComma', 'Trailing comma'), o.ErrorCode.TrailingComma, a, a + 1);
                  continue;
                }
              } else r && x(i('ExpectedComma', 'Expected comma'), o.ErrorCode.CommaExpected);
              var s = T(t, n);
              s
                ? t.properties.push(s)
                : x(i('PropertyExpected', 'Property expected'), o.ErrorCode.PropertyExpected, null, [], [2, 5]),
                (r = !0);
            }
            return 2 !== g.getToken()
              ? x(i('ExpectedCloseBrace', 'Expected comma or closing brace'), o.ErrorCode.CommaOrCloseBraceExpected, t)
              : j(t, !0);
          })(e) ||
          k(e) ||
          (function (e) {
            if (11 !== g.getToken()) return null;
            var t = new l(e, g.getTokenOffset());
            if (0 === g.getTokenError()) {
              var n = g.getTokenValue();
              try {
                var a = JSON.parse(n);
                if (!r.isNumber(a))
                  return x(i('InvalidNumberFormat', 'Invalid number format.'), o.ErrorCode.Undefined, t);
                t.value = a;
              } catch (e) {
                return x(i('InvalidNumberFormat', 'Invalid number format.'), o.ErrorCode.Undefined, t);
              }
              t.isInteger = -1 === n.indexOf('.');
            }
            return j(t, !0);
          })(e) ||
          (function (e) {
            switch (g.getToken()) {
              case 7:
                return j(new c(e, g.getTokenOffset()), !0);
              case 8:
                return j(new u(e, !0, g.getTokenOffset()), !0);
              case 9:
                return j(new u(e, !1, g.getTokenOffset()), !0);
              default:
                return null;
            }
          })(e)
        );
      }
      var A = null;
      return (
        17 !== y() &&
          ((A = O(null))
            ? 17 !== g.getToken() && x(i('End of file expected', 'End of file expected.'), o.ErrorCode.Undefined)
            : x(i('Invalid symbol', 'Expected a JSON object, array or literal.'), o.ErrorCode.Undefined)),
        new S(A, a, v)
      );
    });
}),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/utils/json', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.stringifyObject = function e(t, n, r) {
        if (null !== t && 'object' == typeof t) {
          var o = n + '\t';
          if (Array.isArray(t)) {
            if (0 === t.length) return '[]';
            for (var i = '[\n', a = 0; a < t.length; a++)
              (i += o + e(t[a], o, r)), a < t.length - 1 && (i += ','), (i += '\n');
            return (i += n + ']');
          }
          var s = Object.keys(t);
          if (0 === s.length) return '{}';
          for (i = '{\n', a = 0; a < s.length; a++) {
            var c = s[a];
            (i += o + JSON.stringify(c) + ': ' + e(t[c], o, r)), a < s.length - 1 && (i += ','), (i += '\n');
          }
          return (i += n + '}');
        }
        return r(t);
      });
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/utils/strings', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.startsWith = function (e, t) {
        if (e.length < t.length) return !1;
        for (var n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
        return !0;
      }),
      (t.endsWith = function (e, t) {
        var n = e.length - t.length;
        return n > 0 ? e.lastIndexOf(t) === n : 0 === n && e === t;
      }),
      (t.convertSimple2RegExpPattern = function (e) {
        return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
      }),
      (t.repeat = function (e, t) {
        for (var n = ''; t > 0; ) 1 == (1 & t) && (n += e), (e += e), (t >>>= 1);
        return n;
      });
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonCompletion', [
          'require',
          'exports',
          '../parser/jsonParser',
          'jsonc-parser',
          '../utils/json',
          '../utils/strings',
          '../utils/objects',
          '../jsonLanguageTypes',
          'vscode-nls',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('../parser/jsonParser'),
      r = e('jsonc-parser'),
      o = e('../utils/json'),
      i = e('../utils/strings'),
      a = e('../utils/objects'),
      s = e('../jsonLanguageTypes'),
      c = e('vscode-nls').loadMessageBundle(),
      u = (function () {
        function e(e, t, n, r) {
          void 0 === t && (t = []),
            void 0 === n && (n = Promise),
            void 0 === r && (r = {}),
            (this.schemaService = e),
            (this.contributions = t),
            (this.promiseConstructor = n),
            (this.clientCapabilities = r),
            (this.templateVarIdCounter = 0);
        }
        return (
          (e.prototype.doResolve = function (e) {
            for (var t = this.contributions.length - 1; t >= 0; t--)
              if (this.contributions[t].resolveCompletion) {
                var n = this.contributions[t].resolveCompletion(e);
                if (n) return n;
              }
            return this.promiseConstructor.resolve(e);
          }),
          (e.prototype.doComplete = function (e, t, r) {
            var o = this,
              i = { items: [], isIncomplete: !1 },
              a = e.getText(),
              c = e.offsetAt(t),
              u = r.getNodeFromOffset(c, !0);
            if (this.isInComment(e, u ? u.offset : 0, c)) return Promise.resolve(i);
            if (u && c === u.offset + u.length && c > 0) {
              var f = a[c - 1];
              (('object' === u.type && '}' === f) || ('array' === u.type && ']' === f)) && (u = u.parent);
            }
            var l = this.getCurrentWord(e, c),
              d = null;
            if (!u || ('string' !== u.type && 'number' !== u.type && 'boolean' !== u.type && 'null' !== u.type)) {
              var p = c - l.length;
              p > 0 && '"' === a[p - 1] && p--, (d = s.Range.create(e.positionAt(p), t));
            } else d = s.Range.create(e.positionAt(u.offset), e.positionAt(u.offset + u.length));
            var h = {},
              m = {
                add: function (e) {
                  var t = e.label,
                    n = h[t];
                  if (n) n.documentation || (n.documentation = e.documentation);
                  else {
                    if ((t = t.replace(/[\n]/g, '↵')).length > 60) {
                      var r = t.substr(0, 57).trim() + '...';
                      h[r] || (t = r);
                    }
                    d && (e.textEdit = s.TextEdit.replace(d, e.insertText)), (e.label = t), (h[t] = e), i.items.push(e);
                  }
                },
                setAsIncomplete: function () {
                  i.isIncomplete = !0;
                },
                error: function (e) {
                  console.error(e);
                },
                log: function (e) {
                  console.log(e);
                },
                getNumberOfProposals: function () {
                  return i.items.length;
                },
              };
            return this.schemaService.getSchemaForResource(e.uri, r).then(function (t) {
              var f = [],
                p = !0,
                g = '',
                v = null;
              if (u && 'string' === u.type) {
                var y = u.parent;
                y &&
                  'property' === y.type &&
                  y.keyNode === u &&
                  ((p = !y.valueNode), (v = y), (g = a.substr(u.offset + 1, u.length - 2)), y && (u = y.parent));
              }
              if (u && 'object' === u.type) {
                if (u.offset === c) return i;
                u.properties.forEach(function (e) {
                  (v && v === e) || (h[e.keyNode.value] = s.CompletionItem.create('__'));
                });
                var b = '';
                p && (b = o.evaluateSeparatorAfter(e, e.offsetAt(d.end))),
                  t ? o.getPropertyCompletions(t, r, u, p, b, m) : o.getSchemaLessPropertyCompletions(r, u, g, m);
                var x = n.getNodePath(u);
                o.contributions.forEach(function (t) {
                  var n = t.collectPropertyCompletions(e.uri, x, l, p, '' === b, m);
                  n && f.push(n);
                }),
                  !t &&
                    l.length > 0 &&
                    '"' !== a.charAt(c - l.length - 1) &&
                    (m.add({
                      kind: s.CompletionItemKind.Property,
                      label: o.getLabelForValue(l),
                      insertText: o.getInsertTextForProperty(l, null, !1, b),
                      insertTextFormat: s.InsertTextFormat.Snippet,
                      documentation: '',
                    }),
                    m.setAsIncomplete());
              }
              var S = {};
              return (
                t ? o.getValueCompletions(t, r, u, c, e, m, S) : o.getSchemaLessValueCompletions(r, u, c, e, m),
                o.contributions.length > 0 && o.getContributedValueCompletions(r, u, c, e, m, f),
                o.promiseConstructor.all(f).then(function () {
                  if (0 === m.getNumberOfProposals()) {
                    var t = c;
                    !u ||
                      ('string' !== u.type && 'number' !== u.type && 'boolean' !== u.type && 'null' !== u.type) ||
                      (t = u.offset + u.length);
                    var n = o.evaluateSeparatorAfter(e, t);
                    o.addFillerValueCompletions(S, n, m);
                  }
                  return i;
                })
              );
            });
          }),
          (e.prototype.getPropertyCompletions = function (e, t, n, r, o, a) {
            var c = this;
            t.getMatchingSchemas(e.schema, n.offset).forEach(function (e) {
              if (e.node === n && !e.inverted) {
                var t = e.schema.properties;
                t &&
                  Object.keys(t).forEach(function (e) {
                    var n = t[e];
                    if ('object' == typeof n && !n.deprecationMessage && !n.doNotSuggest) {
                      var u = {
                        kind: s.CompletionItemKind.Property,
                        label: e,
                        insertText: c.getInsertTextForProperty(e, n, r, o),
                        insertTextFormat: s.InsertTextFormat.Snippet,
                        filterText: c.getFilterTextForValue(e),
                        documentation: c.fromMarkup(n.markdownDescription) || n.description || '',
                      };
                      i.endsWith(u.insertText, '$1' + o) &&
                        (u.command = { title: 'Suggest', command: 'editor.action.triggerSuggest' }),
                        a.add(u);
                    }
                  });
              }
            });
          }),
          (e.prototype.getSchemaLessPropertyCompletions = function (e, t, n, r) {
            var o = this,
              i = function (e) {
                e.properties.forEach(function (e) {
                  var t = e.keyNode.value;
                  r.add({
                    kind: s.CompletionItemKind.Property,
                    label: t,
                    insertText: o.getInsertTextForValue(t, ''),
                    insertTextFormat: s.InsertTextFormat.Snippet,
                    filterText: o.getFilterTextForValue(t),
                    documentation: '',
                  });
                });
              };
            if (t.parent)
              if ('property' === t.parent.type) {
                var a = t.parent.keyNode.value;
                e.visit(function (e) {
                  return (
                    'property' === e.type &&
                      e !== t.parent &&
                      e.keyNode.value === a &&
                      e.valueNode &&
                      'object' === e.valueNode.type &&
                      i(e.valueNode),
                    !0
                  );
                });
              } else
                'array' === t.parent.type &&
                  t.parent.items.forEach(function (e) {
                    'object' === e.type && e !== t && i(e);
                  });
            else
              'object' === t.type &&
                r.add({
                  kind: s.CompletionItemKind.Property,
                  label: '$schema',
                  insertText: this.getInsertTextForProperty('$schema', null, !0, ''),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  documentation: '',
                  filterText: this.getFilterTextForValue('$schema'),
                });
          }),
          (e.prototype.getSchemaLessValueCompletions = function (e, t, r, o, i) {
            var a = this,
              c = r;
            if (
              (!t ||
                ('string' !== t.type && 'number' !== t.type && 'boolean' !== t.type && 'null' !== t.type) ||
                ((c = t.offset + t.length), (t = t.parent)),
              !t)
            )
              return (
                i.add({
                  kind: this.getSuggestionKind('object'),
                  label: 'Empty object',
                  insertText: this.getInsertTextForValue({}, ''),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  documentation: '',
                }),
                void i.add({
                  kind: this.getSuggestionKind('array'),
                  label: 'Empty array',
                  insertText: this.getInsertTextForValue([], ''),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  documentation: '',
                })
              );
            var u = this.evaluateSeparatorAfter(o, c),
              f = function (e) {
                n.contains(e.parent, r, !0) ||
                  i.add({
                    kind: a.getSuggestionKind(e.type),
                    label: a.getLabelTextForMatchingNode(e, o),
                    insertText: a.getInsertTextForMatchingNode(e, o, u),
                    insertTextFormat: s.InsertTextFormat.Snippet,
                    documentation: '',
                  }),
                  'boolean' === e.type && a.addBooleanValueCompletion(!e.value, u, i);
              };
            if ('property' === t.type && r > t.colonOffset) {
              var l = t.valueNode;
              if (l && (r > l.offset + l.length || 'object' === l.type || 'array' === l.type)) return;
              var d = t.keyNode.value;
              e.visit(function (e) {
                return 'property' === e.type && e.keyNode.value === d && e.valueNode && f(e.valueNode), !0;
              }),
                '$schema' === d && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(u, i);
            }
            if ('array' === t.type)
              if (t.parent && 'property' === t.parent.type) {
                var p = t.parent.keyNode.value;
                e.visit(function (e) {
                  return (
                    'property' === e.type &&
                      e.keyNode.value === p &&
                      e.valueNode &&
                      'array' === e.valueNode.type &&
                      e.valueNode.items.forEach(f),
                    !0
                  );
                });
              } else t.items.forEach(f);
          }),
          (e.prototype.getValueCompletions = function (e, t, n, r, o, i, a) {
            var s = this,
              c = r,
              u = null,
              f = null;
            if (
              (!n ||
                ('string' !== n.type && 'number' !== n.type && 'boolean' !== n.type && 'null' !== n.type) ||
                ((c = n.offset + n.length), (f = n), (n = n.parent)),
              n)
            ) {
              if ('property' === n.type && r > n.colonOffset) {
                var l = n.valueNode;
                if (l && r > l.offset + l.length) return;
                (u = n.keyNode.value), (n = n.parent);
              }
              if (n && (null !== u || 'array' === n.type)) {
                var d = this.evaluateSeparatorAfter(o, c);
                t.getMatchingSchemas(e.schema, n.offset, f).forEach(function (e) {
                  if (e.node === n && !e.inverted && e.schema) {
                    if ('array' === n.type && e.schema.items)
                      if (Array.isArray(e.schema.items)) {
                        var t = s.findItemAtOffset(n, o, r);
                        t < e.schema.items.length && s.addSchemaValueCompletions(e.schema.items[t], d, i, a);
                      } else s.addSchemaValueCompletions(e.schema.items, d, i, a);
                    if (e.schema.properties) {
                      var c = e.schema.properties[u];
                      c && s.addSchemaValueCompletions(c, d, i, a);
                    }
                  }
                }),
                  '$schema' !== u || n.parent || this.addDollarSchemaCompletions(d, i),
                  a.boolean && (this.addBooleanValueCompletion(!0, d, i), this.addBooleanValueCompletion(!1, d, i)),
                  a.null && this.addNullValueCompletion(d, i);
              }
            } else this.addSchemaValueCompletions(e.schema, '', i, a);
          }),
          (e.prototype.getContributedValueCompletions = function (e, t, r, o, i, a) {
            if (t) {
              if (
                (('string' !== t.type && 'number' !== t.type && 'boolean' !== t.type && 'null' !== t.type) ||
                  (t = t.parent),
                'property' === t.type && r > t.colonOffset)
              ) {
                var s = t.keyNode.value,
                  c = t.valueNode;
                if (!c || r <= c.offset + c.length) {
                  var u = n.getNodePath(t.parent);
                  this.contributions.forEach(function (e) {
                    var t = e.collectValueCompletions(o.uri, u, s, i);
                    t && a.push(t);
                  });
                }
              }
            } else
              this.contributions.forEach(function (e) {
                var t = e.collectDefaultCompletions(o.uri, i);
                t && a.push(t);
              });
          }),
          (e.prototype.addSchemaValueCompletions = function (e, t, n, r) {
            var o = this;
            'object' == typeof e &&
              (this.addEnumValueCompletions(e, t, n),
              this.addDefaultValueCompletions(e, t, n),
              this.collectTypes(e, r),
              Array.isArray(e.allOf) &&
                e.allOf.forEach(function (e) {
                  return o.addSchemaValueCompletions(e, t, n, r);
                }),
              Array.isArray(e.anyOf) &&
                e.anyOf.forEach(function (e) {
                  return o.addSchemaValueCompletions(e, t, n, r);
                }),
              Array.isArray(e.oneOf) &&
                e.oneOf.forEach(function (e) {
                  return o.addSchemaValueCompletions(e, t, n, r);
                }));
          }),
          (e.prototype.addDefaultValueCompletions = function (e, t, n, r) {
            var o = this;
            void 0 === r && (r = 0);
            var i = !1;
            if (a.isDefined(e.default)) {
              for (var u = e.type, f = e.default, l = r; l > 0; l--) (f = [f]), (u = 'array');
              n.add({
                kind: this.getSuggestionKind(u),
                label: this.getLabelForValue(f),
                insertText: this.getInsertTextForValue(f, t),
                insertTextFormat: s.InsertTextFormat.Snippet,
                detail: c('json.suggest.default', 'Default value'),
              }),
                (i = !0);
            }
            Array.isArray(e.examples) &&
              e.examples.forEach(function (a) {
                for (var c = e.type, u = a, f = r; f > 0; f--) (u = [u]), (c = 'array');
                n.add({
                  kind: o.getSuggestionKind(c),
                  label: o.getLabelForValue(u),
                  insertText: o.getInsertTextForValue(u, t),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                }),
                  (i = !0);
              }),
              Array.isArray(e.defaultSnippets) &&
                e.defaultSnippets.forEach(function (c) {
                  var u,
                    f,
                    l = e.type,
                    d = c.body,
                    p = c.label;
                  if (a.isDefined(d)) {
                    e.type;
                    for (var h = r; h > 0; h--) (d = [d]), 'array';
                    (u = o.getInsertTextForSnippetValue(d, t)),
                      (f = o.getFilterTextForSnippetValue(d)),
                      (p = p || o.getLabelForSnippetValue(d));
                  } else if ('string' == typeof c.bodyText) {
                    var m = '',
                      g = '',
                      v = '';
                    for (h = r; h > 0; h--) (m = m + v + '[\n'), (g = g + '\n' + v + ']'), (v += '\t'), (l = 'array');
                    (u = m + v + c.bodyText.split('\n').join('\n' + v) + g + t),
                      (p = p || u),
                      (f = u.replace(/[\n]/g, ''));
                  }
                  n.add({
                    kind: o.getSuggestionKind(l),
                    label: p,
                    documentation: o.fromMarkup(c.markdownDescription) || c.description,
                    insertText: u,
                    insertTextFormat: s.InsertTextFormat.Snippet,
                    filterText: f,
                  }),
                    (i = !0);
                }),
              i ||
                'object' != typeof e.items ||
                Array.isArray(e.items) ||
                this.addDefaultValueCompletions(e.items, t, n, r + 1);
          }),
          (e.prototype.addEnumValueCompletions = function (e, t, n) {
            if (
              (a.isDefined(e.const) &&
                n.add({
                  kind: this.getSuggestionKind(e.type),
                  label: this.getLabelForValue(e.const),
                  insertText: this.getInsertTextForValue(e.const, t),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  documentation: this.fromMarkup(e.markdownDescription) || e.description,
                }),
              Array.isArray(e.enum))
            )
              for (var r = 0, o = e.enum.length; r < o; r++) {
                var i = e.enum[r],
                  c = this.fromMarkup(e.markdownDescription) || e.description;
                e.markdownEnumDescriptions && r < e.markdownEnumDescriptions.length && this.doesSupportMarkdown()
                  ? (c = this.fromMarkup(e.markdownEnumDescriptions[r]))
                  : e.enumDescriptions && r < e.enumDescriptions.length && (c = e.enumDescriptions[r]),
                  n.add({
                    kind: this.getSuggestionKind(e.type),
                    label: this.getLabelForValue(i),
                    insertText: this.getInsertTextForValue(i, t),
                    insertTextFormat: s.InsertTextFormat.Snippet,
                    documentation: c,
                  });
              }
          }),
          (e.prototype.collectTypes = function (e, t) {
            if (!Array.isArray(e.enum) && !a.isDefined(e.const)) {
              var n = e.type;
              Array.isArray(n)
                ? n.forEach(function (e) {
                    return (t[e] = !0);
                  })
                : (t[n] = !0);
            }
          }),
          (e.prototype.addFillerValueCompletions = function (e, t, n) {
            e.object &&
              n.add({
                kind: this.getSuggestionKind('object'),
                label: '{}',
                insertText: this.getInsertTextForGuessedValue({}, t),
                insertTextFormat: s.InsertTextFormat.Snippet,
                detail: c('defaults.object', 'New object'),
                documentation: '',
              }),
              e.array &&
                n.add({
                  kind: this.getSuggestionKind('array'),
                  label: '[]',
                  insertText: this.getInsertTextForGuessedValue([], t),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  detail: c('defaults.array', 'New array'),
                  documentation: '',
                });
          }),
          (e.prototype.addBooleanValueCompletion = function (e, t, n) {
            n.add({
              kind: this.getSuggestionKind('boolean'),
              label: e ? 'true' : 'false',
              insertText: this.getInsertTextForValue(e, t),
              insertTextFormat: s.InsertTextFormat.Snippet,
              documentation: '',
            });
          }),
          (e.prototype.addNullValueCompletion = function (e, t) {
            t.add({
              kind: this.getSuggestionKind('null'),
              label: 'null',
              insertText: 'null' + e,
              insertTextFormat: s.InsertTextFormat.Snippet,
              documentation: '',
            });
          }),
          (e.prototype.addDollarSchemaCompletions = function (e, t) {
            var n = this;
            this.schemaService
              .getRegisteredSchemaIds(function (e) {
                return 'http' === e || 'https' === e;
              })
              .forEach(function (r) {
                return t.add({
                  kind: s.CompletionItemKind.Module,
                  label: n.getLabelForValue(r),
                  filterText: n.getFilterTextForValue(r),
                  insertText: n.getInsertTextForValue(r, e),
                  insertTextFormat: s.InsertTextFormat.Snippet,
                  documentation: '',
                });
              });
          }),
          (e.prototype.getLabelForValue = function (e) {
            return JSON.stringify(e);
          }),
          (e.prototype.getFilterTextForValue = function (e) {
            return JSON.stringify(e);
          }),
          (e.prototype.getFilterTextForSnippetValue = function (e) {
            return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
          }),
          (e.prototype.getLabelForSnippetValue = function (e) {
            return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
          }),
          (e.prototype.getInsertTextForPlainText = function (e) {
            return e.replace(/[\\\$\}]/g, '\\$&');
          }),
          (e.prototype.getInsertTextForValue = function (e, t) {
            var n = JSON.stringify(e, null, '\t');
            return '{}' === n ? '{$1}' + t : '[]' === n ? '[$1]' + t : this.getInsertTextForPlainText(n + t);
          }),
          (e.prototype.getInsertTextForSnippetValue = function (e, t) {
            return (
              o.stringifyObject(e, '', function (e) {
                return 'string' == typeof e && '^' === e[0] ? e.substr(1) : JSON.stringify(e);
              }) + t
            );
          }),
          (e.prototype.getInsertTextForGuessedValue = function (e, t) {
            switch (typeof e) {
              case 'object':
                return null === e ? '${1:null}' + t : this.getInsertTextForValue(e, t);
              case 'string':
                var n = JSON.stringify(e);
                return (n = n.substr(1, n.length - 2)), '"${1:' + (n = this.getInsertTextForPlainText(n)) + '}"' + t;
              case 'number':
              case 'boolean':
                return '${1:' + JSON.stringify(e) + '}' + t;
            }
            return this.getInsertTextForValue(e, t);
          }),
          (e.prototype.getSuggestionKind = function (e) {
            if (Array.isArray(e)) {
              var t = e;
              e = t.length > 0 ? t[0] : null;
            }
            if (!e) return s.CompletionItemKind.Value;
            switch (e) {
              case 'string':
                return s.CompletionItemKind.Value;
              case 'object':
                return s.CompletionItemKind.Module;
              case 'property':
                return s.CompletionItemKind.Property;
              default:
                return s.CompletionItemKind.Value;
            }
          }),
          (e.prototype.getLabelTextForMatchingNode = function (e, t) {
            switch (e.type) {
              case 'array':
                return '[]';
              case 'object':
                return '{}';
              default:
                return t.getText().substr(e.offset, e.length);
            }
          }),
          (e.prototype.getInsertTextForMatchingNode = function (e, t, n) {
            switch (e.type) {
              case 'array':
                return this.getInsertTextForValue([], n);
              case 'object':
                return this.getInsertTextForValue({}, n);
              default:
                var r = t.getText().substr(e.offset, e.length) + n;
                return this.getInsertTextForPlainText(r);
            }
          }),
          (e.prototype.getInsertTextForProperty = function (e, t, n, r) {
            var o = this.getInsertTextForValue(e, '');
            if (!n) return o;
            var i,
              s = o + ': ',
              c = 0;
            if (t) {
              if (Array.isArray(t.defaultSnippets)) {
                if (1 === t.defaultSnippets.length) {
                  var u = t.defaultSnippets[0].body;
                  a.isDefined(u) && (i = this.getInsertTextForSnippetValue(u, ''));
                }
                c += t.defaultSnippets.length;
              }
              if (
                (t.enum &&
                  (i || 1 !== t.enum.length || (i = this.getInsertTextForGuessedValue(t.enum[0], '')),
                  (c += t.enum.length)),
                a.isDefined(t.default) && (i || (i = this.getInsertTextForGuessedValue(t.default, '')), c++),
                Array.isArray(t.examples) &&
                  t.examples.length &&
                  (i || (i = this.getInsertTextForGuessedValue(t.examples[0], '')), (c += t.examples.length)),
                0 === c)
              ) {
                var f = Array.isArray(t.type) ? t.type[0] : t.type;
                switch ((f || (t.properties ? (f = 'object') : t.items && (f = 'array')), f)) {
                  case 'boolean':
                    i = '$1';
                    break;
                  case 'string':
                    i = '"$1"';
                    break;
                  case 'object':
                    i = '{$1}';
                    break;
                  case 'array':
                    i = '[$1]';
                    break;
                  case 'number':
                  case 'integer':
                    i = '${1:0}';
                    break;
                  case 'null':
                    i = '${1:null}';
                    break;
                  default:
                    return o;
                }
              }
            }
            return (!i || c > 1) && (i = '$1'), s + i + r;
          }),
          (e.prototype.getCurrentWord = function (e, t) {
            for (var n = t - 1, r = e.getText(); n >= 0 && -1 === ' \t\n\r\v":{[,]}'.indexOf(r.charAt(n)); ) n--;
            return r.substring(n + 1, t);
          }),
          (e.prototype.evaluateSeparatorAfter = function (e, t) {
            var n = r.createScanner(e.getText(), !0);
            switch ((n.setPosition(t), n.scan())) {
              case 5:
              case 2:
              case 4:
              case 17:
                return '';
              default:
                return ',';
            }
          }),
          (e.prototype.findItemAtOffset = function (e, t, n) {
            for (var o = r.createScanner(t.getText(), !0), i = e.items, a = i.length - 1; a >= 0; a--) {
              var s = i[a];
              if (n > s.offset + s.length)
                return (
                  o.setPosition(s.offset + s.length),
                  5 === o.scan() && n >= o.getTokenOffset() + o.getTokenLength() ? a + 1 : a
                );
              if (n >= s.offset) return a;
            }
            return 0;
          }),
          (e.prototype.isInComment = function (e, t, n) {
            var o = r.createScanner(e.getText(), !1);
            o.setPosition(t);
            for (var i = o.scan(); 17 !== i && o.getTokenOffset() + o.getTokenLength() < n; ) i = o.scan();
            return (12 === i || 13 === i) && o.getTokenOffset() <= n;
          }),
          (e.prototype.fromMarkup = function (e) {
            if (e && this.doesSupportMarkdown()) return { kind: s.MarkupKind.Markdown, value: e };
          }),
          (e.prototype.doesSupportMarkdown = function () {
            if (!a.isDefined(this.supportsMarkdown)) {
              var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
              this.supportsMarkdown =
                e &&
                e.completionItem &&
                Array.isArray(e.completionItem.documentationFormat) &&
                -1 !== e.completionItem.documentationFormat.indexOf(s.MarkupKind.Markdown);
            }
            return this.supportsMarkdown;
          }),
          (e.prototype.doesSupportsCommitCharacters = function () {
            if (!a.isDefined(this.supportsCommitCharacters)) {
              var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
              this.supportsCommitCharacters = e && e.completionItem && !!e.completionItem.commitCharactersSupport;
            }
            return this.supportsCommitCharacters;
          }),
          e
        );
      })();
    t.JSONCompletion = u;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonHover', [
          'require',
          'exports',
          '../parser/jsonParser',
          '../jsonLanguageTypes',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('../parser/jsonParser'),
      r = e('../jsonLanguageTypes'),
      o = (function () {
        function e(e, t, n) {
          void 0 === t && (t = []), (this.schemaService = e), (this.contributions = t), (this.promise = n || Promise);
        }
        return (
          (e.prototype.doHover = function (e, t, o) {
            var a = e.offsetAt(t),
              s = o.getNodeFromOffset(a);
            if (!s || (('object' === s.type || 'array' === s.type) && a > s.offset + 1 && a < s.offset + s.length - 1))
              return this.promise.resolve(null);
            var c = s;
            if ('string' === s.type) {
              var u = s.parent;
              if (u && 'property' === u.type && u.keyNode === s && !(s = u.valueNode))
                return this.promise.resolve(null);
            }
            for (
              var f = r.Range.create(e.positionAt(c.offset), e.positionAt(c.offset + c.length)),
                l = function (e) {
                  return { contents: e, range: f };
                },
                d = n.getNodePath(s),
                p = this.contributions.length - 1;
              p >= 0;
              p--
            ) {
              var h = this.contributions[p].getInfoContribution(e.uri, d);
              if (h)
                return h.then(function (e) {
                  return l(e);
                });
            }
            return this.schemaService.getSchemaForResource(e.uri, o).then(function (e) {
              if (e) {
                var t = o.getMatchingSchemas(e.schema, s.offset),
                  r = null,
                  a = null,
                  c = null,
                  u = null;
                t.every(function (e) {
                  if (
                    e.node === s &&
                    !e.inverted &&
                    e.schema &&
                    ((r = r || e.schema.title),
                    (a = a || e.schema.markdownDescription || i(e.schema.description)),
                    e.schema.enum)
                  ) {
                    var t = e.schema.enum.indexOf(n.getNodeValue(s));
                    e.schema.markdownEnumDescriptions
                      ? (c = e.schema.markdownEnumDescriptions[t])
                      : e.schema.enumDescriptions && (c = i(e.schema.enumDescriptions[t])),
                      c && 'string' != typeof (u = e.schema.enum[t]) && (u = JSON.stringify(u));
                  }
                  return !0;
                });
                var f = '';
                return (
                  r && (f = i(r)),
                  a && (f.length > 0 && (f += '\n\n'), (f += a)),
                  c &&
                    (f.length > 0 && (f += '\n\n'),
                    (f +=
                      '`' +
                      (function (e) {
                        if (-1 !== e.indexOf('`')) return '`` ' + e + ' ``';
                        return e;
                      })(u) +
                      '`: ' +
                      c)),
                  l([f])
                );
              }
              return null;
            });
          }),
          e
        );
      })();
    function i(e) {
      if (e) return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, '$1\n\n$3').replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
    }
    t.JSONHover = o;
  });
__extends =
  (this && this.__extends) ||
  (function () {
    var e = function (t, n) {
      return (e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        })(t, n);
    };
    return function (t, n) {
      function r() {
        this.constructor = t;
      }
      e(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
    };
  })();
!(function (e) {
  if ('object' == typeof module && 'object' == typeof module.exports) {
    var t = e(require, exports);
    void 0 !== t && (module.exports = t);
  } else 'function' == typeof define && define.amd && define('vscode-uri/index', ['require', 'exports'], e);
})(function (e, t) {
  'use strict';
  var n, r;
  if ((Object.defineProperty(t, '__esModule', { value: !0 }), 'object' == typeof process))
    r = 'win32' === process.platform;
  else if ('object' == typeof navigator) {
    var o = navigator.userAgent;
    r = o.indexOf('Windows') >= 0;
  }
  var i = /^\w[\w\d+.-]*$/,
    a = /^\//,
    s = /^\/\//;
  var c = '',
    u = '/',
    f = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
    l = (function () {
      function e(e, t, n, r, o, f) {
        void 0 === f && (f = !1),
          'object' == typeof e
            ? ((this.scheme = e.scheme || c),
              (this.authority = e.authority || c),
              (this.path = e.path || c),
              (this.query = e.query || c),
              (this.fragment = e.fragment || c))
            : ((this.scheme = (function (e, t) {
                return e || t ? e : 'file';
              })(e, f)),
              (this.authority = t || c),
              (this.path = (function (e, t) {
                switch (e) {
                  case 'https':
                  case 'http':
                  case 'file':
                    t ? t[0] !== u && (t = u + t) : (t = u);
                }
                return t;
              })(this.scheme, n || c)),
              (this.query = r || c),
              (this.fragment = o || c),
              (function (e, t) {
                if (!e.scheme && t)
                  throw new Error(
                    '[UriError]: Scheme is missing: {scheme: "", authority: "' +
                      e.authority +
                      '", path: "' +
                      e.path +
                      '", query: "' +
                      e.query +
                      '", fragment: "' +
                      e.fragment +
                      '"}'
                  );
                if (e.scheme && !i.test(e.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.');
                if (e.path)
                  if (e.authority) {
                    if (!a.test(e.path))
                      throw new Error(
                        '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                      );
                  } else if (s.test(e.path))
                    throw new Error(
                      '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                    );
              })(this, f));
      }
      return (
        (e.isUri = function (t) {
          return (
            t instanceof e ||
            (!!t &&
              'string' == typeof t.authority &&
              'string' == typeof t.fragment &&
              'string' == typeof t.path &&
              'string' == typeof t.query &&
              'string' == typeof t.scheme &&
              'function' == typeof t.fsPath &&
              'function' == typeof t.with &&
              'function' == typeof t.toString)
          );
        }),
        Object.defineProperty(e.prototype, 'fsPath', {
          get: function () {
            return v(this);
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.with = function (e) {
          if (!e) return this;
          var t = e.scheme,
            n = e.authority,
            r = e.path,
            o = e.query,
            i = e.fragment;
          return (
            void 0 === t ? (t = this.scheme) : null === t && (t = c),
            void 0 === n ? (n = this.authority) : null === n && (n = c),
            void 0 === r ? (r = this.path) : null === r && (r = c),
            void 0 === o ? (o = this.query) : null === o && (o = c),
            void 0 === i ? (i = this.fragment) : null === i && (i = c),
            t === this.scheme && n === this.authority && r === this.path && o === this.query && i === this.fragment
              ? this
              : new p(t, n, r, o, i)
          );
        }),
        (e.parse = function (e, t) {
          void 0 === t && (t = !1);
          var n = f.exec(e);
          return n
            ? new p(
                n[2] || c,
                decodeURIComponent(n[4] || c),
                decodeURIComponent(n[5] || c),
                decodeURIComponent(n[7] || c),
                decodeURIComponent(n[9] || c),
                t
              )
            : new p(c, c, c, c, c);
        }),
        (e.file = function (e) {
          var t = c;
          if ((r && (e = e.replace(/\\/g, u)), e[0] === u && e[1] === u)) {
            var n = e.indexOf(u, 2);
            -1 === n ? ((t = e.substring(2)), (e = u)) : ((t = e.substring(2, n)), (e = e.substring(n) || u));
          }
          return new p('file', t, e, c, c);
        }),
        (e.from = function (e) {
          return new p(e.scheme, e.authority, e.path, e.query, e.fragment);
        }),
        (e.prototype.toString = function (e) {
          return void 0 === e && (e = !1), y(this, e);
        }),
        (e.prototype.toJSON = function () {
          return this;
        }),
        (e.revive = function (t) {
          if (t) {
            if (t instanceof e) return t;
            var n = new p(t);
            return (n._formatted = t.external), (n._fsPath = t._sep === d ? t.fsPath : null), n;
          }
          return t;
        }),
        e
      );
    })();
  t.URI = l;
  var d = r ? 1 : void 0,
    p = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._formatted = null), (t._fsPath = null), t;
      }
      return (
        __extends(t, e),
        Object.defineProperty(t.prototype, 'fsPath', {
          get: function () {
            return this._fsPath || (this._fsPath = v(this)), this._fsPath;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.toString = function (e) {
          return (
            void 0 === e && (e = !1),
            e ? y(this, !0) : (this._formatted || (this._formatted = y(this, !1)), this._formatted)
          );
        }),
        (t.prototype.toJSON = function () {
          var e = { $mid: 1 };
          return (
            this._fsPath && ((e.fsPath = this._fsPath), (e._sep = d)),
            this._formatted && (e.external = this._formatted),
            this.path && (e.path = this.path),
            this.scheme && (e.scheme = this.scheme),
            this.authority && (e.authority = this.authority),
            this.query && (e.query = this.query),
            this.fragment && (e.fragment = this.fragment),
            e
          );
        }),
        t
      );
    })(l),
    h =
      (((n = {})[58] = '%3A'),
      (n[47] = '%2F'),
      (n[63] = '%3F'),
      (n[35] = '%23'),
      (n[91] = '%5B'),
      (n[93] = '%5D'),
      (n[64] = '%40'),
      (n[33] = '%21'),
      (n[36] = '%24'),
      (n[38] = '%26'),
      (n[39] = '%27'),
      (n[40] = '%28'),
      (n[41] = '%29'),
      (n[42] = '%2A'),
      (n[43] = '%2B'),
      (n[44] = '%2C'),
      (n[59] = '%3B'),
      (n[61] = '%3D'),
      (n[32] = '%20'),
      n);
  function m(e, t) {
    for (var n = void 0, r = -1, o = 0; o < e.length; o++) {
      var i = e.charCodeAt(o);
      if (
        (i >= 97 && i <= 122) ||
        (i >= 65 && i <= 90) ||
        (i >= 48 && i <= 57) ||
        45 === i ||
        46 === i ||
        95 === i ||
        126 === i ||
        (t && 47 === i)
      )
        -1 !== r && ((n += encodeURIComponent(e.substring(r, o))), (r = -1)), void 0 !== n && (n += e.charAt(o));
      else {
        void 0 === n && (n = e.substr(0, o));
        var a = h[i];
        void 0 !== a
          ? (-1 !== r && ((n += encodeURIComponent(e.substring(r, o))), (r = -1)), (n += a))
          : -1 === r && (r = o);
      }
    }
    return -1 !== r && (n += encodeURIComponent(e.substring(r))), void 0 !== n ? n : e;
  }
  function g(e) {
    for (var t = void 0, n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      35 === r || 63 === r ? (void 0 === t && (t = e.substr(0, n)), (t += h[r])) : void 0 !== t && (t += e[n]);
    }
    return void 0 !== t ? t : e;
  }
  function v(e) {
    var t;
    return (
      (t =
        e.authority && e.path.length > 1 && 'file' === e.scheme
          ? '//' + e.authority + e.path
          : 47 === e.path.charCodeAt(0) &&
            ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
              (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
            58 === e.path.charCodeAt(2)
          ? e.path[1].toLowerCase() + e.path.substr(2)
          : e.path),
      r && (t = t.replace(/\//g, '\\')),
      t
    );
  }
  function y(e, t) {
    var n = t ? g : m,
      r = '',
      o = e.scheme,
      i = e.authority,
      a = e.path,
      s = e.query,
      c = e.fragment;
    if ((o && ((r += o), (r += ':')), (i || 'file' === o) && ((r += u), (r += u)), i)) {
      var f = i.indexOf('@');
      if (-1 !== f) {
        var l = i.substr(0, f);
        (i = i.substr(f + 1)),
          -1 === (f = l.indexOf(':'))
            ? (r += n(l, !1))
            : ((r += n(l.substr(0, f), !1)), (r += ':'), (r += n(l.substr(f + 1), !1))),
          (r += '@');
      }
      -1 === (f = (i = i.toLowerCase()).indexOf(':'))
        ? (r += n(i, !1))
        : ((r += n(i.substr(0, f), !1)), (r += i.substr(f)));
    }
    if (a) {
      if (a.length >= 3 && 47 === a.charCodeAt(0) && 58 === a.charCodeAt(2))
        (d = a.charCodeAt(1)) >= 65 && d <= 90 && (a = '/' + String.fromCharCode(d + 32) + ':' + a.substr(3));
      else if (a.length >= 2 && 58 === a.charCodeAt(1)) {
        var d;
        (d = a.charCodeAt(0)) >= 65 && d <= 90 && (a = String.fromCharCode(d + 32) + ':' + a.substr(2));
      }
      r += n(a, !0);
    }
    return s && ((r += '?'), (r += n(s, !1))), c && ((r += '#'), (r += t ? c : m(c, !1))), r;
  }
}),
  define('vscode-uri', ['vscode-uri/index'], function (e) {
    return e;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonSchemaService', [
          'require',
          'exports',
          'jsonc-parser',
          'vscode-uri',
          '../utils/strings',
          '../parser/jsonParser',
          'vscode-nls',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('jsonc-parser'),
      r = e('vscode-uri'),
      o = e('../utils/strings'),
      i = e('../parser/jsonParser'),
      a = e('vscode-nls').loadMessageBundle(),
      s = (function () {
        function e(e) {
          try {
            this.patternRegExp = new RegExp(o.convertSimple2RegExpPattern(e) + '$');
          } catch (e) {
            this.patternRegExp = null;
          }
          this.schemas = [];
        }
        return (
          (e.prototype.addSchema = function (e) {
            this.schemas.push(e);
          }),
          (e.prototype.matchesPattern = function (e) {
            return this.patternRegExp && this.patternRegExp.test(e);
          }),
          (e.prototype.getSchemas = function () {
            return this.schemas;
          }),
          e
        );
      })(),
      c = (function () {
        function e(e, t, n) {
          (this.service = e),
            (this.url = t),
            (this.dependencies = {}),
            n && (this.unresolvedSchema = this.service.promise.resolve(new u(n)));
        }
        return (
          (e.prototype.getUnresolvedSchema = function () {
            return (
              this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.url)),
              this.unresolvedSchema
            );
          }),
          (e.prototype.getResolvedSchema = function () {
            var e = this;
            return (
              this.resolvedSchema ||
                (this.resolvedSchema = this.getUnresolvedSchema().then(function (t) {
                  return e.service.resolveSchemaContent(t, e.url, e.dependencies);
                })),
              this.resolvedSchema
            );
          }),
          (e.prototype.clearSchema = function () {
            (this.resolvedSchema = null), (this.unresolvedSchema = null), (this.dependencies = {});
          }),
          e
        );
      })(),
      u = function (e, t) {
        void 0 === t && (t = []), (this.schema = e), (this.errors = t);
      };
    t.UnresolvedSchema = u;
    var f = (function () {
      function e(e, t) {
        void 0 === t && (t = []), (this.schema = e), (this.errors = t);
      }
      return (
        (e.prototype.getSection = function (e) {
          return i.asSchema(this.getSectionRecursive(e, this.schema));
        }),
        (e.prototype.getSectionRecursive = function (e, t) {
          if (!t || 'boolean' == typeof t || 0 === e.length) return t;
          var n = e.shift();
          if (t.properties && (t.properties[n], 1)) return this.getSectionRecursive(e, t.properties[n]);
          if (t.patternProperties)
            for (var r = 0, o = Object.keys(t.patternProperties); r < o.length; r++) {
              var i = o[r];
              if (new RegExp(i).test(n)) return this.getSectionRecursive(e, t.patternProperties[i]);
            }
          else {
            if ('object' == typeof t.additionalProperties) return this.getSectionRecursive(e, t.additionalProperties);
            if (n.match('[0-9]+'))
              if (Array.isArray(t.items)) {
                var a = parseInt(n, 10);
                if (!isNaN(a) && t.items[a]) return this.getSectionRecursive(e, t.items[a]);
              } else if (t.items) return this.getSectionRecursive(e, t.items);
          }
          return null;
        }),
        e
      );
    })();
    t.ResolvedSchema = f;
    var l = (function () {
      function e(e, t, n) {
        (this.contextService = t),
          (this.requestService = e),
          (this.promiseConstructor = n || Promise),
          (this.callOnDispose = []),
          (this.contributionSchemas = {}),
          (this.contributionAssociations = {}),
          (this.schemasById = {}),
          (this.filePatternAssociations = []),
          (this.filePatternAssociationById = {}),
          (this.registeredSchemasIds = {});
      }
      return (
        (e.prototype.getRegisteredSchemaIds = function (e) {
          return Object.keys(this.registeredSchemasIds).filter(function (t) {
            var n = r.URI.parse(t).scheme;
            return 'schemaservice' !== n && (!e || e(n));
          });
        }),
        Object.defineProperty(e.prototype, 'promise', {
          get: function () {
            return this.promiseConstructor;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.dispose = function () {
          for (; this.callOnDispose.length > 0; ) this.callOnDispose.pop()();
        }),
        (e.prototype.onResourceChange = function (e) {
          for (
            var t = this,
              n = !1,
              r = [(e = this.normalizeId(e))],
              o = Object.keys(this.schemasById).map(function (e) {
                return t.schemasById[e];
              });
            r.length;

          )
            for (var i = r.pop(), a = 0; a < o.length; a++) {
              var s = o[a];
              s &&
                (s.url === i || s.dependencies[i]) &&
                (s.url !== i && r.push(s.url), s.clearSchema(), (o[a] = void 0), (n = !0));
            }
          return n;
        }),
        (e.prototype.normalizeId = function (e) {
          try {
            return r.URI.parse(e).toString();
          } catch (t) {
            return e;
          }
        }),
        (e.prototype.setSchemaContributions = function (e) {
          if (e.schemas) {
            var t = e.schemas;
            for (var n in t) {
              var r = this.normalizeId(n);
              this.contributionSchemas[r] = this.addSchemaHandle(r, t[n]);
            }
          }
          if (e.schemaAssociations) {
            var o = e.schemaAssociations;
            for (var i in o) {
              var a = o[i];
              this.contributionAssociations[i] = a;
              for (var s = this.getOrAddFilePatternAssociation(i), c = 0, u = a; c < u.length; c++) {
                var f = u[c];
                n = this.normalizeId(f);
                s.addSchema(n);
              }
            }
          }
        }),
        (e.prototype.addSchemaHandle = function (e, t) {
          var n = new c(this, e, t);
          return (this.schemasById[e] = n), n;
        }),
        (e.prototype.getOrAddSchemaHandle = function (e, t) {
          return this.schemasById[e] || this.addSchemaHandle(e, t);
        }),
        (e.prototype.getOrAddFilePatternAssociation = function (e) {
          var t = this.filePatternAssociationById[e];
          return (
            t || ((t = new s(e)), (this.filePatternAssociationById[e] = t), this.filePatternAssociations.push(t)), t
          );
        }),
        (e.prototype.registerExternalSchema = function (e, t, n) {
          void 0 === t && (t = null);
          var r = this.normalizeId(e);
          if (((this.registeredSchemasIds[r] = !0), t))
            for (var o = 0, i = t; o < i.length; o++) {
              var a = i[o];
              this.getOrAddFilePatternAssociation(a).addSchema(r);
            }
          return n ? this.addSchemaHandle(r, n) : this.getOrAddSchemaHandle(r);
        }),
        (e.prototype.clearExternalSchemas = function () {
          for (var e in ((this.schemasById = {}),
          (this.filePatternAssociations = []),
          (this.filePatternAssociationById = {}),
          (this.registeredSchemasIds = {}),
          this.contributionSchemas))
            (this.schemasById[e] = this.contributionSchemas[e]), (this.registeredSchemasIds[e] = !0);
          for (var t in this.contributionAssociations)
            for (
              var n = this.getOrAddFilePatternAssociation(t), r = 0, o = this.contributionAssociations[t];
              r < o.length;
              r++
            ) {
              var i = o[r];
              e = this.normalizeId(i);
              n.addSchema(e);
            }
        }),
        (e.prototype.getResolvedSchema = function (e) {
          var t = this.normalizeId(e),
            n = this.schemasById[t];
          return n ? n.getResolvedSchema() : this.promise.resolve(null);
        }),
        (e.prototype.loadSchema = function (e) {
          if (!this.requestService) {
            var t = a(
              'json.schema.norequestservice',
              "Unable to load schema from '{0}'. No schema request service available",
              d(e)
            );
            return this.promise.resolve(new u({}, [t]));
          }
          return this.requestService(e).then(
            function (t) {
              if (!t) {
                var r = a('json.schema.nocontent', "Unable to load schema from '{0}': No content.", d(e));
                return new u({}, [r]);
              }
              var o,
                i = [];
              o = n.parse(t, i);
              var s = i.length
                ? [
                    a(
                      'json.schema.invalidFormat',
                      "Unable to parse content from '{0}': Parse error at offset {1}.",
                      d(e),
                      i[0].offset
                    ),
                  ]
                : [];
              return new u(o, s);
            },
            function (t) {
              var n = t.toString(),
                r = t.toString().split('Error: ');
              return (
                r.length > 1 && (n = r[1]),
                o.endsWith(n, '.') && (n = n.substr(0, n.length - 1)),
                new u({}, [a('json.schema.nocontent', "Unable to load schema from '{0}': {1}.", d(e), n)])
              );
            }
          );
        }),
        (e.prototype.resolveSchemaContent = function (e, t, n) {
          var r = this,
            o = e.errors.slice(0),
            i = e.schema;
          if (i.$schema) {
            var s = this.normalizeId(i.$schema);
            if ('http://json-schema.org/draft-03/schema' === s)
              return this.promise.resolve(
                new f({}, [a('json.schema.draft03.notsupported', 'Draft-03 schemas are not supported.')])
              );
            'https://json-schema.org/draft/2019-09/schema' === s &&
              e.errors.push(
                a('json.schema.draft201909.notsupported', 'Draft 2019-09 schemas are not yet fully supported.')
              );
          }
          var c = this.contextService,
            u = function (e, t, n, r) {
              var i = (function (e, t) {
                if (!t) return e;
                var n = e;
                return (
                  '/' === t[0] && (t = t.substr(1)),
                  t.split('/').some(function (e) {
                    return !(n = n[e]);
                  }),
                  n
                );
              })(t, r);
              if (i) for (var s in i) i.hasOwnProperty(s) && !e.hasOwnProperty(s) && (e[s] = i[s]);
              else o.push(a('json.schema.invalidref', "$ref '{0}' in '{1}' can not be resolved.", r, n));
            },
            l = function (e, t, n, i, s) {
              c && !/^\w+:\/\/.*/.test(t) && (t = c.resolveRelativePath(t, i)), (t = r.normalizeId(t));
              var f = r.getOrAddSchemaHandle(t);
              return f.getUnresolvedSchema().then(function (r) {
                if (((s[t] = !0), r.errors.length)) {
                  var i = n ? t + '#' + n : t;
                  o.push(a('json.schema.problemloadingref', "Problems loading reference '{0}': {1}", i, r.errors[0]));
                }
                return u(e, r.schema, t, n), d(e, r.schema, t, f.dependencies);
              });
            },
            d = function (e, t, n, o) {
              if (!e || 'object' != typeof e) return Promise.resolve(null);
              for (
                var i = [e],
                  a = [],
                  s = [],
                  c = function (e) {
                    for (var r = []; e.$ref; ) {
                      var a = e.$ref,
                        c = a.split('#', 2);
                      if ((delete e.$ref, c[0].length > 0)) return void s.push(l(e, c[0], c[1], n, o));
                      -1 === r.indexOf(a) && (u(e, t, n, c[1]), r.push(a));
                    }
                    !(function () {
                      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                      for (var n = 0, r = e; n < r.length; n++) {
                        var o = r[n];
                        'object' == typeof o && i.push(o);
                      }
                    })(e.items, e.additionalProperties, e.not, e.contains, e.propertyNames, e.if, e.then, e.else),
                      (function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        for (var n = 0, r = e; n < r.length; n++) {
                          var o = r[n];
                          if ('object' == typeof o)
                            for (var a in o) {
                              var s = o[a];
                              'object' == typeof s && i.push(s);
                            }
                        }
                      })(e.definitions, e.properties, e.patternProperties, e.dependencies),
                      (function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        for (var n = 0, r = e; n < r.length; n++) {
                          var o = r[n];
                          if (Array.isArray(o))
                            for (var a = 0, s = o; a < s.length; a++) {
                              var c = s[a];
                              'object' == typeof c && i.push(c);
                            }
                        }
                      })(e.anyOf, e.allOf, e.oneOf, e.items);
                  };
                i.length;

              ) {
                var f = i.pop();
                a.indexOf(f) >= 0 || (a.push(f), c(f));
              }
              return r.promise.all(s);
            };
          return d(i, i, t, n).then(function (e) {
            return new f(i, o);
          });
        }),
        (e.prototype.getSchemaForResource = function (e, t) {
          if (t && t.root && 'object' === t.root.type) {
            var n = t.root.properties.filter(function (e) {
              return '$schema' === e.keyNode.value && e.valueNode && 'string' === e.valueNode.type;
            });
            if (n.length > 0) {
              var r = i.getNodeValue(n[0].valueNode);
              if (
                (r &&
                  o.startsWith(r, '.') &&
                  this.contextService &&
                  (r = this.contextService.resolveRelativePath(r, e)),
                r)
              ) {
                var a = this.normalizeId(r);
                return this.getOrAddSchemaHandle(a).getResolvedSchema();
              }
            }
          }
          for (var s = Object.create(null), c = [], u = 0, f = this.filePatternAssociations; u < f.length; u++) {
            var l = f[u];
            if (l.matchesPattern(e))
              for (var d = 0, p = l.getSchemas(); d < p.length; d++) {
                var h = p[d];
                s[h] || (c.push(h), (s[h] = !0));
              }
          }
          return c.length > 0 ? this.createCombinedSchema(e, c).getResolvedSchema() : this.promise.resolve(null);
        }),
        (e.prototype.createCombinedSchema = function (e, t) {
          if (1 === t.length) return this.getOrAddSchemaHandle(t[0]);
          var n = 'schemaservice://combinedSchema/' + encodeURIComponent(e),
            r = {
              allOf: t.map(function (e) {
                return { $ref: e };
              }),
            };
          return this.addSchemaHandle(n, r);
        }),
        e
      );
    })();
    function d(e) {
      try {
        var t = r.URI.parse(e);
        if ('file' === t.scheme) return t.fsPath;
      } catch (e) {}
      return e;
    }
    t.JSONSchemaService = l;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonValidation', [
          'require',
          'exports',
          './jsonSchemaService',
          '../jsonLanguageTypes',
          'vscode-nls',
          '../utils/objects',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('./jsonSchemaService'),
      r = e('../jsonLanguageTypes'),
      o = e('vscode-nls'),
      i = e('../utils/objects'),
      a = o.loadMessageBundle(),
      s = (function () {
        function e(e, t) {
          (this.jsonSchemaService = e), (this.promise = t), (this.validationEnabled = !0);
        }
        return (
          (e.prototype.configure = function (e) {
            e &&
              ((this.validationEnabled = e.validate),
              (this.commentSeverity = e.allowComments ? void 0 : r.DiagnosticSeverity.Error));
          }),
          (e.prototype.doValidation = function (e, t, o, s) {
            var f = this;
            if (!this.validationEnabled) return this.promise.resolve([]);
            var l = [],
              d = {},
              p = function (e) {
                var t = e.range.start.line + ' ' + e.range.start.character + ' ' + e.message;
                d[t] || ((d[t] = !0), l.push(e));
              },
              h = function (n) {
                var s = o ? u(o.trailingCommas) : r.DiagnosticSeverity.Error,
                  c = o ? u(o.comments) : f.commentSeverity;
                if (n) {
                  if (n.errors.length && t.root) {
                    var d = t.root,
                      h = 'object' === d.type ? d.properties[0] : null;
                    if (h && '$schema' === h.keyNode.value) {
                      var m = h.valueNode || h,
                        g = r.Range.create(e.positionAt(m.offset), e.positionAt(m.offset + m.length));
                      p(
                        r.Diagnostic.create(
                          g,
                          n.errors[0],
                          r.DiagnosticSeverity.Warning,
                          r.ErrorCode.SchemaResolveError
                        )
                      );
                    } else {
                      g = r.Range.create(e.positionAt(d.offset), e.positionAt(d.offset + 1));
                      p(
                        r.Diagnostic.create(
                          g,
                          n.errors[0],
                          r.DiagnosticSeverity.Warning,
                          r.ErrorCode.SchemaResolveError
                        )
                      );
                    }
                  } else {
                    var v = t.validate(e, n.schema);
                    v && v.forEach(p);
                  }
                  (function e(t) {
                    if (t && 'object' == typeof t) {
                      if (i.isBoolean(t.allowComments)) return t.allowComments;
                      if (t.allOf)
                        for (var n = 0, r = t.allOf; n < r.length; n++) {
                          var o = r[n],
                            a = e(o);
                          if (i.isBoolean(a)) return a;
                        }
                    }
                    return;
                  })(n.schema) && (c = void 0),
                    (function e(t) {
                      if (t && 'object' == typeof t) {
                        if (i.isBoolean(t.allowTrailingCommas)) return t.allowTrailingCommas;
                        if (i.isBoolean(t.allowsTrailingCommas)) return t.allowsTrailingCommas;
                        if (t.allOf)
                          for (var n = 0, r = t.allOf; n < r.length; n++) {
                            var o = r[n],
                              a = e(o);
                            if (i.isBoolean(a)) return a;
                          }
                      }
                      return;
                    })(n.schema) && (s = void 0);
                }
                for (var y = 0, b = t.syntaxErrors; y < b.length; y++) {
                  var x = b[y];
                  if (x.code === r.ErrorCode.TrailingComma) {
                    if ('number' != typeof s) continue;
                    x.severity = s;
                  }
                  p(x);
                }
                if ('number' == typeof c) {
                  var S = a('InvalidCommentToken', 'Comments are not permitted in JSON.');
                  t.comments.forEach(function (e) {
                    p(r.Diagnostic.create(e, S, c, r.ErrorCode.CommentNotPermitted));
                  });
                }
                return l;
              };
            if (s) {
              var m = s.id || 'schemaservice://untitled/' + c++;
              return this.jsonSchemaService.resolveSchemaContent(new n.UnresolvedSchema(s), m, {}).then(function (e) {
                return h(e);
              });
            }
            return this.jsonSchemaService.getSchemaForResource(e.uri, t).then(function (e) {
              return h(e);
            });
          }),
          e
        );
      })();
    t.JSONValidation = s;
    var c = 0;
    function u(e) {
      switch (e) {
        case 'error':
          return r.DiagnosticSeverity.Error;
        case 'warning':
          return r.DiagnosticSeverity.Warning;
        case 'ignore':
          return;
      }
    }
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/utils/colors', ['require', 'exports'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = 48,
      r = 57,
      o = 65,
      i = 97,
      a = 102;
    function s(e) {
      return e < n ? 0 : e <= r ? e - n : (e < i && (e += i - o), e >= i && e <= a ? e - i + 10 : 0);
    }
    (t.hexDigit = s),
      (t.colorFromHex = function (e) {
        if ('#' !== e[0]) return null;
        switch (e.length) {
          case 4:
            return {
              red: (17 * s(e.charCodeAt(1))) / 255,
              green: (17 * s(e.charCodeAt(2))) / 255,
              blue: (17 * s(e.charCodeAt(3))) / 255,
              alpha: 1,
            };
          case 5:
            return {
              red: (17 * s(e.charCodeAt(1))) / 255,
              green: (17 * s(e.charCodeAt(2))) / 255,
              blue: (17 * s(e.charCodeAt(3))) / 255,
              alpha: (17 * s(e.charCodeAt(4))) / 255,
            };
          case 7:
            return {
              red: (16 * s(e.charCodeAt(1)) + s(e.charCodeAt(2))) / 255,
              green: (16 * s(e.charCodeAt(3)) + s(e.charCodeAt(4))) / 255,
              blue: (16 * s(e.charCodeAt(5)) + s(e.charCodeAt(6))) / 255,
              alpha: 1,
            };
          case 9:
            return {
              red: (16 * s(e.charCodeAt(1)) + s(e.charCodeAt(2))) / 255,
              green: (16 * s(e.charCodeAt(3)) + s(e.charCodeAt(4))) / 255,
              blue: (16 * s(e.charCodeAt(5)) + s(e.charCodeAt(6))) / 255,
              alpha: (16 * s(e.charCodeAt(7)) + s(e.charCodeAt(8))) / 255,
            };
        }
        return null;
      }),
      (t.colorFrom256RGB = function (e, t, n, r) {
        return void 0 === r && (r = 1), { red: e / 255, green: t / 255, blue: n / 255, alpha: r };
      });
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonDocumentSymbols', [
          'require',
          'exports',
          '../parser/jsonParser',
          '../utils/strings',
          '../utils/colors',
          '../jsonLanguageTypes',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('../parser/jsonParser'),
      r = e('../utils/strings'),
      o = e('../utils/colors'),
      i = e('../jsonLanguageTypes'),
      a = (function () {
        function e(e) {
          this.schemaService = e;
        }
        return (
          (e.prototype.findDocumentSymbols = function (e, t, o) {
            var a = this;
            void 0 === o && (o = { resultLimit: Number.MAX_VALUE });
            var c = t.root;
            if (!c) return null;
            var u = o.resultLimit,
              f = e.uri;
            if (
              ('vscode://defaultsettings/keybindings.json' === f ||
                r.endsWith(f.toLowerCase(), '/user/keybindings.json')) &&
              'array' === c.type
            ) {
              for (var l = [], d = 0, p = c.items; d < p.length; d++) {
                var h = p[d];
                if ('object' === h.type)
                  for (var m = 0, g = h.properties; m < g.length; m++) {
                    var v = g[m];
                    if ('key' === v.keyNode.value && v.valueNode) {
                      var y = i.Location.create(e.uri, s(e, h));
                      if (
                        (l.push({ name: n.getNodeValue(v.valueNode), kind: i.SymbolKind.Function, location: y }),
                        --u <= 0)
                      )
                        return o && o.onResultLimitExceeded && o.onResultLimitExceeded(f), l;
                    }
                  }
              }
              return l;
            }
            for (
              var b = [{ node: c, containerName: '' }],
                x = 0,
                S = !1,
                C = [],
                j = function (t, n) {
                  'array' === t.type
                    ? t.items.forEach(function (e) {
                        e && b.push({ node: e, containerName: n });
                      })
                    : 'object' === t.type &&
                      t.properties.forEach(function (t) {
                        var r = t.valueNode;
                        if (r)
                          if (u > 0) {
                            u--;
                            var o = i.Location.create(e.uri, s(e, t)),
                              c = n ? n + '.' + t.keyNode.value : t.keyNode.value;
                            C.push({
                              name: a.getKeyLabel(t),
                              kind: a.getSymbolKind(r.type),
                              location: o,
                              containerName: n,
                            }),
                              b.push({ node: r, containerName: c });
                          } else S = !0;
                      });
                };
              x < b.length;

            ) {
              var T = b[x++];
              j(T.node, T.containerName);
            }
            return S && o && o.onResultLimitExceeded && o.onResultLimitExceeded(f), C;
          }),
          (e.prototype.findDocumentSymbols2 = function (e, t, o) {
            var a = this;
            void 0 === o && (o = { resultLimit: Number.MAX_VALUE });
            var c = t.root;
            if (!c) return null;
            var u = o.resultLimit,
              f = e.uri;
            if (
              ('vscode://defaultsettings/keybindings.json' === f ||
                r.endsWith(f.toLowerCase(), '/user/keybindings.json')) &&
              'array' === c.type
            ) {
              for (var l = [], d = 0, p = c.items; d < p.length; d++) {
                var h = p[d];
                if ('object' === h.type)
                  for (var m = 0, g = h.properties; m < g.length; m++) {
                    var v = g[m];
                    if ('key' === v.keyNode.value && v.valueNode) {
                      var y = s(e, h),
                        b = s(e, v.keyNode);
                      if (
                        (l.push({
                          name: n.getNodeValue(v.valueNode),
                          kind: i.SymbolKind.Function,
                          range: y,
                          selectionRange: b,
                        }),
                        --u <= 0)
                      )
                        return o && o.onResultLimitExceeded && o.onResultLimitExceeded(f), l;
                    }
                  }
              }
              return l;
            }
            for (
              var x = [],
                S = [{ node: c, result: x }],
                C = 0,
                j = !1,
                T = function (t, n) {
                  'array' === t.type
                    ? t.items.forEach(function (t, r) {
                        if (t)
                          if (u > 0) {
                            u--;
                            var o = s(e, t),
                              i = o,
                              c = {
                                name: String(r),
                                kind: a.getSymbolKind(t.type),
                                range: o,
                                selectionRange: i,
                                children: [],
                              };
                            n.push(c), S.push({ result: c.children, node: t });
                          } else j = !0;
                      })
                    : 'object' === t.type &&
                      t.properties.forEach(function (t) {
                        var r = t.valueNode;
                        if (r)
                          if (u > 0) {
                            u--;
                            var o = s(e, t),
                              i = s(e, t.keyNode),
                              c = {
                                name: a.getKeyLabel(t),
                                kind: a.getSymbolKind(r.type),
                                range: o,
                                selectionRange: i,
                                children: [],
                              };
                            n.push(c), S.push({ result: c.children, node: r });
                          } else j = !0;
                      });
                };
              C < S.length;

            ) {
              var k = S[C++];
              T(k.node, k.result);
            }
            return j && o && o.onResultLimitExceeded && o.onResultLimitExceeded(f), x;
          }),
          (e.prototype.getSymbolKind = function (e) {
            switch (e) {
              case 'object':
                return i.SymbolKind.Module;
              case 'string':
                return i.SymbolKind.String;
              case 'number':
                return i.SymbolKind.Number;
              case 'array':
                return i.SymbolKind.Array;
              case 'boolean':
                return i.SymbolKind.Boolean;
              default:
                return i.SymbolKind.Variable;
            }
          }),
          (e.prototype.getKeyLabel = function (e) {
            var t = e.keyNode.value;
            return t && (t = t.replace(/[\n]/g, '↵')), t && t.trim() ? t : '"' + t + '"';
          }),
          (e.prototype.findDocumentColors = function (e, t, r) {
            return this.schemaService.getSchemaForResource(e.uri, t).then(function (i) {
              var a = [];
              if (i)
                for (
                  var c = r && 'number' == typeof r.resultLimit ? r.resultLimit : Number.MAX_VALUE,
                    u = {},
                    f = 0,
                    l = t.getMatchingSchemas(i.schema);
                  f < l.length;
                  f++
                ) {
                  var d = l[f];
                  if (
                    !d.inverted &&
                    d.schema &&
                    ('color' === d.schema.format || 'color-hex' === d.schema.format) &&
                    d.node &&
                    'string' === d.node.type
                  ) {
                    var p = String(d.node.offset);
                    if (!u[p]) {
                      var h = o.colorFromHex(n.getNodeValue(d.node));
                      if (h) {
                        var m = s(e, d.node);
                        a.push({ color: h, range: m });
                      }
                      if (((u[p] = !0), --c <= 0))
                        return r && r.onResultLimitExceeded && r.onResultLimitExceeded(e.uri), a;
                    }
                  }
                }
              return a;
            });
          }),
          (e.prototype.getColorPresentations = function (e, t, n, r) {
            var o,
              a = [],
              s = Math.round(255 * n.red),
              c = Math.round(255 * n.green),
              u = Math.round(255 * n.blue);
            function f(e) {
              var t = e.toString(16);
              return 2 !== t.length ? '0' + t : t;
            }
            return (
              (o = 1 === n.alpha ? '#' + f(s) + f(c) + f(u) : '#' + f(s) + f(c) + f(u) + f(Math.round(255 * n.alpha))),
              a.push({ label: o, textEdit: i.TextEdit.replace(r, JSON.stringify(o)) }),
              a
            );
          }),
          e
        );
      })();
    function s(e, t) {
      return i.Range.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
    }
    t.JSONDocumentSymbols = a;
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/configuration', ['require', 'exports', 'vscode-nls'], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('vscode-nls').loadMessageBundle();
    t.schemaContributions = {
      schemaAssociations: {},
      schemas: {
        'http://json-schema.org/draft-04/schema#': {
          title: n('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
          $schema: 'http://json-schema.org/draft-04/schema#',
          definitions: {
            schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
            positiveInteger: { type: 'integer', minimum: 0 },
            positiveIntegerDefault0: { allOf: [{ $ref: '#/definitions/positiveInteger' }, { default: 0 }] },
            simpleTypes: {
              type: 'string',
              enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
            },
            stringArray: { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: !0 },
          },
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uri' },
            $schema: { type: 'string', format: 'uri' },
            title: { type: 'string' },
            description: { type: 'string' },
            default: {},
            multipleOf: { type: 'number', minimum: 0, exclusiveMinimum: !0 },
            maximum: { type: 'number' },
            exclusiveMaximum: { type: 'boolean', default: !1 },
            minimum: { type: 'number' },
            exclusiveMinimum: { type: 'boolean', default: !1 },
            maxLength: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
            minLength: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
            pattern: { type: 'string', format: 'regex' },
            additionalItems: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
            items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: {} },
            maxItems: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
            minItems: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
            uniqueItems: { type: 'boolean', default: !1 },
            maxProperties: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
            minProperties: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
            required: { allOf: [{ $ref: '#/definitions/stringArray' }] },
            additionalProperties: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
            definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
            properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
            patternProperties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
            dependencies: {
              type: 'object',
              additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] },
            },
            enum: { type: 'array', minItems: 1, uniqueItems: !0 },
            type: {
              anyOf: [
                { $ref: '#/definitions/simpleTypes' },
                { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
              ],
            },
            format: {
              anyOf: [
                { type: 'string', enum: ['date-time', 'uri', 'email', 'hostname', 'ipv4', 'ipv6', 'regex'] },
                { type: 'string' },
              ],
            },
            allOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
            anyOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
            oneOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
            not: { allOf: [{ $ref: '#' }] },
          },
          dependencies: { exclusiveMaximum: ['maximum'], exclusiveMinimum: ['minimum'] },
          default: {},
        },
        'http://json-schema.org/draft-07/schema#': {
          title: n('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
          definitions: {
            schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
            nonNegativeInteger: { type: 'integer', minimum: 0 },
            nonNegativeIntegerDefault0: { allOf: [{ $ref: '#/definitions/nonNegativeInteger' }, { default: 0 }] },
            simpleTypes: { enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'] },
            stringArray: { type: 'array', items: { type: 'string' }, uniqueItems: !0, default: [] },
          },
          type: ['object', 'boolean'],
          properties: {
            $id: { type: 'string', format: 'uri-reference' },
            $schema: { type: 'string', format: 'uri' },
            $ref: { type: 'string', format: 'uri-reference' },
            $comment: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            default: !0,
            readOnly: { type: 'boolean', default: !1 },
            examples: { type: 'array', items: !0 },
            multipleOf: { type: 'number', exclusiveMinimum: 0 },
            maximum: { type: 'number' },
            exclusiveMaximum: { type: 'number' },
            minimum: { type: 'number' },
            exclusiveMinimum: { type: 'number' },
            maxLength: { $ref: '#/definitions/nonNegativeInteger' },
            minLength: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            pattern: { type: 'string', format: 'regex' },
            additionalItems: { $ref: '#' },
            items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: !0 },
            maxItems: { $ref: '#/definitions/nonNegativeInteger' },
            minItems: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            uniqueItems: { type: 'boolean', default: !1 },
            contains: { $ref: '#' },
            maxProperties: { $ref: '#/definitions/nonNegativeInteger' },
            minProperties: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
            required: { $ref: '#/definitions/stringArray' },
            additionalProperties: { $ref: '#' },
            definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
            properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
            patternProperties: {
              type: 'object',
              additionalProperties: { $ref: '#' },
              propertyNames: { format: 'regex' },
              default: {},
            },
            dependencies: {
              type: 'object',
              additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] },
            },
            propertyNames: { $ref: '#' },
            const: !0,
            enum: { type: 'array', items: !0, minItems: 1, uniqueItems: !0 },
            type: {
              anyOf: [
                { $ref: '#/definitions/simpleTypes' },
                { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
              ],
            },
            format: { type: 'string' },
            contentMediaType: { type: 'string' },
            contentEncoding: { type: 'string' },
            if: { $ref: '#' },
            then: { $ref: '#' },
            else: { $ref: '#' },
            allOf: { $ref: '#/definitions/schemaArray' },
            anyOf: { $ref: '#/definitions/schemaArray' },
            oneOf: { $ref: '#/definitions/schemaArray' },
            not: { $ref: '#' },
          },
          default: !0,
        },
      },
    };
    var r = {
      id: n('schema.json.id', 'A unique identifier for the schema.'),
      $schema: n('schema.json.$schema', 'The schema to verify this document against.'),
      title: n('schema.json.title', 'A descriptive title of the element.'),
      description: n(
        'schema.json.description',
        'A long description of the element. Used in hover menus and suggestions.'
      ),
      default: n('schema.json.default', 'A default value. Used by suggestions.'),
      multipleOf: n(
        'schema.json.multipleOf',
        'A number that should cleanly divide the current value (i.e. have no remainder).'
      ),
      maximum: n('schema.json.maximum', 'The maximum numerical value, inclusive by default.'),
      exclusiveMaximum: n('schema.json.exclusiveMaximum', 'Makes the maximum property exclusive.'),
      minimum: n('schema.json.minimum', 'The minimum numerical value, inclusive by default.'),
      exclusiveMinimum: n('schema.json.exclusiveMininum', 'Makes the minimum property exclusive.'),
      maxLength: n('schema.json.maxLength', 'The maximum length of a string.'),
      minLength: n('schema.json.minLength', 'The minimum length of a string.'),
      pattern: n(
        'schema.json.pattern',
        'A regular expression to match the string against. It is not implicitly anchored.'
      ),
      additionalItems: n(
        'schema.json.additionalItems',
        'For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail.'
      ),
      items: n(
        'schema.json.items',
        'For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on.'
      ),
      maxItems: n('schema.json.maxItems', 'The maximum number of items that can be inside an array. Inclusive.'),
      minItems: n('schema.json.minItems', 'The minimum number of items that can be inside an array. Inclusive.'),
      uniqueItems: n('schema.json.uniqueItems', 'If all of the items in the array must be unique. Defaults to false.'),
      maxProperties: n('schema.json.maxProperties', 'The maximum number of properties an object can have. Inclusive.'),
      minProperties: n('schema.json.minProperties', 'The minimum number of properties an object can have. Inclusive.'),
      required: n(
        'schema.json.required',
        'An array of strings that lists the names of all properties required on this object.'
      ),
      additionalProperties: n(
        'schema.json.additionalProperties',
        "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."
      ),
      definitions: n(
        'schema.json.definitions',
        'Not used for validation. Place subschemas here that you wish to reference inline with $ref.'
      ),
      properties: n('schema.json.properties', 'A map of property names to schemas for each property.'),
      patternProperties: n(
        'schema.json.patternProperties',
        'A map of regular expressions on property names to schemas for matching properties.'
      ),
      dependencies: n(
        'schema.json.dependencies',
        'A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object.'
      ),
      enum: n('schema.json.enum', 'The set of literal values that are valid.'),
      type: n(
        'schema.json.type',
        'Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types.'
      ),
      format: n('schema.json.format', 'Describes the format expected for the value.'),
      allOf: n('schema.json.allOf', 'An array of schemas, all of which must match.'),
      anyOf: n('schema.json.anyOf', 'An array of schemas, where at least one must match.'),
      oneOf: n('schema.json.oneOf', 'An array of schemas, exactly one of which must match.'),
      not: n('schema.json.not', 'A schema which must not match.'),
      $id: n('schema.json.$id', 'A unique identifier for the schema.'),
      $ref: n('schema.json.$ref', 'Reference a definition hosted on any location.'),
      $comment: n('schema.json.$comment', 'Comments from schema authors to readers or maintainers of the schema.'),
      readOnly: n(
        'schema.json.readOnly',
        'Indicates that the value of the instance is managed exclusively by the owning authority.'
      ),
      examples: n(
        'schema.json.examples',
        'Sample JSON values associated with a particular schema, for the purpose of illustrating usage.'
      ),
      contains: n(
        'schema.json.contains',
        'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'
      ),
      propertyNames: n(
        'schema.json.propertyNames',
        'If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema.'
      ),
      const: n(
        'schema.json.const',
        'An instance validates successfully against this keyword if its value is equal to the value of the keyword.'
      ),
      contentMediaType: n('schema.json.contentMediaType', 'Describes the media type of a string property.'),
      contentEncoding: n('schema.json.contentEncoding', 'Describes the content encoding of a string property.'),
      if: n(
        'schema.json.if',
        'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'
      ),
      then: n('schema.json.then', 'The "if" subschema is used for validation when the "if" subschema succeeds.'),
      else: n('schema.json.else', 'The "else" subschema is used for validation when the "if" subschema fails.'),
    };
    for (var o in t.schemaContributions.schemas) {
      var i = t.schemaContributions.schemas[o];
      for (var a in i.properties) {
        var s = i.properties[a];
        !0 === s && (s = i.properties[a] = {});
        var c = r[a];
        c ? (s.description = c) : console.log(a + ": localize('schema.json." + a + '\', "")');
      }
    }
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonFolding', [
          'require',
          'exports',
          'jsonc-parser',
          '../jsonLanguageTypes',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('jsonc-parser'),
      r = e('../jsonLanguageTypes');
    t.getFoldingRanges = function (e, t) {
      var o = [],
        i = [],
        a = [],
        s = -1,
        c = n.createScanner(e.getText(), !1),
        u = c.scan();
      function f(e) {
        o.push(e), i.push(a.length);
      }
      for (; 17 !== u; ) {
        switch (u) {
          case 1:
          case 3:
            var l = {
              startLine: h = e.positionAt(c.getTokenOffset()).line,
              endLine: h,
              kind: 1 === u ? 'object' : 'array',
            };
            a.push(l);
            break;
          case 2:
          case 4:
            var d = 2 === u ? 'object' : 'array';
            if (a.length > 0 && a[a.length - 1].kind === d) {
              l = a.pop();
              var p = e.positionAt(c.getTokenOffset()).line;
              l && p > l.startLine + 1 && s !== l.startLine && ((l.endLine = p - 1), f(l), (s = l.startLine));
            }
            break;
          case 13:
            var h = e.positionAt(c.getTokenOffset()).line,
              m = e.positionAt(c.getTokenOffset() + c.getTokenLength()).line;
            1 === c.getTokenError() && h + 1 < e.lineCount
              ? c.setPosition(e.offsetAt(r.Position.create(h + 1, 0)))
              : h < m && (f({ startLine: h, endLine: m, kind: r.FoldingRangeKind.Comment }), (s = h));
            break;
          case 12:
            var g = e
              .getText()
              .substr(c.getTokenOffset(), c.getTokenLength())
              .match(/^\/\/\s*#(region\b)|(endregion\b)/);
            if (g) {
              p = e.positionAt(c.getTokenOffset()).line;
              if (g[1]) {
                l = { startLine: p, endLine: p, kind: r.FoldingRangeKind.Region };
                a.push(l);
              } else {
                for (var v = a.length - 1; v >= 0 && a[v].kind !== r.FoldingRangeKind.Region; ) v--;
                if (v >= 0) {
                  l = a[v];
                  (a.length = v), p > l.startLine && s !== l.startLine && ((l.endLine = p), f(l), (s = l.startLine));
                }
              }
            }
        }
        u = c.scan();
      }
      var y = t && t.rangeLimit;
      if ('number' != typeof y || o.length <= y) return o;
      t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri);
      for (var b = [], x = 0, S = i; x < S.length; x++) {
        (O = S[x]) < 30 && (b[O] = (b[O] || 0) + 1);
      }
      var C = 0,
        j = 0;
      for (v = 0; v < b.length; v++) {
        var T = b[v];
        if (T) {
          if (T + C > y) {
            j = v;
            break;
          }
          C += T;
        }
      }
      var k = [];
      for (v = 0; v < o.length; v++) {
        var O;
        'number' == typeof (O = i[v]) && (O < j || (O === j && C++ < y)) && k.push(o[v]);
      }
      return k;
    };
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/services/jsonSelectionRanges', [
          'require',
          'exports',
          '../jsonLanguageTypes',
          'jsonc-parser',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('../jsonLanguageTypes'),
      r = e('jsonc-parser');
    t.getSelectionRanges = function (e, t, o) {
      function i(t, r) {
        return n.Range.create(e.positionAt(t), e.positionAt(r));
      }
      var a = r.createScanner(e.getText(), !0);
      function s(e, t) {
        return a.setPosition(e), a.scan() === t ? a.getTokenOffset() + a.getTokenLength() : -1;
      }
      return t.map(function (t) {
        for (var r = e.offsetAt(t), a = o.getNodeFromOffset(r, !0), c = []; a; ) {
          switch (a.type) {
            case 'string':
            case 'object':
            case 'array':
              var u = a.offset + 1,
                f = a.offset + a.length - 1;
              u < f && r >= u && r <= f && c.push(i(u, f)), c.push(i(a.offset, a.offset + a.length));
              break;
            case 'number':
            case 'boolean':
            case 'null':
            case 'property':
              c.push(i(a.offset, a.offset + a.length));
          }
          if ('property' === a.type || (a.parent && 'array' === a.parent.type)) {
            var l = s(a.offset + a.length, 5);
            -1 !== l && c.push(i(a.offset, l));
          }
          a = a.parent;
        }
        for (var d = void 0, p = c.length - 1; p >= 0; p--) d = n.SelectionRange.create(c[p], d);
        return d || (d = n.SelectionRange.create(n.Range.create(t, t))), d;
      });
    };
  }),
  (function (e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var t = e(require, exports);
      void 0 !== t && (module.exports = t);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-json-languageservice/jsonLanguageService', [
          'require',
          'exports',
          './services/jsonCompletion',
          './services/jsonHover',
          './services/jsonValidation',
          './services/jsonDocumentSymbols',
          './parser/jsonParser',
          './services/configuration',
          './services/jsonSchemaService',
          './services/jsonFolding',
          './services/jsonSelectionRanges',
          'jsonc-parser',
          './jsonLanguageTypes',
          './jsonLanguageTypes',
        ], e);
  })(function (e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = e('./services/jsonCompletion'),
      r = e('./services/jsonHover'),
      o = e('./services/jsonValidation'),
      i = e('./services/jsonDocumentSymbols'),
      a = e('./parser/jsonParser'),
      s = e('./services/configuration'),
      c = e('./services/jsonSchemaService'),
      u = e('./services/jsonFolding'),
      f = e('./services/jsonSelectionRanges'),
      l = e('jsonc-parser'),
      d = e('./jsonLanguageTypes');
    !(function (e) {
      for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
    })(e('./jsonLanguageTypes')),
      (t.getLanguageService = function (e) {
        var t = e.promiseConstructor || Promise,
          p = new c.JSONSchemaService(e.schemaRequestService, e.workspaceContext, t);
        p.setSchemaContributions(s.schemaContributions);
        var h = new n.JSONCompletion(p, e.contributions, t, e.clientCapabilities),
          m = new r.JSONHover(p, e.contributions, t),
          g = new i.JSONDocumentSymbols(p),
          v = new o.JSONValidation(p, t);
        return {
          configure: function (e) {
            p.clearExternalSchemas(),
              e.schemas &&
                e.schemas.forEach(function (e) {
                  p.registerExternalSchema(e.uri, e.fileMatch, e.schema);
                }),
              v.configure(e);
          },
          resetSchema: function (e) {
            return p.onResourceChange(e);
          },
          doValidation: v.doValidation.bind(v),
          parseJSONDocument: function (e) {
            return a.parse(e, { collectComments: !0 });
          },
          newJSONDocument: function (e, t) {
            return a.newJSONDocument(e, t);
          },
          doResolve: h.doResolve.bind(h),
          doComplete: h.doComplete.bind(h),
          findDocumentSymbols: g.findDocumentSymbols.bind(g),
          findDocumentSymbols2: g.findDocumentSymbols2.bind(g),
          findColorSymbols: function (e, t) {
            return g.findDocumentColors(e, t).then(function (e) {
              return e.map(function (e) {
                return e.range;
              });
            });
          },
          findDocumentColors: g.findDocumentColors.bind(g),
          getColorPresentations: g.getColorPresentations.bind(g),
          doHover: m.doHover.bind(m),
          getFoldingRanges: u.getFoldingRanges,
          getSelectionRanges: f.getSelectionRanges,
          format: function (e, t, n) {
            var r = void 0;
            if (t) {
              var o = e.offsetAt(t.start);
              r = { offset: o, length: e.offsetAt(t.end) - o };
            }
            var i = { tabSize: n ? n.tabSize : 4, insertSpaces: !n || n.insertSpaces, eol: '\n' };
            return l.format(e.getText(), r, i).map(function (t) {
              return d.TextEdit.replace(
                d.Range.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length)),
                t.content
              );
            });
          },
        };
      });
  }),
  define('vscode-json-languageservice', ['vscode-json-languageservice/jsonLanguageService'], function (e) {
    return e;
  }),
  define('vs/language/json/jsonWorker', ['require', 'exports', 'vscode-json-languageservice'], function (e, t, n) {
    'use strict';
    var r;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      'undefined' != typeof fetch &&
        (r = function (e) {
          return fetch(e).then(function (e) {
            return e.text();
          });
        });
    var o = (function () {
        function e(e) {
          this.wrapped = new Promise(e);
        }
        return (
          (e.prototype.then = function (e, t) {
            return this.wrapped.then(e, t);
          }),
          (e.prototype.getWrapped = function () {
            return this.wrapped;
          }),
          (e.resolve = function (e) {
            return Promise.resolve(e);
          }),
          (e.reject = function (e) {
            return Promise.reject(e);
          }),
          (e.all = function (e) {
            return Promise.all(e);
          }),
          e
        );
      })(),
      i = (function () {
        function e(e, t) {
          (this._ctx = e),
            (this._languageSettings = t.languageSettings),
            (this._languageId = t.languageId),
            (this._languageService = n.getLanguageService({
              schemaRequestService: t.enableSchemaRequest && r,
              promiseConstructor: o,
            })),
            this._languageService.configure(this._languageSettings);
        }
        return (
          (e.prototype.doValidation = function (e) {
            var t = this._getTextDocument(e);
            if (t) {
              var n = this._languageService.parseJSONDocument(t);
              return this._languageService.doValidation(t, n);
            }
            return Promise.resolve([]);
          }),
          (e.prototype.doComplete = function (e, t) {
            var n = this._getTextDocument(e),
              r = this._languageService.parseJSONDocument(n);
            return this._languageService.doComplete(n, t, r);
          }),
          (e.prototype.doResolve = function (e) {
            return this._languageService.doResolve(e);
          }),
          (e.prototype.doHover = function (e, t) {
            var n = this._getTextDocument(e),
              r = this._languageService.parseJSONDocument(n);
            return this._languageService.doHover(n, t, r);
          }),
          (e.prototype.format = function (e, t, n) {
            var r = this._getTextDocument(e),
              o = this._languageService.format(r, t, n);
            return Promise.resolve(o);
          }),
          (e.prototype.resetSchema = function (e) {
            return Promise.resolve(this._languageService.resetSchema(e));
          }),
          (e.prototype.findDocumentSymbols = function (e) {
            var t = this._getTextDocument(e),
              n = this._languageService.parseJSONDocument(t),
              r = this._languageService.findDocumentSymbols(t, n);
            return Promise.resolve(r);
          }),
          (e.prototype.findDocumentColors = function (e) {
            var t = this._getTextDocument(e),
              n = this._languageService.parseJSONDocument(t),
              r = this._languageService.findDocumentColors(t, n);
            return Promise.resolve(r);
          }),
          (e.prototype.getColorPresentations = function (e, t, n) {
            var r = this._getTextDocument(e),
              o = this._languageService.parseJSONDocument(r),
              i = this._languageService.getColorPresentations(r, o, t, n);
            return Promise.resolve(i);
          }),
          (e.prototype.getFoldingRanges = function (e, t) {
            var n = this._getTextDocument(e),
              r = this._languageService.getFoldingRanges(n, t);
            return Promise.resolve(r);
          }),
          (e.prototype.getSelectionRanges = function (e, t) {
            var n = this._getTextDocument(e),
              r = this._languageService.parseJSONDocument(n),
              o = this._languageService.getSelectionRanges(n, t, r);
            return Promise.resolve(o);
          }),
          (e.prototype._getTextDocument = function (e) {
            for (var t = 0, r = this._ctx.getMirrorModels(); t < r.length; t++) {
              var o = r[t];
              if (o.uri.toString() === e) return n.TextDocument.create(e, this._languageId, o.version, o.getValue());
            }
            return null;
          }),
          e
        );
      })();
    (t.JSONWorker = i),
      (t.create = function (e, t) {
        return new i(e, t);
      });
  });
