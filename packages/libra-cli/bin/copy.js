const copydir = require("copy-dir");
const fs = require("fs");
const Mustache = require("mustache");
const path = require("path");

// 创建文件夹
const mkdirp = (dir) => {
  if (fs.existsSync(dir)) {
    return true;
  }
  const dirname = path.dirname(dir);
  mkdirp(dirname);
  fs.mkdirSync(dir);
};

// 文件夹守卫
const mkdirGuard = (target) => {
  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target);
  }
};

// 复制文件夹
const copyDir = (from, to, options) => {
  mkdirGuard(to);

  copydir.sync(from, to, options);
};

// 检查文件夹是否存在
const checkMkdirExists = (path) => {
  return fs.existsSync(path);
};

// 复制文件
function copyFile(from, to) {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath);

  fs.writeFileSync(to, buffer);
}

exports.copyFile = copyFile;

// 读取模板文件
const readTemplate = (path, data = {}) => {
  const str = fs.readFileSync(path, { encoding: "utf8" });
  return Mustache.render(str, data);
};

// 复制模板文件
const copyTemplate = (from, to, data = {}) => {
  if (path.extname(from) !== ".tpl") {
    return copyFile(from, to);
  }
  const parentToPath = path.dirname(to);
  mkdirGuard(parentToPath);
  fs.writeFileSync(to, readTemplate(from, data));
};

exports.mkdirGuard = mkdirGuard;
exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
exports.readTemplate = readTemplate;
exports.copyTemplate = copyTemplate;
