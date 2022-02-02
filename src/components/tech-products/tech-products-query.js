import { Query, Field } from '@tilework/opus';

const techProductsQuery = new Query('category', true)
  .addArgument('input', 'CategoryInput', { title: 'tech' })
  .addField(
    new Field('products', true)
      .addField(new Field('name'))
      .addField(
        new Field('prices', true)
          .addField(
            new Field('currency').addField(new Field('label'))
          )
          .addField(new Field('amount'))
      )
      .addField(new Field('gallery'))
  );

export default techProductsQuery;
