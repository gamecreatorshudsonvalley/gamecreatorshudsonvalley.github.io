tsParticles.load("particles-bg", {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#808080",
    },
    shape: {
      type: "image",
      options: {
        image: [
          { src: "assets/emojis/dice.svg", width: 100, height: 100 },
          { src: "assets/emojis/art.svg", width: 100, height: 100 },
          { src: "assets/emojis/music.svg", width: 100, height: 100 },
          { src: "assets/emojis/handshake.svg", width: 100, height: 75 },
          { src: "assets/emojis/memo.svg", width: 100, height: 100 },
          { src: "assets/emojis/programming.svg", width: 100, height: 100 }
        ]
      }
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 10, max: 20 },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: .5,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  detectRetina: true,
});