import { client, Field, Query } from '@tilework/opus';
import React from 'react';
import { useParams } from 'react-router-dom';

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const products = await client.post(
      new Query('category', true)
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
        )
    );
    this.setState({ data: products });
  }

  render() {
    return (
      <div>
        I am description
        {console.log('this.props', this.props)}
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter(ProductDescription);
