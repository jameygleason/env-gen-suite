import colors from "./colors.js"

const themes = {
  main: {
    "root-size": "16px",
    "nav-height": "90px",
    "hh-nav-height": "52px",

    display: "Montserrat, sans-serif",
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: "menlo, inconsolata, monospace",

    "ds-text": colors.blue[600],
    "ds-text_i": colors.white,
    text: colors.gray[800],
    "lt-text": colors.gray[700],
    "dk-text": colors.gray[900],
    text_i: colors.white,
    "ac-text": colors.cyan[500],

    hover: colors.blue[500],
    hover_i: colors.white,

    active: colors.blue[400],
    active_i: colors.white,

    bg: colors.white,
    bg_i: colors["blue-gray"][800],

    "focus-ring": `0 0 0 2px ${colors.cyan[200]}`,
    "focus-ring_i": `0 0 0 2px ${colors.green[400]}`,
  },
  dark: {
    text: colors.white,
    text_i: colors.black,
    bg: colors.black,
    bg_i: colors.blue[100],
  },
  blue: {
    text: colors.white,
    text_i: colors.blue[600],
    bg: colors.blue[600],
    bg_i: colors.white,
  },
  purple: {
    text: colors.white,
    text_i: colors.white,
    bg: colors.purple[600],
    bg_i: colors.green[300],
  },
  red: {
    text: colors.white,
    text_i: colors.red[900],
    bg: colors.red[400],
    bg_i: colors.gray[50],
  },
}

export default themes
