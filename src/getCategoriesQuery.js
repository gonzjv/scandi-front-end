import { Query, Field } from '@tilework/opus';

const GetCategoriesQuery = () =>
  new Query('categories', true).addField(new Field('name', true));

export default GetCategoriesQuery;
