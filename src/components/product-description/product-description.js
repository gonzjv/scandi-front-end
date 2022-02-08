import { client, Field, Query } from '@tilework/opus';
import React from 'react';
import { useParams } from 'react-router-dom';
import getDescriptionQuery from './get-description-query.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = DESCRIPTION_INITIAL_STATE;
  }

  async componentDidMount() {
    const id = this.props.params.id;
    const products = await client.post(getDescriptionQuery(id));
    this.setState({ data: products });
  }

  render() {
    const { data } = this.state;
    console.log('data:', data);
    return (
      <main className="description">
        <p>Name: {data.product.name} </p>
        <p
          dangerouslySetInnerHTML={{
            __html: data.product.description,
          }}
        />
      </main>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter(ProductDescription);
