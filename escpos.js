function fontSizeESCPOS(size = 'normal') {
  let lista = [29, 33];
  
  switch (size) {
    case 'double':
      lista.push(17);
      break;
  
    case 'triple':
      lista.push(33);
      break;

    default:
      lista.push(0);
      break;
  }

  return lista;
}

module.exports = {
  fontSizeESCPOS
};
