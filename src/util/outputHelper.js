const readline = require('readline');

function rewrite(message){
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write(message);
};

function write(message){
  process.stdout.write(message);
};


module.exports = {
  rewrite: rewrite,
  write: write
};
