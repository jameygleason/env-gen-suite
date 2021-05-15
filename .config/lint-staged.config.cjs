const fs = require("fs")
const path = require("path")

const ignoreFiles = [
  ".eslintignore",
  "package/.eslintignore",
  "examples/sapper/.eslintignore",
  "examples/kit/.eslintignore",
]

function gatherIgnoreFiles() {
  try {
    let str = ""
    let input = []

    for (const p of ignoreFiles) {
      input.push(path.join(__dirname, "../", p.split("/").join(path.sep)))
    }

    for (const file of input) {
      const contents = fs.readFileSync(file, { encoding: "utf8" })

      const lines = contents.split(/\r?\n/g)

      for (const line of lines) {
        str += `,!(../**/*${line})`
      }
    }

    return str
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  [`../**/*.(js|ts|json|graphql|svelte),${gatherIgnoreFiles()}`]: [
    "eslint",
    "prettier --write",
  ],
}
