const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');
const { execSync } = require('child_process');

(function main() {
  // Angular LTS
  const cli = '@angular/cli';
  const distTags = execSync(`npm view ${cli} dist-tags`).toString();
  const json = distTags.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');
  const tags = JSON.parse(json);
  for (const key in tags) {
    if (key.match(/v\d+-lts|latest/)) {
      const version = tags[key];
      const tag = 'v' + version.split('.')[0] + '-lts';
      const dir = resolve(__dirname, tag);
      try {
        const config = readFileSync(`${dir}/package.json`).toString();
        const pattern = new RegExp(`"${cli}": "(?:^|~)${version.replace(/\./g, '\\.')}"`);
        if (config.match(pattern)) {
          continue;
        }
      } catch (error) {}
      log(`Update ${cli}@${tag} to ${version}`, 32);
      if (existsSync(dir)) {
        run(`rm -rf ${dir}`);
      }
      run(`npm i -g ${cli}@${version}`);
      run(`ng new angular-lts --directory ${tag} -S -g --skip-install --routing false --style scss`);
    }
  }
})();

function log(message, color) {
  if (color) {
    message = '\x1b[' + color + 'm' + message + '\x1b[0m';
  }
  console.log(message);
}

function run(cmd) {
  log(cmd);
  execSync(cmd);
}
