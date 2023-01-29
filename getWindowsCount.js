
module.exports.getWindowsCount = () => {
  return new Promise((resolve) => {
    resolve(window.length);
  });
};
