function rewrite(message){
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
};

function write(message){
  process.stdout.write(message);
};


module.exports = {
  rewrite: rewrite,
  write: write
};
