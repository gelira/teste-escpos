const express = require('express');
const EscPosEncoder = require('esc-pos-encoder');

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
    min
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

  const encoder = new EscPosEncoder();
  const encoded = encoder
    .initialize()
    .codepage('windows1258')
    .align('center')
    
    .bold(true)
    .underline(true)
    .line('CASHBACK')
    .underline(false)
    .bold(false)
    
    .line('Você ganhou R$' + value + ' em')
    .line(restaurantname)

    .line('Ganhe ' + perc + '% de Cashback em seus pedidos')
    .line('feitos pelo aplicativo')

    .line('Resgate esse Cashback pelo QRCode')
    .qrcode(link)
    .newline()
    .line('Ou resgate utilizando o código ' + code)

    .line('Acima de R$' + min + ' você usa seu crédito em')
    .line('desconto no seu próximo pedido')

    .line('Este QRCode é válido até ' + validate)
    .line('e só pode ser usado uma vez')
    .line('By SocialPlace')
    
    .encode();

  const receipt = Buffer.from(encoded).toString('base64');
  return response.json({ receipt });
});

app.listen(9876);
