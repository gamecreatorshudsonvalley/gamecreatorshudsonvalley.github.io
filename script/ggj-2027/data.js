/*
 * Global Game Jam Jumpstart 2027: SHARED EVENT DATA
 * ==================================================
 * Single source of truth for the landing page (ggj-2027.html).
 *
 * Edit event details HERE. Do not hard-code event content in the HTML,
 * CSS, or scripts. The page updates automatically.
 *
 * Placeholder rules:
 *   - Leave unknown values as `null`. The pages render "Details coming soon"
 *     (or similar) and never produce empty or broken links.
 *   - Never fill in a value that has not been confirmed by organizers.
 *   - URLs must start with https://, http://, or mailto:. Anything else is
 *     treated as missing.
 */
window.GGJ2027_DATA = {

  /* ------------------------------------------------------------------
   * Event basics (confirmed)
   * ------------------------------------------------------------------ */
  event: {
    name: "Global Game Jam Jumpstart 2027",
    shortName: "GGJ Jumpstart",
    headline: "Never Made a Game? Make One With Us.",
    tagline: "Go from complete beginner to game jam contributor in one week.",
    intro: "Learn practical game development skills through free, hands-on workshops. Meet local creators, get guidance from experienced developers, and put your new skills to work at Global Game Jam.",
    closer: "No experience necessary. Just bring your curiosity.",
    keyMessage: "You don't need to know how to make games to help make one.",
    location: {
      name: "Mount Saint Mary College",
      city: "Newburgh, NY"
      // Do not add building names or rooms until confirmed.
    },
    dates: {
      workshopsStart: "2027-01-25",
      workshopsEnd: "2027-01-28",
      kickoff: "2027-01-29",
      jamStart: "2027-01-29",
      jamEnd: "2027-01-31"
    },
    cost: "Free"
  },

  /* ------------------------------------------------------------------
   * Links and contact (configurable)
   * ------------------------------------------------------------------ */
  links: {
    // Existing GCHV Discord invite (same one used on index.html).
    discord: "https://discord.gg/xvyVr2BXRs",
    // TODO: add the dedicated Global Game Jam 2027 channel/category link once created.
    discordGgjChannel: null,
    // Official Global Game Jam site (general info about the worldwide event).
    globalGameJam: "https://globalgamejam.org/",
    // TODO: GGJ 2027 site registration URL. Leave null until registration opens.
    jamRegistration: null,
    // TODO: "Get Involved" form or page for instructors, mentors, and supporters.
    // While null, the CTA falls back to the Discord invite.
    getInvolved: null,
    gchvHome: "index.html"
  },

  contact: {
    // TODO: organizer contact. Set ONE of these (url preferred).
    // While both are null, "reach out" links fall back to the Discord invite.
    url: null,
    email: null
  },

  /* ------------------------------------------------------------------
   * AGE POLICY
   * ------------------------------------------------------------------
   * !!! TODO (ORGANIZER MEETING): DECIDE AGE POLICY BEFORE REGISTRATION OPENS !!!
   *   1. Is on-campus participation (workshops and/or jam) limited to 18+?
   *      Working assumption only: on-campus may require 18+. NOT CONFIRMED.
   *   2. Can participants under 18 join workshops and/or the jam virtually?
   *   3. Confirm with Mount Saint Mary College venue policy.
   * Until `status` is "confirmed", the public FAQ shows `pendingStatement`
   * and NO age restriction is published.
   * ------------------------------------------------------------------ */
  agePolicy: {
    status: "pending",              // "pending" | "confirmed"
    onCampusMinimumAge: null,       // e.g. 18, once confirmed
    virtualUnder18Allowed: null,    // true | false, once confirmed
    confirmedStatement: null,       // public wording to show once confirmed
    pendingStatement: "We're confirming participation requirements with our venue and organizers. More details will be announced before registration opens."
  },

  /* ------------------------------------------------------------------
   * What is Jumpstart? (and how it differs from Global Game Jam)
   * ------------------------------------------------------------------ */
  about: {
    summary: "Jumpstart is a free week of beginner-friendly workshops built to remove the experience barrier. Each hands-on session gives you a practical skill you can bring to a game team. Then you put it to work at Global Game Jam.",
    jumpstart: {
      title: "Jumpstart Workshops",
      points: [
        "Beginner-focused. No experience needed",
        "Independent sessions, about an hour each",
        "Designed mainly for college students. Other aspiring game developers are welcome, subject to participation policies"
      ]
    },
    jam: {
      title: "Global Game Jam",
      points: [
        "A worldwide weekend of making games in teams",
        "Welcomes game developers of all experience levels",
        "Our site is hosted at Mount Saint Mary College"
      ]
    }
  },

  /* ------------------------------------------------------------------
   * Learning journey (four stages)
   * ------------------------------------------------------------------ */
  journey: [
    {
      id: "discover",
      title: "Discover",
      summary: "Explore the different roles involved in game development.",
      detail: "Programming, art, music, writing, and design all provide opportunities to contribute.",
      roles: ["Programming", "Art", "Music", "Writing", "Design"]
    },
    {
      id: "learn",
      title: "Learn",
      summary: "Attend independent, beginner-friendly workshops.",
      detail: "Each session aims to take you from zero experience to a practical skill you can contribute to a game in about an hour. Attend one workshop or several. There are no prerequisites."
    },
    {
      id: "connect",
      title: "Connect",
      summary: "Meet local game developers, instructors, and fellow participants.",
      detail: "Join the GCHV Discord community, take part in mentorship opportunities, and find potential teammates. Workshop instructors will answer questions on Discord."
    },
    {
      id: "create",
      title: "Create",
      summary: "Join Global Game Jam at Mount Saint Mary College.",
      detail: "Apply your new skills, join a team, collaborate with experienced creators, and help build a game over the weekend."
    }
  ],

  // One short message. Shown once per page, inside the learning journey.
  aiMessage: {
    text: "AI can help you get started. Your creativity makes the game yours.",
    note: "Optional. No AI tools or paid subscriptions are required to participate."
  },

  /* ------------------------------------------------------------------
   * Workshops (one per day, Monday to Thursday)
   * ------------------------------------------------------------------
   * status: "coming-soon" | "registration-open" | "registration-closed" | "recording-available"
   *   - "registration-open" without registrationUrl renders a non-interactive
   *     "Registration link coming soon" label (never a dead button).
   *   - "recording-available" without recordingUrl renders "Recording coming soon".
   *   - virtualUrl is shown only while registration is open.
   * Times use 24h "HH:MM" local time (America/New_York). Leave null until confirmed.
   * ------------------------------------------------------------------ */
  workshops: [
    {
      id: "workshop-1",
      date: "2027-01-25",
      title: null,
      description: null,
      outcome: null,
      instructor: null,
      instructorOrg: null,
      location: null,
      startTime: null,
      endTime: null,
      registrationUrl: null,
      virtualUrl: null,
      recordingUrl: null,
      status: "coming-soon"
    },
    {
      id: "workshop-2",
      date: "2027-01-26",
      title: null,
      description: null,
      outcome: null,
      instructor: null,
      instructorOrg: null,
      location: null,
      startTime: null,
      endTime: null,
      registrationUrl: null,
      virtualUrl: null,
      recordingUrl: null,
      status: "coming-soon"
    },
    {
      id: "workshop-3",
      date: "2027-01-27",
      title: null,
      description: null,
      outcome: null,
      instructor: null,
      instructorOrg: null,
      location: null,
      startTime: null,
      endTime: null,
      registrationUrl: null,
      virtualUrl: null,
      recordingUrl: null,
      status: "coming-soon"
    },
    {
      id: "workshop-4",
      date: "2027-01-28",
      title: null,
      description: null,
      outcome: null,
      instructor: null,
      instructorOrg: null,
      location: null,
      startTime: null,
      endTime: null,
      registrationUrl: null,
      virtualUrl: null,
      recordingUrl: null,
      status: "coming-soon"
    }
  ],

  // Friday is not a workshop day.
  kickoffDay: {
    date: "2027-01-29",
    title: "Team Formation, Orientation & Game Jam Kickoff",
    description: "No team? No problem. We'll help you meet teammates, get oriented, and start the jam together."
  },

  /* ------------------------------------------------------------------
   * Mentors (optional roster, rendered only when non-empty)
   * { name, role, org, url }
   * ------------------------------------------------------------------ */
  mentors: [],

  /* ------------------------------------------------------------------
   * Community (Discord)
   * ------------------------------------------------------------------ */
  community: {
    summary: "The GCHV Discord is our community hub before, during, and after the jam. We're setting up a dedicated space for Global Game Jam 2027.",
    features: [
      { id: "questions", title: "Ask workshop questions", text: "Get unstuck between sessions." },
      { id: "mentors", title: "Instructor follow-up and mentorship", text: "Instructors will be available to answer questions." },
      { id: "resources", title: "Resources and recordings", text: "Find shared materials and session recordings." },
      { id: "teams", title: "Find teammates", text: "Meet people to build with before the jam." },
      { id: "chat", title: "Community discussion", text: "Chat with local creators before and during the jam." }
    ]
  },

  /* ------------------------------------------------------------------
   * Global Game Jam
   * ------------------------------------------------------------------ */
  globalGameJam: {
    summary: "Global Game Jam is a worldwide event where people make games together over a weekend. Our site at Mount Saint Mary College welcomes game developers of all experience levels.",
    points: [
      "All experience levels welcome",
      "You don't need to arrive with a team",
      "We'll help beginners connect with experienced developers",
      "Free to participate"
    ]
  },

  /* ------------------------------------------------------------------
   * Get involved (instructors, mentors, supporters)
   * ------------------------------------------------------------------ */
  getInvolved: {
    headline: "Help Someone Make Their First Game",
    text: "We're bringing together local game creators to introduce a new generation to game development. Interested in teaching a workshop, mentoring participants, or supporting the event? We'd love to hear from you.",
    audiences: ["Game developers", "Artists", "Musicians", "Designers", "Educators", "Studios"]
  },

  /* ------------------------------------------------------------------
   * Presenting partners (equal recognition, keep order neutral)
   * logo: path to an approved logo file, or null for a text placeholder.
   * Never substitute an unofficial or recreated logo.
   * ------------------------------------------------------------------ */
  presentingPartners: [
    {
      name: "Game Creators Hudson Valley",
      url: "index.html",
      logo: "assets/ggj-2027/partners/gchv-256.png"
    },
    {
      name: "Syncretic Games",
      url: null,   // TODO: official URL
      // TODO: request a higher-resolution or SVG logo (current file is 84x44).
      logo: "assets/ggj-2027/partners/syncretic-games.png"
    },
    {
      name: "Mount Saint Mary College",
      url: "https://www.msmc.edu/",
      logo: "assets/ggj-2027/partners/msmc.jpg"
    }
  ],

  /* ------------------------------------------------------------------
   * Game Jam prize track sponsors
   * Prize details are NOT confirmed. Do not add prizes until they are.
   * ------------------------------------------------------------------ */
  prizeTracks: {
    status: "pending", // "pending" | "confirmed"
    pendingStatement: "Prize track details will be announced soon."
  },
  prizeSponsors: [
    { name: "Valley Games", url: null, logo: "assets/ggj-2027/partners/valley-games.png", track: null },
    { name: "Mana Potion", url: "https://manapotioncoffee.com/", logo: "assets/ggj-2027/partners/mana-potion.jpg", track: null },
    { name: "Syncretic Games", url: null, logo: "assets/ggj-2027/partners/syncretic-games.png", track: null }
  ],

  /* ------------------------------------------------------------------
   * FAQ
   * Answers may use these tokens, replaced with live links at render time:
   *   {contact}  organizer contact link (falls back to Discord)
   *   {discord}  GCHV Discord invite
   *   {involved} Get Involved CTA link
   *   {age}      current age policy statement (see agePolicy above)
   * ------------------------------------------------------------------ */
  faq: [
    {
      q: "What is Global Game Jam Jumpstart?",
      a: "A week of free, beginner-friendly workshops that help newcomers build practical game development skills before Global Game Jam. Jumpstart is designed mainly for college students, though other aspiring game developers are welcome, subject to participation policies."
    },
    {
      q: "Do I need experience?",
      a: "No experience necessary. Each workshop starts from zero. You don't need to know how to make games to help make one."
    },
    {
      q: "Do I have to attend every workshop?",
      a: "No. Each workshop stands on its own. Come to one or come to all four."
    },
    {
      q: "Is participation free?",
      a: "Yes. All Jumpstart workshops and the Global Game Jam are free."
    },
    {
      q: "Do I need to bring a computer?",
      a: "We recommend bringing your own laptop. If you don't have access to one, please {contact}. We'll do our best to accommodate you."
    },
    {
      q: "Can I participate remotely?",
      a: "Workshops will support remote participation where possible. Virtual attendance details will be posted with each workshop."
    },
    {
      q: "Will recordings be available?",
      a: "Workshops will be recorded, and we intend to publish recordings online afterward. Links will appear on each workshop once available."
    },
    {
      q: "Do I need a team?",
      a: "No. You don't need to arrive with a team. We'll help beginners connect with experienced developers and form teams at the jam."
    },
    {
      q: "Can I attend the game jam without attending Jumpstart?",
      a: "Yes. Global Game Jam welcomes game developers of all experience levels, whether or not you attend Jumpstart workshops."
    },
    {
      q: "Are there age restrictions?",
      a: "{age}"
    },
    {
      q: "How do I become an instructor or mentor?",
      a: "We'd love your help. {involved}"
    }
  ]
};
