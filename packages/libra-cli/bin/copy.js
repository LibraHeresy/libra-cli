const copydir = require('copy-dir')
const fs = require('fs')

const mkdirp = (dir) => {
  if (fs.existsSync(dir)) { return true }
  const dirname = path.dirname(dir);
  mkdirp(dirname);
  fs.mkdirSync(dir);
}

const mkdirGuard = (target) => {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target)
  }
}

const copyDir = (from, to, options) => {
  copydir.sync(from, to, options)
}

const checkMkdirExists = (path) => {
  return fs.existsSync(path)
}

exports.mkdirGuard = mkdirGuard;
exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
