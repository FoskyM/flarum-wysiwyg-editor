/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/sceditor/minified/formats/bbcode.js":
/*!**********************************************************!*\
  !*** ./node_modules/sceditor/minified/formats/bbcode.js ***!
  \**********************************************************/
/***/ (() => {

/* SCEditor v3.2.0 | (C) 2017, Sam Clarke | sceditor.com/license */
!function (t) {
  "use strict";

  var f = t.escapeEntities,
    o = t.escapeUriScheme,
    p = t.dom,
    e = t.utils,
    d = p.css,
    g = p.attr,
    b = p.is,
    n = e.extend,
    s = e.each,
    y = "data-sceditor-emoticon",
    l = t.command.get,
    v = {
      always: 1,
      never: 2,
      auto: 3
    },
    r = {
      bold: {
        txtExec: ["[b]", "[/b]"]
      },
      italic: {
        txtExec: ["[i]", "[/i]"]
      },
      underline: {
        txtExec: ["[u]", "[/u]"]
      },
      strike: {
        txtExec: ["[s]", "[/s]"]
      },
      subscript: {
        txtExec: ["[sub]", "[/sub]"]
      },
      superscript: {
        txtExec: ["[sup]", "[/sup]"]
      },
      left: {
        txtExec: ["[left]", "[/left]"]
      },
      center: {
        txtExec: ["[center]", "[/center]"]
      },
      right: {
        txtExec: ["[right]", "[/right]"]
      },
      justify: {
        txtExec: ["[justify]", "[/justify]"]
      },
      font: {
        txtExec: function txtExec(t) {
          var e = this;
          l("font")._dropDown(e, t, function (t) {
            e.insertText("[font=" + t + "]", "[/font]");
          });
        }
      },
      size: {
        txtExec: function txtExec(t) {
          var e = this;
          l("size")._dropDown(e, t, function (t) {
            e.insertText("[size=" + t + "]", "[/size]");
          });
        }
      },
      color: {
        txtExec: function txtExec(t) {
          var e = this;
          l("color")._dropDown(e, t, function (t) {
            e.insertText("[color=" + t + "]", "[/color]");
          });
        }
      },
      bulletlist: {
        txtExec: function txtExec(t, e) {
          this.insertText("[ul]\n[li]" + e.split(/\r?\n/).join("[/li]\n[li]") + "[/li]\n[/ul]");
        }
      },
      orderedlist: {
        txtExec: function txtExec(t, e) {
          this.insertText("[ol]\n[li]" + e.split(/\r?\n/).join("[/li]\n[li]") + "[/li]\n[/ol]");
        }
      },
      table: {
        txtExec: ["[table][tr][td]", "[/td][/tr][/table]"]
      },
      horizontalrule: {
        txtExec: ["[hr]"]
      },
      code: {
        txtExec: ["[code]", "[/code]"]
      },
      image: {
        txtExec: function txtExec(t, e) {
          var i = this;
          l("image")._dropDown(i, t, e, function (t, e, n) {
            var r = "";
            e && (r += " width=" + e), n && (r += " height=" + n), i.insertText("[img" + r + "]" + t + "[/img]");
          });
        }
      },
      email: {
        txtExec: function txtExec(t, n) {
          var r = this;
          l("email")._dropDown(r, t, function (t, e) {
            r.insertText("[email=" + t + "]" + (e || n || t) + "[/email]");
          });
        }
      },
      link: {
        txtExec: function txtExec(t, n) {
          var r = this;
          l("link")._dropDown(r, t, function (t, e) {
            r.insertText("[url=" + t + "]" + (e || n || t) + "[/url]");
          });
        }
      },
      quote: {
        txtExec: ["[quote]", "[/quote]"]
      },
      youtube: {
        txtExec: function txtExec(t) {
          var e = this;
          l("youtube")._dropDown(e, t, function (t) {
            e.insertText("[youtube]" + t + "[/youtube]");
          });
        }
      },
      rtl: {
        txtExec: ["[rtl]", "[/rtl]"]
      },
      ltr: {
        txtExec: ["[ltr]", "[/ltr]"]
      }
    },
    x = {
      b: {
        tags: {
          b: null,
          strong: null
        },
        styles: {
          "font-weight": ["bold", "bolder", "401", "700", "800", "900"]
        },
        format: "[b]{0}[/b]",
        html: "<strong>{0}</strong>"
      },
      i: {
        tags: {
          i: null,
          em: null
        },
        styles: {
          "font-style": ["italic", "oblique"]
        },
        format: "[i]{0}[/i]",
        html: "<em>{0}</em>"
      },
      u: {
        tags: {
          u: null
        },
        styles: {
          "text-decoration": ["underline"]
        },
        format: "[u]{0}[/u]",
        html: "<u>{0}</u>"
      },
      s: {
        tags: {
          s: null,
          strike: null
        },
        styles: {
          "text-decoration": ["line-through"]
        },
        format: "[s]{0}[/s]",
        html: "<s>{0}</s>"
      },
      sub: {
        tags: {
          sub: null
        },
        format: "[sub]{0}[/sub]",
        html: "<sub>{0}</sub>"
      },
      sup: {
        tags: {
          sup: null
        },
        format: "[sup]{0}[/sup]",
        html: "<sup>{0}</sup>"
      },
      font: {
        tags: {
          font: {
            face: null
          }
        },
        styles: {
          "font-family": null
        },
        quoteType: v.never,
        format: function format(t, e) {
          var n;
          return "[font=" + a(n = b(t, "font") && (n = g(t, "face")) ? n : d(t, "font-family")) + "]" + e + "[/font]";
        },
        html: '<font face="{defaultattr}">{0}</font>'
      },
      size: {
        tags: {
          font: {
            size: null
          }
        },
        styles: {
          "font-size": null
        },
        format: function format(t, e) {
          var n = g(t, "size"),
            r = 2;
          return -1 < (n = n || d(t, "fontSize")).indexOf("px") ? ((n = +n.replace("px", "")) < 12 && (r = 1), 15 < n && (r = 3), 17 < n && (r = 4), 23 < n && (r = 5), 31 < n && (r = 6), 47 < n && (r = 7)) : r = n, "[size=" + r + "]" + e + "[/size]";
        },
        html: '<font size="{defaultattr}">{!0}</font>'
      },
      color: {
        tags: {
          font: {
            color: null
          }
        },
        styles: {
          color: null
        },
        quoteType: v.never,
        format: function format(t, e) {
          var n;
          return "[color=" + c(n = b(t, "font") && (n = g(t, "color")) ? n : t.style.color || d(t, "color")) + "]" + e + "[/color]";
        },
        html: function html(t, e, n) {
          return '<font color="' + f(c(e.defaultattr), !0) + '">' + n + "</font>";
        }
      },
      ul: {
        tags: {
          ul: null
        },
        breakStart: !0,
        isInline: !1,
        skipLastLineBreak: !0,
        format: "[ul]{0}[/ul]",
        html: "<ul>{0}</ul>"
      },
      list: {
        breakStart: !0,
        isInline: !1,
        skipLastLineBreak: !0,
        html: "<ul>{0}</ul>"
      },
      ol: {
        tags: {
          ol: null
        },
        breakStart: !0,
        isInline: !1,
        skipLastLineBreak: !0,
        format: "[ol]{0}[/ol]",
        html: "<ol>{0}</ol>"
      },
      li: {
        tags: {
          li: null
        },
        isInline: !1,
        closedBy: ["/ul", "/ol", "/list", "*", "li"],
        format: "[li]{0}[/li]",
        html: "<li>{0}</li>"
      },
      "*": {
        isInline: !1,
        closedBy: ["/ul", "/ol", "/list", "*", "li"],
        html: "<li>{0}</li>"
      },
      table: {
        tags: {
          table: null
        },
        isInline: !1,
        isHtmlInline: !0,
        skipLastLineBreak: !0,
        format: "[table]{0}[/table]",
        html: "<table>{0}</table>"
      },
      tr: {
        tags: {
          tr: null
        },
        isInline: !1,
        skipLastLineBreak: !0,
        format: "[tr]{0}[/tr]",
        html: "<tr>{0}</tr>"
      },
      th: {
        tags: {
          th: null
        },
        allowsEmpty: !0,
        isInline: !1,
        format: "[th]{0}[/th]",
        html: "<th>{0}</th>"
      },
      td: {
        tags: {
          td: null
        },
        allowsEmpty: !0,
        isInline: !1,
        format: "[td]{0}[/td]",
        html: "<td>{0}</td>"
      },
      emoticon: {
        allowsEmpty: !0,
        tags: {
          img: {
            src: null,
            "data-sceditor-emoticon": null
          }
        },
        format: function format(t, e) {
          return g(t, y) + e;
        },
        html: "{0}"
      },
      hr: {
        tags: {
          hr: null
        },
        allowsEmpty: !0,
        isSelfClosing: !0,
        isInline: !1,
        format: "[hr]{0}",
        html: "<hr />"
      },
      img: {
        allowsEmpty: !0,
        tags: {
          img: {
            src: null
          }
        },
        allowedChildren: ["#"],
        quoteType: v.never,
        format: function format(e, t) {
          function n(t) {
            return e.style ? e.style[t] : null;
          }
          var r,
            i = "";
          return g(e, y) ? t : (t = g(e, "width") || n("width"), r = g(e, "height") || n("height"), "[img" + (i = e.complete && (t || r) || t && r ? "=" + p.width(e) + "x" + p.height(e) : i) + "]" + g(e, "src") + "[/img]");
        },
        html: function html(t, e, n) {
          var r = "",
            i = e.width,
            l = e.height;
          return e.defaultattr && (i = (e = e.defaultattr.split(/x/i))[0], l = 2 === e.length ? e[1] : e[0]), void 0 !== i && (r += ' width="' + f(i, !0) + '"'), void 0 !== l && (r += ' height="' + f(l, !0) + '"'), "<img" + r + ' src="' + o(n) + '" />';
        }
      },
      url: {
        allowsEmpty: !0,
        tags: {
          a: {
            href: null
          }
        },
        quoteType: v.never,
        format: function format(t, e) {
          t = g(t, "href");
          return "mailto:" === t.substr(0, 7) ? '[email="' + t.substr(7) + '"]' + e + "[/email]" : "[url=" + t + "]" + e + "[/url]";
        },
        html: function html(t, e, n) {
          return e.defaultattr = f(e.defaultattr, !0) || n, '<a href="' + o(e.defaultattr) + '">' + n + "</a>";
        }
      },
      email: {
        quoteType: v.never,
        html: function html(t, e, n) {
          return '<a href="mailto:' + (f(e.defaultattr, !0) || n) + '">' + n + "</a>";
        }
      },
      quote: {
        tags: {
          blockquote: null
        },
        isInline: !1,
        quoteType: v.never,
        format: function format(t, e) {
          for (var n, r = "data-author", i = "", l = t.children, o = 0; !n && o < l.length; o++) b(l[o], "cite") && (n = l[o]);
          return (n || g(t, r)) && (i = n && n.textContent || g(t, r), g(t, r, i), n && t.removeChild(n), e = this.elementToBbcode(t), i = "=" + i.replace(/(^\s+|\s+$)/g, ""), n && t.insertBefore(n, t.firstChild)), "[quote" + i + "]" + e + "[/quote]";
        },
        html: function html(t, e, n) {
          return "<blockquote>" + (n = e.defaultattr ? "<cite>" + f(e.defaultattr) + "</cite>" + n : n) + "</blockquote>";
        }
      },
      code: {
        tags: {
          code: null
        },
        isInline: !1,
        allowedChildren: ["#", "#newline"],
        format: "[code]{0}[/code]",
        html: "<code>{0}</code>"
      },
      left: {
        styles: {
          "text-align": ["left", "-webkit-left", "-moz-left", "-khtml-left"]
        },
        isInline: !1,
        allowsEmpty: !0,
        format: "[left]{0}[/left]",
        html: '<div align="left">{0}</div>'
      },
      center: {
        styles: {
          "text-align": ["center", "-webkit-center", "-moz-center", "-khtml-center"]
        },
        isInline: !1,
        allowsEmpty: !0,
        format: "[center]{0}[/center]",
        html: '<div align="center">{0}</div>'
      },
      right: {
        styles: {
          "text-align": ["right", "-webkit-right", "-moz-right", "-khtml-right"]
        },
        isInline: !1,
        allowsEmpty: !0,
        format: "[right]{0}[/right]",
        html: '<div align="right">{0}</div>'
      },
      justify: {
        styles: {
          "text-align": ["justify", "-webkit-justify", "-moz-justify", "-khtml-justify"]
        },
        isInline: !1,
        allowsEmpty: !0,
        format: "[justify]{0}[/justify]",
        html: '<div align="justify">{0}</div>'
      },
      youtube: {
        allowsEmpty: !0,
        tags: {
          iframe: {
            "data-youtube-id": null
          }
        },
        format: function format(t, e) {
          return (t = g(t, "data-youtube-id")) ? "[youtube]" + t + "[/youtube]" : e;
        },
        html: '<iframe width="560" height="315" frameborder="0" src="https://www.youtube-nocookie.com/embed/{0}?wmode=opaque" data-youtube-id="{0}" allowfullscreen></iframe>'
      },
      rtl: {
        styles: {
          direction: ["rtl"]
        },
        isInline: !1,
        format: "[rtl]{0}[/rtl]",
        html: '<div style="direction: rtl">{0}</div>'
      },
      ltr: {
        styles: {
          direction: ["ltr"]
        },
        isInline: !1,
        format: "[ltr]{0}[/ltr]",
        html: '<div style="direction: ltr">{0}</div>'
      },
      ignore: {}
    };
  function k(t, r) {
    return t.replace(/\{([^}]+)\}/g, function (t, e) {
      var n = !0;
      return "!" === e.charAt(0) && (n = !1, e = e.substring(1)), "0" === e && (n = !1), void 0 === r[e] ? t : n ? f(r[e], !0) : r[e];
    });
  }
  function w(t) {
    return "function" == typeof t;
  }
  function a(t) {
    return t && t.replace(/\\(.)/g, "$1").replace(/^(["'])(.*?)\1$/, "$2");
  }
  var E = "open",
    B = "content",
    I = "newline",
    C = "close";
  function u(t, e, n, r, i, l) {
    var o = this;
    o.type = t, o.name = e, o.val = n, o.attrs = r || {}, o.children = i || [], o.closing = l || null;
  }
  function T(t) {
    var m = this;
    function o(t, e) {
      var n, r, i;
      return t === E && (n = e.match(/\[([^\]\s=]+)(?:([^\]]+))?\]/)) && (i = l(n[1]), n[2] && (n[2] = n[2].trim()) && (r = function (t) {
        var e,
          n = /([^\s=]+)=(?:(?:(["'])((?:\\\2|[^\2])*?)\2)|((?:.(?!\s\S+=))*.))/g,
          r = {};
        if ("=" === t.charAt(0) && t.indexOf("=", 1) < 0) r.defaultattr = a(t.substr(1));else for ("=" === t.charAt(0) && (t = "defaultattr" + t); e = n.exec(t);) r[l(e[1])] = a(e[3]) || e[4];
        return r;
      }(n[2]))), t === C && (n = e.match(/\[\/([^\[\]]+)\]/)) && (i = l(n[1])), (i = t === I ? "#newline" : i) && (t !== E && t !== C || x[i]) || (t = B, i = "#"), new u(t, i, e, r);
    }
    function d(t, e, n) {
      for (var r = n.length; r--;) if (n[r].type === e && n[r].name === t) return 1;
    }
    function h(t, e) {
      t = (t ? x[t.name] : {}).allowedChildren;
      return !m.opts.fixInvalidChildren || !t || -1 < t.indexOf(e.name || "#");
    }
    function c(t, e) {
      for (var n, r, i, l, o, a, s = "", u = function u(t) {
          return !1 !== (!t || (void 0 !== t.isHtmlInline ? t.isHtmlInline : t.isInline));
        }; 0 < t.length;) if (n = t.shift()) {
        if (n.type === E) a = n.children[n.children.length - 1] || {}, r = x[n.name], l = e && u(r), i = c(n.children, !1), a = r && r.html ? (u(r) || !u(x[a.name]) || r.isPreFormatted || r.skipLastLineBreak || (i += "<br />"), w(r.html) ? r.html.call(m, n, n.attrs, i) : (n.attrs[0] = i, k(r.html, n.attrs))) : n.val + i + (n.closing ? n.closing.val : "");else {
          if (n.type === I) {
            if (!e) {
              s += "<br />";
              continue;
            }
            o || (s += "<div>"), s += "<br />", t.length || (s += "<br />"), s += "</div>\n", o = !1;
            continue;
          }
          l = e, a = f(n.val, !0);
        }
        l && !o ? (s += "<div>", o = !0) : !l && o && (s += "</div>\n", o = !1), s += a;
      }
      return o && (s += "</div>\n"), s;
    }
    function p(t, e, n) {
      var r = /\s|=/.test(t);
      return w(e) ? e(t, n) : e === v.never || e === v.auto && !r ? t : '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
    }
    function g(t) {
      return t.length ? t[t.length - 1] : null;
    }
    function l(t) {
      return t.toLowerCase();
    }
    m.opts = n({}, T.defaults, t), m.tokenize = function (t) {
      var e,
        n,
        r,
        i = [],
        l = [{
          type: B,
          regex: /^([^\[\r\n]+|\[)/
        }, {
          type: I,
          regex: /^(\r\n|\r|\n)/
        }, {
          type: E,
          regex: /^\[[^\[\]]+\]/
        }, {
          type: C,
          regex: /^\[\/[^\[\]]+\]/
        }];
      t: for (; t.length;) {
        for (r = l.length; r--;) if (n = l[r].type, (e = t.match(l[r].regex)) && e[0]) {
          i.push(o(n, e[0])), t = t.substr(e[0].length);
          continue t;
        }
        t.length && i.push(o(B, t)), t = "";
      }
      return i;
    }, m.parse = function (t, e) {
      var t = function (t) {
          function e() {
            return g(f);
          }
          function n(t) {
            (e() ? e().children : c).push(t);
          }
          function r(t) {
            return e() && (l = x[e().name]) && l.closedBy && -1 < l.closedBy.indexOf(t);
          }
          var i,
            l,
            o,
            a,
            s,
            u = [],
            c = [],
            f = [];
          for (; i = t.shift();) switch (s = t[0], h(e(), i) || i.type === C && e() && i.name === e().name || (i.name = "#", i.type = B), i.type) {
            case E:
              r(i.name) && f.pop(), n(i), (l = x[i.name]) && !l.isSelfClosing && (l.closedBy || d(i.name, C, t)) ? f.push(i) : l && l.isSelfClosing || (i.type = B);
              break;
            case C:
              if (e() && i.name !== e().name && r("/" + i.name) && f.pop(), e() && i.name === e().name) e().closing = i, f.pop();else if (d(i.name, E, f)) {
                for (; o = f.pop();) {
                  if (o.name === i.name) {
                    o.closing = i;
                    break;
                  }
                  o = o.clone(), u.length && o.children.push(g(u)), u.push(o);
                }
                for (s && s.type === I && (l = x[i.name]) && !1 === l.isInline && (n(s), t.shift()), n(g(u)), a = u.length; a--;) f.push(u[a]);
                u.length = 0;
              } else i.type = B, n(i);
              break;
            case I:
              e() && s && r((s.type === C ? "/" : "") + s.name) && (s.type === C && s.name === e().name || ((l = x[e().name]) && l.breakAfter || l && !1 === l.isInline && m.opts.breakAfterBlock && !1 !== l.breakAfter) && f.pop()), n(i);
              break;
            default:
              n(i);
          }
          return c;
        }(m.tokenize(t)),
        n = m.opts;
      return n.fixInvalidNesting && function t(e, n, r, i) {
        var l, o, a, s;
        var u = function u(t) {
          t = x[t.name];
          return !t || !1 !== t.isInline;
        };
        n = n || [];
        i = i || e;
        for (o = 0; o < e.length; o++) if ((l = e[o]) && l.type === E) {
          var c, f;
          if (r && !u(l)) if (f = g(n), s = f.splitAt(l), a = 1 < n.length ? n[n.length - 2].children : i, h(l, f) && ((c = f.clone()).children = l.children, l.children = [c]), -1 < (c = a.indexOf(f))) return s.children.splice(0, 1), a.splice(c + 1, 0, l, s), void ((f = s.children[0]) && f.type === I && !u(l) && (s.children.splice(0, 1), a.splice(c + 2, 0, f)));
          n.push(l), t(l.children, n, r || u(l), i), n.pop();
        }
      }(t), function t(e, n, r) {
        var i, l, o, a, s, u, c, f;
        var d = e.length;
        n && (a = x[n.name]);
        var h = d;
        for (; h--;) (i = e[h]) && (i.type === I ? (l = 0 < h ? e[h - 1] : null, o = h < d - 1 ? e[h + 1] : null, f = !1, !r && a && !0 !== a.isSelfClosing && (l ? u || o || (!1 === a.isInline && m.opts.breakEndBlock && !1 !== a.breakEnd && (f = !0), a.breakEnd && (f = !0), u = f) : (!1 === a.isInline && m.opts.breakStartBlock && !1 !== a.breakStart && (f = !0), a.breakStart && (f = !0))), l && l.type === E && (s = x[l.name]) && (r ? !1 === s.isInline && (f = !0) : (!1 === s.isInline && m.opts.breakAfterBlock && !1 !== s.breakAfter && (f = !0), s.breakAfter && (f = !0))), !r && !c && o && o.type === E && (s = x[o.name]) && (!1 === s.isInline && m.opts.breakBeforeBlock && !1 !== s.breakBefore && (f = !0), s.breakBefore && (f = !0), c = f) ? e.splice(h, 1) : (f && e.splice(h, 1), c = !1)) : i.type === E && t(i.children, i, r));
      }(t, null, e), n.removeEmptyTags && function t(e) {
        var n, r;
        var i = function i(t) {
          for (var e = t.length; e--;) {
            var n = t[e].type;
            if (n === E || n === C) return !1;
            if (n === B && /\S|\u00A0/.test(t[e].val)) return !1;
          }
          return !0;
        };
        var l = e.length;
        for (; l--;) (n = e[l]) && n.type === E && (r = x[n.name], t(n.children), i(n.children) && r && !r.isSelfClosing && !r.allowsEmpty && e.splice.apply(e, [l, 1].concat(n.children)));
      }(t), t;
    }, m.toHTML = function (t, e) {
      return c(m.parse(t, e), !0);
    }, m.toHTMLFragment = function (t, e) {
      return c(m.parse(t, e), !1);
    }, m.toBBCode = function (t, e) {
      return function t(e) {
        var n,
          r,
          i,
          l,
          o,
          a,
          s,
          u,
          c,
          f = "";
        for (; 0 < e.length;) if (n = e.shift()) if (i = x[n.name], c = !(!i || !1 !== i.isInline), l = i && i.isSelfClosing, a = c && m.opts.breakBeforeBlock && !1 !== i.breakBefore || i && i.breakBefore, s = c && !l && m.opts.breakStartBlock && !1 !== i.breakStart || i && i.breakStart, u = c && m.opts.breakEndBlock && !1 !== i.breakEnd || i && i.breakEnd, c = c && m.opts.breakAfterBlock && !1 !== i.breakAfter || i && i.breakAfter, o = (i ? i.quoteType : null) || m.opts.quoteType || v.auto, i || n.type !== E) {
          if (n.type === E) {
            if (a && (f += "\n"), f += "[" + n.name, n.attrs) for (r in n.attrs.defaultattr && (f += "=" + p(n.attrs.defaultattr, o, "defaultattr"), delete n.attrs.defaultattr), n.attrs) n.attrs.hasOwnProperty(r) && (f += " " + r + "=" + p(n.attrs[r], o, r));
            f += "]", s && (f += "\n"), n.children && (f += t(n.children)), l || i.excludeClosing || (u && (f += "\n"), f += "[/" + n.name + "]"), c && (f += "\n"), n.closing && l && (f += n.closing.val);
          } else f += n.val;
        } else f += n.val, n.children && (f += t(n.children)), n.closing && (f += n.closing.val);
        return f;
      }(m.parse(t, e));
    };
  }
  function i(t) {
    return t = parseInt(t, 10), isNaN(t) ? "00" : (t = Math.max(0, Math.min(t, 255)).toString(16)).length < 2 ? "0" + t : t;
  }
  function c(t) {
    var e;
    return (e = (t = t || "#000").match(/rgb\((\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\)/i)) ? "#" + i(e[1]) + i(e[2]) + i(e[3]) : (e = t.match(/#([0-9a-f])([0-9a-f])([0-9a-f])\s*?$/i)) ? "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3] : t;
  }
  function h() {
    var u = this,
      i = (u.stripQuotes = a, {}),
      h = {
        ul: ["li", "ol", "ul"],
        ol: ["li", "ol", "ul"],
        table: ["tr"],
        tr: ["td", "th"],
        code: ["br", "p", "div"]
      };
    function m(l, o, e) {
      function a(t) {
        var e = t[0],
          t = t[1],
          n = p.getStyle(l, e),
          r = l.parentNode;
        return !(!n || r && p.hasStyle(r, e, n)) && (!t || t.includes(n));
      }
      function t(t) {
        i[t] && i[t][e] && s(i[t][e], function (t, e) {
          var n,
            r = x[t].strictMatch,
            i = (r = void 0 === r ? u.opts.strictMatch : r) ? "every" : "some";
          if (!e || e[i]((n = r, function (t) {
            var e = t[0],
              t = t[1];
            return ("style" !== e || "CODE" !== l.nodeName) && ("style" === e && t ? t[n ? "every" : "some"](a) : (e = g(l, e)) && (!t || t.includes(e)));
          }))) return e = x[t].format, o = w(e) ? e.call(u, l, o) : function (t) {
            var n = arguments;
            return t.replace(/\{(\d+)\}/g, function (t, e) {
              return void 0 !== n[+e + 1] ? n[+e + 1] : "{" + e + "}";
            });
          }(e, o), !1;
        });
      }
      return t("*"), t(l.nodeName.toLowerCase()), o;
    }
    function c(t, e) {
      function d(t, u, c) {
        var f = "";
        return p.traverse(t, function (t) {
          var e = "",
            n = t.nodeType,
            r = t.nodeName.toLowerCase(),
            i = "code" === r,
            l = "img" === r && !!g(t, y),
            o = h[r],
            a = t.firstChild,
            s = !0;
          c && (s = -1 < c.indexOf(r), (s = l ? !0 : s) || (o = c)), 1 === n ? b(t, ".sceditor-nlf") && !a || ("iframe" !== r && (e = d(t, u || i, o)), s ? (u && !l || (i || (e = m(t, e, !1)), e = m(t, e, !0)), f += function (t, e) {
            var n = t.nodeName.toLowerCase(),
              r = p.isInline;
            if (!r(t, !0) || "br" === n) {
              for (var i, l, o = t.previousSibling; o && 1 === o.nodeType && !b(o, "br") && r(o, !0) && !o.firstChild;) o = o.previousSibling;
              for (; i = ((l = t.parentNode) && l.lastChild) === t, (t = l) && i && r(l, !0););
              i && "li" !== n || (e += "\n"), "br" !== n && o && !b(o, "br") && r(o, !0) && (e = "\n" + e);
            }
            return e;
          }(t, e)) : f += e) : 3 === n && (f += t.nodeValue);
        }, !1, !0), f;
      }
      return d(t, e);
    }
    function t(t, e, n) {
      var r = new T(u.opts.parserOptions);
      return (t || n ? r.toHTMLFragment : r.toHTML)(u.opts.bbcodeTrim ? e.trim() : e);
    }
    function e(t, e, n, r) {
      n = n || document;
      var i,
        l = !!p.closest(r, "code"),
        o = n.createElement("div"),
        a = n.createElement("div"),
        s = new T(u.opts.parserOptions);
      for (a.innerHTML = e, d(o, "visibility", "hidden"), o.appendChild(a), n.body.appendChild(o), t && (o.insertBefore(n.createTextNode("#"), o.firstChild), o.appendChild(n.createTextNode("#"))), r && d(a, "whiteSpace", d(r, "whiteSpace")), i = a.getElementsByClassName("sceditor-ignore"); i.length;) i[0].parentNode.removeChild(i[0]);
      return p.removeWhiteSpace(o), e = c(a, l), n.body.removeChild(o), e = s.toBBCode(e, !0), e = u.opts.bbcodeTrim ? e.trim() : e;
    }
    u.init = function () {
      u.opts = this.opts, u.elementToBbcode = c, s(x, function (n, t) {
        var r = !1 === t.isInline,
          t = x[n].tags,
          e = x[n].styles;
        e && (i["*"] = i["*"] || {}, i["*"][r] = i["*"][r] || {}, i["*"][r][n] = [["style", Object.entries(e)]]), t && s(t, function (t, e) {
          e && e.style && (e.style = Object.entries(e.style)), i[t] = i[t] || {}, i[t][r] = i[t][r] || {}, i[t][r][n] = e && Object.entries(e);
        });
      }), this.commands = n(!0, {}, r, this.commands), this.toBBCode = u.toSource, this.fromBBCode = u.toHtml;
    }, u.toHtml = t.bind(null, !1), u.fragmentToHtml = t.bind(null, !0), u.toSource = e.bind(null, !1), u.fragmentToSource = e.bind(null, !0);
  }
  u.prototype = {
    clone: function clone() {
      var t = this;
      return new u(t.type, t.name, t.val, n({}, t.attrs), [], t.closing ? t.closing.clone() : null);
    },
    splitAt: function splitAt(t) {
      var e,
        n = this.clone(),
        t = this.children.indexOf(t);
      return -1 < t && (e = this.children.length - t, n.children = this.children.splice(t, e)), n;
    }
  }, T.QuoteType = v, T.defaults = {
    breakBeforeBlock: !1,
    breakStartBlock: !1,
    breakEndBlock: !1,
    breakAfterBlock: !0,
    removeEmptyTags: !0,
    fixInvalidNesting: !0,
    fixInvalidChildren: !0,
    quoteType: v.auto,
    strictMatch: !1
  }, h.get = function (t) {
    return x[t] || null;
  }, h.set = function (t, e) {
    return t && e && ((e = n(x[t] || {}, e)).remove = function () {
      delete x[t];
    }, x[t] = e), this;
  }, h.rename = function (t, e) {
    return t in x && (x[e] = x[t], delete x[t]), this;
  }, h.remove = function (t) {
    return t in x && delete x[t], this;
  }, h.formatBBCodeString = k, t.formats.bbcode = h, t.BBCodeParser = T;
}(sceditor);

/***/ }),

/***/ "./node_modules/sceditor/minified/sceditor.min.js":
/*!********************************************************!*\
  !*** ./node_modules/sceditor/minified/sceditor.min.js ***!
  \********************************************************/
/***/ (() => {

/* SCEditor v3.2.0 | (C) 2017, Sam Clarke | sceditor.com/license */
!function () {
  "use strict";

  function i(e, t) {
    return typeof t === e;
  }
  var ve = i.bind(null, "string"),
    Ke = i.bind(null, "undefined"),
    Xe = i.bind(null, "function"),
    a = i.bind(null, "number");
  function l(e) {
    return !Object.keys(e).length;
  }
  function be(e, t) {
    var n = e === !!e,
      o = n ? 2 : 1,
      r = n ? t : e,
      i = n && e;
    function a(e) {
      return null !== e && "object" == typeof e && Object.getPrototypeOf(e) === Object.prototype;
    }
    for (; o < arguments.length; o++) {
      var l,
        c = arguments[o];
      for (l in c) {
        var s,
          u,
          d = r[l],
          f = c[l];
        Ke(f) || "__proto__" !== l && "constructor" !== l && (u = a(f), s = Array.isArray(f), i && (u || s) ? (u = a(d) === u && Array.isArray(d) === s, r[l] = be(!0, u ? d : s ? [] : {}, f)) : r[l] = f);
      }
    }
    return r;
  }
  function Ze(e, t) {
    t = e.indexOf(t);
    -1 < t && e.splice(t, 1);
  }
  function we(t, n) {
    if (Array.isArray(t) || "length" in t && a(t.length)) for (var e = 0; e < t.length; e++) n(e, t[e]);else Object.keys(t).forEach(function (e) {
      n(e, t[e]);
    });
  }
  var c = {},
    xe = 1,
    Te = 3,
    s = 8;
  function r(e) {
    return e = parseFloat(e), isFinite(e) ? e : 0;
  }
  function Ce(e, t, n) {
    var o = (n || document).createElement(e);
    return we(t || {}, function (e, t) {
      "style" === e ? o.style.cssText = t : e in o ? o[e] = t : o.setAttribute(e, t);
    }), o;
  }
  function Je(e, t) {
    for (var n = e || {}; (n = n.parentNode) && !/(9|11)/.test(n.nodeType);) if (!t || _e(n, t)) return n;
  }
  function Ee(e, t) {
    return _e(e, t) ? e : Je(e, t);
  }
  function Se(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }
  function Ne(e, t) {
    e.appendChild(t);
  }
  function ke(e, t) {
    return e.querySelectorAll(t);
  }
  function De(n, e, o, r, i) {
    e.split(" ").forEach(function (e) {
      var t;
      ve(o) ? (t = r["_sce-event-" + e + o] || function (e) {
        for (var t = e.target; t && t !== n;) {
          if (_e(t, o)) return void r.call(t, e);
          t = t.parentNode;
        }
      }, r["_sce-event-" + e + o] = t) : (t = o, i = r), n.addEventListener(e, t, i || !1);
    });
  }
  function Me(n, e, o, r, i) {
    e.split(" ").forEach(function (e) {
      var t;
      ve(o) ? t = r["_sce-event-" + e + o] : (t = o, i = r), n.removeEventListener(e, t, i || !1);
    });
  }
  function Ae(e, t, n) {
    if (arguments.length < 3) return e.getAttribute(t);
    null == n ? Qe(e, t) : e.setAttribute(t, n);
  }
  function Qe(e, t) {
    e.removeAttribute(t);
  }
  function et(e) {
    Re(e, "display", "none");
  }
  function tt(e) {
    Re(e, "display", "");
  }
  function nt(e) {
    (ct(e) ? et : tt)(e);
  }
  function Re(n, e, t) {
    if (arguments.length < 3) {
      if (ve(e)) return 1 === n.nodeType ? getComputedStyle(n)[e] : null;
      we(e, function (e, t) {
        Re(n, e, t);
      });
    } else {
      var o = (t || 0 === t) && !isNaN(t);
      n.style[e] = o ? t + "px" : t;
    }
  }
  function ot(e, t, n) {
    var o = arguments.length,
      r = {};
    if (e.nodeType === xe) return 1 === o ? (we(e.attributes, function (e, t) {
      /^data\-/i.test(t.name) && (r[t.name.substr(5)] = t.value);
    }), r) : 2 === o ? Ae(e, "data-" + t) : void Ae(e, "data-" + t, String(n));
  }
  function _e(e, t) {
    var n = !1;
    return n = e && e.nodeType === xe ? (e.matches || e.msMatchesSelector || e.webkitMatchesSelector).call(e, t) : n;
  }
  function Oe(e, t) {
    t.parentNode.insertBefore(e, t);
  }
  function u(e) {
    return e.className.trim().split(/\s+/);
  }
  function rt(e, t) {
    return _e(e, "." + t);
  }
  function Fe(e, t) {
    var n = u(e);
    n.indexOf(t) < 0 && n.push(t), e.className = n.join(" ");
  }
  function it(e, t) {
    var n = u(e);
    Ze(n, t), e.className = n.join(" ");
  }
  function He(e, t, n) {
    ((n = Ke(n) ? !rt(e, t) : n) ? Fe : it)(e, t);
  }
  function at(e, t) {
    var n, o;
    if (Ke(t)) return n = r((o = getComputedStyle(e)).paddingLeft) + r(o.paddingRight), o = r(o.borderLeftWidth) + r(o.borderRightWidth), e.offsetWidth - n - o;
    Re(e, "width", t);
  }
  function Le(e, t) {
    var n, o;
    if (Ke(t)) return n = r((o = getComputedStyle(e)).paddingTop) + r(o.paddingBottom), o = r(o.borderTopWidth) + r(o.borderBottomWidth), e.offsetHeight - n - o;
    Re(e, "height", t);
  }
  function lt(e, t, n) {
    var o;
    Xe(window.CustomEvent) ? o = new CustomEvent(t, {
      bubbles: !0,
      cancelable: !0,
      detail: n
    }) : (o = e.ownerDocument.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n), e.dispatchEvent(o);
  }
  function ct(e) {
    return e.getClientRects().length;
  }
  function d(e, t, n, o, r) {
    for (e = r ? e.lastChild : e.firstChild; e;) {
      var i = r ? e.previousSibling : e.nextSibling;
      if (!n && !1 === t(e) || !o && !1 === d(e, t, n, o, r) || n && !1 === t(e)) return !1;
      e = i;
    }
  }
  function st(e, t, n, o) {
    d(e, t, n, o, !0);
  }
  function ut(e, t) {
    var n = (t = t || document).createDocumentFragment(),
      o = Ce("div", {}, t);
    for (o.innerHTML = e; o.firstChild;) Ne(n, o.firstChild);
    return n;
  }
  function dt(e) {
    return e && (!_e(e, "p,div") || e.className || Ae(e, "style") || !l(ot(e)));
  }
  function ft(e, t) {
    var n = Ce(t, {}, e.ownerDocument);
    for (we(e.attributes, function (e, t) {
      try {
        Ae(n, t.name, t.value);
      } catch (e) {}
    }); e.firstChild;) Ne(n, e.firstChild);
    return e.parentNode.replaceChild(n, e), n;
  }
  var f = "|body|hr|p|div|h1|h2|h3|h4|h5|h6|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|blockquote|center|details|section|article|aside|nav|main|header|hgroup|footer|fieldset|dl|dt|dd|figure|figcaption|";
  function pt(e) {
    return !!/11?|9/.test(e.nodeType) && "|iframe|area|base|basefont|br|col|frame|hr|img|input|wbr|isindex|link|meta|param|command|embed|keygen|source|track|object|".indexOf("|" + e.nodeName.toLowerCase() + "|") < 0;
  }
  function Ie(e, t) {
    var n = (e || {}).nodeType || Te;
    return n !== xe ? n === Te : "code" === (n = e.tagName.toLowerCase()) ? !t : f.indexOf("|" + n + "|") < 0;
  }
  function p(e) {
    return e.lastChild && p(e.lastChild) && Se(e.lastChild), 3 === e.nodeType ? !e.nodeValue : pt(e) && !e.childNodes.length;
  }
  function mt(e) {
    d(e, function (e) {
      var t = !Ie(e, !0) && e.nodeType !== s,
        n = e.parentNode;
      if (t && (Ie(n, !0) || "P" === n.tagName)) {
        for (var o = e; Ie(o.parentNode, !0) || "P" === o.parentNode.tagName;) o = o.parentNode;
        for (var r = h(o, e), i = e; n && Ie(n, !0);) {
          if (n.nodeType === xe) {
            for (var a = n.cloneNode(); i.firstChild;) Ne(a, i.firstChild);
            Ne(i, a);
          }
          n = n.parentNode;
        }
        Oe(i, o), p(r) || Oe(r, i), p(o) && Se(o);
      }
      t && _e(e, "ul,ol") && _e(e.parentNode, "ul,ol") && (r = "li", t = (t = e).previousElementSibling, (t = !r || !t || _e(t, r) ? t : null) || Oe(t = Ce("li"), e), Ne(t, e));
    });
  }
  function m(e, t) {
    return e ? (t ? e.previousSibling : e.nextSibling) || m(e.parentNode, t) : null;
  }
  function ht(e) {
    var t,
      n,
      o,
      r,
      i,
      a,
      l = Re(e, "whiteSpace"),
      c = /line$/i.test(l),
      s = e.firstChild;
    if (!/pre(\-wrap)?$/i.test(l)) for (; s;) {
      if (i = s.nextSibling, t = s.nodeValue, (n = s.nodeType) === xe && s.firstChild && ht(s), n === Te) {
        for (n = m(s), o = m(s, !0), a = !1; rt(o, "sceditor-ignore");) o = m(o, !0);
        if (Ie(s) && o) {
          for (r = o; r.lastChild;) for (r = r.lastChild; rt(r, "sceditor-ignore");) r = m(r, !0);
          a = r.nodeType === Te ? /[\t\n\r ]$/.test(r.nodeValue) : !Ie(r);
        }
        t = t.replace(/\u200B/g, ""), o && Ie(o) && !a || (t = t.replace(c ? /^[\t ]+/ : /^[\t\n\r ]+/, "")), (t = n && Ie(n) ? t : t.replace(c ? /[\t ]+$/ : /[\t\n\r ]+$/, "")).length ? s.nodeValue = t.replace(c ? /[\t ]+/g : /[\t\n\r ]+/g, " ") : Se(s);
      }
      s = i;
    }
  }
  function h(e, t) {
    var n = e.ownerDocument.createRange();
    return n.setStartBefore(e), n.setEndAfter(t), n.extractContents();
  }
  function gt(e) {
    for (var t = 0, n = 0; e;) t += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
    return {
      left: t,
      top: n
    };
  }
  function g(e, t) {
    var n = e.style;
    return c[t] || (c[t] = t.replace(/^-ms-/, "ms-").replace(/-(\w)/g, function (e, t) {
      return t.toUpperCase();
    })), n = n[t = c[t]], "textAlign" === t && (n = n || Re(e, t), Re(e.parentNode, t) === n || "block" !== Re(e, "display") || _e(e, "hr,th")) ? "" : n;
  }
  function yt(e, t) {
    var n = e.attributes.length;
    if (n === t.attributes.length) {
      for (; n--;) {
        var o = e.attributes[n];
        if ("style" === o.name ? !function (e, t) {
          var n = e.style.length;
          if (n === t.style.length) {
            for (; n--;) {
              var o = e.style[n];
              if (e.style[o] !== t.style[o]) return;
            }
            return 1;
          }
        }(e, t) : o.value !== Ae(t, o.name)) return;
      }
      return 1;
    }
  }
  function vt(e) {
    for (; e.firstChild;) Oe(e.firstChild, e);
    Se(e);
  }
  var bt = {
      toolbar: "bold,italic,underline,strike,subscript,superscript|left,center,right,justify|font,size,color,removeformat|cut,copy,pastetext|bulletlist,orderedlist,indent,outdent|table|code,quote|horizontalrule,image,email,link,unlink|emoticon,youtube,date,time|ltr,rtl|print,maximize,source",
      toolbarExclude: null,
      style: "jquery.sceditor.default.css",
      fonts: "Arial,Arial Black,Comic Sans MS,Courier New,Georgia,Impact,Sans-serif,Serif,Times New Roman,Trebuchet MS,Verdana",
      colors: "#000000,#44B8FF,#1E92F7,#0074D9,#005DC2,#00369B,#b3d5f4|#444444,#C3FFFF,#9DF9FF,#7FDBFF,#68C4E8,#419DC1,#d9f4ff|#666666,#72FF84,#4CEA5E,#2ECC40,#17B529,#008E02,#c0f0c6|#888888,#FFFF44,#FFFA1E,#FFDC00,#E8C500,#C19E00,#fff5b3|#aaaaaa,#FFC95F,#FFA339,#FF851B,#E86E04,#C14700,#ffdbbb|#cccccc,#FF857A,#FF5F54,#FF4136,#E82A1F,#C10300,#ffc6c3|#eeeeee,#FF56FF,#FF30DC,#F012BE,#D900A7,#B20080,#fbb8ec|#ffffff,#F551FF,#CF2BE7,#B10DC9,#9A00B2,#9A00B2,#e8b6ef",
      locale: Ae(document.documentElement, "lang") || "en",
      charset: "utf-8",
      emoticonsCompat: !1,
      emoticonsEnabled: !0,
      emoticonsRoot: "",
      emoticons: {
        dropdown: {
          ":)": "emoticons/smile.png",
          ":angel:": "emoticons/angel.png",
          ":angry:": "emoticons/angry.png",
          "8-)": "emoticons/cool.png",
          ":'(": "emoticons/cwy.png",
          ":ermm:": "emoticons/ermm.png",
          ":D": "emoticons/grin.png",
          "<3": "emoticons/heart.png",
          ":(": "emoticons/sad.png",
          ":O": "emoticons/shocked.png",
          ":P": "emoticons/tongue.png",
          ";)": "emoticons/wink.png"
        },
        more: {
          ":alien:": "emoticons/alien.png",
          ":blink:": "emoticons/blink.png",
          ":blush:": "emoticons/blush.png",
          ":cheerful:": "emoticons/cheerful.png",
          ":devil:": "emoticons/devil.png",
          ":dizzy:": "emoticons/dizzy.png",
          ":getlost:": "emoticons/getlost.png",
          ":happy:": "emoticons/happy.png",
          ":kissing:": "emoticons/kissing.png",
          ":ninja:": "emoticons/ninja.png",
          ":pinch:": "emoticons/pinch.png",
          ":pouty:": "emoticons/pouty.png",
          ":sick:": "emoticons/sick.png",
          ":sideways:": "emoticons/sideways.png",
          ":silly:": "emoticons/silly.png",
          ":sleeping:": "emoticons/sleeping.png",
          ":unsure:": "emoticons/unsure.png",
          ":woot:": "emoticons/w00t.png",
          ":wassat:": "emoticons/wassat.png"
        },
        hidden: {
          ":whistling:": "emoticons/whistling.png",
          ":love:": "emoticons/wub.png"
        }
      },
      width: null,
      height: null,
      resizeEnabled: !0,
      resizeMinWidth: null,
      resizeMinHeight: null,
      resizeMaxHeight: null,
      resizeMaxWidth: null,
      resizeHeight: !0,
      resizeWidth: !0,
      dateFormat: "year-month-day",
      toolbarContainer: null,
      enablePasteFiltering: !1,
      disablePasting: !1,
      readOnly: !1,
      rtl: !1,
      autofocus: !1,
      autofocusEnd: !0,
      autoExpand: !1,
      autoUpdate: !1,
      spellcheck: !0,
      runWithoutWysiwygSupport: !1,
      startInSourceMode: !1,
      id: null,
      plugins: "",
      zIndex: null,
      bbcodeTrim: !1,
      disableBlockRemove: !1,
      allowedIframeUrls: [],
      parserOptions: {},
      dropDownCss: {},
      allowedTags: [],
      allowedAttributes: []
    },
    y = /^(https?|s?ftp|mailto|spotify|skype|ssh|teamspeak|tel):|(\/\/)|data:image\/(png|bmp|gif|p?jpe?g);/i;
  function wt(e) {
    return e.replace(/([\-.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  function ze(e, t) {
    var n;
    return e && (!(n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "  ": "&nbsp; ",
      "\r\n": "<br />",
      "\r": "<br />",
      "\n": "<br />"
    }) !== t && (n['"'] = "&#34;", n["'"] = "&#39;", n["`"] = "&#96;"), e = e.replace(/ {2}|\r\n|[&<>\r\n'"`]/g, function (e) {
      return n[e] || e;
    })), e;
  }
  var v = {
    html: '<!DOCTYPE html><html{attrs}><head><meta http-equiv="Content-Type" content="text/html;charset={charset}" /><link rel="stylesheet" type="text/css" href="{style}" /></head><body contenteditable="true" {spellcheck}><p></p></body></html>',
    toolbarButton: '<a class="sceditor-button sceditor-button-{name}" data-sceditor-command="{name}" unselectable="on"><div unselectable="on">{dispName}</div></a>',
    emoticon: '<img src="{url}" data-sceditor-emoticon="{key}" alt="{key}" title="{tooltip}" />',
    fontOpt: '<a class="sceditor-font-option" href="#" data-font="{font}"><font face="{font}">{font}</font></a>',
    sizeOpt: '<a class="sceditor-fontsize-option" data-size="{size}" href="#"><font size="{size}">{size}</font></a>',
    pastetext: '<div><label for="txt">{label}</label> <textarea cols="20" rows="7" id="txt"></textarea></div><div><input type="button" class="button" value="{insert}" /></div>',
    table: '<div><label for="rows">{rows}</label><input type="text" id="rows" value="2" /></div><div><label for="cols">{cols}</label><input type="text" id="cols" value="2" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    image: '<div><label for="image">{url}</label> <input type="text" id="image" dir="ltr" placeholder="https://" /></div><div><label for="width">{width}</label> <input type="text" id="width" size="2" dir="ltr" /></div><div><label for="height">{height}</label> <input type="text" id="height" size="2" dir="ltr" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    email: '<div><label for="email">{label}</label> <input type="text" id="email" dir="ltr" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    link: '<div><label for="link">{url}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{ins}" /></div>',
    youtubeMenu: '<div><label for="link">{label}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    youtube: '<iframe width="560" height="315" frameborder="0" allowfullscreen src="https://www.youtube-nocookie.com/embed/{id}?wmode=opaque&start={time}" data-youtube-id="{id}"></iframe>'
  };
  function Be(e, t, n) {
    var o = v[e];
    return Object.keys(t).forEach(function (e) {
      o = o.replace(new RegExp(wt("{" + e + "}"), "g"), t[e]);
    }), o = n ? ut(o) : o;
  }
  function b(e) {
    if ("mozHidden" in document) for (var t, n = e.getBody(); n;) {
      if ((t = n).firstChild) t = t.firstChild;else {
        for (; t && !t.nextSibling;) t = t.parentNode;
        t = t && t.nextSibling;
      }
      3 !== n.nodeType || !/[\n\r\t]+/.test(n.nodeValue) || /^pre/.test(Re(n.parentNode, "whiteSpace")) || Se(n), n = t;
    }
  }
  var Pe = {
      bold: {
        exec: "bold",
        tooltip: "Bold",
        shortcut: "Ctrl+B"
      },
      italic: {
        exec: "italic",
        tooltip: "Italic",
        shortcut: "Ctrl+I"
      },
      underline: {
        exec: "underline",
        tooltip: "Underline",
        shortcut: "Ctrl+U"
      },
      strike: {
        exec: "strikethrough",
        tooltip: "Strikethrough"
      },
      subscript: {
        exec: "subscript",
        tooltip: "Subscript"
      },
      superscript: {
        exec: "superscript",
        tooltip: "Superscript"
      },
      left: {
        state: function state(e) {
          var t;
          if (e = e && 3 === e.nodeType ? e.parentNode : e) return t = "ltr" === Re(e, "direction"), e = Re(e, "textAlign"), /left/.test(e) || e === (t ? "start" : "end");
        },
        exec: "justifyleft",
        tooltip: "Align left"
      },
      center: {
        exec: "justifycenter",
        tooltip: "Center"
      },
      right: {
        state: function state(e) {
          var t;
          if (e = e && 3 === e.nodeType ? e.parentNode : e) return t = "ltr" === Re(e, "direction"), e = Re(e, "textAlign"), /right/.test(e) || e === (t ? "end" : "start");
        },
        exec: "justifyright",
        tooltip: "Align right"
      },
      justify: {
        exec: "justifyfull",
        tooltip: "Justify"
      },
      font: {
        _dropDown: function _dropDown(t, e, n) {
          var o = Ce("div");
          De(o, "click", "a", function (e) {
            n(ot(this, "font")), t.closeDropDown(!0), e.preventDefault();
          }), t.opts.fonts.split(",").forEach(function (e) {
            Ne(o, Be("fontOpt", {
              font: e
            }, !0));
          }), t.createDropDown(e, "font-picker", o);
        },
        exec: function exec(e) {
          var t = this;
          Pe.font._dropDown(t, e, function (e) {
            t.execCommand("fontname", e);
          });
        },
        tooltip: "Font Name"
      },
      size: {
        _dropDown: function _dropDown(t, e, n) {
          var o = Ce("div");
          De(o, "click", "a", function (e) {
            n(ot(this, "size")), t.closeDropDown(!0), e.preventDefault();
          });
          for (var r = 1; r <= 7; r++) Ne(o, Be("sizeOpt", {
            size: r
          }, !0));
          t.createDropDown(e, "fontsize-picker", o);
        },
        exec: function exec(e) {
          var t = this;
          Pe.size._dropDown(t, e, function (e) {
            t.execCommand("fontsize", e);
          });
        },
        tooltip: "Font Size"
      },
      color: {
        _dropDown: function _dropDown(t, e, n) {
          var o = Ce("div"),
            r = "",
            i = Pe.color;
          i._htmlCache || (t.opts.colors.split("|").forEach(function (e) {
            r += '<div class="sceditor-color-column">', e.split(",").forEach(function (e) {
              r += '<a href="#" class="sceditor-color-option" style="background-color: ' + e + '" data-color="' + e + '"></a>';
            }), r += "</div>";
          }), i._htmlCache = r), Ne(o, ut(i._htmlCache)), De(o, "click", "a", function (e) {
            n(ot(this, "color")), t.closeDropDown(!0), e.preventDefault();
          }), t.createDropDown(e, "color-picker", o);
        },
        exec: function exec(e) {
          var t = this;
          Pe.color._dropDown(t, e, function (e) {
            t.execCommand("forecolor", e);
          });
        },
        tooltip: "Font Color"
      },
      removeformat: {
        exec: "removeformat",
        tooltip: "Remove Formatting"
      },
      cut: {
        exec: "cut",
        tooltip: "Cut",
        errorMessage: "Your browser does not allow the cut command. Please use the keyboard shortcut Ctrl/Cmd-X"
      },
      copy: {
        exec: "copy",
        tooltip: "Copy",
        errorMessage: "Your browser does not allow the copy command. Please use the keyboard shortcut Ctrl/Cmd-C"
      },
      paste: {
        exec: "paste",
        tooltip: "Paste",
        errorMessage: "Your browser does not allow the paste command. Please use the keyboard shortcut Ctrl/Cmd-V"
      },
      pastetext: {
        exec: function exec(e) {
          var t,
            n = Ce("div"),
            o = this;
          Ne(n, Be("pastetext", {
            label: o._("Paste your text inside the following box:"),
            insert: o._("Insert")
          }, !0)), De(n, "click", ".button", function (e) {
            (t = ke(n, "#txt")[0].value) && o.wysiwygEditorInsertText(t), o.closeDropDown(!0), e.preventDefault();
          }), o.createDropDown(e, "pastetext", n);
        },
        tooltip: "Paste Text"
      },
      bulletlist: {
        exec: function exec() {
          b(this), this.execCommand("insertunorderedlist");
        },
        tooltip: "Bullet list"
      },
      orderedlist: {
        exec: function exec() {
          b(this), this.execCommand("insertorderedlist");
        },
        tooltip: "Numbered list"
      },
      indent: {
        state: function state(e, t) {
          var n;
          return _e(t, "li") || _e(t, "ul,ol,menu") && (n = (t = this.getRangeHelper().selectedRange()).startContainer.parentNode, t = t.endContainer.parentNode, n !== n.parentNode.firstElementChild || _e(t, "li") && t !== t.parentNode.lastElementChild) ? 0 : -1;
        },
        exec: function exec() {
          var e = this.getRangeHelper().getFirstBlockParent();
          this.focus(), Ee(e, "ul,ol,menu") && this.execCommand("indent");
        },
        tooltip: "Add indent"
      },
      outdent: {
        state: function state(e, t) {
          return Ee(t, "ul,ol,menu") ? 0 : -1;
        },
        exec: function exec() {
          Ee(this.getRangeHelper().getFirstBlockParent(), "ul,ol,menu") && this.execCommand("outdent");
        },
        tooltip: "Remove one indent"
      },
      table: {
        exec: function exec(e) {
          var r = this,
            i = Ce("div");
          Ne(i, Be("table", {
            rows: r._("Rows:"),
            cols: r._("Cols:"),
            insert: r._("Insert")
          }, !0)), De(i, "click", ".button", function (e) {
            var t = Number(ke(i, "#rows")[0].value),
              n = Number(ke(i, "#cols")[0].value),
              o = "<table>";
            0 < t && 0 < n && (o += Array(t + 1).join("<tr>" + Array(n + 1).join("<td><br /></td>") + "</tr>"), r.wysiwygEditorInsertHtml(o += "</table>"), r.closeDropDown(!0), e.preventDefault());
          }), r.createDropDown(e, "inserttable", i);
        },
        tooltip: "Insert a table"
      },
      horizontalrule: {
        exec: "inserthorizontalrule",
        tooltip: "Insert a horizontal rule"
      },
      code: {
        exec: function exec() {
          this.wysiwygEditorInsertHtml("<code>", "<br /></code>");
        },
        tooltip: "Code"
      },
      image: {
        _dropDown: function _dropDown(t, e, n, o) {
          var r = Ce("div"),
            i = (Ne(r, Be("image", {
              url: t._("URL:"),
              width: t._("Width (optional):"),
              height: t._("Height (optional):"),
              insert: t._("Insert")
            }, !0)), ke(r, "#image")[0]);
          i.value = n, De(r, "click", ".button", function (e) {
            i.value && o(i.value, ke(r, "#width")[0].value, ke(r, "#height")[0].value), t.closeDropDown(!0), e.preventDefault();
          }), t.createDropDown(e, "insertimage", r);
        },
        exec: function exec(e) {
          var r = this;
          Pe.image._dropDown(r, e, "", function (e, t, n) {
            var o = "";
            t && (o += ' width="' + parseInt(t, 10) + '"'), n && (o += ' height="' + parseInt(n, 10) + '"'), o += ' src="' + ze(e) + '"', r.wysiwygEditorInsertHtml("<img" + o + " />");
          });
        },
        tooltip: "Insert an image"
      },
      email: {
        _dropDown: function _dropDown(n, e, o) {
          var r = Ce("div");
          Ne(r, Be("email", {
            label: n._("E-mail:"),
            desc: n._("Description (optional):"),
            insert: n._("Insert")
          }, !0)), De(r, "click", ".button", function (e) {
            var t = ke(r, "#email")[0].value;
            t && o(t, ke(r, "#des")[0].value), n.closeDropDown(!0), e.preventDefault();
          }), n.createDropDown(e, "insertemail", r);
        },
        exec: function exec(e) {
          var n = this;
          Pe.email._dropDown(n, e, function (e, t) {
            !n.getRangeHelper().selectedHtml() || t ? n.wysiwygEditorInsertHtml('<a href="mailto:' + ze(e) + '">' + ze(t || e) + "</a>") : n.execCommand("createlink", "mailto:" + e);
          });
        },
        tooltip: "Insert an email"
      },
      link: {
        _dropDown: function _dropDown(t, e, n) {
          var o = Ce("div"),
            r = (Ne(o, Be("link", {
              url: t._("URL:"),
              desc: t._("Description (optional):"),
              ins: t._("Insert")
            }, !0)), ke(o, "#link")[0]);
          function i(e) {
            r.value && n(r.value, ke(o, "#des")[0].value), t.closeDropDown(!0), e.preventDefault();
          }
          De(o, "click", ".button", i), De(o, "keypress", function (e) {
            13 === e.which && r.value && i(e);
          }, !0), t.createDropDown(e, "insertlink", o);
        },
        exec: function exec(e) {
          var n = this;
          Pe.link._dropDown(n, e, function (e, t) {
            t || !n.getRangeHelper().selectedHtml() ? n.wysiwygEditorInsertHtml('<a href="' + ze(e) + '">' + ze(t || e) + "</a>") : n.execCommand("createlink", e);
          });
        },
        tooltip: "Insert a link"
      },
      unlink: {
        state: function state() {
          return Ee(this.currentNode(), "a") ? 0 : -1;
        },
        exec: function exec() {
          var e = Ee(this.currentNode(), "a");
          if (e) {
            for (; e.firstChild;) Oe(e.firstChild, e);
            Se(e);
          }
        },
        tooltip: "Unlink"
      },
      quote: {
        exec: function exec(e, t, n) {
          var o = "<blockquote>",
            r = "</blockquote>";
          t ? (o = o + (n = n ? "<cite>" + ze(n) + "</cite>" : "") + t + r, r = null) : "" === this.getRangeHelper().selectedHtml() && (r = "<br />" + r), this.wysiwygEditorInsertHtml(o, r);
        },
        tooltip: "Insert a Quote"
      },
      emoticon: {
        exec: function exec(u) {
          function d(e) {
            var n,
              t = f.opts,
              o = t.emoticonsRoot || "",
              r = t.emoticonsCompat,
              i = f.getRangeHelper(),
              a = r && " " !== i.getOuterText(!0, 1) ? " " : "",
              l = r && " " !== i.getOuterText(!1, 1) ? " " : "",
              c = Ce("div"),
              s = Ce("div"),
              r = be({}, t.emoticons.dropdown, e ? t.emoticons.more : {});
            return Ne(c, s), n = Math.sqrt(Object.keys(r).length), De(c, "click", "img", function (e) {
              f.insert(a + Ae(this, "alt") + l, null, !1).closeDropDown(!0), e.preventDefault();
            }), we(r, function (e, t) {
              Ne(s, Ce("img", {
                src: o + (t.url || t),
                alt: e,
                title: t.tooltip || e
              })), s.children.length >= n && (s = Ce("div"), Ne(c, s));
            }), !e && t.emoticons.more && (Ne(i = Ce("a", {
              className: "sceditor-more"
            }), document.createTextNode(f._("More"))), De(i, "click", function (e) {
              f.createDropDown(u, "more-emoticons", d(!0)), e.preventDefault();
            }), Ne(c, i)), c;
          }
          var f = this;
          f.createDropDown(u, "emoticons", d(!1));
        },
        txtExec: function txtExec(e) {
          Pe.emoticon.exec.call(this, e);
        },
        tooltip: "Insert an emoticon"
      },
      youtube: {
        _dropDown: function _dropDown(r, e, i) {
          var a = Ce("div");
          Ne(a, Be("youtubeMenu", {
            label: r._("Video URL:"),
            insert: r._("Insert")
          }, !0)), De(a, "click", ".button", function (e) {
            var t = ke(a, "#link")[0].value,
              n = t.match(/(?:v=|v\/|embed\/|youtu.be\/)?([a-zA-Z0-9_-]{11})/),
              t = t.match(/[&|?](?:star)?t=((\d+[hms]?){1,3})/),
              o = 0;
            t && we(t[1].split(/[hms]/), function (e, t) {
              "" !== t && (o = 60 * o + Number(t));
            }), n && /^[a-zA-Z0-9_\-]{11}$/.test(n[1]) && i(n[1], o), r.closeDropDown(!0), e.preventDefault();
          }), r.createDropDown(e, "insertlink", a);
        },
        exec: function exec(e) {
          var n = this;
          Pe.youtube._dropDown(n, e, function (e, t) {
            n.wysiwygEditorInsertHtml(Be("youtube", {
              id: e,
              time: t
            }));
          });
        },
        tooltip: "Insert a YouTube video"
      },
      date: {
        _date: function _date(e) {
          var t = new Date(),
            n = t.getYear(),
            o = t.getMonth() + 1,
            t = t.getDate();
          return o < 10 && (o = "0" + o), t < 10 && (t = "0" + t), e.opts.dateFormat.replace(/year/i, n = n < 2e3 ? 1900 + n : n).replace(/month/i, o).replace(/day/i, t);
        },
        exec: function exec() {
          this.insertText(Pe.date._date(this));
        },
        txtExec: function txtExec() {
          this.insertText(Pe.date._date(this));
        },
        tooltip: "Insert current date"
      },
      time: {
        _time: function _time() {
          var e = new Date(),
            t = e.getHours(),
            n = e.getMinutes(),
            e = e.getSeconds();
          return (t = t < 10 ? "0" + t : t) + ":" + (n = n < 10 ? "0" + n : n) + ":" + (e = e < 10 ? "0" + e : e);
        },
        exec: function exec() {
          this.insertText(Pe.time._time());
        },
        txtExec: function txtExec() {
          this.insertText(Pe.time._time());
        },
        tooltip: "Insert current time"
      },
      ltr: {
        state: function state(e, t) {
          return t && "ltr" === t.style.direction;
        },
        exec: function exec() {
          var e = this.getRangeHelper(),
            t = e.getFirstBlockParent();
          this.focus(), (t && !_e(t, "body") || (this.execCommand("formatBlock", "p"), (t = e.getFirstBlockParent()) && !_e(t, "body"))) && (e = "ltr" === Re(t, "direction") ? "" : "ltr", Re(t, "direction", e));
        },
        tooltip: "Left-to-Right"
      },
      rtl: {
        state: function state(e, t) {
          return t && "rtl" === t.style.direction;
        },
        exec: function exec() {
          var e = this.getRangeHelper(),
            t = e.getFirstBlockParent();
          this.focus(), (t && !_e(t, "body") || (this.execCommand("formatBlock", "p"), (t = e.getFirstBlockParent()) && !_e(t, "body"))) && (e = "rtl" === Re(t, "direction") ? "" : "rtl", Re(t, "direction", e));
        },
        tooltip: "Right-to-Left"
      },
      print: {
        exec: "print",
        tooltip: "Print"
      },
      maximize: {
        state: function state() {
          return this.maximize();
        },
        exec: function exec() {
          this.maximize(!this.maximize()), this.focus();
        },
        txtExec: function txtExec() {
          this.maximize(!this.maximize()), this.focus();
        },
        tooltip: "Maximize",
        shortcut: "Ctrl+Shift+M"
      },
      source: {
        state: function state() {
          return this.sourceMode();
        },
        exec: function exec() {
          this.toggleSourceMode(), this.focus();
        },
        txtExec: function txtExec() {
          this.toggleSourceMode(), this.focus();
        },
        tooltip: "View source",
        shortcut: "Ctrl+Shift+S"
      },
      ignore: {}
    },
    w = {};
  function xt(i) {
    function a(e) {
      return "signal" + e.charAt(0).toUpperCase() + e.slice(1);
    }
    function e(e, t) {
      e = [].slice.call(e);
      for (var n, o = a(e.shift()), r = 0; r < l.length; r++) if (o in l[r] && (n = l[r][o].apply(i, e), t)) return n;
    }
    var r = this,
      l = [];
    r.call = function () {
      e(arguments, !1);
    }, r.callOnlyFirst = function () {
      return e(arguments, !0);
    }, r.hasHandler = function (e) {
      var t = l.length;
      for (e = a(e); t--;) if (e in l[t]) return !0;
      return !1;
    }, r.exists = function (e) {
      return e in w && "function" == typeof (e = w[e]) && "object" == typeof e.prototype;
    }, r.isRegistered = function (e) {
      if (r.exists(e)) for (var t = l.length; t--;) if (l[t] instanceof w[e]) return !0;
      return !1;
    }, r.register = function (e) {
      return !(!r.exists(e) || r.isRegistered(e)) && (e = new w[e](), l.push(e), "init" in e && e.init.call(i), !0);
    }, r.deregister = function (e) {
      var t,
        n = l.length,
        o = !1;
      if (r.isRegistered(e)) for (; n--;) l[n] instanceof w[e] && (o = !0, "destroy" in (t = l.splice(n, 1)[0]) && t.destroy.call(i));
      return o;
    }, r.destroy = function () {
      for (var e = l.length; e--;) "destroy" in l[e] && l[e].destroy.call(i);
      l = [], i = null;
    };
  }
  xt.plugins = w;
  var x = function x(e, t, n) {
    var o,
      r,
      i,
      a,
      l,
      c = "",
      s = e.startContainer,
      u = e.startOffset;
    for (s && 3 !== s.nodeType && (s = s.childNodes[u], u = 0), i = a = u; n > c.length && s && 3 === s.nodeType;) o = s.nodeValue, r = n - c.length, l && (a = o.length, i = 0), l = s, s = t ? (u = i = Math.max(a - r, 0), c = o.substr(i, a - i) + c, l.previousSibling) : (u = i + (a = Math.min(r, o.length)), c += o.substr(i, a), l.nextSibling);
    return {
      node: l || s,
      offset: u,
      text: c
    };
  };
  function Tt(r, e, i) {
    var a,
      l,
      c = e || r.contentDocument || r.document,
      s = "sceditor-start-marker",
      u = "sceditor-end-marker",
      g = this;
    g.insertHTML = function (e, t) {
      var n, o;
      if (!g.selectedRange()) return !1;
      for (t && (e += g.selectedHtml() + t), o = Ce("p", {}, c), n = c.createDocumentFragment(), o.innerHTML = i(e); o.firstChild;) Ne(n, o.firstChild);
      g.insertNode(n);
    }, l = function l(e, t, n) {
      var o,
        r = c.createDocumentFragment();
      if ("string" == typeof e ? (t && (e += g.selectedHtml() + t), r = ut(e)) : (Ne(r, e), t && (Ne(r, g.selectedRange().extractContents()), Ne(r, t))), o = r.lastChild) {
        for (; !Ie(o.lastChild, !0);) o = o.lastChild;
        return pt(o) ? o.lastChild || Ne(o, document.createTextNode("​")) : o = r, g.removeMarkers(), Ne(o, a(s)), Ne(o, a(u)), n ? (Ne(e = Ce("div"), r), e.innerHTML) : r;
      }
    }, g.insertNode = function (e, t) {
      var n,
        o,
        e = l(e, t),
        t = g.selectedRange(),
        r = t.commonAncestorContainer,
        i = [];
      if (!e) return !1;
      function a(e) {
        e && p(e) && i.indexOf(e) < 0 && Se(e);
      }
      t.startContainer !== t.endContainer && (we(r.childNodes, function (e, t) {
        p(t) && i.push(t);
      }), n = e.firstChild, o = e.lastChild), t.deleteContents(), r && 3 !== r.nodeType && !pt(r) ? Oe(e, r) : (t.insertNode(e), a(n && n.previousSibling), a(o && o.nextSibling)), g.restoreRange();
    }, g.cloneSelected = function () {
      var e = g.selectedRange();
      if (e) return e.cloneRange();
    }, g.selectedRange = function () {
      var e,
        t,
        n = r.getSelection();
      if (n) {
        if (n.rangeCount <= 0) {
          for (t = c.body; t.firstChild;) t = t.firstChild;
          (e = c.createRange()).setStartBefore(t), n.addRange(e);
        }
        return e = 0 < n.rangeCount ? n.getRangeAt(0) : e;
      }
    }, g.hasSelection = function () {
      var e = r.getSelection();
      return e && 0 < e.rangeCount;
    }, g.selectedHtml = function () {
      var e,
        t = g.selectedRange();
      return t ? (Ne(e = Ce("p", {}, c), t.cloneContents()), e.innerHTML) : "";
    }, g.parentNode = function () {
      var e = g.selectedRange();
      if (e) return e.commonAncestorContainer;
    }, g.getFirstBlockParent = function (e) {
      var _t2 = function t(e) {
        return Ie(e, !0) ? (e = e ? e.parentNode : null) && _t2(e) : e;
      };
      return _t2(e || g.parentNode());
    }, g.insertNodeAt = function (e, t) {
      var n = g.selectedRange(),
        o = g.cloneSelected();
      if (!o) return !1;
      o.collapse(e), o.insertNode(t), g.selectRange(n);
    }, a = function a(e) {
      g.removeMarker(e);
      e = Ce("span", {
        id: e,
        className: "sceditor-selection sceditor-ignore",
        style: "display:none;line-height:0"
      }, c);
      return e.innerHTML = " ", e;
    }, g.insertMarkers = function () {
      var e = g.selectedRange(),
        t = a(s);
      g.removeMarkers(), g.insertNodeAt(!0, t), e && e.collapsed ? t.parentNode.insertBefore(a(u), t.nextSibling) : g.insertNodeAt(!1, a(u));
    }, g.getMarker = function (e) {
      return c.getElementById(e);
    }, g.removeMarker = function (e) {
      e = g.getMarker(e);
      e && Se(e);
    }, g.removeMarkers = function () {
      g.removeMarker(s), g.removeMarker(u);
    }, g.saveRange = function () {
      g.insertMarkers();
    }, g.selectRange = function (e) {
      var t,
        n = r.getSelection(),
        o = e.endContainer;
      if (e.collapsed && o && !Ie(o, !0)) {
        for (t = o.lastChild; t && _e(t, ".sceditor-ignore");) t = t.previousSibling;
        _e(t, "br") && ((o = c.createRange()).setEndAfter(t), o.collapse(!1), g.compare(e, o) && (e.setStartBefore(t), e.collapse(!0)));
      }
      n && (g.clear(), n.addRange(e));
    }, g.restoreRange = function () {
      var e,
        t = g.selectedRange(),
        n = g.getMarker(s),
        o = g.getMarker(u);
      if (!n || !o || !t) return !1;
      e = n.nextSibling === o, (t = c.createRange()).setStartBefore(n), t.setEndAfter(o), e && t.collapse(!0), g.selectRange(t), g.removeMarkers();
    }, g.selectOuterText = function (e, t) {
      var n = g.cloneSelected();
      if (!n) return !1;
      n.collapse(!1), e = x(n, !0, e), t = x(n, !1, t), n.setStart(e.node, e.offset), n.setEnd(t.node, t.offset), g.selectRange(n);
    }, g.getOuterText = function (e, t) {
      var n = g.cloneSelected();
      return n ? (n.collapse(!e), x(n, e, t).text) : "";
    }, g.replaceKeyword = function (e, t, n, o, r, i) {
      n || e.sort(function (e, t) {
        return e[0].length - t[0].length;
      });
      var a,
        l,
        c,
        s,
        u,
        d,
        f,
        p = "(^|[\\s    ])",
        m = e.length,
        h = r ? 1 : 0,
        n = o || e[m - 1][0].length;
      for (r && n++, i = i || "", s = (a = g.getOuterText(!0, n)).length, a += i, t && (a += g.getOuterText(!1, n)); m--;) if (f = (d = e[m][0]).length, c = Math.max(0, s - f - h), l = -1, r ? (u = a.substr(c).match(new RegExp(p + wt(d) + p))) && (l = u.index + c + u[1].length) : l = a.indexOf(d, c), -1 < l && l <= s && s <= l + f + h) return g.selectOuterText(u = s - l, f - u - (/^\S/.test(i) ? 1 : 0)), g.insertHTML(e[m][1]), !0;
      return !1;
    }, g.compare = function (e, t) {
      return t = t || g.selectedRange(), e && t ? 0 === e.compareBoundaryPoints(Range.END_TO_END, t) && 0 === e.compareBoundaryPoints(Range.START_TO_START, t) : !e && !t;
    }, g.clear = function () {
      var e = r.getSelection();
      e && (e.removeAllRanges ? e.removeAllRanges() : e.empty && e.empty());
    };
  }
  var T,
    C,
    e,
    t = navigator.userAgent,
    Ct = /iPhone|iPod|iPad| wosbrowser\//i.test(t),
    Et = (T = !!window.document.documentMode, C = "-ms-ime-align" in document.documentElement.style, (e = document.createElement("div")).contentEditable = !0, "contentEditable" in document.documentElement && "true" === e.contentEditable && (e = /Opera Mobi|Opera Mini/i.test(t), /Android/i.test(t) && (e = !0, /Safari/.test(t) && (e = !(n = /Safari\/(\d+)/.exec(t)) || !n[1] || n[1] < 534)), / Silk\//i.test(t) && (e = !(n = /AppleWebKit\/(\d+)/.exec(t)) || !n[1] || n[1] < 534), Ct && (e = /OS [0-4](_\d)+ like Mac/i.test(t)), /Firefox/i.test(t) && (e = !1), /OneBrowser/i.test(t) && (e = !1), "UCWEB" === navigator.vendor && (e = !1), !(e = T || C ? !0 : e)));
  function St(e) {
    return (St = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }
  function E(e, t) {
    return (E = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }
  function S(e, t, n) {
    return (S = function () {
      if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
        if ("function" == typeof Proxy) return 1;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), 1;
        } catch (e) {}
      }
    }() ? Reflect.construct : function (e, t, n) {
      var o = [null];
      o.push.apply(o, t);
      t = new (Function.bind.apply(e, o))();
      return n && E(t, n.prototype), t;
    }).apply(null, arguments);
  }
  function Ue(e) {
    return function (e) {
      if (Array.isArray(e)) return N(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || function (e, t) {
      var n;
      if (e) return "string" == typeof e ? N(e, t) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? N(e, t) : void 0;
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function N(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
    return o;
  }
  var k,
    D = Object.hasOwnProperty,
    M = Object.setPrototypeOf,
    A = Object.isFrozen,
    R = Object.getPrototypeOf,
    _ = Object.getOwnPropertyDescriptor,
    je = Object.freeze,
    n = Object.seal,
    O = Object.create,
    t = "undefined" != typeof Reflect && Reflect,
    F = (F = t.apply) || function (e, t, n) {
      return e.apply(t, n);
    },
    je = je || function (e) {
      return e;
    },
    n = n || function (e) {
      return e;
    },
    H = (H = t.construct) || function (e, t) {
      return S(e, Ue(t));
    },
    Nt = o(Array.prototype.forEach),
    kt = o(Array.prototype.pop),
    Dt = o(Array.prototype.push),
    Mt = o(String.prototype.toLowerCase),
    At = o(String.prototype.toString),
    Rt = o(String.prototype.match),
    We = o(String.prototype.replace),
    _t = o(String.prototype.indexOf),
    Ot = o(String.prototype.trim),
    Ve = o(RegExp.prototype.test),
    Ft = (k = TypeError, function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return H(k, t);
    });
  function o(r) {
    return function (e) {
      for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
      return F(r, e, n);
    };
  }
  function Ge(e, t, n) {
    n = n || Mt, M && M(e, null);
    for (var o = t.length; o--;) {
      var r,
        i = t[o];
      "string" != typeof i || (r = n(i)) !== i && (A(t) || (t[o] = r), i = r), e[i] = !0;
    }
    return e;
  }
  function Ht(e) {
    var t,
      n = O(null);
    for (t in e) !0 === F(D, e, [t]) && (n[t] = e[t]);
    return n;
  }
  function Lt(e, t) {
    for (; null !== e;) {
      var n = _(e, t);
      if (n) {
        if (n.get) return o(n.get);
        if ("function" == typeof n.value) return o(n.value);
      }
      e = R(e);
    }
    return function (e) {
      return console.warn("fallback value for", e), null;
    };
  }
  var It = je(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
    zt = je(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
    Bt = je(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
    Pt = je(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
    Ut = je(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]),
    jt = je(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
    Wt = je(["#text"]),
    Vt = je(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
    Gt = je(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
    qt = je(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
    $t = je(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    Yt = n(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Kt = n(/<%[\w\W]*|[\w\W]*%>/gm),
    Xt = n(/\${[\w\W]*}/gm),
    Zt = n(/^data-[\-\w.\u00B7-\uFFFF]/),
    Jt = n(/^aria-[\-\w]+$/),
    Qt = n(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    en = n(/^(?:\w+script|data):/i),
    tn = n(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    nn = n(/^html$/i);
  var on = function L(e) {
      var l = 0 < arguments.length && void 0 !== e ? e : "undefined" == typeof window ? null : window,
        s = function s(e) {
          return L(e);
        };
      if (s.version = "2.4.3", s.removed = [], l && l.document && 9 === l.document.nodeType) {
        var c = l.document,
          r = l.document,
          I = l.DocumentFragment,
          e = l.HTMLTemplateElement,
          u = l.Node,
          z = l.Element,
          t = l.NodeFilter,
          B = void 0 === (n = l.NamedNodeMap) ? l.NamedNodeMap || l.MozNamedAttrMap : n,
          P = l.HTMLFormElement,
          U = l.DOMParser,
          d = l.trustedTypes,
          j = Lt(n = z.prototype, "cloneNode"),
          W = Lt(n, "nextSibling"),
          V = Lt(n, "childNodes"),
          f = Lt(n, "parentNode"),
          p = ("function" == typeof e && (n = r.createElement("template")).content && n.content.ownerDocument && (r = n.content.ownerDocument), function (e, t) {
            if ("object" !== St(e) || "function" != typeof e.createPolicy) return null;
            var n = null,
              o = "data-tt-policy-suffix",
              t = "dompurify" + ((n = t.currentScript && t.currentScript.hasAttribute(o) ? t.currentScript.getAttribute(o) : n) ? "#" + n : "");
            try {
              return e.createPolicy(t, {
                createHTML: function createHTML(e) {
                  return e;
                },
                createScriptURL: function createScriptURL(e) {
                  return e;
                }
              });
            } catch (e) {
              return console.warn("TrustedTypes policy " + t + " could not be created."), null;
            }
          }(d, c)),
          m = p ? p.createHTML("") : "",
          e = r,
          G = e.implementation,
          q = e.createNodeIterator,
          $ = e.createDocumentFragment,
          Y = e.getElementsByTagName,
          K = c.importNode,
          n = {};
        try {
          n = Ht(r).documentMode ? r.documentMode : {};
        } catch (e) {}
        var X,
          h,
          g,
          o = {},
          Z = (s.isSupported = "function" == typeof f && G && void 0 !== G.createHTMLDocument && 9 !== n, Yt),
          J = Kt,
          Q = Xt,
          ee = Zt,
          te = Jt,
          ne = en,
          oe = tn,
          re = Qt,
          y = null,
          ie = Ge({}, [].concat(Ue(It), Ue(zt), Ue(Bt), Ue(Ut), Ue(Wt))),
          v = null,
          ae = Ge({}, [].concat(Ue(Vt), Ue(Gt), Ue(qt), Ue($t))),
          b = Object.seal(Object.create(null, {
            tagNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            },
            attributeNameCheck: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: null
            },
            allowCustomizedBuiltInElements: {
              writable: !0,
              configurable: !1,
              enumerable: !0,
              value: !1
            }
          })),
          w = null,
          le = null,
          ce = !0,
          se = !0,
          ue = !1,
          x = !1,
          T = !1,
          de = !1,
          fe = !1,
          C = !1,
          E = !1,
          S = !1,
          pe = !0,
          me = !1,
          he = "user-content-",
          ge = !0,
          N = !1,
          i = {},
          k = null,
          ye = Ge({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]),
          ve = null,
          be = Ge({}, ["audio", "video", "img", "source", "image", "track"]),
          we = null,
          xe = Ge({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
          D = "http://www.w3.org/1998/Math/MathML",
          M = "http://www.w3.org/2000/svg",
          A = "http://www.w3.org/1999/xhtml",
          R = A,
          Te = null,
          Ce = Ge({}, [D, M, A], At),
          Ee = ["application/xhtml+xml", "text/html"],
          a = null,
          Se = r.createElement("form"),
          Ne = function Ne(e) {
            return e instanceof RegExp || e instanceof Function;
          },
          ke = function ke(e) {
            a && a === e || (e = Ht(e = e && "object" === St(e) ? e : {}), h = h = -1 === Ee.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, g = "application/xhtml+xml" === h ? At : Mt, y = "ALLOWED_TAGS" in e ? Ge({}, e.ALLOWED_TAGS, g) : ie, v = "ALLOWED_ATTR" in e ? Ge({}, e.ALLOWED_ATTR, g) : ae, Te = "ALLOWED_NAMESPACES" in e ? Ge({}, e.ALLOWED_NAMESPACES, At) : Ce, we = "ADD_URI_SAFE_ATTR" in e ? Ge(Ht(xe), e.ADD_URI_SAFE_ATTR, g) : xe, ve = "ADD_DATA_URI_TAGS" in e ? Ge(Ht(be), e.ADD_DATA_URI_TAGS, g) : be, k = "FORBID_CONTENTS" in e ? Ge({}, e.FORBID_CONTENTS, g) : ye, w = "FORBID_TAGS" in e ? Ge({}, e.FORBID_TAGS, g) : {}, le = "FORBID_ATTR" in e ? Ge({}, e.FORBID_ATTR, g) : {}, i = "USE_PROFILES" in e && e.USE_PROFILES, ce = !1 !== e.ALLOW_ARIA_ATTR, se = !1 !== e.ALLOW_DATA_ATTR, ue = e.ALLOW_UNKNOWN_PROTOCOLS || !1, x = e.SAFE_FOR_TEMPLATES || !1, T = e.WHOLE_DOCUMENT || !1, C = e.RETURN_DOM || !1, E = e.RETURN_DOM_FRAGMENT || !1, S = e.RETURN_TRUSTED_TYPE || !1, fe = e.FORCE_BODY || !1, pe = !1 !== e.SANITIZE_DOM, me = e.SANITIZE_NAMED_PROPS || !1, ge = !1 !== e.KEEP_CONTENT, N = e.IN_PLACE || !1, re = e.ALLOWED_URI_REGEXP || re, R = e.NAMESPACE || A, e.CUSTOM_ELEMENT_HANDLING && Ne(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (b.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Ne(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (b.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (b.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), x && (se = !1), E && (C = !0), i && (y = Ge({}, Ue(Wt)), v = [], !0 === i.html && (Ge(y, It), Ge(v, Vt)), !0 === i.svg && (Ge(y, zt), Ge(v, Gt), Ge(v, $t)), !0 === i.svgFilters && (Ge(y, Bt), Ge(v, Gt), Ge(v, $t)), !0 === i.mathMl && (Ge(y, Ut), Ge(v, qt), Ge(v, $t))), e.ADD_TAGS && Ge(y = y === ie ? Ht(y) : y, e.ADD_TAGS, g), e.ADD_ATTR && Ge(v = v === ae ? Ht(v) : v, e.ADD_ATTR, g), e.ADD_URI_SAFE_ATTR && Ge(we, e.ADD_URI_SAFE_ATTR, g), e.FORBID_CONTENTS && Ge(k = k === ye ? Ht(k) : k, e.FORBID_CONTENTS, g), ge && (y["#text"] = !0), T && Ge(y, ["html", "head", "body"]), y.table && (Ge(y, ["tbody"]), delete w.tbody), je && je(e), a = e);
          },
          De = Ge({}, ["mi", "mo", "mn", "ms", "mtext"]),
          Me = Ge({}, ["foreignobject", "desc", "title", "annotation-xml"]),
          Ae = Ge({}, ["title", "style", "font", "a", "script"]),
          _ = Ge({}, zt),
          Re = (Ge(_, Bt), Ge(_, Pt), Ge({}, Ut)),
          O = (Ge(Re, jt), function (t) {
            Dt(s.removed, {
              element: t
            });
            try {
              t.parentNode.removeChild(t);
            } catch (e) {
              try {
                t.outerHTML = m;
              } catch (e) {
                t.remove();
              }
            }
          }),
          _e = function _e(e, t) {
            try {
              Dt(s.removed, {
                attribute: t.getAttributeNode(e),
                from: t
              });
            } catch (e) {
              Dt(s.removed, {
                attribute: null,
                from: t
              });
            }
            if (t.removeAttribute(e), "is" === e && !v[e]) if (C || E) try {
              O(t);
            } catch (e) {} else try {
              t.setAttribute(e, "");
            } catch (e) {}
          },
          Oe = function Oe(e) {
            fe ? e = "<remove></remove>" + e : n = (n = Rt(e, /^[\r\n\t ]+/)) && n[0], "application/xhtml+xml" === h && R === A && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            var t,
              n,
              o = p ? p.createHTML(e) : e;
            if (R === A) try {
              t = new U().parseFromString(o, h);
            } catch (e) {}
            if (!t || !t.documentElement) {
              t = G.createDocument(R, "template", null);
              try {
                t.documentElement.innerHTML = X ? m : o;
              } catch (e) {}
            }
            return o = t.body || t.documentElement, e && n && o.insertBefore(r.createTextNode(n), o.childNodes[0] || null), R === A ? Y.call(t, T ? "html" : "body")[0] : T ? t.documentElement : o;
          },
          Fe = function Fe(e) {
            return q.call(e.ownerDocument || e, e, t.SHOW_ELEMENT | t.SHOW_COMMENT | t.SHOW_TEXT, null, !1);
          },
          F = function F(e) {
            return "object" === St(u) ? e instanceof u : e && "object" === St(e) && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
          },
          H = function H(e, t, n) {
            o[e] && Nt(o[e], function (e) {
              e.call(s, t, n, a);
            });
          },
          He = function He(e) {
            if (H("beforeSanitizeElements", e, null), (!((i = e) instanceof P) || "string" == typeof i.nodeName && "string" == typeof i.textContent && "function" == typeof i.removeChild && i.attributes instanceof B && "function" == typeof i.removeAttribute && "function" == typeof i.setAttribute && "string" == typeof i.namespaceURI && "function" == typeof i.insertBefore && "function" == typeof i.hasChildNodes) && !Ve(/[\u0080-\uFFFF]/, e.nodeName)) {
              var t,
                n,
                o,
                r,
                i = g(e.nodeName);
              if (H("uponSanitizeElement", e, {
                tagName: i,
                allowedTags: y
              }), (!e.hasChildNodes() || F(e.firstElementChild) || F(e.content) && F(e.content.firstElementChild) || !Ve(/<[/\w]/g, e.innerHTML) || !Ve(/<[/\w]/g, e.textContent)) && ("select" !== i || !Ve(/<template/i, e.innerHTML))) {
                if (y[i] && !w[i]) return e instanceof z && ((n = f(t = e)) && n.tagName || (n = {
                  namespaceURI: R,
                  tagName: "template"
                }), o = Mt(t.tagName), r = Mt(n.tagName), !Te[t.namespaceURI] || (t.namespaceURI === M ? n.namespaceURI === A ? "svg" !== o : n.namespaceURI === D ? "svg" !== o || "annotation-xml" !== r && !De[r] : !Boolean(_[o]) : t.namespaceURI === D ? n.namespaceURI === A ? "math" !== o : n.namespaceURI === M ? "math" !== o || !Me[r] : !Boolean(Re[o]) : t.namespaceURI === A ? n.namespaceURI === M && !Me[r] || n.namespaceURI === D && !De[r] || Re[o] || !Ae[o] && _[o] : "application/xhtml+xml" !== h || !Te[t.namespaceURI])) || ("noscript" === i || "noembed" === i) && Ve(/<\/no(script|embed)/i, e.innerHTML) ? (O(e), !0) : (x && 3 === e.nodeType && (n = e.textContent, n = We(n, Z, " "), n = We(n, J, " "), n = We(n, Q, " "), e.textContent !== n && (Dt(s.removed, {
                  element: e.cloneNode()
                }), e.textContent = n)), H("afterSanitizeElements", e, null), !1);
                if (!w[i] && Ie(i)) {
                  if (b.tagNameCheck instanceof RegExp && Ve(b.tagNameCheck, i)) return !1;
                  if (b.tagNameCheck instanceof Function && b.tagNameCheck(i)) return !1;
                }
                if (ge && !k[i]) {
                  var a = f(e) || e.parentNode,
                    l = V(e) || e.childNodes;
                  if (l && a) for (var c = l.length - 1; 0 <= c; --c) a.insertBefore(j(l[c], !0), W(e));
                }
              }
            }
            return O(e), !0;
          },
          Le = function Le(e, t, n) {
            if (pe && ("id" === t || "name" === t) && (n in r || n in Se)) return !1;
            if ((!se || le[t] || !Ve(ee, t)) && (!ce || !Ve(te, t))) if (!v[t] || le[t]) {
              if (!(Ie(e) && (b.tagNameCheck instanceof RegExp && Ve(b.tagNameCheck, e) || b.tagNameCheck instanceof Function && b.tagNameCheck(e)) && (b.attributeNameCheck instanceof RegExp && Ve(b.attributeNameCheck, t) || b.attributeNameCheck instanceof Function && b.attributeNameCheck(t)) || "is" === t && b.allowCustomizedBuiltInElements && (b.tagNameCheck instanceof RegExp && Ve(b.tagNameCheck, n) || b.tagNameCheck instanceof Function && b.tagNameCheck(n)))) return !1;
            } else if (!we[t] && !Ve(re, We(n, oe, "")) && ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== _t(n, "data:") || !ve[e]) && (!ue || Ve(ne, We(n, oe, ""))) && n) return !1;
            return !0;
          },
          Ie = function Ie(e) {
            return 0 < e.indexOf("-");
          },
          ze = function ze(e) {
            H("beforeSanitizeAttributes", e, null);
            var t = e.attributes;
            if (t) {
              for (var n = {
                  attrName: "",
                  attrValue: "",
                  keepAttr: !0,
                  allowedAttributes: v
                }, o = t.length; o--;) {
                var r = (l = t[o]).name,
                  i = l.namespaceURI,
                  a = "value" === r ? l.value : Ot(l.value),
                  l = g(r);
                if (n.attrName = l, n.attrValue = a, n.keepAttr = !0, n.forceKeepAttr = void 0, H("uponSanitizeAttribute", e, n), a = n.attrValue, !n.forceKeepAttr && (_e(r, e), n.keepAttr)) if (Ve(/\/>/i, a)) _e(r, e);else {
                  x && (a = We(a, Z, " "), a = We(a, J, " "), a = We(a, Q, " "));
                  var c = g(e.nodeName);
                  if (Le(c, l, a)) {
                    if (!me || "id" !== l && "name" !== l || (_e(r, e), a = he + a), p && "object" === St(d) && "function" == typeof d.getAttributeType && !i) switch (d.getAttributeType(c, l)) {
                      case "TrustedHTML":
                        a = p.createHTML(a);
                        break;
                      case "TrustedScriptURL":
                        a = p.createScriptURL(a);
                    }
                    try {
                      i ? e.setAttributeNS(i, r, a) : e.setAttribute(r, a), kt(s.removed);
                    } catch (e) {}
                  }
                }
              }
              H("afterSanitizeAttributes", e, null);
            }
          },
          Be = function e(t) {
            var n,
              o = Fe(t);
            for (H("beforeSanitizeShadowDOM", t, null); n = o.nextNode();) H("uponSanitizeShadowNode", n, null), He(n) || (n.content instanceof I && e(n.content), ze(n));
            H("afterSanitizeShadowDOM", t, null);
          };
        s.sanitize = function (e) {
          var t,
            n,
            o,
            r,
            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
          if ("string" != typeof (e = (X = !e) ? "\x3c!--\x3e" : e) && !F(e)) {
            if ("function" != typeof e.toString) throw Ft("toString is not a function");
            if ("string" != typeof (e = e.toString())) throw Ft("dirty is not a string, aborting");
          }
          if (!s.isSupported) {
            if ("object" === St(l.toStaticHTML) || "function" == typeof l.toStaticHTML) {
              if ("string" == typeof e) return l.toStaticHTML(e);
              if (F(e)) return l.toStaticHTML(e.outerHTML);
            }
            return e;
          }
          if (de || ke(i), s.removed = [], N = "string" != typeof e && N) {
            if (e.nodeName) {
              i = g(e.nodeName);
              if (!y[i] || w[i]) throw Ft("root node is forbidden and cannot be sanitized in-place");
            }
          } else if (e instanceof u) 1 === (i = (t = Oe("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === i.nodeName || "HTML" === i.nodeName ? t = i : t.appendChild(i);else {
            if (!C && !x && !T && -1 === e.indexOf("<")) return p && S ? p.createHTML(e) : e;
            if (!(t = Oe(e))) return C ? null : S ? m : "";
          }
          t && fe && O(t.firstChild);
          for (var a = Fe(N ? e : t); n = a.nextNode();) 3 === n.nodeType && n === o || He(n) || (n.content instanceof I && Be(n.content), ze(n), o = n);
          if (o = null, N) return e;
          if (C) {
            if (E) for (r = $.call(t.ownerDocument); t.firstChild;) r.appendChild(t.firstChild);else r = t;
            return r = v.shadowroot ? K.call(c, r, !0) : r;
          }
          return i = T ? t.outerHTML : t.innerHTML, T && y["!doctype"] && t.ownerDocument && t.ownerDocument.doctype && t.ownerDocument.doctype.name && Ve(nn, t.ownerDocument.doctype.name) && (i = "<!DOCTYPE " + t.ownerDocument.doctype.name + ">\n" + i), x && (i = We(i, Z, " "), i = We(i, J, " "), i = We(i, Q, " ")), p && S ? p.createHTML(i) : i;
        }, s.setConfig = function (e) {
          ke(e), de = !0;
        }, s.clearConfig = function () {
          a = null, de = !1;
        }, s.isValidAttribute = function (e, t, n) {
          return a || ke({}), e = g(e), t = g(t), Le(e, t, n);
        }, s.addHook = function (e, t) {
          "function" == typeof t && (o[e] = o[e] || [], Dt(o[e], t));
        }, s.removeHook = function (e) {
          if (o[e]) return kt(o[e]);
        }, s.removeHooks = function (e) {
          o[e] && (o[e] = []);
        }, s.removeAllHooks = function () {
          o = {};
        };
      } else s.isSupported = !1;
      return s;
    }(),
    qe = window,
    $e = document,
    rn = /^image\/(p?jpe?g|gif|png|bmp)$/i;
  function an(e, t) {
    var n;
    d(e, function (e) {
      Ie(e, !0) ? (n || e.nodeType === Te ? /\S/.test(e.nodeValue) : !_e(e, ".sceditor-ignore")) && (n || Oe(n = Ce("p", {}, t), e), Ne(n, e)) : n = null;
    }, !1, !0);
  }
  function Ye(r, e) {
    var a,
      w,
      u,
      i,
      o,
      f,
      d,
      l,
      c,
      s,
      p,
      t,
      m,
      h,
      g,
      y,
      v,
      L,
      I,
      n,
      b,
      z,
      B,
      x,
      T,
      P,
      U,
      j,
      W,
      V,
      G,
      q,
      $,
      Y,
      K,
      X,
      Z,
      J,
      Q,
      ee,
      C,
      te,
      ne,
      oe,
      re,
      ie,
      E,
      ae,
      S,
      le,
      ce,
      se,
      ue,
      de,
      fe,
      _N,
      pe,
      _k,
      me,
      D,
      M = this,
      A = {},
      he = [],
      R = [],
      _ = {},
      ge = {},
      O = {},
      F = (M.commands = be(!0, {}, e.commands || Pe), M.opts = be(!0, {}, bt, e)),
      ye = (M.opts.emoticons = e.emoticons || bt.emoticons, Array.isArray(F.allowedIframeUrls) || (F.allowedIframeUrls = []), F.allowedIframeUrls.push("https://www.youtube-nocookie.com/embed/"), on());
    function H(e) {
      var t = ["iframe"].concat(F.allowedTags),
        n = ["allowfullscreen", "frameborder", "target"].concat(F.allowedAttributes);
      return ye.sanitize(e, {
        ADD_TAGS: t,
        ADD_ATTR: n
      });
    }
    ye.addHook("uponSanitizeElement", function (e, t) {
      var n = F.allowedIframeUrls;
      if ("iframe" === t.tagName) {
        for (var o = Ae(e, "src") || "", r = 0; r < n.length; r++) {
          var i = n[r];
          if (ve(i) && o.substr(0, i.length) === i) return;
          if (i.test && i.test(o)) return;
        }
        Se(e);
      }
    }), ye.addHook("afterSanitizeAttributes", function (e) {
      "target" in e && Ae(e, "data-sce-target", Ae(e, "target")), Qe(e, "target");
    }), e = function e() {
      r._sceditor = M, F.locale && "en" !== F.locale && W(), Oe(w = Ce("div", {
        className: "sceditor-container"
      }), r), Re(w, "z-index", F.zIndex), I = r.required, r.required = !1;
      function e() {
        Me(qe, "load", e), F.autofocus && se(!!F.autofocusEnd), D(), S(), h.call("ready"), "onReady" in a && a.onReady.call(M);
      }
      var t = Ye.formats[F.format];
      a = t ? new t() : {}, h = new xt(M), (F.plugins || "").split(",").forEach(function (e) {
        h.register(e.trim());
      }), "init" in a && a.init.call(M), Y(), V(), j(), G(), q(), Et || M.toggleSourceMode(), E();
      De(qe, "load", e), "complete" === $e.readyState && e();
    }, W = function W() {
      var e;
      (t = Ye.locale[F.locale]) || (e = F.locale.split("-"), t = Ye.locale[e[0]]), t && t.dateFormat && (F.dateFormat = t.dateFormat);
    }, j = function j() {
      l = Ce("textarea"), i = Ce("iframe", {
        frameborder: 0,
        allowfullscreen: !0
      }), F.startInSourceMode ? (Fe(w, "sourceMode"), et(i)) : (Fe(w, "wysiwygMode"), et(l)), F.spellcheck || Ae(w, "spellcheck", "false"), "https:" === qe.location.protocol && Ae(i, "src", "about:blank"), Ne(w, i), Ne(w, l), M.dimensions(F.width || at(r), F.height || Le(r));
      var e = Ct ? " ios" : "",
        e = ((d = i.contentDocument).open(), d.write(Be("html", {
          attrs: ' class="' + e + '"',
          spellcheck: F.spellcheck ? "" : 'spellcheck="false"',
          charset: F.charset,
          style: F.style
        })), d.close(), f = d.body, o = i.contentWindow, M.readOnly(!!F.readOnly), Ct && (Le(f, "100%"), De(f, "touchend", M.focus)), Ae(r, "tabindex")),
        e = (Ae(l, "tabindex", e), Ae(i, "tabindex", e), m = new Tt(o, null, H), et(r), M.val(r.value), F.placeholder || Ae(r, "placeholder"));
      e && (l.placeholder = e, Ae(f, "placeholder", e));
    }, G = function G() {
      F.autoUpdate && (De(f, "blur", me), De(l, "blur", me)), null === F.rtl && (F.rtl = "rtl" === Re(l, "direction")), M.rtl(!!F.rtl), F.autoExpand && (De(f, "load", D, !0), De(f, "input keyup", D)), F.resizeEnabled && $(), Ae(w, "id", F.id), M.emoticons(F.emoticonsEnabled);
    }, q = function q() {
      var e = r.form,
        t = "compositionstart compositionend",
        n = "keydown keyup keypress focus blur contextmenu input",
        o = "onselectionchange" in d ? "selectionchange" : "keyup focus blur contextmenu mouseup touchend click";
      De($e, "click", re), e && (De(e, "reset", C), De(e, "submit", M.updateOriginal, !0)), De(window, "pagehide", M.updateOriginal), De(window, "pageshow", C), De(f, "keypress", ee), De(f, "keydown", J), De(f, "keydown", Q), De(f, "keyup", S), De(f, "blur", pe), De(f, "keyup", _k), De(f, "paste", K), De(f, "cut copy", X), De(f, t, ne), De(f, o, le), De(f, n, oe), F.emoticonsCompat && qe.getSelection && De(f, "keyup", de), De(f, "blur", function () {
        M.val() || Fe(f, "placeholder");
      }), De(f, "focus", function () {
        it(f, "placeholder");
      }), De(l, "blur", pe), De(l, "keyup", _k), De(l, "keydown", J), De(l, t, ne), De(l, n, oe), De(d, "mousedown", te), De(d, o, le), De(d, "keyup", S), De(w, "selectionchanged", ce), De(w, "selectionchanged", E), De(w, "selectionchanged valuechanged nodechanged pasteraw paste", oe);
    }, V = function V() {
      var i,
        a = M.commands,
        l = (F.toolbarExclude || "").split(","),
        e = F.toolbar.split("|");
      u = Ce("div", {
        className: "sceditor-toolbar",
        unselectable: "on"
      }), F.icons in Ye.icons && (T = new Ye.icons[F.icons]()), we(e, function (e, t) {
        i = Ce("div", {
          className: "sceditor-group"
        }), we(t.split(","), function (e, t) {
          var n,
            o,
            r = a[t];
          !r || -1 < l.indexOf(t) || (n = r.shortcut, o = Be("toolbarButton", {
            name: t,
            dispName: M._(r.name || r.tooltip || t)
          }, !0).firstChild, T && T.create && T.create(t) && (Oe(T.create(t), o.firstChild), Fe(o, "has-icon")), o._sceTxtMode = !!r.txtExec, o._sceWysiwygMode = !!r.exec, He(o, "disabled", !r.exec), De(o, "click", function (e) {
            rt(o, "disabled") || U(o, r), E(), e.preventDefault();
          }), De(o, "mousedown", function (e) {
            M.closeDropDown(), e.preventDefault();
          }), r.tooltip && Ae(o, "title", M._(r.tooltip) + (n ? " (" + n + ")" : "")), n && M.addShortcut(n, t), r.state ? R.push({
            name: t,
            state: r.state
          }) : ve(r.exec) && R.push({
            name: t,
            state: r.exec
          }), Ne(i, o), ge[t] = o);
        }), i.firstChild && Ne(u, i);
      }), Ne(F.toolbarContainer || w, u);
    }, $ = function $() {
      var e = Ce("div", {
          className: "sceditor-grip"
        }),
        t = Ce("div", {
          className: "sceditor-resize-cover"
        }),
        n = "touchmove mousemove",
        o = "touchcancel touchend mouseup",
        r = 0,
        i = 0,
        a = 0,
        l = 0,
        c = 0,
        s = 0,
        u = at(w),
        d = Le(w),
        f = !1,
        p = M.rtl(),
        m = F.resizeMinHeight || d / 1.5,
        h = F.resizeMaxHeight || 2.5 * d,
        g = F.resizeMinWidth || u / 1.25,
        y = F.resizeMaxWidth || 1.25 * u,
        v = function v(e) {
          l = ("touchmove" === e.type ? (e = qe.event, a = e.changedTouches[0].pageX, e.changedTouches[0]) : (a = e.pageX, e)).pageY;
          var t = s + (l - i),
            n = p ? c - (a - r) : c + (a - r);
          0 < y && y < n && (n = y), 0 < g && n < g && (n = g), F.resizeWidth || (n = !1), 0 < h && h < t && (t = h), 0 < m && t < m && (t = m), F.resizeHeight || (t = !1), (n || t) && M.dimensions(n, t), e.preventDefault();
        },
        _b = function b(e) {
          f && (f = !1, et(t), it(w, "resizing"), Me($e, n, v), Me($e, o, _b), e.preventDefault());
        };
      T && T.create && (d = T.create("grip")) && (Ne(e, d), Fe(e, "has-icon")), Ne(w, e), Ne(w, t), et(t), De(e, "touchstart mousedown", function (e) {
        i = ("touchstart" === e.type ? (e = qe.event, r = e.touches[0].pageX, e.touches[0]) : (r = e.pageX, e)).pageY, c = at(w), s = Le(w), f = !0, Fe(w, "resizing"), tt(t), De($e, n, v), De($e, o, _b), e.preventDefault();
      });
    }, Y = function Y() {
      var e = F.emoticons,
        n = F.emoticonsRoot || "";
      we(O = e ? be({}, e.more, e.dropdown, e.hidden) : O, function (e, t) {
        O[e] = Be("emoticon", {
          key: e,
          url: n + (t.url || t),
          tooltip: t.tooltip || e
        }), F.emoticonsEnabled && he.push(Ce("img", {
          src: n + (t.url || t)
        }));
      });
    }, se = function se(e) {
      var t,
        n = f.firstChild;
      if (ct(w)) if (M.sourceMode()) t = e ? l.value.length : 0, l.setSelectionRange(t, t);else {
        if (ht(f), e) for ((n = f.lastChild) || (n = Ce("p", {}, d), Ne(f, n)); n.lastChild;) _e(n = n.lastChild, "br") && n.previousSibling && (n = n.previousSibling);
        t = d.createRange(), pt(n) ? t.selectNodeContents(n) : (t.setStartBefore(n), e && t.setStartAfter(n)), t.collapse(!e), m.selectRange(t), v = t, e && (f.scrollTop = f.scrollHeight), M.focus();
      }
    }, M.readOnly = function (e) {
      return "boolean" != typeof e ? !l.readonly : (f.contentEditable = !e, l.readonly = !e, ie(e), M);
    }, M.rtl = function (e) {
      var t = e ? "rtl" : "ltr";
      return "boolean" != typeof e ? "rtl" === Ae(l, "dir") : (Ae(f, "dir", t), Ae(l, "dir", t), it(w, "rtl"), it(w, "ltr"), Fe(w, t), T && T.rtl && T.rtl(e), M);
    }, ie = function ie(n) {
      var o = M.inSourceMode() ? "_sceTxtMode" : "_sceWysiwygMode";
      we(ge, function (e, t) {
        He(t, "disabled", n || !t[o]);
      });
    }, M.width = function (e, t) {
      return e || 0 === e ? (M.dimensions(e, null, t), M) : at(w);
    }, M.dimensions = function (e, t, n) {
      return t = !(!t && 0 !== t) && t, !1 === (e = !(!e && 0 !== e) && e) && !1 === t ? {
        width: M.width(),
        height: M.height()
      } : (!1 !== e && (!1 !== n && (F.width = e), at(w, e)), !1 !== t && (!1 !== n && (F.height = t), Le(w, t)), M);
    }, M.height = function (e, t) {
      return e || 0 === e ? (M.dimensions(null, e, t), M) : Le(w);
    }, M.maximize = function (e) {
      var t = "sceditor-maximize";
      return Ke(e) ? rt(w, t) : ((e = !!e) && (B = qe.pageYOffset), He($e.documentElement, t, e), He($e.body, t, e), He(w, t, e), M.width(e ? "100%" : F.width, !1), M.height(e ? "100%" : F.height, !1), e || qe.scrollTo(0, B), D(), M);
    }, D = function D() {
      F.autoExpand && !z && (z = setTimeout(M.expandToContent, 200));
    }, M.expandToContent = function (e) {
      var t, n;
      M.maximize() || (clearTimeout(z), z = !1, b || (n = F.resizeMinHeight || F.height || Le(r), b = {
        min: n,
        max: F.resizeMaxHeight || 2 * n
      }), (n = $e.createRange()).selectNodeContents(f), n = n.getBoundingClientRect(), t = d.documentElement.clientHeight - 1, n = n.bottom - n.top, n = M.height() + 1 + (n - t), e || -1 === b.max || (n = Math.min(n, b.max)), M.height(Math.ceil(Math.max(n, b.min))));
    }, M.destroy = function () {
      var e;
      h && (h.destroy(), h = m = null, c && Se(c), Me($e, "click", re), (e = r.form) && (Me(e, "reset", C), Me(e, "submit", M.updateOriginal, !0)), Me(window, "pagehide", M.updateOriginal), Me(window, "pageshow", C), Se(l), Se(u), Se(w), delete r._sceditor, tt(r), r.required = I);
    }, M.createDropDown = function (e, t, n) {
      var t = "sceditor-" + t;
      M.closeDropDown(), c && rt(c, t) || (e = be({
        top: e.offsetTop,
        left: e.offsetLeft,
        marginTop: e.clientHeight
      }, F.dropDownCss), Re(c = Ce("div", {
        className: "sceditor-dropdown " + t
      }), e), Ne(c, n), Ne(w, c), De(c, "click focusin", function (e) {
        e.stopPropagation();
      }), c && (t = ke(c, "input,textarea")[0]) && t.focus());
    }, re = function re(e) {
      3 !== e.which && c && !e.defaultPrevented && (me(), M.closeDropDown());
    }, X = function X(e) {
      var t = m.selectedRange();
      if (t) {
        for (var n, o, r = Ce("div", {}, d), i = t.commonAncestorContainer; i && Ie(i, !0);) i.nodeType === xe && (o = i.cloneNode(), r.firstChild && Ne(o, r.firstChild), Ne(r, o), n = n || o), i = i.parentNode;
        Ne(n || r, t.cloneContents()), ht(r), e.clipboardData.setData("text/html", r.innerHTML), we(ke(r, "p"), function (e, t) {
          ft(t, "div");
        }), we(ke(r, "br"), function (e, t) {
          t.nextSibling && Ie(t.nextSibling, !0) || Se(t);
        }), Ne(f, r), e.clipboardData.setData("text/plain", r.innerText), Se(r), "cut" === e.type && t.deleteContents(), e.preventDefault();
      }
    }, K = function K(e) {
      var t,
        n,
        o = f,
        r = e.clipboardData;
      if (r) {
        var i = {},
          a = r.types,
          l = r.items;
        e.preventDefault();
        for (var c = 0; c < a.length; c++) {
          if (a.indexOf("text/html") < 0 && qe.FileReader && l && rn.test(l[c].type)) return t = r.items[c].getAsFile(), n = void 0, (n = new FileReader()).onload = function (e) {
            Z({
              html: '<img src="' + e.target.result + '" />'
            });
          }, void n.readAsDataURL(t);
          i[a[c]] = r.getData(a[c]);
        }
        i.text = i["text/plain"], i.html = H(i["text/html"]), Z(i);
      } else if (!x) {
        var s = o.scrollTop;
        for (m.saveRange(), x = $e.createDocumentFragment(); o.firstChild;) Ne(x, o.firstChild);
        setTimeout(function () {
          var e = o.innerHTML;
          o.innerHTML = "", Ne(o, x), o.scrollTop = s, x = !1, m.restoreRange(), Z({
            html: H(e)
          });
        }, 0);
      }
    }, Z = function Z(e) {
      var t = Ce("div", {}, d),
        e = (h.call("pasteRaw", e), lt(w, "pasteraw", e), e.html ? (t.innerHTML = H(e.html), mt(t)) : t.innerHTML = ze(e.text || ""), {
          val: t.innerHTML
        }),
        t = ("fragmentToSource" in a && (e.val = a.fragmentToSource(e.val, d, g)), h.call("paste", e), lt(w, "paste", e), "fragmentToHtml" in a && (e.val = a.fragmentToHtml(e.val, g)), h.call("pasteHtml", e), m.getFirstBlockParent());
      M.wysiwygEditorInsertHtml(e.val, null, !0), function e(t) {
        if (t.nodeType === xe) {
          for (var n = t.parentNode, o = t.tagName, r = t.childNodes.length; r--;) e(t.childNodes[r]);
          if (Ie(t) && "BR" !== o) {
            for (r = t.style.length; r--;) {
              var i = t.style[r];
              Re(n, i) === Re(t, i) && t.style.removeProperty(i);
            }
            if (!t.style.length) if (Qe(t, "style"), "FONT" === o && (Re(t, "fontFamily").toLowerCase() === Re(n, "fontFamily").toLowerCase() && Qe(t, "face"), Re(t, "color") === Re(n, "color") && Qe(t, "color"), Re(t, "fontSize") === Re(n, "fontSize") && Qe(t, "size")), !t.attributes.length && /SPAN|FONT/.test(o)) vt(t);else if (/B|STRONG|EM|SPAN|FONT/.test(o)) for (var a = /B|STRONG/.test(o), l = "EM" === o; n && Ie(n) && (!a || /bold|700/i.test(Re(n, "fontWeight"))) && (!l || "italic" === Re(n, "fontStyle"));) {
              if ((n.tagName === o || a && /B|STRONG/.test(n.tagName)) && yt(n, t)) {
                vt(t);
                break;
              }
              n = n.parentNode;
            }
            var c = t.nextSibling;
            c && c.tagName === o && yt(c, t) && (Ne(t, c), vt(c));
          }
        }
      }(t);
    }, M.closeDropDown = function (e) {
      c && (Se(c), c = null), !0 === e && M.focus();
    }, M.wysiwygEditorInsertHtml = function (e, t, n) {
      var o = Le(i);
      M.focus(), !n && Ee(y, "code") || (m.insertHTML(e, t), m.saveRange(), P(), mt(f), an(f, d), tt(n = ke(f, "#sceditor-end-marker")[0]), e = f.scrollTop, t = gt(n).top + 1.5 * n.offsetHeight - o, et(n), (e < t || t + o < e) && (f.scrollTop = t), _N(!1), m.restoreRange(), S());
    }, M.wysiwygEditorInsertText = function (e, t) {
      M.wysiwygEditorInsertHtml(ze(e), ze(t));
    }, M.insertText = function (e, t) {
      return M.inSourceMode() ? M.sourceEditorInsertText(e, t) : M.wysiwygEditorInsertText(e, t), M;
    }, M.sourceEditorInsertText = function (e, t) {
      var n,
        o = l.selectionStart,
        r = l.selectionEnd,
        i = l.scrollTop;
      l.focus(), n = l.value, t && (e += n.substring(o, r) + t), l.value = n.substring(0, o) + e + n.substring(r, n.length), l.selectionStart = o + e.length - (t ? t.length : 0), l.selectionEnd = l.selectionStart, l.scrollTop = i, l.focus(), _N();
    }, M.getRangeHelper = function () {
      return m;
    }, M.sourceEditorCaret = function (e) {
      return l.focus(), e ? (l.selectionStart = e.start, l.selectionEnd = e.end, this) : {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    }, M.val = function (e, t) {
      return ve(e) ? (M.inSourceMode() ? M.setSourceEditorValue(e) : (!1 !== t && "toHtml" in a && (e = a.toHtml(e)), M.setWysiwygEditorValue(e)), M) : M.inSourceMode() ? M.getSourceEditorValue(!1) : M.getWysiwygEditorValue(t);
    }, M.insert = function (e, t, n, o, r) {
      var i;
      return M.inSourceMode() ? M.sourceEditorInsertText(e, t) : (t && (i = m.selectedHtml(), e += (i = !1 !== n && "fragmentToSource" in a ? a.fragmentToSource(i, d, g) : i) + t), !1 !== n && "fragmentToHtml" in a && (e = a.fragmentToHtml(e, g)), !1 !== n && !0 === r && (e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")), M.wysiwygEditorInsertHtml(e)), M;
    }, M.getWysiwygEditorValue = function (e) {
      for (var t, n = Ce("div", {}, d), o = f.childNodes, r = 0; r < o.length; r++) Ne(n, o[r].cloneNode(!0));
      return Ne(f, n), mt(n), Se(n), t = n.innerHTML, t = !1 !== e && a.hasOwnProperty("toSource") ? a.toSource(t, d) : t;
    }, M.getBody = function () {
      return f;
    }, M.getContentAreaContainer = function () {
      return i;
    }, M.getSourceEditorValue = function (e) {
      var t = l.value;
      return t = !1 !== e && "toHtml" in a ? a.toHtml(t) : t;
    }, M.setWysiwygEditorValue = function (e) {
      f.innerHTML = H(e = e || "<p><br /></p>"), P(), S(), _N(), D();
    }, M.setSourceEditorValue = function (e) {
      l.value = e, _N();
    }, M.updateOriginal = function () {
      r.value = M.val();
    }, P = function P() {
      var e, l, c, s, t, u, d;
      F.emoticonsEnabled && (e = f, l = O, c = F.emoticonsCompat, s = e.ownerDocument, t = "(^|\\s| | | | |$)", u = [], d = {}, Je(e, "code") || (we(l, function (e) {
        d[e] = new RegExp(t + wt(e) + t), u.push(e);
      }), u.sort(function (e, t) {
        return t.length - e.length;
      }), function e(t) {
        for (t = t.firstChild; t;) {
          if (t.nodeType !== xe || _e(t, "code") || e(t), t.nodeType === Te) for (var n = 0; n < u.length; n++) {
            var o,
              r = t.nodeValue,
              i = u[n],
              a = c ? r.search(d[i]) : r.indexOf(i);
            -1 < a && (a = r.indexOf(i, a), o = ut(l[i], s), i = r.substr(a + i.length), o.appendChild(s.createTextNode(i)), t.nodeValue = r.substr(0, a), t.parentNode.insertBefore(o, t.nextSibling));
          }
          t = t.nextSibling;
        }
      }(e)));
    }, M.inSourceMode = function () {
      return rt(w, "sourceMode");
    }, M.sourceMode = function (e) {
      var t = M.inSourceMode();
      return "boolean" != typeof e ? t : ((t && !e || !t && e) && M.toggleSourceMode(), M);
    }, M.toggleSourceMode = function () {
      var e = M.inSourceMode();
      !Et && e || (e || (m.saveRange(), m.clear()), v = null, M.blur(), e ? M.setWysiwygEditorValue(M.getSourceEditorValue()) : M.setSourceEditorValue(M.getWysiwygEditorValue()), nt(l), nt(i), He(w, "wysiwygMode", e), He(w, "sourceMode", !e), ie(), E());
    }, ae = function ae() {
      return l.focus(), l.value.substring(l.selectionStart, l.selectionEnd);
    }, U = function U(e, t) {
      M.inSourceMode() ? t.txtExec && (Array.isArray(t.txtExec) ? M.sourceEditorInsertText.apply(M, t.txtExec) : t.txtExec.call(M, e, ae())) : t.exec && (Xe(t.exec) ? t.exec.call(M, e) : M.execCommand(t.exec, t.hasOwnProperty("execParam") ? t.execParam : null));
    }, M.execCommand = function (e, t) {
      var n = !1,
        o = M.commands[e];
      if (M.focus(), !Ee(m.parentNode(), "code")) {
        try {
          n = d.execCommand(e, !1, t);
        } catch (e) {}
        !n && o && o.errorMessage && alert(M._(o.errorMessage)), E();
      }
    }, le = function le() {
      function e() {
        if (o.getSelection() && o.getSelection().rangeCount <= 0) v = null;else if (m && !m.compare(v)) {
          if ((v = m.cloneSelected()) && v.collapsed) {
            var e = v.startContainer,
              t = v.startOffset;
            for (t && e.nodeType !== Te && (e = e.childNodes[t]); e && e.parentNode !== f;) e = e.parentNode;
            e && Ie(e, !0) && (m.saveRange(), an(f, d), m.restoreRange());
          }
          lt(w, "selectionchanged");
        }
        L = !1;
      }
      L || (L = !0, "onselectionchange" in d ? e() : setTimeout(e, 100));
    }, ce = function ce() {
      var e,
        t = m.parentNode();
      g !== t && (e = g, g = t, y = m.getFirstBlockParent(t), lt(w, "nodechanged", {
        oldNode: e,
        newNode: g
      }));
    }, M.currentNode = function () {
      return g;
    }, M.currentBlockNode = function () {
      return y;
    }, E = function E() {
      var e,
        t,
        n = "active",
        o = d,
        r = M.sourceMode();
      if (M.readOnly()) we(ke(u, n), function (e, t) {
        it(t, n);
      });else {
        r || (t = m.parentNode(), e = m.getFirstBlockParent(t));
        for (var i = 0; i < R.length; i++) {
          var a = 0,
            l = ge[R[i].name],
            c = R[i].state,
            s = r && !l._sceTxtMode || !r && !l._sceWysiwygMode;
          if (ve(c)) {
            if (!r) try {
              -1 < (a = o.queryCommandEnabled(c) ? 0 : -1) && (a = o.queryCommandState(c) ? 1 : 0);
            } catch (e) {}
          } else s || (a = c.call(M, t, e));
          He(l, "disabled", s || a < 0), He(l, n, 0 < a);
        }
        T && T.update && T.update(r, t, e);
      }
    }, ee = function ee(e) {
      var t, n, o;
      e.defaultPrevented || (M.closeDropDown(), 13 === e.which && !_e(y, "li,ul,ol") && dt(y) && (t = Ce("br", {}, d), m.insertNode(t), (o = (n = t.parentNode).lastChild) && o.nodeType === Te && "" === o.nodeValue && (Se(o), o = n.lastChild), !Ie(n, !0) && o === t && Ie(t.previousSibling) && m.insertHTML("<br>"), e.preventDefault()));
    }, S = function S() {
      st(f, function (e) {
        var t;
        if (e.nodeType === xe && !/inline/.test(Re(e, "display")) && !_e(e, ".sceditor-nlf") && dt(e)) return (t = Ce("p", {}, d)).className = "sceditor-nlf", t.innerHTML = "<br />", Ne(f, t), !1;
        if (3 === e.nodeType && !/^\s*$/.test(e.nodeValue) || _e(e, "br")) return !1;
      });
    }, C = function C() {
      M.val(r.value);
    }, te = function te() {
      M.closeDropDown();
    }, M._ = function () {
      var n = arguments;
      return t && t[n[0]] && (n[0] = t[n[0]]), n[0].replace(/\{(\d+)\}/g, function (e, t) {
        return void 0 !== n[+t + 1] ? n[+t + 1] : "{" + t + "}";
      });
    }, oe = function oe(t) {
      h && h.call(t.type + "Event", t, M);
      var e = (t.target === l ? "scesrc" : "scewys") + t.type;
      A[e] && A[e].forEach(function (e) {
        e.call(M, t);
      });
    }, M.bind = function (e, t, n, o) {
      for (var r, i, a = (e = e.split(" ")).length; a--;) Xe(t) && (r = "scewys" + e[a], i = "scesrc" + e[a], n || (A[r] = A[r] || [], A[r].push(t)), o || (A[i] = A[i] || [], A[i].push(t)), "valuechanged" === e[a] && (_N.hasHandler = !0));
      return M;
    }, M.unbind = function (e, t, n, o) {
      for (var r = (e = e.split(" ")).length; r--;) Xe(t) && (n || Ze(A["scewys" + e[r]] || [], t), o || Ze(A["scesrc" + e[r]] || [], t));
      return M;
    }, M.blur = function (e, t, n) {
      return Xe(e) ? M.bind("blur", e, t, n) : (M.sourceMode() ? l : f).blur(), M;
    }, M.focus = function (e, t, n) {
      if (Xe(e)) M.bind("focus", e, t, n);else if (M.inSourceMode()) l.focus();else {
        if (ke(d, ":focus").length) return;
        e = m.selectedRange();
        v || se(!0), e && 1 === e.endOffset && e.collapsed && (t = e.endContainer) && 1 === t.childNodes.length && _e(t.firstChild, "br") && (e.setStartBefore(t.firstChild), e.collapse(!0), m.selectRange(e)), o.focus(), f.focus();
      }
      return E(), M;
    }, M.keyDown = function (e, t, n) {
      return M.bind("keydown", e, t, n);
    }, M.keyPress = function (e, t, n) {
      return M.bind("keypress", e, t, n);
    }, M.keyUp = function (e, t, n) {
      return M.bind("keyup", e, t, n);
    }, M.nodeChanged = function (e) {
      return M.bind("nodechanged", e, !1, !0);
    }, M.selectionChanged = function (e) {
      return M.bind("selectionchanged", e, !1, !0);
    }, M.valueChanged = function (e, t, n) {
      return M.bind("valuechanged", e, t, n);
    }, ue = function ue(e) {
      var n = 0,
        o = M.emoticonsCache,
        t = String.fromCharCode(e.which);
      Ee(y, "code") || (o || (o = [], we(O, function (e, t) {
        o[n++] = [e, t];
      }), o.sort(function (e, t) {
        return e[0].length - t[0].length;
      }), M.emoticonsCache = o, M.longestEmoticonCode = o[o.length - 1][0].length), !m.replaceKeyword(M.emoticonsCache, !0, !0, M.longestEmoticonCode, F.emoticonsCompat, t) || F.emoticonsCompat && /^\s$/.test(t) || e.preventDefault());
    }, de = function de() {
      var e = y,
        t = m,
        n = /[^\s\xA0\u2002\u2003\u2009]+/,
        o = e && ke(e, "img[data-sceditor-emoticon]");
      if (e && o.length) for (var r = 0; r < o.length; r++) {
        var i,
          a,
          l,
          c,
          s = o[r],
          u = s.parentNode,
          d = s.previousSibling,
          f = s.nextSibling;
        (d && n.test(d.nodeValue.slice(-1)) || f && n.test((f.nodeValue || "")[0])) && (a = -1, l = (i = t.cloneSelected()).startContainer, c = d.nodeValue || "", c += ot(s, "sceditor-emoticon"), l === f && (a = c.length + i.startOffset), l === e && e.childNodes[i.startOffset] === f && (a = c.length), l === d && (a = i.startOffset), (f = f && f.nodeType === Te ? f : u.insertBefore(u.ownerDocument.createTextNode(""), f)).insertData(0, c), Se(d), Se(s), -1 < a && (i.setStart(f, a), i.collapse(!0), t.selectRange(i)));
      }
    }, M.emoticons = function (e) {
      return e || !1 === e ? ((F.emoticonsEnabled = e) ? (De(f, "keypress", ue), M.sourceMode() || (m.saveRange(), P(), _N(!1), m.restoreRange())) : (we(ke(f, "img[data-sceditor-emoticon]"), function (e, t) {
        var n = ot(t, "sceditor-emoticon"),
          n = d.createTextNode(n);
        t.parentNode.replaceChild(n, t);
      }), Me(f, "keypress", ue), _N()), M) : F.emoticonsEnabled;
    }, M.css = function (e) {
      return n || (n = Ce("style", {
        id: "inline"
      }, d), Ne(d.head, n)), ve(e) ? (n.styleSheet ? n.styleSheet.cssText = e : n.innerHTML = e, M) : n.styleSheet ? n.styleSheet.cssText : n.innerHTML;
    }, J = function J(e) {
      var t = [],
        n = {
          "`": "~",
          1: "!",
          2: "@",
          3: "#",
          4: "$",
          5: "%",
          6: "^",
          7: "&",
          8: "*",
          9: "(",
          0: ")",
          "-": "_",
          "=": "+",
          ";": ": ",
          "'": '"',
          ",": "<",
          ".": ">",
          "/": "?",
          "\\": "|",
          "[": "{",
          "]": "}"
        },
        o = {
          109: "-",
          110: "del",
          111: "/",
          96: "0",
          97: "1",
          98: "2",
          99: "3",
          100: "4",
          101: "5",
          102: "6",
          103: "7",
          104: "8",
          105: "9"
        },
        r = e.which,
        i = {
          8: "backspace",
          9: "tab",
          13: "enter",
          19: "pause",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "insert",
          46: "del",
          91: "win",
          92: "win",
          93: "select",
          96: "0",
          97: "1",
          98: "2",
          99: "3",
          100: "4",
          101: "5",
          102: "6",
          103: "7",
          104: "8",
          105: "9",
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          112: "f1",
          113: "f2",
          114: "f3",
          115: "f4",
          116: "f5",
          117: "f6",
          118: "f7",
          119: "f8",
          120: "f9",
          121: "f10",
          122: "f11",
          123: "f12",
          144: "numlock",
          145: "scrolllock",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        }[r] || String.fromCharCode(r).toLowerCase();
      (e.ctrlKey || e.metaKey) && t.push("ctrl"), e.altKey && t.push("alt"), e.shiftKey && (t.push("shift"), o[r] ? i = o[r] : n[i] && (i = n[i])), i && (r < 16 || 18 < r) && t.push(i), t = t.join("+"), _[t] && !1 === _[t].call(M) && (e.stopPropagation(), e.preventDefault());
    }, M.addShortcut = function (e, t) {
      return e = e.toLowerCase(), ve(t) ? _[e] = function () {
        return U(ge[t], M.commands[t]), !1;
      } : _[e] = t, M;
    }, M.removeShortcut = function (e) {
      return delete _[e.toLowerCase()], M;
    }, Q = function Q(e) {
      var t, n, o;
      if (!F.disableBlockRemove && 8 === e.which && (n = m.selectedRange()) && (t = n.startContainer, 0 === n.startOffset && (o = fe()) && !_e(o, "body"))) {
        for (; t !== o;) {
          for (; t.previousSibling;) if ((t = t.previousSibling).nodeType !== Te || t.nodeValue) return;
          if (!(t = t.parentNode)) return;
        }
        M.clearBlockFormatting(o), e.preventDefault();
      }
    }, fe = function fe() {
      for (var e = y; !dt(e) || Ie(e, !0);) if (!(e = e.parentNode) || _e(e, "body")) return;
      return e;
    }, M.clearBlockFormatting = function (e) {
      return (e = e || fe()) && !_e(e, "body") && (m.saveRange(), e.className = "", Ae(e, "style", ""), _e(e, "p,div,td") || ft(e, "p"), m.restoreRange()), M;
    }, _N = function N(e) {
      var t, n, o;
      h && (h.hasHandler("valuechangedEvent") || _N.hasHandler) && (o = !(n = M.sourceMode()) && m.hasSelection(), e = (s = !1) !== e && !d.getElementById("sceditor-start-marker"), p && (clearTimeout(p), p = !1), o && e && m.saveRange(), (t = n ? l.value : f.innerHTML) !== _N.lastVal && (_N.lastVal = t, lt(w, "valuechanged", {
        rawValue: n ? M.val() : t
      })), o && e && m.removeMarkers());
    }, pe = function pe() {
      p && _N();
    }, _k = function k(e) {
      var e = e.which,
        t = _k.lastChar,
        n = 13 === t || 32 === t,
        t = 8 === t || 46 === t;
      _k.lastChar = e, s || (13 === e || 32 === e ? n ? _k.triggerNext = !0 : _N() : 8 === e || 46 === e ? t ? _k.triggerNext = !0 : _N() : _k.triggerNext && (_N(), _k.triggerNext = !1), clearTimeout(p), p = setTimeout(function () {
        s || _N();
      }, 1500));
    }, ne = function ne(e) {
      (s = /start/i.test(e.type)) || _N();
    }, me = function me() {
      M.updateOriginal();
    }, e();
  }
  Ye.locale = {}, Ye.formats = {}, Ye.icons = {}, Ye.command = {
    get: function get(e) {
      return Pe[e] || null;
    },
    set: function set(e, t) {
      return !(!e || !t) && ((t = be(Pe[e] || {}, t)).remove = function () {
        Ye.command.remove(e);
      }, Pe[e] = t, this);
    },
    remove: function remove(e) {
      return Pe[e] && delete Pe[e], this;
    }
  }, window.sceditor = {
    command: Ye.command,
    commands: Pe,
    defaultOptions: bt,
    ios: Ct,
    isWysiwygSupported: Et,
    regexEscape: wt,
    escapeEntities: ze,
    escapeUriScheme: function escapeUriScheme(e) {
      var t,
        n = window.location;
      return e && /^[^\/]*:/i.test(e) && !y.test(e) ? ((t = n.pathname.split("/")).pop(), n.protocol + "//" + n.host + t.join("/") + "/" + e) : e;
    },
    dom: {
      css: Re,
      attr: Ae,
      removeAttr: Qe,
      is: _e,
      closest: Ee,
      width: at,
      height: Le,
      traverse: d,
      rTraverse: st,
      parseHTML: ut,
      hasStyling: dt,
      convertElement: ft,
      blockLevelList: f,
      canHaveChildren: pt,
      isInline: Ie,
      copyCSS: function copyCSS(e, t) {
        t.style && e.style && (t.style.cssText = e.style.cssText + t.style.cssText);
      },
      fixNesting: mt,
      findCommonAncestor: function findCommonAncestor(e, t) {
        for (; e = e.parentNode;) if ((n = e) !== (o = t) && n.contains && n.contains(o)) return e;
        var n, o;
      },
      getSibling: m,
      removeWhiteSpace: ht,
      extractContents: h,
      getOffset: gt,
      getStyle: g,
      hasStyle: function hasStyle(e, t, n) {
        return !!(e = g(e, t)) && (!n || e === n || Array.isArray(n) && -1 < n.indexOf(e));
      }
    },
    locale: Ye.locale,
    icons: Ye.icons,
    utils: {
      each: we,
      isEmptyObject: l,
      extend: be
    },
    plugins: xt.plugins,
    formats: Ye.formats,
    create: function create(e, t) {
      t = t || {}, Je(e, ".sceditor-container") || (t.runWithoutWysiwygSupport || Et) && new Ye(e, t);
    },
    instance: function instance(e) {
      return e._sceditor;
    }
  };
}();

/***/ }),

/***/ "./node_modules/textarea-caret/index.js":
/*!**********************************************!*\
  !*** ./node_modules/textarea-caret/index.js ***!
  \**********************************************/
/***/ ((module) => {

/* jshint browser: true */

(function () {
  // We'll copy the properties below into the mirror div.
  // Note that some browsers, such as Firefox, do not concatenate properties
  // into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
  // so we have to list every single property explicitly.
  var properties = ['direction',
  // RTL support
  'boxSizing', 'width',
  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height', 'overflowX', 'overflowY',
  // copy the scrollbar for IE

  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration',
  // might not make a difference, but better be safe

  'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize'];
  var isBrowser = typeof window !== 'undefined';
  var isFirefox = isBrowser && window.mozInnerScreenX != null;
  function getCaretCoordinates(element, position, options) {
    if (!isBrowser) {
      throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }
    var debug = options && options.debug || false;
    if (debug) {
      var el = document.querySelector('#input-textarea-caret-position-mirror-div');
      if (el) el.parentNode.removeChild(el);
    }

    // The mirror div will replicate the textarea's style
    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    var style = div.style;
    var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
    var isInput = element.nodeName === 'INPUT';

    // Default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (!isInput) style.wordWrap = 'break-word'; // only for textarea-s

    // Position off-screen
    style.position = 'absolute'; // required to return coordinates properly
    if (!debug) style.visibility = 'hidden'; // not 'display: none' because we want rendering

    // Transfer the element's properties to the div
    properties.forEach(function (prop) {
      if (isInput && prop === 'lineHeight') {
        // Special case for <input>s because text is rendered centered and line height may be != height
        style.lineHeight = computed.height;
      } else {
        style[prop] = computed[prop];
      }
    });
    if (isFirefox) {
      // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
      if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, position);
    // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (isInput) div.textContent = div.textContent.replace(/\s/g, "\xA0");
    var span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    var coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
      height: parseInt(computed['lineHeight'])
    };
    if (debug) {
      span.style.backgroundColor = '#aaa';
    } else {
      document.body.removeChild(div);
    }
    return coordinates;
  }
  if ( true && typeof module.exports != 'undefined') {
    module.exports = getCaretCoordinates;
  } else if (isBrowser) {
    window.getCaretCoordinates = getCaretCoordinates;
  }
})();

/***/ }),

/***/ "./src/common/helper/XLSTMatchUtil.ts":
/*!********************************************!*\
  !*** ./src/common/helper/XLSTMatchUtil.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XSLTMatchUtil)
/* harmony export */ });
var gdebug = 0;
var IfContext = /*#__PURE__*/function () {
  function IfContext() {
    this.debug = gdebug++;
    this.attributes = {};
    this.rejected = false;
    this.beforeTemplate = true;
    this.templatePattenBefore = [];
    this.templatePattenAfter = [];
  }
  var _proto = IfContext.prototype;
  _proto.content = function content(_content) {
    if (this.beforeTemplate) {
      this.templatePattenBefore.push(_content);
    } else {
      this.templatePattenAfter.push(_content);
    }
  };
  _proto.patten = function patten() {
    return "^" + this.templatePattenBefore.map(function (s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("\\s*?") + "([^]*)" + this.templatePattenAfter.map(function (s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("\\s*?");
  };
  _proto.merge = function merge(newContext) {
    var _this = this;
    if (newContext.isRejected()) return;
    Object.keys(newContext.attributes).forEach(function (key) {
      _this.attributes[key] = newContext.attributes[key];
    });
    if (this.beforeTemplate) {
      newContext.templatePattenBefore.forEach(function (t) {
        return _this.templatePattenBefore.push(t);
      });
      if (!newContext.beforeTemplate) {
        newContext.templatePattenAfter.forEach(function (t) {
          return _this.templatePattenAfter.push(t);
        });
        this.beforeTemplate = false;
      }
    } else {
      newContext.templatePattenBefore.forEach(function (t) {
        return _this.templatePattenAfter.push(t);
      });
      newContext.templatePattenAfter.forEach(function (t) {
        return _this.templatePattenAfter.push(t);
      });
    }
  };
  _proto.attr = function attr(name) {
    return this.attributes[name];
  };
  _proto.setAttr = function setAttr(name, value) {
    this.attributes[name] = value;
  };
  _proto.reject = function reject() {
    this.rejected = true;
    return false;
  };
  _proto.isRejected = function isRejected() {
    return this.rejected;
  };
  return IfContext;
}();
var SCE_ATTRIBUTES_TRANSFORM = {
  "target": "data-sce-target"
};
var SEC_TAG_IGNORE = {};
function d_clone(obj) {
  if (obj.nodeName) {
    return obj;
  }
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map(function (v) {
        return d_clone(v);
      });
    } else {
      var ret = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = d_clone(obj[key]);
        }
      }
      return ret;
    }
  }
  return obj;
}
function extract_text(elem) {
  if (elem.nodeName.toLowerCase() === "#text") {
    return elem.textContent || "";
  } else {
    return elem.innerText || "";
  }
}
var XSLTMatchUtil = /*#__PURE__*/function () {
  function XSLTMatchUtil(template) {
    this.template = void 0;
    this.template = template.cloneNode(true);
  }
  var _proto2 = XSLTMatchUtil.prototype;
  _proto2.matchAttributes = function matchAttributes(node) {
    var context = new IfContext();
    this.match(node, this.template.firstChild, context);
    if (context.isRejected()) return false;
    context.setAttr("@patten", context.patten());
    return context.attributes;
  };
  _proto2.match = function match(root, templateRoot, context, skipChildren) {
    if (skipChildren === void 0) {
      skipChildren = false;
    }
    // a) 元素名检查
    if (root.nodeName.toLowerCase() != templateRoot.nodeName.toLowerCase()) return context.reject();

    // b) 属性检查
    this.checkAndUpdateAttr(root, templateRoot, context);
    if (context.isRejected()) return;
    if (skipChildren) return;

    // c) 子元素检查
    var templateChildren = Array.from(templateRoot.childNodes);
    var rootChildren = Array.from(root.childNodes);
    if (rootChildren.length == 0 || templateChildren.length == 0) {
      if (rootChildren.length != 0) return context.reject();
      return;
    }
    this.processChildren([rootChildren], [templateChildren], [0], [0], context);
  };
  _proto2.checkAndUpdateAttr = function checkAndUpdateAttr(root, templateRoot, context) {
    var templateAttrs = templateRoot.attributes;
    for (var i = 0; i < templateAttrs.length; i++) {
      var templateAttr = templateAttrs[i];

      // 1) 结果dom必须包含所有的template属性
      var rootValue = root.getAttribute(templateAttr.name);

      // SB SCEditor 改我Attribute而且文档不说明，差评！
      if (!rootValue && !!SCE_ATTRIBUTES_TRANSFORM[templateAttr.name]) {
        rootValue = root.getAttribute(SCE_ATTRIBUTES_TRANSFORM[templateAttr.name]);
      }
      if (rootValue === null) {
        return context.reject();
      }
      if (!this.attributeCheck(rootValue, templateAttr, context)) return context.reject();
    }
    return true;
  };
  _proto2.attributeCheck = function attributeCheck(rootValue, templateAttr, context) {
    // {@xxxxx}语法在template中用于匹配一个attribute.我们将在所有的attribute中查找，如果存在，则将属性值含有参数
    if (/\{@(.*?)\}/ig.test(templateAttr.value)) {
      var _matchRegexr$exec;
      // 匹配所有{@xxxx}，并提取名称
      var names = Array.from(templateAttr.value.matchAll(/\{@(.+?)\}/ig)).map(function (m) {
        return m && m.length > 1 && m[1];
      }).filter(function (s) {
        return !!s;
      });
      // 构造正则，并通过这种方法匹配获取所有的参数值
      var matchRegexr = new RegExp("^" + templateAttr.value.replace(/\{@(.+?)\}/ig, '(.+?)') + "$");
      var rootResult = (_matchRegexr$exec = matchRegexr.exec(rootValue)) == null ? void 0 : _matchRegexr$exec.slice(1);

      // 如果匹配到的参数个数和模板中的参数个数不一致，则返回false
      if (!rootResult || (rootResult == null ? void 0 : rootResult.length) != names.length) return context.reject();

      // 更新各个参数的值
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var rv = rootResult[i];
        // 注意 bbcode 是不允许空参数值的
        if (!name || !rv) return context.reject();
        context.setAttr(name, rv);
      }
    } else if (templateAttr.value !== rootValue) {
      return context.reject();
    }
    return true;
  }

  /**
   * 该方法将在【同一层】递归执行，直到找到一个解
   * 【同一层】指的是XSLT处理后，位于同一深度的节点集合
   */;
  _proto2.processChildren = function processChildren(rootChild, templateChild, rootIndex, templateIndex, context, forceTop) {
    if (forceTop === void 0) {
      forceTop = false;
    }
    // 模板树方案遍历结束
    if (templateChild.length == 0) {
      // root还有剩余，拒绝
      if (rootChild.length > 0) context.reject();
      return;
    }
    if (rootChild.length == 0) {
      return;
    }
    var templateNew = templateChild[0][templateIndex[0]];
    var rootNew = rootChild[0][rootIndex[0]];

    // XSL段处理：将当前的XSL段加入到template栈，root位置不变
    // 这里采用一种很粗暴的做法：认为所有XSL段都是可选的
    // 此时，该部分应该视为其中一种情况单独处理，并使用新的ifContext
    if (templateNew.nodeName.toLowerCase().startsWith('xsl:')) {
      var newContext = new IfContext();
      var continueWithChildrens = this.processXSLTCondition(templateNew, rootNew, newContext);
      if (continueWithChildrens) {
        var newTemplateChild = d_clone(templateChild);
        var newTemplateIndex = d_clone(templateIndex);
        var newRootChild = d_clone(rootChild);
        var newRootIndex = d_clone(rootIndex);
        newTemplateChild.unshift(Array.from(templateNew.childNodes));
        newTemplateIndex.unshift(0);

        //处理XSL方法：当前Child层，传入新的template和context
        //递归中,要求XSLT中至少包含一个Child处理完成,不进行进一步递归
        this.processChildren(newRootChild, newTemplateChild, newRootIndex, newTemplateIndex, newContext, true);
      }

      //结束，合并context
      if (!newContext.isRejected()) {
        context.merge(newContext);
        return;
      }

      //忽略XSL TAG
      templateIndex[0]++;
      //递归栈的处理方式
      if (templateIndex[0] >= templateChild[0].length) {
        if (forceTop) {
          context.reject();
          return;
        }
        templateIndex.shift();
        templateChild.shift();
      }

      // 继续处理下一个元素
      this.processChildren(d_clone(rootChild), d_clone(templateChild), d_clone(rootIndex), d_clone(templateIndex), context);
    } else {
      // 一般段处理
      //  -1 文本节点特判
      if (rootNew.nodeName.toLowerCase() == "#text" && templateNew.nodeName.toLowerCase() == "#text") {
        var _templateNew$textCont, _rootNew$textContent;
        // 遵从dom渲染规则，多个空格合并为一个
        var templateContent = (((_templateNew$textCont = templateNew.textContent) == null ? void 0 : _templateNew$textCont.replace(/ \s+/ig, " ")) || "").trim();
        var rootContent = (((_rootNew$textContent = rootNew.textContent) == null ? void 0 : _rootNew$textContent.replace(/ \s+/ig, " ")) || "").trim();
        if (rootContent != templateContent) {
          if (rootContent && rootContent.startsWith(templateContent)) {
            var _newTemplateChild = d_clone(templateChild);
            var _newTemplateIndex = d_clone(templateIndex);
            var _newRootChild = d_clone(rootChild);
            var _newRootIndex = d_clone(rootIndex);
            var newNode = rootNew.cloneNode();
            newNode.textContent = rootContent.substring(templateContent.length);
            _newRootChild[0].splice(_newRootIndex[0] + 1, 0, newNode);
            _newRootIndex[0]++;
            _newTemplateIndex[0]++;
            if (_newRootIndex[0] >= _newRootChild[0].length) {
              _newRootChild.shift();
              _newTemplateChild.shift();
            }
            context.content(templateContent);
            this.processChildren(_newRootChild, _newTemplateChild, _newRootIndex, _newTemplateIndex, context);
          } else {
            context.reject();
          }
        } else {
          context.content(rootContent);
        }
      } else {
        //检查元素是否匹配，否：拒绝当前context并返回
        // 该检查忽略子元素
        this.match(rootNew, templateNew, context);
      }
      if (context.isRejected()) return;

      //继续处理下一个元素
      rootIndex[0]++;
      templateIndex[0]++;
      //递归栈的处理方式
      if (templateIndex[0] >= templateChild[0].length) {
        templateIndex.shift();
        templateChild.shift();
      }
      if (rootIndex[0] >= rootChild[0].length) {
        rootIndex.shift();
        rootChild.shift();
      }

      // 继续处理下一个元素
      this.processChildren(d_clone(rootChild), d_clone(templateChild), d_clone(rootIndex), d_clone(templateIndex), context);
    }
  };
  _proto2.processXSLTCondition = function processXSLTCondition(templateRoot, root, context) {
    var nodeName = templateRoot.nodeName.toLowerCase();
    if (nodeName == 'xsl:if' || nodeName == 'xsl:choose') {
      var test = templateRoot.getAttribute('test');
      var match = test == null ? void 0 : test.match(/([@A-Za-z0-9_'"\{\}]+)=([@A-Za-z0-9_'"\{\}]+)/);
      if (match) {
        // 提取条件决定的属性值
        var arg1 = match[1];
        var arg2 = match[2];
        if (arg1.startsWith('@') && !arg2.startsWith('@')) {
          context.setAttr(arg1.slice(1), arg2);
        } else if (arg2.startsWith('@') && !arg1.startsWith('@')) {
          context.setAttr(arg2.slice(1), arg1);
        }
      }
    }
    if (nodeName == 'xsl:value-of') {
      var select = templateRoot.getAttribute('select');
      var _match = select == null ? void 0 : select.match(/@([A-Za-z0-9_'"\{\}]+)/);
      if (_match) {
        context.setAttr(_match[1], extract_text(root));
      }
      context.content(extract_text(root));
      //对于这个自闭合标签，我们不需要再处理其子节点
      return false;
    }
    if (nodeName == 'xsl:apply-templates') {
      context.beforeTemplate = false;
      context.setAttr('@template', extract_text(root));
      //模板标签不需要处理子节点
      return false;
    }
    return true;
  };
  return XSLTMatchUtil;
}();


/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('foskym/flarum-wysiwyg-editor', function () {
  console.log('[foskym/flarum-wysiwyg-editor] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/BBcodeEditorDriver.tsx":
/*!******************************************!*\
  !*** ./src/forum/BBcodeEditorDriver.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BBcodeEditorDriver)
/* harmony export */ });
/* harmony import */ var sceditor_minified_sceditor_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sceditor/minified/sceditor.min.js */ "./node_modules/sceditor/minified/sceditor.min.js");
/* harmony import */ var sceditor_minified_sceditor_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sceditor_minified_sceditor_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sceditor_minified_formats_bbcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sceditor/minified/formats/bbcode */ "./node_modules/sceditor/minified/formats/bbcode.js");
/* harmony import */ var sceditor_minified_formats_bbcode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sceditor_minified_formats_bbcode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var textarea_caret__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! textarea-caret */ "./node_modules/textarea-caret/index.js");
/* harmony import */ var textarea_caret__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(textarea_caret__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _getTemplates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getTemplates */ "./src/forum/getTemplates.ts");
/* harmony import */ var _util_textareaStyler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/textareaStyler */ "./src/forum/util/textareaStyler.ts");
/* harmony import */ var _util_bbcodeFormatUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/bbcodeFormatUtil */ "./src/forum/util/bbcodeFormatUtil.ts");






var ORIGINAL_TAGS = ['b', 'i', 'u', 's', 'sub', 'sup', 'font', 'size', 'color', 'ul', 'list', 'ol', 'li', '*', 'table', 'tr', 'th', 'td', 'emoticon', 'hr', 'img', 'url', 'email', 'quote', 'code', 'left', 'center', 'right', 'justify', 'youtube', 'rtl', 'ltr'];
var BBcodeEditorDriver = /*#__PURE__*/function () {
  function BBcodeEditorDriver(dom, params) {
    this.el = void 0;
    this.tempEl = void 0;
    this._textarea = void 0;
    this.view = null;
    this.params = null;
    this.instance = null;
    this.editor = null;
    this.rangeHelper = null;
    this.extraBBcode = [];
    this.s9ePreview = void 0;
    //这里的EL应该是可以直接赋值的吧
    this._textarea = this.tempEl = this.el = document.createElement('textarea');
    this.s9ePreview = document.createElement('div');
    this.extraBBcode = (0,_getTemplates__WEBPACK_IMPORTED_MODULE_3__["default"])();
    this.build(dom, params);
    // 搞一个假的textarea
    this.el = this.tempEl = (0,_util_textareaStyler__WEBPACK_IMPORTED_MODULE_4__.makeWrapTextarea)(this.tempEl, this.instance);
  }
  var _proto = BBcodeEditorDriver.prototype;
  _proto.build = function build(dom, params) {
    var _this = this;
    this.tempEl.className = params.classNames.join(' ');
    this.tempEl.disabled = params.disabled;
    this.tempEl.placeholder = params.placeholder;
    this.tempEl.value = params.value;
    dom.append(this.tempEl);
    this.s9ePreview.className = 'Post-body s9e-preview bbcode-editor-preview';
    this.s9ePreview.style.display = 'none';
    dom.append(this.s9ePreview);
    this.params = params;
    var sceditor = window.sceditor;
    ORIGINAL_TAGS.forEach(function (tag) {
      return sceditor.formats.bbcode.remove(tag);
    });
    this.extraBBcode.forEach(function (template) {
      var _tags;
      var name = template.name.toLowerCase();
      console.log("☘️Adding Template", name, template);
      sceditor.formats.bbcode.set(name, {
        tags: (_tags = {}, _tags[template.parentName] = {
          "data-template-match-name": template.name.toLowerCase()
        }, _tags),
        allowsEmpty: true,
        isSelfClosing: template.selfClose,
        format: (0,_util_bbcodeFormatUtil__WEBPACK_IMPORTED_MODULE_5__.format)(template),
        html: (0,_util_bbcodeFormatUtil__WEBPACK_IMPORTED_MODULE_5__.html)(template, _this.s9ePreview)
      });
    });
    sceditor.create(this.tempEl, {
      format: 'bbcode',
      style: '/assets/extensions/foskym-wysiwyg-editor/content.min.css',
      toolbar: '',
      locale: 'cn',
      emoticonsEnabled: false,
      startInSourceMode: false,
      resizeEnabled: false,
      dateFormat: 'yyyy-mm-dd',
      rtl: false
    });
    this.editor = sceditor;
    this.instance = sceditor.instance(this.tempEl);
    this.rangeHelper = this.instance.getRangeHelper();
    var cssClasses = params.classNames || [];
    cssClasses.forEach(function (className) {
      var _this$instance;
      return (_this$instance = _this.instance) == null ? void 0 : _this$instance.css(className);
    });
    this.instance.width('100%');
    var root = document.documentElement;
    var bodyBg = getComputedStyle(root).getPropertyValue('--body-bg').trim();
    var controlColor = getComputedStyle(root).getPropertyValue('--control-color').trim();
    this.instance.css('body {background-color: ' + bodyBg + '; color: ' + controlColor + ' !important;}');
    this.instance.focus();
    var iframe = this.instance.getContentAreaContainer();
    this.tempEl = $(iframe.parentElement).find("textarea")[0];
    var callInputListeners = function callInputListeners(e) {
      var _this$params;
      (_this$params = _this.params) == null || _this$params.inputListeners.forEach(function (listener) {
        listener.call(iframe);
      });
      e.redraw = false;
    };
    this.el.oninput = callInputListeners;
    this.el.onclick = callInputListeners;
    this.el.onkeyup = callInputListeners;
    ['keyup', 'keydown', 'keypress', 'blur', 'focus'].forEach(function (event) {
      _this.instance.bind(event, function (e) {
        params.oninput(_this.instance.val());
        callInputListeners(e);
      });
    });
    var iframeDoc = iframe.contentDocument;
    var iframeBody = iframeDoc.body;
    iframeBody.classList.add('bbcode-editor-content');
    iframeBody.classList.add('Post-body');
    var head = iframeDoc.head;
    var links = document.head.querySelectorAll('link');
    links.forEach(function (link) {
      if (link.href.indexOf('forum') > -1) {
        head.appendChild(link.cloneNode(true));
      }
    });
  };
  _proto.getInstance = function getInstance() {
    return this.instance;
  }

  // External Control Stuff

  /**
   * Focus the textarea and place the cursor at the given index.
   *
   * @param {number} position
   */;
  _proto.moveCursorTo = function moveCursorTo(position) {
    this.setSelectionRange(position, position);
  }

  /**
   * Get the selected range of the textarea.
   *
   * @return {Array}
   */;
  _proto.getSelectionRange = function getSelectionRange() {
    var range = this.rangeHelper.selectedRange();
    return [range.startOffset, range.endOffset];
  }

  /**
   * Get (at most) the last N characters from the current "text block".
   */;
  _proto.getLastNChars = function getLastNChars(n) {
    var value = this.instance.val();
    // console.log(value);

    return value.slice(Math.max(0, this.getSelectionRange()[0] - n), this.getSelectionRange()[0]);
  }

  /**
   * Insert content into the textarea at the position of the cursor.
   *
   * @param {String} text
   */;
  _proto.insertAtCursor = function insertAtCursor(text) {
    this.insertAt(this.getSelectionRange()[0], text);
  }

  /**
   * Insert content into the textarea at the given position.
   *
   * @param {number} pos
   * @param {String} text
   */;
  _proto.insertAt = function insertAt(pos, text) {
    this.insertBetween(pos, pos, text);
  }

  /**
   * Insert content into the textarea between the given positions.
   *
   * If the start and end positions are different, any text between them will be
   * overwritten.
   *
   * @param start
   * @param end
   * @param text
   */;
  _proto.insertBetween = function insertBetween(selectionStart, selectionEnd, text) {
    this.setSelectionRange(selectionStart, selectionEnd);
    this.instance.insert(text);
  }

  /**
   * Replace existing content from the start to the current cursor position.
   *
   * @param start
   * @param text
   */;
  _proto.replaceBeforeCursor = function replaceBeforeCursor(start, text) {
    this.insertBetween(start, this.getSelectionRange()[0], text);
  }

  /**
   * Set the selected range of the textarea.
   *
   * @param {number} start
   * @param {number} end
   * @private
   */;
  _proto.setSelectionRange = function setSelectionRange(start, end) {
    var range = document.createRange();
    range.setStart(this.el, start);
    range.setEnd(this.el, end);
    this.rangeHelper.selectRange(range);
    this.focus();
  };
  _proto.getTextNodeWidth = function getTextNodeWidth(textNode) {
    var tempElement = document.createElement('span');
    tempElement.textContent = textNode.nodeValue;
    var styles = window.getComputedStyle(textNode.parentNode);
    tempElement.style.fontSize = styles.fontSize;
    tempElement.style.fontFamily = styles.fontFamily;
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    document.body.appendChild(tempElement);
    var width = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);
    return width;
  };
  _proto.getCaretCoordinates = function getCaretCoordinates(position) {
    var isSourceMode = this.instance.sourceMode();
    if (isSourceMode) {
      var relCoords = textarea_caret__WEBPACK_IMPORTED_MODULE_2___default()(this.el, position);
      return {
        top: relCoords.top - this.el.scrollTop,
        left: relCoords.left
      };
    }
    var node = this.instance.currentNode();
    if (!node) return {
      top: 0,
      left: 0
    };
    if (node.nodeType === 3) {
      var parent = node.parentNode;
      var width = this.getTextNodeWidth(node);
      var _rect = parent.getBoundingClientRect();
      var _left = _rect.left + width;
      var _top = _rect.top + _rect.height;
      console.log(parent, _left, _top);
      return {
        left: _left,
        top: _top
      };
    }
    var rect = node.getBoundingClientRect();
    var left = rect.left + rect.width;
    var top = rect.top + rect.height;
    console.log(node, left, top);
    return {
      left: left,
      top: top
    };
  };
  _proto.focus = function focus() {
    this.instance.focus();
  };
  _proto.destroy = function destroy() {
    this.instance.destroy();
  };
  _proto.disabled = function disabled(_disabled) {
    this.instance.readOnly(_disabled);
  };
  return BBcodeEditorDriver;
}();


/***/ }),

/***/ "./src/forum/applyEditor.tsx":
/*!***********************************!*\
  !*** ./src/forum/applyEditor.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ applyEditor)
/* harmony export */ });
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/TextEditor */ "flarum/common/components/TextEditor");
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_Composer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/Composer */ "flarum/forum/components/Composer");
/* harmony import */ var flarum_forum_components_Composer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Composer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Tooltip */ "flarum/common/components/Tooltip");
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _BBcodeEditorDriver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BBcodeEditorDriver */ "./src/forum/BBcodeEditorDriver.tsx");








// import MenuState from './MenuState';
// import ProseMirrorMenu from './ProseMirrorMenu';

function applyEditor() {
  var instance = null;
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'controlItems', function (items) {
    // if (!app.forum.attribute('toggleRichTextEditorButton')) return;

    // const buttonOnClick = () => {
    //   app.session.user.savePreferences({ useRichTextEditor: !app.session.user.preferences().useRichTextEditor }).then(() => {
    //     app.composer.editor.destroy();
    //     this.attrs.composer.editor = this.buildEditor(this.$('.TextEditor-editorContainer')[0]);
    //     m.redraw.sync();
    //     app.composer.editor.focus();
    //   });
    // };

    items.add('rich-text', m((flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5___default()), {
      text: '切换富文本模式'
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      icon: "fas fa-pen-fancy",
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_6___default()({
        Button: true,
        'Button--icon': true
      }),
      onclick: function onclick() {
        instance.toggleSourceMode();
      }
    })), -10);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'toolbarItems', function (items) {
    // if (!app.session.user.preferences().useRichTextEditor) return;
    items.remove('markdown');
    // items.add('prosemirror-menu', <ProseMirrorMenu state={this.menuState} />, 100);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'buildEditorParams', function (items) {
    // if (!app.session.user.preferences().useRichTextEditor) return;

    // items.menuState = this.menuState = new MenuState();
    items.classNames.push('Post-body');
    items.escape = function () {
      return flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().composer.close();
    };
    m.redraw();
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.override)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'buildEditor', function (original, dom) {
    // if (app.session.user.preferences().useRichTextEditor) {
    var editor = new _BBcodeEditorDriver__WEBPACK_IMPORTED_MODULE_7__["default"](dom, this.buildEditorParams());
    instance = editor.getInstance();
    return editor;
    // }

    return original(dom);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_Composer__WEBPACK_IMPORTED_MODULE_4___default().prototype), 'updateHeight', function () {
    if (!instance) return;
    var padding = parseInt($('.Composer-content').css('padding-top').replace('px', '')) || 0;
    var headerHeight = $('.ComposerBody-header').outerHeight() || 0;
    var footerHeight = $('.Composer-footer').outerHeight() || 0;
    var paddingFooter = parseInt($('.Composer-footer').css('padding-bottom').replace('px', '')) || 0;
    var height = ($('.Composer').outerHeight() || 0) - padding - headerHeight - footerHeight - paddingFooter;
    instance.height(height);
  });
}

/***/ }),

/***/ "./src/forum/getTemplates.ts":
/*!***********************************!*\
  !*** ./src/forum/getTemplates.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTemplates)
/* harmony export */ });
/* harmony import */ var _common_helper_XLSTMatchUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/helper/XLSTMatchUtil */ "./src/common/helper/XLSTMatchUtil.ts");

function closeTest(tagName) {
  //@ts-ignore
  var tagDef = s9e.TextFormatter.tagsConfig[tagName.toUpperCase()];
  if (!tagDef) return false;
  var attributeStr = Object.keys(tagDef.attributes).map(function (attr) {
    return attr + "=0 ";
  }).join(" ");
  var testStrClose = "[" + tagName + " " + attributeStr + "][/" + tagName + "]";
  var testStrOpen = "[" + tagName + " " + attributeStr + "]";
  //@ts-ignore
  var testClose = s9e.TextFormatter.parse(testStrClose);
  //@ts-ignore
  var testOpen = s9e.TextFormatter.parse(testStrOpen);
  if (testClose.replace("<e>[/" + tagName + "]</e>", "") !== testOpen) return true;
  return false;
}
var specialTags = ["TABLE", "THEAD", "TH", "TR", "TD", "TBODY"];
function isBB(tagName) {
  if (specialTags.includes(tagName.toUpperCase())) return true;
  //@ts-ignore
  var tagDef = s9e.TextFormatter.tagsConfig[tagName.toUpperCase()];
  if (!tagDef) return false;
  var attributeStr = [tagName].concat(Object.keys(tagDef.attributes).map(function (attr) {
    return attr + "=0 ";
  })).join(" ");
  var testStr = "[" + attributeStr + "][/" + tagName + "]";
  //@ts-ignore
  var testClose = s9e.TextFormatter.parse(testStr);
  return testClose.includes("<" + tagName.toUpperCase());
}
function getTemplates() {
  // @ts-ignore
  var xsl = new DOMParser().parseFromString(s9e.TextFormatter.xsl, 'text/xml');
  var templates = [];
  // xsl:stylesheet > xsl:template
  var root = xsl.documentElement;
  Array.from(root.getElementsByTagName("xsl:template")).forEach(function (template) {
    var _template$firstElemen;
    var match = template.getAttribute('match');
    if (match === null || match.indexOf('|') > -1) return;
    if (!isBB(match)) return;
    var content = template.innerHTML;

    // parentName 为 template 的根节点名
    var parentName = ((_template$firstElemen = template.firstElementChild) == null ? void 0 : _template$firstElemen.tagName) || "";
    if (!parentName) return;
    templates.push({
      name: match,
      parentName: parentName,
      content: content,
      selfClose: closeTest(match),
      matching: new _common_helper_XLSTMatchUtil__WEBPACK_IMPORTED_MODULE_0__["default"](template)
    });
  });
  return templates;
}

/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _applyEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./applyEditor */ "./src/forum/applyEditor.tsx");
/* harmony import */ var _util_templateReplaceUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/templateReplaceUtil */ "./src/forum/util/templateReplaceUtil.ts");



flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('foskym/flarum-wysiwyg-editor', function () {
  (0,_util_templateReplaceUtil__WEBPACK_IMPORTED_MODULE_2__.preprocessTags)();
  (0,_util_templateReplaceUtil__WEBPACK_IMPORTED_MODULE_2__.preprocessTags)();
  (0,_applyEditor__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ }),

/***/ "./src/forum/util/bbcodeFormatUtil.ts":
/*!********************************************!*\
  !*** ./src/forum/util/bbcodeFormatUtil.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   format: () => (/* binding */ format),
/* harmony export */   html: () => (/* binding */ html)
/* harmony export */ });
var DEBUG = true;
function format(template) {
  return function (elm, content) {
    console.log("✨H->B", elm, content);
    if (elm.getAttribute('data-template-match-name') === template.name.toLowerCase()) {
      var attributes = template.matching.matchAttributes(elm);
      if (attributes === false) {
        DEBUG && console.log("❌Template does not match", template.name);
        return content;
      }
      var attributeStr = Object.keys(attributes).filter(function (k) {
        return k != "@template" && k != "@patten";
      }).map(function (key) {
        return key + "=" + attributes[key];
      }).join(' ');
      var closingTag = template.selfClose ? '' : "[/" + template.name.toUpperCase() + "]";
      content = (new RegExp(attributes['@patten'], 'img').exec(content) || ["", content])[1] || "";
      attributes['@template'] = content;
      DEBUG && console.log("✅Match", attributes, content);
      return "[" + template.name.toUpperCase() + " " + attributeStr + "]" + (attributes['@template'] || "") + closingTag;
    }
    DEBUG && console.log("❓Missing tag", content);
    return content;
  };
}
function html(template, preViewElem) {
  return function (token, attrs, content) {
    var _token$closing;
    console.log("🎈B->H", token, content);
    var val = token.val + "FLAT_WYSIWYG_CONTENT_PLACEHOLDER";
    if ((_token$closing = token.closing) != null && _token$closing.val) {
      val += token.closing.val;
    }
    // @ts-ignore
    s9e.TextFormatter.preview(val, preViewElem);
    var html = $(preViewElem).html();
    $(preViewElem).html("");
    if (html.startsWith("<p>") && html.endsWith("</p>")) {
      html = html.substring(3, html.length - 4);
    }
    return html.replace(/FLAT_WYSIWYG_CONTENT_PLACEHOLDER/g, content);
  };
}

/***/ }),

/***/ "./src/forum/util/templateReplaceUtil.ts":
/*!***********************************************!*\
  !*** ./src/forum/util/templateReplaceUtil.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   preprocessTags: () => (/* binding */ preprocessTags),
/* harmony export */   transformTemplate: () => (/* binding */ transformTemplate)
/* harmony export */ });
function transformTemplate(templates) {
  var templateNodeList = Array.from(templates.querySelectorAll("template"));
  templateNodeList.forEach(function (template) {
    if (template.childNodes.length === 0) return;
    if (template.childNodes.length > 1) {
      var wrapper = templates.ownerDocument.createElement("div");
      wrapper.append.apply(wrapper, Array.from(template.childNodes));
      template.append(wrapper);
    }
    template.childNodes[0].setAttribute("data-template-match-name", (template.getAttribute("match") || "").toLowerCase());
  });
}
var basicTags = "B|DEL|EM|H1|H2|H3|H4|H5|H6|I|INS|LI|S|STRONG|SUB|SUP|TABLE|TBODY|THEAD|TR|U|p";
function basicTemplates(document) {
  return basicTags.split("|").map(function (tag) {
    var _document$firstChild;
    if (tag == 'p') return;
    var smallTag = tag.toLowerCase();
    var template = document.createElement("xsl:template");
    template.setAttribute("match", "" + tag);
    template.innerHTML = "<" + smallTag + "><xsl:apply-templates/></" + smallTag + ">";
    (_document$firstChild = document.firstChild) == null || _document$firstChild.appendChild(template);
  });
}
function preprocessTags() {
  // @ts-ignore
  var xsl = new DOMParser().parseFromString(s9e.TextFormatter.xsl, 'text/xml');
  var basicTagOriginal = xsl.querySelector("template[match='" + basicTags + "']");
  if (basicTagOriginal) {
    basicTagOriginal.remove();
    basicTemplates(xsl);
  }
  transformTemplate(xsl);
  // @ts-ignore
  s9e.TextFormatter.xsl = xsl.documentElement.outerHTML;
  // @ts-ignore
  s9e.TextFormatter.xslt.init(s9e.TextFormatter.xsl);
}

/***/ }),

/***/ "./src/forum/util/textareaStyler.ts":
/*!******************************************!*\
  !*** ./src/forum/util/textareaStyler.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeWrapTextarea: () => (/* binding */ makeWrapTextarea)
/* harmony export */ });
function makeWrapTextarea(textarea, editor) {
  return new Proxy(textarea, {
    get: function get(target, prop) {
      if (prop === 'focus') {
        if (editor.sourceMode()) return target.focus.bind(target);
        if (editor.getRangeHelper().selectedRange().collapsed) editor.insert("WYSIWGY_FLAG_SELECTRANGESTART");else editor.insert("WYSIWGY_FLAG_SELECTRANGESTART", "WYSIWGY_FLAG_SELECTRANGEEND");
        var text = editor.val();
        var startIndex = text.indexOf("WYSIWGY_FLAG_SELECTRANGESTART");
        var endIndex = text.indexOf("WYSIWGY_FLAG_SELECTRANGEEND");
        target.value = text.replace(/WYSIWGY_FLAG_SELECTRANGESTART/g, "").replace(/WYSIWGY_FLAG_SELECTRANGEEND/g, "");
        if (startIndex !== -1 && endIndex !== -1) {
          target.setSelectionRange(startIndex, endIndex - "WYSIWGY_FLAG_SELECTRANGESTART".length);
        }
        return target.focus.bind(target);
      } else if (prop === "value") {
        return target.value;
      }
      var a = Reflect.get(target, prop);
      if (typeof a == "function") return a.bind(target);
      return a;
    },
    set: function set(target, prop, value) {
      if (prop === 'value') {
        target.value = value;
        if (!editor.sourceMode()) {
          editor.val(value, true);
        }
      }
      return Reflect.set(target, prop, value);
    }
  });
}

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/TextEditor":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditor']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditor'];

/***/ }),

/***/ "flarum/common/components/Tooltip":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Tooltip']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Tooltip'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/utils/classList":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/utils/classList']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/classList'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/Composer":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Composer']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Composer'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map