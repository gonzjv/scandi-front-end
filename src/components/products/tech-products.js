import React from 'react';
import { Query, client, Field } from '@tilework/opus';

client.setEndpoint('http://localhost:4000/');

const productFields = ['name', 'category'];

// const productQuery = new Query('categories', true)
//   .addField(new Field('name'))
//   .addField(new Field('products').addFieldList(productFields));

const productQuery = new Query('category', true)
  .addArgument('input', 'CategoryInput', { title: 'tech' })
  .addField(new Field('name'))
  .addField(new Field('products').addFieldList(productFields));
// .addArgument('id', 'String!', 'huarache-x-stussy-le')
// .addFieldList(productFields);

class TechProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        categories: [
          {
            name: 'loading...',
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
    console.log('state', this.state);
    // console.log('data.product.name', this.data.product.name);
  }
  render() {
    const { data } = this.state;
    // console.log('data.product.name :', data.product.name);
    return (
      <>
        YoYo
        {/* {data.categories.map((el) => (
          <div key={el.name}>
            {el.name}
            {el.products.map((el) => (
              <div key={el.name}>
                {el.category} : {el.name}
              </div>
            ))}
          </div>
        ))} */}
      </>
    );
  }
}

export default TechProducts;
