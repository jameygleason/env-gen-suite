/* eslint-disable */
import dotenv from "dotenv"

dotenv.config()

console.log("TEST:", process.env.TEST)
console.log("TEST WRAPPED", `"${process.env.TEST}"`)

console.log("\n")

console.log("TEST_QUOTED", process.env.TEST_QUOTED)
console.log("TEST_QUOTED WRAPPED", `"${process.env.TEST_QUOTED}"`)

console.log("\n")

console.log("TEST_COMMENTS", process.env.TEST_COMMENTS)
console.log("TEST_COMMENTS WRAPPED", `"${process.env.TEST_COMMENTS}"`)

console.log("\n")

console.log("TEST_COMMENTS_QUOTED", process.env.TEST_COMMENTS_QUOTED)
console.log("TEST_COMMENTS_QUOTED WRAPPED", `"${process.env.TEST_COMMENTS_QUOTED}"`)
