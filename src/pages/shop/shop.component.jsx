import React from "react";
import SHOPDATA from "./shop.data";

import CollectionPreview from "../../components/preview-collection/preview-collection.component";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: SHOPDATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...other }) => (
          <CollectionPreview key={id} {...other} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
