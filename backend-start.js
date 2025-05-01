const { exec } = require("child_process");
const os = require("os");

const command = os.platform() === "win32"
  ? "cd Backend && gradlew.bat bootRun"
  : "cd Backend && ./gradlew bootRun";

const child = exec(command, { stdio: "inherit", shell: true });

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
