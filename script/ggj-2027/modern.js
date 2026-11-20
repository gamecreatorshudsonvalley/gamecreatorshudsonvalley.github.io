/*
 * GGJ Jumpstart 2027 landing page renderer (ggj-2027.html)
 * Presentation only. All content comes from data.js via core.js (window.GGJ2027).
 */
(function () {
  "use strict";

  var G = window.GGJ2027;
  if (!G) return;
  var D = G.data;
  var esc = G.esc;

  /* ---------------- Line icons (24x24, stroke-based) ---------------- */
  var ICON_PATHS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r="1"/><circle cx="18" cy="13.5" r="1"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    discover: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    learn: '<path d="M2 6.5 12 3l10 3.5L12 10 2 6.5z"/><path d="M6 8.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V8.5"/>',
    connect: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 19c.5-3 2.8-5 5.5-5s5 2 5.5 5M14 14.5c.9-.3 1.9-.5 3-.5 2.4 0 4.2 1.6 4.5 4.5"/>',
    create: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c.6-4 4-6 8-6s7.4 2 8 6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 10h8M8 13h5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',
    mentor: '<path d="M12 3l9 4-9 4-9-4 9-4z"/><path d="M7 9.5V15c1.5 1.3 3.2 2 5 2s3.5-.7 5-2V9.5M21 7v6"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>',
    team: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 20c0-3 2.2-5 5-5s5 2 5 5M1.5 18c.3-2 1.6-3 3.5-3M22.5 18c-.3-2-1.6-3-3.5-3"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4c0 3 1.5 4.5 3.5 4.5M17 6h3c0 3-1.5 4.5-3.5 4.5M12 14v4M8 21h8M9 18h6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5-6-3.5z"/>'
  };

  function icon(name, size) {
    var s = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (ICON_PATHS[name] || "") + "</svg>";
  }

  /* ---------------- Section renderers ---------------- */

  function renderHeadline() {
    var h1 = document.getElementById("hero-title");
    if (!h1) return;
    var text = D.event.headline;
    var cut = text.indexOf("?");
    if (cut === -1) return; // keep plain bound text
    h1.innerHTML = '<span class="md-h1__a">' + esc(text.slice(0, cut + 1)) + "</span> " +
      '<span class="md-h1__b">' + esc(text.slice(cut + 1).trim()) + "</span>";
  }

  function renderCompare() {
    var c = G.computed();
    var card = function (block, when, tone) {
      return '<article class="md-compare md-compare--' + tone + '">' +
        '<p class="md-chip md-chip--' + tone + '">' + esc(when) + "</p>" +
        '<h3 class="md-h3">' + esc(block.title) + "</h3>" +
        '<ul class="md-checklist">' + block.points.map(function (p) {
          return "<li>" + icon("check", 18) + "<span>" + esc(p) + "</span></li>";
        }).join("") + "</ul></article>";
    };
    return card(D.about.jumpstart, c.workshopRange, "purple") + card(D.about.jam, c.jamRange, "coral");
  }

  function renderJourney() {
    return D.journey.map(function (stage, i) {
      var roles = stage.roles
        ? '<ul class="md-roles" aria-label="Roles to explore">' + stage.roles.map(function (r) {
          return "<li>" + esc(r) + "</li>";
        }).join("") + "</ul>"
        : "";
      return '<li class="md-step md-step--' + esc(stage.id) + '">' +
        '<div class="md-step__marker"><span class="md-step__icon">' + icon(stage.id, 28) + "</span>" +
        '<span class="md-step__num" aria-hidden="true">' + (i + 1) + "</span></div>" +
        '<div class="md-step__body">' +
        '<p class="md-step__count">Step ' + (i + 1) + "</p>" +
        '<h3 class="md-h3">' + esc(stage.title) + "</h3>" +
        '<p class="md-step__summary">' + esc(stage.summary) + "</p>" +
        '<p class="md-step__detail">' + esc(stage.detail) + "</p>" + roles +
        "</div></li>";
    }).join("");
  }

  // Week strip: Mon–Thu workshops, then one Global Game Jam block for the jam days.
  function renderWeek() {
    var cells = G.workshops().map(function (w) {
      var hasTime = !/coming soon/i.test(w.time);
      return '<li class="md-week__cell">' +
        '<time class="md-week__date" datetime="' + esc(w.date.iso) + '"><span class="md-week__dow">' + esc(w.date.weekdayShort) + "</span>" +
        '<span class="md-week__day">' + w.date.day + "</span></time>" +
        '<span class="md-week__tag">Workshop ' + w.number + "</span>" +
        '<span class="md-week__title' + (w.hasDetails ? "" : " is-pending") + '">' + esc(w.hasDetails ? w.title : "Topic TBA") + "</span>" +
        '<span class="md-week__meta' + (hasTime ? "" : " is-pending") + '">' + esc(hasTime ? w.time : "Time TBA") + "</span></li>";
    });
    var js = G.parseDate(D.event.dates.jamStart), je = G.parseDate(D.event.dates.jamEnd);
    cells.push('<li class="md-week__cell md-week__cell--jam">' +
      '<time class="md-week__date" datetime="' + esc(js.iso) + "/" + esc(je.iso) + '"><span class="md-week__dow">' + esc(js.weekdayShort + " – " + je.weekdayShort) + "</span>" +
      '<span class="md-week__day">' + js.day + "–" + je.day + "</span></time>" +
      '<span class="md-week__tag">Global Game Jam</span>' +
      '<span class="md-week__title">' + esc(D.globalGameJam.weekLabel) + "</span>" +
      '<a class="md-week__link" href="#jam">See the weekend schedule</a></li>');
    return cells.join("");
  }

  // Partner/sponsor card. Uses the approved logo when configured; otherwise a
  // clean text wordmark placeholder, never a recreated logo.
  function orgCard(p, cls, sub) {
    var mark = p.logo
      ? '<img src="' + esc(p.logo) + '" alt="' + esc(p.name) + ' logo" loading="lazy" decoding="async" />'
      : '<span class="' + cls + '__mono" aria-hidden="true">' + esc(p.initials) + "</span>";
    var inner = '<span class="' + cls + '__mark' + (p.logo ? " has-logo" : "") + '">' + mark + "</span>" +
      '<span class="' + cls + '__name">' + esc(p.name) + "</span>" +
      (sub ? '<span class="' + cls + '__sub">' + esc(sub) + "</span>" : "");
    if (p.href) {
      var ext = G.isExternal(p.href);
      return '<li><a class="' + cls + '" href="' + esc(p.href) + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + inner +
        (ext ? '<span class="ggj-sr-only"> (opens in a new tab)</span>' : "") + "</a></li>";
    }
    return '<li><div class="' + cls + '">' + inner + "</div></li>";
  }

  function renderFaq() {
    return G.faqs().map(function (f, i) {
      return '<details class="md-faq__item" id="faq-' + (i + 1) + '">' +
        '<summary><span>' + esc(f.q) + '</span><span class="md-faq__toggle" aria-hidden="true"></span></summary>' +
        '<div class="md-faq__answer"><p>' + f.aHtml + "</p></div></details>";
    }).join("");
  }

  // Jam weekend as a compact hour grid. Each day's first and last events
  // bound the shaded "venue open" block. Labels that would overlap are
  // nudged down so close-together events stay readable.
  function renderHourGrid() {
    var PX = 30, STEP = 2, GAP = 22, INSET = 12; // px per hour, hours per tick, min label gap, doors inset
    var mins = function (hhmm) {
      var m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
      return m ? +m[1] * 60 + +m[2] : null;
    };
    var days = (D.jamSchedule || []).map(function (day) {
      return { d: G.parseDate(day.date), events: day.events || [] };
    }).filter(function (x) { return x.d && x.events.length; });
    var all = [];
    days.forEach(function (day) {
      day.events.forEach(function (e) { var m = mins(e.time); if (m != null) all.push(m); });
    });
    if (!all.length) return "";
    var start = Math.floor(Math.min.apply(null, all) / 60) * 60;
    var end = Math.ceil(Math.max.apply(null, all) / 60) * 60;
    var y = function (m) { return (m - start) / 60 * PX; };
    var H = y(end);

    var cols = days.map(function (day, di) {
      var times = day.events.map(function (e) { return mins(e.time); }).filter(function (m) { return m != null; });
      var top = y(times.length ? times[0] : start);
      var bottom = y(times.length ? times[times.length - 1] : start);
      var lastIdx = day.events.length - 1, prev = top - GAP, rows = "";
      day.events.forEach(function (e, i) {
        var m = mins(e.time), label = G.formatTime(e.time) || "TBA";
        if (e.allDay) {
          rows += '<li class="md-hours__ev md-hours__ev--allday"><span class="ggj-sr-only">' + esc(label) + ": </span><span>" + esc(e.title) + "</span></li>";
          return;
        }
        var at = m == null ? prev + GAP : y(m) + (i === 0 ? INSET : i === lastIdx ? -INSET : 0);
        var py = Math.max(at, prev + GAP);
        prev = py;
        rows += '<li class="md-hours__ev' + (e.highlight ? " md-hours__ev--key" : "") + '" style="top:' + py + 'px">' +
          "<time>" + esc(label) + "</time><span>" + esc(e.title) + "</span></li>";
      });
      bottom = Math.max(bottom, prev + INSET);
      H = Math.max(H, bottom);
      return { day: day, id: "md-hours-" + di, top: top, bottom: bottom, html: rows };
    });

    var ticks = "";
    for (var h = start; h <= end; h += 60 * STEP) {
      ticks += '<span class="md-hours__tick" style="top:' + y(h) + 'px">' + esc(G.formatTime(h / 60 + ":00")) + "</span>";
    }
    return '<div class="md-hours__inner">' +
      '<div class="md-hours__axis" aria-hidden="true"><div class="md-hours__head"></div>' +
      '<div class="md-hours__ticks" style="height:' + H + 'px">' + ticks + "</div></div>" +
      cols.map(function (c) {
        var mid = (c.top + c.bottom) / 2;
        return '<section class="md-hours__day" aria-labelledby="' + c.id + '">' +
          '<h4 class="md-hours__head" id="' + c.id + '">' + esc(c.day.d.weekday) +
          "<small>" + esc(c.day.d.monthShort + " " + c.day.d.day) + "</small></h4>" +
          '<ol class="md-hours__col" style="height:' + H + "px;background-size:100% " + PX + "px;--open-top:" + c.top +
          "px;--open-h:" + (c.bottom - c.top) + "px;--mid:" + mid + 'px">' + c.html + "</ol></section>";
      }).join("") + "</div>";
  }

  // Highlights the menu link for the section the reader is in. A link is
  // current while its target spans a line ~25% down the viewport; when targets
  // nest (Schedule sits inside Game Jam), the inner one wins. Sections without
  // a menu link (Community, Partners…) leave nothing highlighted.
  function initScrollSpy() {
    var header = document.querySelector(".md-header");
    var items = Array.prototype.map.call(document.querySelectorAll('.md-nav a[href^="#"]'), function (a) {
      return { link: a, el: document.getElementById(a.getAttribute("href").slice(1)) };
    }).filter(function (x) { return x.el; });
    if (!items.length) return;
    var current = null, queued = false;

    function update() {
      queued = false;
      var line = (header ? header.offsetHeight : 0) + window.innerHeight * 0.25;
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      var next = null;
      items.forEach(function (x) {
        var r = x.el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) next = x;            // later (inner) matches win
        if (atBottom && r.top < window.innerHeight) next = x;     // last section can't reach the line
      });
      if (next === current) return;
      if (current) { current.link.classList.remove("is-active"); current.link.removeAttribute("aria-current"); }
      if (next) { next.link.classList.add("is-active"); next.link.setAttribute("aria-current", "location"); }
      current = next;
    }
    function queue() { if (!queued) { queued = true; window.requestAnimationFrame(update); } }
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ---------------- Init ---------------- */

  function init() {
    G.bind(document);
    renderHeadline();

    fill("md-compare", renderCompare());
    fill("md-journey", renderJourney());
    fill("md-week", renderWeek());
    fill("md-schedule", renderHourGrid());
    fill("md-audiences", D.getInvolved.audiences.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join(""));
    fill("md-partners", G.presentingPartners().map(function (p) { return orgCard(p, "md-partner"); }).join(""));
    fill("md-sponsors", G.prizeSponsors().map(function (p) {
      return orgCard(p, "md-sponsor", p.track || "Prize track details coming soon");
    }).join(""));
    fill("md-prize-note", esc(G.prizeStatement() || ""));
    fill("md-faq", renderFaq());

    var c = G.contactLink();
    fill("md-faq-contact", c.isFallback ? "Ask us " + G.link(c.href, "on Discord") + "." : G.link(c.href, "Contact us") + ".");
    fill("md-footer-partners", "Presented by " + D.presentingPartners.map(function (p) { return esc(p.name); })
      .join(", ").replace(/, ([^,]*)$/, ", and $1") + ".");

    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = icon(el.getAttribute("data-icon"), el.classList.contains("md-ai__icon") ? 28 : 22);
    });

    G.initNavToggle(document.querySelector(".md-menu-btn"), document.getElementById("md-menu"));
    initScrollSpy();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
