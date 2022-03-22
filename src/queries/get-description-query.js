import { Field, Query } from '@tilework/opus';

const fieldList = [
  'name',
  'description',
  'category',
  'inStock',
  'brand',
  'gallery',
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
    )
    .addField(
      new Field('prices', true)
        .addField(
          new Field('currency')
            .addField(new Field('label'))
            .addField(new Field('symbol'))
        )
        .addField(new Field('amount'))
    );

export default getDescriptionQuery;
