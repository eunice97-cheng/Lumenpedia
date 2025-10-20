var C = {
    isIE: "\v" == "v",
    r: {},
    hash: [],
    ra: 0,
    rb: {},
    rc: {},
    ry: [],
    rt: [1, 10, 19, 23, 28, 32, 37, 42, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 75, 77, 79, 81],
    rd: "0123456789abc",
    rk: "zyxwvutsrqponmlkjihg",
    d: false,
    dh: false,
    s: false,
    st: false,
    re: "",
    rf: 0,
    rg: 0,
    rh: 0,
    ri: "d",
    rw: 0,
    rr: 0,
    rj: {
        d: {
            s: 150,
            b: 48
        },
        r: {
            s: 190,
            b: 79
        }
    },
    init: function(d) {
        var b = this;
        b.d = $("skill");
        b.s = si[d];
        b.st = st;
        b.re = d;
        var c = 0,
            e = b.rt.shift();
        b.ry[0] = 0;
        for (var a = 1; a <= 100; a++) {
            if (a == e) {
                c++;
                e = b.rt.shift()
            }
            b.ry[a] = c
        }
        b.d.innerHTML = "";
        b.drawText();

        if (b.tb(d) == false) {
            b.sf(si[d].t10, 10, "s" + d)
        }
        b.sf(si[d].t1, 1, "s" + d);
        b.sf(si[d].t2, 2, "s" + d);
        b.sf(si[d].t3, 3, "s" + d);
        b.sf(si[d].t4, 4, "s" + d);
        b.sf(si[d].t5, 5, "s" + d);
        if (b.tb(d)) {
            b.sh()
        } else {}
        b.sj();
        b.sf(si[d].b1, 7, "t" + d);
        b.sf(si[d].b2, 8, "t" + d);
        b.sf(si[d].b3, 9, "t" + d);
        b.sa();
        b.tl();
        b.rr = 1
    },
    tb: function(a) {
        if (typeof(si[a].t10) == "undefined") {
            return true
        }
        return false
    },
    sa: function() {
        var a = window.location + "";
        var b = a.search(/#/);
        if (b == -1) {
            this.location = a;
            this.ss("")
        } else {
            this.location = a.substr(0, b);
            this.su(a.substr(b + 1))
        }
    },
    ss: function(a) {
        window.location = this.location + "#" + a
    },
    su: function(h) {
        var m = this,
            l = -1;
        if (h[0] == "r") {
            m.th("r")
        }
        var c = 0,
            d = 0,
            a, g, k;
        var b = "d";
        for (d = 1; d < h.length; d++) {
            b += m.zerosByHash(h[d])
        }
        var f = (b.length <= m.ra + 1) ? b.length : m.ra;
		/*
        if (x() != 2) {
            return false
        }
		*/
        for (d = 1; d <= f; d++) {
            if (b[d] == "&") {
                break
            }
            k = m.tt(b[d]);
            if (k <= 0) {
                continue
            }
            a = m.hash[d + l];
            g = m.sl(a);
            if (g.r == 0 && g.l > 0) {
                l += 1;
                a = m.hash[d + l];
                g = m.sl(a)
            }
            if (g.ml < k) {
                k = g.ml
            }
            if (k > 0) {
                m.sr(a, k);
                if (typeof(g.ds) != "undefined") {
                    m.tv(a, parseInt(g.s[g.s.length - 1]) + parseInt((k - 1) * g.ds[g.ds.length - 1]))
                } else {
                    m.tv(a, parseInt(g.s[k - 1][g.s[k - 1].length - 1]))
                }
                m.so(g.t, k);
                m.tu("tr" + a)
            }
        }
        if (b[d] == "&") {
            var e = parseInt((typeof(b[d + 1]) != "undefined" ? b[d + 1] : "0") + (typeof(b[d + 2]) != "undefined" ? b[d + 2] : ""));
            if (typeof(b[d + 1]) != "undefined") {
                m.gx(e)
            }
        }
        m.tl();
        m.tk();
        m.sv();
        m.ty();
        m.tj()
    },
    sf: function(d, a, c) {
        var g = "";
        var f = {};
		/*
        if (x() != 2) {
            return false
        }
		*/
        for (var b = 0; b < d.length; b++) {
            var h = d[b];
            f = this.sl(h);
            this.se(h, 0);
            g += '<div class="' + c + '" id="img' + h + '" style="background-position:' + (f.a * -1) + "px " + (f.b * -1) + "px;top:" + f.c + "px;left:" + f.d + 'px"></div>';
            g += '<div class="trans" id="tr' + h + '" style="top:' + f.c + "px;left:" + f.d + 'px"></div>';
            g += '<div class="border" id="b' + h + '" style="top:' + (f.c - 3) + "px;left:" + (f.d - 3) + 'px"></div>';
            g += '<div class="t" id="t' + h + '" style="top:' + (f.c + 18) + "px;left:" + f.d + 'px;">0</div>';
            g += '<div class="pop" id="pop' + h + '" style="top:' + (f.c) + "px;left:" + f.d + 'px;" ' + this.sg(h) + ' onClick="C.ts(' + h + ');"></div>';
            g += this.sk(h, f.c, f.d, a)
        }
        var e = this.sy("t" + a);
        g = '<div class="cont"><h3>' + (typeof(e) != "undefined" ? e : lang.tier + " " + a) + '</h3><div class="abs ' + c + a + '">' + g + '<div class="tiertext" id="tier' + a + '">0</div></div></div>';
        this.rb[a] = 0;
        this.d.innerHTML += g
    },
    sg: function(a) {
        return 'onmouseover="C.td(' + a + ',event);" onmouseout="C.tf();"'
    },
    sh: function() {
        this.d.innerHTML += '<div class="cont spacer"></div>'
    },
    sj: function() {
        this.d.innerHTML += '<div class="cont spacer2"></div>'
    },
    sk: function(f, e, c, d) {
        return '<div class="m" id="m' + f + '" style="top:' + (e + 30) + "px;left:" + (c - 5) + 'px;display:none;" onClick="C.tg(' + f + ",-1," + d + ',event);" ' + this.sg(f) + '></div><div class="p" id="p' + f + '" style="top:' + (e + 30) + "px;left:" + (c + 29) + 'px;display:none;" onClick="C.tg(' + f + ",1," + d + ',event);" ' + this.sg(f) + "></div>"
    },
    sl: function(a) {
        return this.s[a]
    },
    sq: function(a) {
        return this.r[a]
    },
    se: function(b, a) {
        this.r[b] = a;
        this.hash.push(b);
        this.ra++;
        this.tv(b, 0)
    },
    sr: function(b, a) {
        $("t" + b).innerHTML = a;
        this.r[b] = a
    },
    sy: function(a) {
        return this.st[a]
    },
    ta: function() {
        return this.text
    },
    si: function(a) {
        this.text = a
    },
    sw: function() {
        return this.header_text
    },
    sd: function(a) {
        this.header_text = a
    },
    so: function(a, b) {
        this.rb[a] += b;
        $("tier" + a).innerHTML = this.rb[a];
        if (a < 7 || a >= 10) {
            this.rf += b
        } else {
            this.rg += b
        }
    },
    ts: function(d) {
        var b = this;
        if (b.rr == 0) {
            return false
        }
        var c = b.sl(d).z;
        if (typeof(c) == "undefined") {
            return false
        }
        var a = "1";
        if (b.rh == d) {
            a = "0";
            b.rh = 0;
            b.tu("b" + d);
            b.sp(c, "none");
            return false
        } else {
            if (b.rh > 0) {
                b.tu("b" + b.rh);
                b.sp(b.sl(b.rh).z, "none")
            }
            b.rh = d
        }
        b.sz(d);
        b.tx(d);
        b.sp(c, "block")
    },
    sp: function(d, a) {
        var c;
        for (var b = 0; b < d.length; b++) {
            c = $("b" + d[b]);
            if (!c) {
                continue
            }
            c.className = "border set";
            c.style.display = a
        }
    },
    sz: function(b) {
        var a = $("b" + b);
        a.className = "border click";
        a.style.display = "block"
    },
    tn: function(b) {
        var a = 0;
        if (typeof(b.v) != "undefined") {
            a = 1
        }
        return a
    },
    td: function(id, e) {
        if (this.rr == 0) {
            return false
        }
        var d = this.sy(id);
        var v = this.tn(d);
        var level = this.sq(id);
        var s = this.sl(id);
        var text = "";
        if (s.h === undefined) {
            text += sprintf(d.d, level)
        } else {
            this.sd(d.d);
            text += eval("sprintf(C.sw()," + s.h[Math.max(0, level - 1)].join(",") + ");")
        }
        this.si(d.u);
        var complexText = d.p1 === undefined ? false : d.p1;
        if (level > 0) {
            text += "<p>" + eval("sprintf(C.ta()," + this.sc(level - 1, s, v, complexText) + ");") + "<p>"
        }
        if (level < s.ml) {
            text += "<p>" + lang.next_level + ":</p>" + eval("sprintf(C.ta()" + (s.r == 0 && s.l > 0 ? "" : " + lang.require") + "," + this.sc(level, s, v, complexText) + ");") + this.sx(s) + "</p>"
        }
        Hint.show(text, e)
    },
    sx: function(a) {
        var b = "";
        if (a.r < 0) {
            b += lang.require_prev_level + "<strong>" + a.l + "</strong>"
        } else {
			if(typeof(a.r) == "object")
			{
				for (var c = 0; c < a.r.length; c++) {
					b += "<strong>" + this.sy(a.r[c]).n + "</strong>" + lang.reach + "<strong>" + a.l[c] + "</strong> " + lang.skill_level + "<br />"
				}
			}
			else if (a.r > 0) {
                b += "<strong>" + this.sy(a.r).n + "</strong>" + lang.reach + "<strong>" + a.l + "</strong> " + lang.skill_level
            }
        }
        return b
    },
    sc: function(f, e, b, d) {
        var a = [];
        if (typeof(e.ds) != "undefined") {
            for (var c = 0; c < e.s.length; c++) {
                a.push(e.s[c] + (typeof(e.ds[c]) == "object" ? (e.ds[c][0] * f + e.ds[c][1] * this.tm(f)) : e.ds[c] * f))
            }
        } else {
            if (b == 1) {
                a = e.vs[f]
            } else {
                a = e.s[f]
            }
        }
        for (var c in a) {
            if (a[c] == "?" || a[c] == "") {
                a[c] = "'" + a[c] + "'"
            }
        }
        if (d) {
            var f = a.pop();
            a.push('"' + d + '"');
            a.push(f)
        }
        return a.join(",")
    },
    tm: function(b) {
        if (b <= 0) {
            return 0
        }
        var a = 0;
        for (i = 1; i <= b; i++) {
            a += i
        }
        return a
    },
    tf: function() {
        Hint.hide()
    },
    th: function(a) {
        this.ri = a;
        $("rebornskill").innerHTML = this.to();
        this.gb();
        this.sv();
        this.ty();
        return false
    },
    sv: function() {
        this.gn();
        $("skilltext").innerHTML = this.rf + " / " + this.sb(1);
        $("booktext").innerHTML = this.rg + " / " + this.sb(7)
    },
    sb: function(a) {
        var c = this.ri;
        var b = this.rj[c];
        if (a < 7 || a >= 10) {
            return b.s + this.gv()
        } else {
            return b.b + this.gv()
        }
    },
    gv: function() {
        amount = this.gz();
        return this.ry[amount]
    },
    gz: function(a) {
        a = parseInt($("chroma_s").value);
        if (this.ri != "r") {
            return 0
        }
        if (a >= 0 && a <= 99) {
            return a
        }
        if (a < 0 || isNaN(a)) {
            a = 0
        }
        if (a > 99) {
            a = 99
        }
        this.gx(a);
        return a
    },
    gx: function(a) {
        $("chroma_s").value = parseInt(a);
        this.gn()
    },
    gm: function() {
        this.sv();
        this.ty()
    },
    sn: function(a, b) {
        if (a < 7 || a >= 10) {
            this.rf += b
        } else {
            this.rg += b
        }
    },
    sm: function(a) {
        if (a < 7 || a >= 10) {
            return this.rf
        } else {
            return this.rg
        }
    },
    tg: function(c, g, d, f) {
        var k = this;
        if (k.rr == 0) {
            return false
        }
        var b = k.sq(c) + g;
        var l = k.sl(c);
        var h = l.ml;
        if (b < 0 || b > h) {
            return false
        }
        var a = k.sb(d);
        var j = k.sm(d);
        if (g > 0 && j + g > a) {
            return false
        }
        if (b == 0) {
            k.te("tr" + c);
            k.tu("m" + c);
            k.tv(c, 0)
        } else {
            k.tu("tr" + c);
            k.te("p" + c);
            if (g == 1) {
                if (b == h) {
                    k.tu("p" + c)
                }
            } else {
                k.te("p" + c)
            }
            if (typeof(l.ds) != "undefined") {
                k.tv(c, parseInt(l.s[l.s.length - 1]) + parseInt((b - 1) * l.ds[l.ds.length - 1]))
            } else {
                k.tv(c, parseInt(l.s[b - 1][l.s[b - 1].length - 1]))
            }
        }
        k.sr(c, b);
        k.sn(d, g);
        k.rb[d] += g;
        k.tl();
        k.tk();
        k.sv();
        k.td(c, f);
        k.ty();
        k.tj();
        return false
    },
    tj: function() {
        var a = 0;
        for (var b in this.rc) {
            if (this.rc[b] > a) {
                a = this.rc[b]
            }
        }
        $("player_level").innerHTML = a
    },
    tv: function(b, a) {
        this.rc[b] = a
    },
    tk: function() {
        for (var a in this.rb) {
            $("tier" + a).innerHTML = this.rb[a]
        }
    },
    tl: function() {
        var e = 0,
            d = this,
            a;
        for (var c = 0; c < d.ra; c++) {
            id = d.hash[c];
            e = d.sq(id);
            a = d.sl(id);
			if(typeof(a.r) == "object")
			{
				var check = true;
				for (var cx = 0; cx < a.r.length; cx++) {
					if(d.sq(a.r[cx]) < a.l[cx]){
						check = false;
						break;
					}
				}
				if(check){
					d.tq(id, e, a.ml)
				}
				else
				{
					if (e > 0) {
                        d.sr(id, 0);
                        d.tv(id, 0);
                        d.so(a.t, e * -1);
                        d.te("tr" + id)
                    }
                    d.tw(id)
				}
			}
			else if (a.r != 0) {
                var b = 0;
                b = (a.r < 0) ? d.rb[Math.abs(a.r)] : d.sq(a.r);
                if (b >= a.l) {
                    d.tq(id, e, a.ml)
                } else {
                    if (e > 0) {
                        d.sr(id, 0);
                        d.tv(id, 0);
                        d.so(a.t, e * -1);
                        d.te("tr" + id)
                    }
                    d.tw(id)
                }
            } else {
                if (a.l == 0) {
                    d.tq(id, e, a.ml)
                } else {
                    e = d.sq(a.l);
                    d.sr(id, e);
                    if (e > 0) {
                        d.tu("tr" + id)
                    } else {
                        d.te("tr" + id)
                    }
                }
            }
        }
    },
    tq: function(c, b, a) {
        if (b > 0) {
            this.te("m" + c)
        }
        if (b < a) {
            this.te("p" + c)
        }
    },
    tw: function(a) {
        this.tu("m" + a);
        this.tu("p" + a)
    },
    te: function(a) {
        $(a).style.display = "block"
    },
    tr: function(a) {
        return this.rd[a]
    },
    tt: function(a) {
        return this.rd.indexOf(a)
    },
    zerosByHash: function(d) {
        var a = this.rk.indexOf(d);
        if (a == -1) {
            return d
        }
        var b = "";
        a += 2;
        for (var c = 0; c < a; c++) {
            b += "0"
        }
        return b
    },
    hashByZeros: function(a) {
        if (a.length <= 1) {
            return a
        }
        var b = "";
        var c = a.length;
        while (c > 21) {
            b += this.rk[19];
            c -= 21
        }
        if (c == 0) {
            return b
        }
        if (c == 1) {
            return b + "0"
        }
        b += this.rk[c - 2];
        return b
    },
    ty: function() {
        var g = this.ri;
        var h = "",
            a, c, f;
        for (var d = 0; d < this.ra; d++) {
            id = this.hash[d];
            f = this.sl(id);
            if (f.r == 0 && f.l > 0) {
                continue
            }
            a = this.sq(id);
            c = this.tr(a);
            if (a > 0) {
                g += this.hashByZeros(h) + c;
                h = ""
            } else {
                h += "0"
            }
        }
        var e = this.gz();
        if (e != 0) {
            g += "&" + e
        }
        this.ss(g);
        g = g + "";
        var j = 30;
        var b = g;
        if (g.length > j) {
            b = "";
            var h = g;
            while (h.length > j) {
                b += h.substr(0, j) + "<br />";
                h = h.substr(j)
            }
            b += h
        }
        $("link").innerHTML = "<strong>" + lang.link + ":</strong><br /><a href='?c=" + this.re + "#" + g + "'>" + b + "</a>"
    },
    tu: function(a) {
        $(a).style.display = "none"
    },
    ti: function(a) {
        a.style.display = "none"
    },
    drawText: function() {
        var a = "";
        a += '<div id="rebornskill">' + this.to() + "</div>";
        a += '<div id="chroma" class="menuitem"><strong>' + lang.chroma + '</strong>: <input type="text" id="chroma_s" onInput="C.gm();" style="width:50px;" /></div>';
        a += '<div id="chroma_text" class="menuitem"></div>';
        a += '<div class="menuitem"><strong>' + lang.skill_points + '</strong>: <span id="skilltext">0 / 150</span></div>';
        a += '<div class="menuitem"><strong>' + lang.book_points + '</strong>: <span id="booktext">0 / 48</span></div>';
        a += '<div class="menuitem"><strong>' + lang.player_level + '</strong>: <span id="player_level">1</span></div>';
        a += '<div class="menuitem" id="link"></div>';
        //a += '<div class="menuitem" id="error">' + this.tz(lang.found_error) + "</div>";
        $("cmenu").innerHTML = a;
        this.gn();
        this.gb()
    },
    gn: function() {
        $("chroma_text").innerHTML = "<strong>" + lang.chroma_skills + "</strong>: " + this.gv()
    },
    gb: function() {
        var a = "none";
        if (this.ri == "r") {
            a = "block"
        }
        $("chroma").style.display = a;
        $("chroma_text").style.display = a
    },
    tx: function(c) {
        var b = this.sq(c);
        var a = this.sy(c).n + " (" + b + ")";
        if ($("errorskill")) {
            $("errorskill").innerHTML = a;
            this.rl = c;
            this.rq = b
        } else {
            return {
                text: a,
                level: b,
                id: c
            }
        }
    },
    tc: function() {
        this.rw = 0;
        t = $("errtext").value;
        if (t == "") {
            $("error").innerHTML = this.tz(lang.found_error);
            return false
        } else {
            $("error").innerHTML = this.tz(lang.thankyou)
        }
        JsHttpRequest.query("/server.php", {
            act: "skillerror",
            id: this.rl,
            level: this.rq,
            text: t,
            character: this.re
        }, function(a, b) {}, true)
    },
    tp: function() {
        this.rw = 1;
        var b = "",
            a = {
                text: "",
                level: 0,
                id: 0
            };
        if (this.rh != 0) {
            a = this.tx(this.rh)
        }
        b += "<div><strong>" + lang.skill + "</strong>: <span id='errorskill'>" + (a.text != "" ? a.text : lang.select_skill) + "</span></div>";
        b += "<div><strong>" + lang.descr + "</strong>:<textarea id='errtext'></textarea></div>";
        b += "<div><input type='button' value='" + lang.send + "' onClick='C.tc();' /></div>";
        b += "<div>" + lang.writeanerror + "</div>";
        this.rl = a.id;
        this.rq = a.level;
        $("error").innerHTML = b;
        return false
    },
    tz: function(a) {
        return '<a href="#" onClick="return C.tp()">' + a + "</a>"
    },
    to: function() {
        return '<a href="#" onClick="return C.th(\'d\')"' + (this.ri == "d" ? ' class="strong"' : "") + ">" + lang.default_char + '</a> - <a href="#" onClick="return C.th(\'r\')"' + (this.ri == "r" ? ' class="strong"' : "") + ">" + lang.reborn_char + "</a>"
    }
};
sprintfWrapper = {
    init: function() {
        if (typeof arguments == "undefined") {
            return null
        }
        if (arguments.length < 1) {
            return null
        }
        if (typeof arguments[0] != "string") {
            return null
        }
        if (typeof RegExp == "undefined") {
            return null
        }
        var j = arguments[0];
        var c = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        var g = new Array();
        var l = new Array();
        var a = 0;
        var h = 0;
        var m = 0;
        var d = 0;
        var k = "";
        var f = null;
        while (f = c.exec(j)) {
            if (f[4] == " ") {
                continue
            }
            if (f[9]) {
                a += 1
            }
            h = d;
            m = c.lastIndex - f[0].length;
            l[l.length] = j.substring(h, m);
            d = c.lastIndex;
            g[g.length] = {
                match: f[0],
                left: f[3] ? true : false,
                sign: f[4] || "",
                pad: f[5] || " ",
                min: f[6] || 0,
                precision: f[8],
                code: f[9] || "%",
                negative: parseInt(arguments[a]) < 0 ? true : false,
                argument: String(arguments[a])
            }
        }
        l[l.length] = j.substring(d);
        if (g.length == 0) {
            return j
        }
        if ((arguments.length - 1) < a) {
            return null
        }
        var b = null;
        var f = null;
        var e = null;
        for (e = 0; e < g.length; e++) {
            if (g[e].code == "%") {
                substitution = "%"
            } else {
                if (g[e].code == "d") {
                    g[e].argument = String(Math.abs(parseInt(g[e].argument)));
                    substitution = sprintfWrapper.convert(g[e])
                } else {
                    if (g[e].code == "f") {
                        g[e].argument = String(Math.abs(parseFloat(g[e].argument)).toFixed(g[e].precision ? g[e].precision : 6));
                        substitution = sprintfWrapper.convert(g[e])
                    } else {
                        if (g[e].code == "s") {
                            g[e].argument = g[e].argument.substring(0, g[e].precision ? g[e].precision : g[e].argument.length);
                            substitution = sprintfWrapper.convert(g[e], true)
                        } else {
                            if (g[e].code == "b") {
                                g[e].argument = String(Math.abs(parseInt(g[e].argument)).toString(2));
                                substitution = sprintfWrapper.convert(g[e], true)
                            } else {
                                if (g[e].code == "c") {
                                    g[e].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(g[e].argument)))));
                                    substitution = sprintfWrapper.convert(g[e], true)
                                } else {
                                    if (g[e].code == "o") {
                                        g[e].argument = String(Math.abs(parseInt(g[e].argument)).toString(8));
                                        substitution = sprintfWrapper.convert(g[e])
                                    } else {
                                        if (g[e].code == "x") {
                                            g[e].argument = String(Math.abs(parseInt(g[e].argument)).toString(16));
                                            substitution = sprintfWrapper.convert(g[e])
                                        } else {
                                            if (g[e].code == "X") {
                                                g[e].argument = String(Math.abs(parseInt(g[e].argument)).toString(16));
                                                substitution = sprintfWrapper.convert(g[e]).toUpperCase()
                                            } else {
                                                substitution = g[e].match
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            k += l[e];
            k += substitution
        }
        k += l[e];
        return k
    },
    convert: function(b, d) {
        if (d) {
            b.sign = ""
        } else {
            b.sign = b.negative ? "-" : b.sign
        }
        var a = b.min - b.argument.length + 1 - b.sign.length;
        var c = new Array(a < 0 ? 0 : a).join(b.pad);
        if (!b.left) {
            if (b.pad == "0" || d) {
                return b.sign + c + b.argument
            } else {
                return c + b.sign + b.argument
            }
        } else {
            if (b.pad == "0" || d) {
                return b.sign + b.argument + c.replace(/0/g, " ")
            } else {
                return b.sign + b.argument + c
            }
        }
    }
};
sprintf = sprintfWrapper.init;
