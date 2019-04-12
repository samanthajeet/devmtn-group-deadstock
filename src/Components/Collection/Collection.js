import React, {Component} from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { withRouter } from "react-router";

class Collection extends Component {

    state = {
        collection: []
    }

    componentDidMount(){
        console.log('collection component')
        this.getCollection();
    }

    getCollection = async () =>{
        const response = await axios.get(`/api/collection`)
        console.log(response.data)
        this.setState({ collection: response.data })
    }


    render(){
        const mappedCollection = this.state.collection.map( shoe => {
            return (
                <div key={shoe.shoe_id}>
                    <ProductCard
                        model={shoe.model}
                        colorway={shoe.colorway}
                        price={shoe.price}
                        description={shoe.description}
                        shoe_id={shoe.shoe_id}
                        image={shoe.image_1_url}
                        history={this.props.history}

                    />
                </div>
            )
        })
        return(
            <>
              {mappedCollection}
            </>
        )
    }
}

export default withRouter(Collection)