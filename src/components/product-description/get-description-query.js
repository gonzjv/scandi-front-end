import { Field, Query } from '@tilework/opus';

const fieldList = [
  'name',
  'description',
  'category',
  'inStock',
  'brand',
];

const getDescriptionQuery = (id) =>
  new Query('product')
    .addArgument('id', 'String!', id)
    .addFieldList(fieldList)
    .addField(
      new Field('attributes', true)
        .addField(new Field('name'))
        .addField(
          new Field('items', true).addField(new Field('displayValue'))
        )
    );

export default getDescriptionQuery;
