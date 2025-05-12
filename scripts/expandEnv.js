const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const childProcess = require("child_process");

const myEnv = dotenv.config({ path: ".env" });
dotenvExpand.expand(myEnv);

const script = process.argv.slice(2).join(" ");
childProcess.execSync(script, { stdio: "inherit", env: process.env });
