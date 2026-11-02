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

  function metaItem(iconName, label, value, pending) {
    return '<li class="md-meta' + (pending ? " is-pending" : "") + '">' + icon(iconName, 18) +
      '<span><span class="ggj-sr-only">' + esc(label) + ": </span>" + esc(value) + "</span></li>";
  }

  function renderSessions() {
    var cards = G.workshops().map(function (w) {
      var extra = "";
      if (w.description) extra += '<p class="md-session__desc">' + esc(w.description) + "</p>";
      if (w.outcome) extra += '<p class="md-session__outcome"><strong>You’ll leave able to:</strong> ' + esc(w.outcome) + "</p>";
      return '<article class="md-session md-session--' + esc(w.status.tone) + '" aria-labelledby="' + esc(w.id) + '-title">' +
        '<div class="md-session__date" aria-hidden="true">' +
        '<span class="md-session__dow">' + esc(w.date.weekdayShort) + "</span>" +
        '<span class="md-session__day">' + w.date.day + "</span>" +
        '<span class="md-session__mon">' + esc(w.date.monthShort) + "</span></div>" +
        '<div class="md-session__main">' +
        '<p class="md-session__when"><time datetime="' + esc(w.date.iso) + '">' + esc(w.dateLabel) + "</time> · Workshop " + w.number + "</p>" +
        '<h3 class="md-session__title' + (w.hasDetails ? "" : " is-pending") + '" id="' + esc(w.id) + '-title">' + esc(w.title) + "</h3>" +
        extra +
        '<ul class="md-session__meta">' +
        metaItem("clock", "Time", w.time, /coming soon/i.test(w.time)) +
        metaItem("user", "Instructor", w.instructorLabel, !w.instructor) +
        metaItem("pin", "Location", w.location, /coming soon/i.test(w.location)) +
        "</ul></div>" +
        '<div class="md-session__side">' +
        '<span class="md-status md-status--' + esc(w.status.tone) + '"><span class="md-status__dot" aria-hidden="true"></span>' + esc(w.status.label) + "</span>" +
        G.actionHtml(w.primary, "md-btn md-btn--primary md-btn--sm", "md-btn md-btn--disabled md-btn--sm") +
        G.actionHtml(w.secondary, "md-btn md-btn--outline md-btn--sm") +
        "</div></article>";
    }).join("");

    var k = D.kickoffDay;
    var kd = G.parseDate(k.date);
    var kickoff = '<article class="md-session md-session--kickoff" aria-labelledby="kickoff-title">' +
      '<div class="md-session__date" aria-hidden="true">' +
      '<span class="md-session__dow">' + esc(kd.weekdayShort) + "</span>" +
      '<span class="md-session__day">' + kd.day + "</span>" +
      '<span class="md-session__mon">' + esc(kd.monthShort) + "</span></div>" +
      '<div class="md-session__main">' +
      '<p class="md-session__when"><time datetime="' + esc(k.date) + '">' + esc(G.formatDate(k.date, "weekday")) + "</time> · No workshop</p>" +
      '<h3 class="md-session__title" id="kickoff-title">' + esc(k.title) + "</h3>" +
      '<p class="md-session__desc">' + esc(k.description) + "</p></div>" +
      '<div class="md-session__side"><span class="md-session__badge">' + icon("flag", 18) + "Jam starts</span></div>" +
      "</article>";

    return cards + kickoff;
  }

  function renderCommunity() {
    var icons = { questions: "help", mentors: "mentor", resources: "folder", teams: "team", chat: "chat" };
    return D.community.features.map(function (f) {
      return '<li class="md-feature"><span class="md-feature__icon">' + icon(icons[f.id] || "check", 22) + "</span>" +
        '<div><h3 class="md-feature__title">' + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></div></li>";
    }).join("");
  }

  function renderMentors() {
    if (!D.mentors || !D.mentors.length) return "";
    return '<h3 class="md-h3 md-mentors__title">Mentors</h3><ul class="md-mentors">' + D.mentors.map(function (m) {
      var name = G.safeUrl(m.url) ? G.link(m.url, m.name) : esc(m.name);
      return "<li><strong>" + name + "</strong><span>" +
        esc([m.role, m.org].filter(Boolean).join(" · ")) + "</span></li>";
    }).join("") + "</ul>";
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

  function fill(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ---------------- Init ---------------- */

  function init() {
    G.bind(document);
    renderHeadline();

    var js = G.parseDate(D.event.dates.jamStart), je = G.parseDate(D.event.dates.jamEnd);
    fill("md-jam-days", js.day + "–" + je.day);
    fill("md-jam-month", esc(js.month + " " + js.year));

    fill("md-compare", renderCompare());
    fill("md-journey", renderJourney());
    fill("md-sessions", renderSessions());
    fill("md-community", renderCommunity());
    fill("md-mentors", renderMentors());
    fill("md-jam-points", D.globalGameJam.points.map(function (p) {
      return "<li>" + icon("check", 20) + "<span>" + esc(p) + "</span></li>";
    }).join(""));
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
    fill("md-channel-note", G.safeUrl(D.links.discordGgjChannel)
      ? G.link(D.links.discordGgjChannel, "Visit the Global Game Jam 2027 channel")
      : "A dedicated Global Game Jam 2027 channel is coming soon.");

    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = icon(el.getAttribute("data-icon"), el.classList.contains("md-ai__icon") ? 28 : 22);
    });

    G.initNavToggle(document.querySelector(".md-menu-btn"), document.getElementById("md-menu"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
