import { Query, Field } from '@tilework/opus';

const ClothesProductsQuery = new Query('category', true)
  .addArgument('input', 'CategoryInput', { title: 'clothes' })
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

export default ClothesProductsQuery;
