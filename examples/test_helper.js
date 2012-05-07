module.exports = {
  output: function (err, res) {
    process.stdout.write(err ? 'F' : '.');
  }
}
