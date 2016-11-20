async function nfcall(){
  return new Promise((resolve, reject) => {
    let fun = Array.prototype.shift.call(arguments);
    Array.prototype.push.call(arguments, function(err, data){
      if(err){
        reject(err);
      }
      resolve(data);
    });
    fun.apply(fun, arguments)
  });
};

async function filter(array, filter) {
  return Promise.all(array.map(entry => filter(entry)))
    .then(bits => array.filter(entry => bits.shift()));
}

module.exports = {
  nfcall: nfcall,
  filter: filter
}
