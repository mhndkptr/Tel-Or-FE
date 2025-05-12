const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const childProcess = require("child_process");

const myEnv = dotenv.config({ path: ".env" });
dotenvExpand.expand(myEnv);

console.log("APP_PORT:", process.env.APP_PORT);

const env = {
  ...process.env,
  PORT: process.env.APP_PORT,
};

const script = process.argv.slice(2).join(" ");
childProcess.execSync(script, { stdio: "inherit", env: env });
