/*
 * Global Game Jam Jumpstart 2027: SHARED LOGIC
 * ============================================
 * Business rules for ggj-2027.html. Contains no layout or styling
 * (presentation lives in modern.js and ggj-2027-modern.css).
 *   - URL validation (missing URLs never become links)
 *   - Workshop status -> label + action resolution
 *   - Date formatting (timezone-safe, dates stored as YYYY-MM-DD)
 *   - FAQ token replacement and age policy handling
 *   - [data-ggj-text] / [data-ggj-href] binding for static page copy
 *
 * Exposes window.GGJ2027. Requires data.js to be loaded first.
 */
(function () {
  "use strict";

  var data = window.GGJ2027_DATA;
  if (!data) {
    console.error("[GGJ2027] data.js must load before core.js");
    return;
  }

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /* ---------------- Utilities ---------------- */

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Returns the URL if it is usable, otherwise null.
  // Relative site paths (e.g. "index.html") are allowed for internal links.
  function safeUrl(url) {
    if (typeof url !== "string") return null;
    var u = url.trim();
    if (!u || u === "#") return null;
    if (/^(https?:\/\/|mailto:)/i.test(u)) return u;
    if (/^[\w\-./]+\.html(#[\w-]+)?$/i.test(u)) return u;
    return null;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  // Builds an <a> string. Returns plain text (no link) if url is unusable.
  function link(url, label, className) {
    var href = safeUrl(url);
    var cls = className ? ' class="' + esc(className) + '"' : "";
    if (!href) return "<span" + cls + ">" + esc(label) + "</span>";
    var ext = isExternal(href)
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    var srHint = isExternal(href) ? '<span class="ggj-sr-only"> (opens in a new tab)</span>' : "";
    return '<a href="' + esc(href) + '"' + cls + ext + ">" + esc(label) + srHint + "</a>";
  }

  /* ---------------- Dates ---------------- */

  function parseDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return null;
    var y = +m[1], mo = +m[2] - 1, d = +m[3];
    // Weekday via UTC to avoid local timezone shifts.
    var wd = new Date(Date.UTC(y, mo, d)).getUTCDay();
    return {
      iso: iso,
      year: y,
      day: d,
      month: MONTHS[mo],
      monthShort: MONTHS[mo].slice(0, 3),
      weekday: WEEKDAYS[wd],
      weekdayShort: WEEKDAYS[wd].slice(0, 3)
    };
  }

  function formatDate(iso, style) {
    var d = parseDate(iso);
    if (!d) return "";
    switch (style) {
      case "short": return d.monthShort + " " + d.day;                          // Jan 25
      case "weekday-short": return d.weekdayShort + ", " + d.monthShort + " " + d.day; // Mon, Jan 25
      case "weekday": return d.weekday + ", " + d.month + " " + d.day;          // Monday, January 25
      case "full": return d.weekday + ", " + d.month + " " + d.day + ", " + d.year;
      default: return d.month + " " + d.day + ", " + d.year;                    // January 25, 2027
    }
  }

  // "January 25–28, 2027" (same month) or "January 31 – February 2, 2027"
  function formatRange(startIso, endIso) {
    var a = parseDate(startIso), b = parseDate(endIso);
    if (!a || !b) return "";
    if (a.month === b.month && a.year === b.year) {
      return a.month + " " + a.day + "–" + b.day + ", " + a.year;
    }
    return a.month + " " + a.day + " – " + b.month + " " + b.day + ", " + b.year;
  }

  function formatTime(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
    if (!m) return null;
    var h = +m[1], min = m[2];
    var suffix = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + (min === "00" ? "" : ":" + min) + suffix;
  }

  function formatTimeRange(start, end) {
    var s = formatTime(start), e = formatTime(end);
    if (s && e) return s + " – " + e;
    if (s) return "Starts " + s;
    return null;
  }

  /* ---------------- Links with fallbacks ---------------- */

  function discordLink() {
    return { href: safeUrl(data.links.discord), label: "Join Our Discord" };
  }

  // Contact: configured URL -> email -> Discord fallback.
  function contactLink() {
    var url = safeUrl(data.contact.url);
    if (url) return { href: url, label: "contact us", isFallback: false };
    if (data.contact.email) {
      return { href: "mailto:" + data.contact.email, label: "email us", isFallback: false };
    }
    return { href: safeUrl(data.links.discord), label: "reach out on our Discord", isFallback: true };
  }

  // Get Involved: configured form/page -> Discord fallback.
  function involvedLink() {
    var url = safeUrl(data.links.getInvolved);
    if (url) return { href: url, label: "Get Involved", isFallback: false };
    return { href: safeUrl(data.links.discord), label: "Get Involved on Discord", isFallback: true };
  }

  function jamRegistration() {
    var url = safeUrl(data.links.jamRegistration);
    return url
      ? { href: url, label: "Register for Global Game Jam", available: true }
      : { href: null, label: "Registration Coming Soon", available: false };
  }

  /* ---------------- Workshops ---------------- */

  var STATUS = {
    "coming-soon": { label: "Coming Soon", tone: "soon" },
    "registration-open": { label: "Registration Open", tone: "open" },
    "registration-closed": { label: "Registration Closed", tone: "closed" },
    "recording-available": { label: "Recording Available", tone: "recording" }
  };

  // Normalizes a workshop into display-ready values.
  // `primary` is either { href, label } (a real link) or { label, disabled: true }.
  function workshopView(w, index) {
    var statusKey = STATUS[w.status] ? w.status : "coming-soon";
    if (!STATUS[w.status]) {
      console.warn("[GGJ2027] Unknown workshop status:", w.status, "for", w.id);
    }
    var reg = safeUrl(w.registrationUrl);
    var rec = safeUrl(w.recordingUrl);
    var virt = safeUrl(w.virtualUrl);
    var hasTitle = !!(w.title && String(w.title).trim());
    var title = hasTitle ? w.title : "Workshop details coming soon";
    var primary, secondary = null;

    switch (statusKey) {
      case "registration-open":
        primary = reg
          ? { href: reg, label: "Register", ariaLabel: "Register for " + title }
          : { label: "Registration link coming soon", disabled: true };
        if (virt) secondary = { href: virt, label: "Join Virtually", ariaLabel: "Join " + title + " virtually" };
        break;
      case "registration-closed":
        primary = { label: "Registration Closed", disabled: true };
        break;
      case "recording-available":
        primary = rec
          ? { href: rec, label: "Watch Recording", ariaLabel: "Watch the recording of " + title }
          : { label: "Recording coming soon", disabled: true };
        break;
      default:
        primary = { label: "Registration Coming Soon", disabled: true };
    }

    var d = parseDate(w.date);
    return {
      id: w.id,
      number: index + 1,
      date: d,
      dateLabel: formatDate(w.date, "weekday"),
      title: title,
      hasDetails: hasTitle,
      description: w.description || null,
      outcome: w.outcome || null,
      instructor: w.instructor || null,
      instructorOrg: w.instructorOrg || null,
      instructorLabel: w.instructor
        ? w.instructor + (w.instructorOrg ? ", " + w.instructorOrg : "")
        : "Instructor coming soon",
      location: w.location || "Location details coming soon",
      time: formatTimeRange(w.startTime, w.endTime) || "Time coming soon",
      status: { key: statusKey, label: STATUS[statusKey].label, tone: STATUS[statusKey].tone },
      primary: primary,
      secondary: secondary
    };
  }

  function workshops() {
    return data.workshops.map(workshopView);
  }

  // Renders an action as an <a> (real link) or a non-interactive <span>.
  // A missing URL never becomes a clickable control.
  function actionHtml(action, className, disabledClassName) {
    if (!action) return "";
    if (action.disabled || !safeUrl(action.href)) {
      return '<span class="' + esc(disabledClassName || className) + '">' + esc(action.label) + "</span>";
    }
    var href = safeUrl(action.href);
    var ext = isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
    var aria = action.ariaLabel
      ? ' aria-label="' + esc(action.ariaLabel + (isExternal(href) ? " (opens in a new tab)" : "")) + '"'
      : "";
    return '<a class="' + esc(className) + '" href="' + esc(href) + '"' + ext + aria + ">" + esc(action.label) + "</a>";
  }

  /* ---------------- Age policy & FAQ ---------------- */

  function ageStatement() {
    var p = data.agePolicy;
    if (p.status === "confirmed" && p.confirmedStatement) return p.confirmedStatement;
    return p.pendingStatement;
  }

  // Returns [{ q, aHtml }] with tokens replaced by live links.
  function faqs() {
    var c = contactLink();
    var inv = involvedLink();
    return data.faq.map(function (item) {
      var html = esc(item.a)
        .replace("{contact}", link(c.href, c.label))
        .replace("{discord}", link(data.links.discord, "join our Discord"))
        .replace("{involved}", inv.isFallback
          ? "Reach out to us " + link(inv.href, "on our Discord") + "."
          : link(inv.href, "Tell us how you'd like to help") + ".")
        .replace("{age}", esc(ageStatement()));
      return { q: item.q, aHtml: html };
    });
  }

  /* ---------------- Partners ---------------- */

  function initials(name) {
    return name.split(/\s+/).filter(function (w) { return /^[A-Z]/.test(w); })
      .map(function (w) { return w[0]; }).join("").slice(0, 4);
  }

  function partnerView(p) {
    return {
      name: p.name,
      href: safeUrl(p.url),
      logo: p.logo || null,
      initials: initials(p.name),
      track: p.track || null
    };
  }

  /* ---------------- Static copy binding ----------------
   * <h1 data-ggj-text="event.headline"></h1>
   * <a data-ggj-href="links.discord">...</a>
   * Computed keys are available under "computed.*".
   */
  function computed() {
    var e = data.event;
    return {
      workshopRange: formatRange(e.dates.workshopsStart, e.dates.workshopsEnd),
      jamRange: formatRange(e.dates.jamStart, e.dates.jamEnd),
      kickoff: formatDate(e.dates.kickoff, "full"),
      kickoffShort: formatDate(e.dates.kickoff, "weekday"),
      location: e.location.name + ", " + e.location.city,
      jamRegistrationLabel: jamRegistration().label,
      involvedLabel: involvedLink().label,
      year: String(parseDate(e.dates.jamStart).year)
    };
  }

  function lookup(path) {
    var root = { computed: computed() };
    for (var k in data) root[k] = data[k];
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, root);
  }

  function bind(root) {
    root = root || document;
    root.querySelectorAll("[data-ggj-text]").forEach(function (el) {
      var v = lookup(el.getAttribute("data-ggj-text"));
      if (v != null) el.textContent = v;
    });
    root.querySelectorAll("[data-ggj-href]").forEach(function (el) {
      var key = el.getAttribute("data-ggj-href");
      var href = key === "computed.involved" ? involvedLink().href
        : key === "computed.contact" ? contactLink().href
        : key === "computed.jamRegistration" ? jamRegistration().href
        : safeUrl(lookup(key));
      if (href) {
        el.setAttribute("href", href);
        if (isExternal(href)) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        }
      } else {
        // Never leave a dead link: convert to non-interactive text.
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-unavailable");
      }
    });
  }

  /* ---------------- Mobile nav toggle (shared behavior) ---------------- */

  function initNavToggle(button, menu, openClass) {
    if (!button || !menu) return;
    openClass = openClass || "is-open";
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle(openClass, !open);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        button.setAttribute("aria-expanded", "false");
        menu.classList.remove(openClass);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        button.setAttribute("aria-expanded", "false");
        menu.classList.remove(openClass);
        button.focus();
      }
    });
  }

  window.GGJ2027 = {
    data: data,
    esc: esc,
    safeUrl: safeUrl,
    isExternal: isExternal,
    link: link,
    parseDate: parseDate,
    formatDate: formatDate,
    formatRange: formatRange,
    discordLink: discordLink,
    contactLink: contactLink,
    involvedLink: involvedLink,
    jamRegistration: jamRegistration,
    workshops: workshops,
    actionHtml: actionHtml,
    ageStatement: ageStatement,
    faqs: faqs,
    presentingPartners: function () { return data.presentingPartners.map(partnerView); },
    prizeSponsors: function () { return data.prizeSponsors.map(partnerView); },
    prizeStatement: function () {
      return data.prizeTracks.status === "confirmed" ? null : data.prizeTracks.pendingStatement;
    },
    computed: computed,
    bind: bind,
    initNavToggle: initNavToggle
  };
})();
