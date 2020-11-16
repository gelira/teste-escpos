function fontSizeESCPOS({ width = 1, height = 1 }) {
  let lista = [29, 33];

  let c = 0;

  switch (width) {
    case 3:
      c += 32;
      break;
  
    case 2:
      c += 16;
      break;

    default:
      break;
  }

  switch (height) {
    case 3:
      c += 2;
      break;
  
    case 2:
      c += 1;
      break;

    default:
      break;
  }

  lista.push(c);
  return lista;
}

module.exports = {
  fontSizeESCPOS
};
