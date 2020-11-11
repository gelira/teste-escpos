const iconv = require('iconv-lite');

function qrcodeBema(data) {
  let bytes = iconv.encode(data, 'iso88591');
  let length = Math.trunc(bytes.length);

  let lista = [];
  lista.push(29, 107, 81);
  lista.push(1, 6, 8, 1);
  lista.push(Math.trunc(length % 255), Math.trunc(length / 255), bytes);

  return lista;
}

module.exports = { 
  qrcodeBema
};
