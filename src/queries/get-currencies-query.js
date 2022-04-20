import { Query, Field } from '@tilework/opus';

const GetCurrenciesQuery = () =>
  new Query('currencies', true)
    .addField(new Field('label'))
    .addField(new Field('symbol'));

export default GetCurrenciesQuery;
