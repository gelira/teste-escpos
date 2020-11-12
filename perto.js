const iconv = require('iconv-lite');

function qrcodePerto(data) {
  let bytes = iconv.encode(data, 'iso88591');
  let length = Math.trunc(bytes.length) + 3;

  let l1 = Math.trunc(length % 256);
  let l2 = Math.trunc(length / 256);

  let lista = [];
  lista.push(29, 40, 107, 4, 0, 49, 65, 50, 0);
  lista.push(29, 40, 107, 3, 0, 49, 67, 7);
  lista.push(29, 40, 107, 3, 0, 49, 69, 48);
  lista.push(29, 40, 107, l1, l2, 49, 80, 48);
  lista.push(bytes);
  lista.push(29, 40, 107, 3, 0, 49, 81, 48);

  return lista;
}

module.exports = { 
  qrcodePerto
};
