import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './collections-overview.styles.scss';

import CollectionPreview from '../preview-collection/preview-collection.component';
import {selectCollectionForPreview} from '../../redux/shop/shop.selector';

const CollectionsOverview = ({collections}) =>(
    <div className='collections-overview'>
    {collections.map(({ id, ...other }) => (
        <CollectionPreview key={id} {...other} />
      ))}
   
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)