const express = require('express');
const EscPosEncoder = require('esc-pos-encoder');

const { qrcodeBema } = require('./bema');
const { qrcodePerto } = require('./perto');
const { fontSizeESCPOS } = require('./escpos');

const app = express();
app.use(express.json());

app.post('/cashback-manual', (request, response) => {
  const {
    code,
    link,
    value,
    validate,
    restaurantname,
    perc,
    min,
    tipo
  } = request.body;

  if (
    code === undefined || 
    link === undefined || 
    value === undefined || 
    validate === undefined || 
    restaurantname === undefined ||
    perc === undefined ||
    min === undefined
  ) {
    return response.status(400).json({ detail: 'Enviar todos os dados' });
  }

  let encoder = new EscPosEncoder();
  encoder = encoder
    .initialize()
    .codepage('cp1252')
    .align('center')
    
    .bold(true)
    .raw(fontSizeESCPOS({ width: 3, height: 3 }))
    .line('$ CASHBACK $')
    .newline()
    
    .raw(fontSizeESCPOS({ height: 2 }))
    .align('left')
    .text('Voce ganhou R$' + value + ' em ')
    .line(restaurantname.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() + '.')
    .bold(false)
    .newline()

    .line('Ganhe ' + perc + '% de Cashback em seus pedidos\nfeitos pelo aplicativo.')
    .newline()
    .align('center')
    .line('Resgate esse Cashback pelo QRCode');

  if (tipo === 'bema') {
    encoder = encoder.raw(qrcodeBema(link));
  }
  else if (tipo === 'perto') {
    encoder = encoder.raw(qrcodePerto(link));
  }
  else {
    encoder = encoder.qrcode(link);
  }

  encoder = encoder
    .newline()
    .align('left')
    //.line('Ou resgate utilizando o codigo ' + code)
    .raw(fontSizeESCPOS({}))
    .line('Acima de R$' + min + ' voce usa seu credito em\ndesconto no seu proximo pedido.')
    .line('Este QRCode e valido ate ' + validate + ' e so\npode ser usado uma vez.')

    .align('center')
    .raw(fontSizeESCPOS({ height: 2 }))
    .line('By Social Place')
    .line('----------')

    .newline()
    .newline()
    .newline()
    .cut('full');

  const receipt = Buffer.from(encoder.encode()).toString('base64');
  return response.json({ receipt });
});

app.listen(9876);
