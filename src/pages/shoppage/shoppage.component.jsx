import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux"

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"

import { updateCollections } from "../../redux/shop/shop.actions"

import WithSpinner from "../../components/with-spinner/with-spinner.component"

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../collection/collection.component';

// don't know why but when using class component it does not work
// class ShopPage extends React.Component {

//     unsubscribeFromSnapshot = null

//     componentDidMount() {
//         const { updateCollections } = this.props
//         const collectionRed = firestore.collection("collections")

//         collectionRed.onSnapshot(async snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
//             updateCollections(collectionsMap)
//         })
//     }

//     render() {
//         const match = this.props // other props: location, history
//         return (
//             <div className='shop-page'>
//                 <Route exact path={`${match.path}`} component={CollectionsOverview} />
//                 <Route path={`${match.path}/:collectionId`} component={CategoryPage} />
//             </div>
//         )
//     }

// };

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CategoryPageWithSpinner = WithSpinner(CategoryPage)

const ShopPage = ({ match, updateCollections }) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const { updateCollections } = this.props
        const collectionRef = firestore.collection("collections")

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            setLoading(false)
        })

        fetch("https://firestore.googleapis.com/v1/projects/distro-db/databases/(default)/documents/collections")
        .then(response => response.json()
        .then(collections => console.log(collections))
        )
    }, [updateCollections])

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`}
                render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
            />
            <Route path={`${match.path}/:collectionId`}
                render={(props) => <CategoryPageWithSpinner isLoading={loading} {...props} />}
            />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);