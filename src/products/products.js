import React from 'react';
import { Query, client, Field } from '@tilework/opus';

client.setEndpoint('http://localhost:4000/');

const productFields = ['name', 'category'];

const productQuery = new Query('categories', true)
  .addField(new Field('name'))
  .addField(new Field('products').addFieldList(productFields));
// .addArgument('id', 'String!', 'huarache-x-stussy-le')
// .addFieldList(productFields);

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        categories: [
          {
            products: [
              { name: 'loading...', category: 'loading...' },
            ],
          },
        ],
      },
    };
  }

  async componentDidMount() {
    const products = await client.post(productQuery);
    this.setState({ data: products });
    // console.log('state', this.state);
    // console.log('data.product.name', this.data.product.name);
  }
  render() {
    const { data } = this.state;
    const clothes = data.categories[1];
    console.log('clothes :', clothes);
    console.log('data :', data);
    // console.log('data.product.name :', data.product.name);
    return (
      <>
        YoYo
        {data.categories.map((el) => (
          <div key={el.name}>
            {el.name}
            {el.products.map((el) => (
              <div key={el.name}>
                {el.category} : {el.name}
              </div>
            ))}
          </div>
        ))}
      </>
    );
  }
}

export default Products;
