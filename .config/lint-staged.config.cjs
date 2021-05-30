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
      input.push(path.join("./", p.split("/").join(path.sep)))
    }

    let ignored = {}
    for (const file of input) {
      const dir = file.split(path.sep)
      const lines = fs.readFileSync(file, { encoding: "utf8" }).split(/\r?\n/g)

      for (let line of lines.filter(Boolean)) {
        if (line[0] === "/") {
          line = line.slice(1, line.length)
        }
        if (!!ignored[dir.slice(0, dir.length - 1).join("/")] === false) {
          ignored[dir.slice(0, dir.length - 1).join("/")] = []
        }
        ignored[dir.slice(0, dir.length - 1).join("/")].push(line)
      }
    }

    for (const [dir, lines] of Object.entries(ignored)) {
      for (let line of lines) {
        if (!!dir === false) {
          str += `|${line}`
          continue
        }
        str += `|${dir}/${line}`
      }
    }

    // Remove leading pipe
    return str.slice(1, str.length)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  // [`**/!(${gatherIgnoreFiles()})/*.{js,ts,json,graphql,svelte}`]: ["eslint"],
  [`**/!(${gatherIgnoreFiles()})/*.{js,ts,json,graphql}`]: ["eslint"],
}
