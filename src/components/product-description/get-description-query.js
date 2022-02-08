import { Field, Query } from '@tilework/opus';

const getDescriptionQuery = (id) =>
  new Query('product')
    .addArgument('id', 'String!', id)
    .addField(new Field('name'))
    .addField(new Field('description'));

export default getDescriptionQuery;
