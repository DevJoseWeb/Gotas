import React, {Component} from 'react'
import { connect } from 'react-redux'

import '../template/custom.css'

class Preloader extends Component {

    render() {
        if (this.props.isLoading) {
            return (
                <div className="loader"></div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = state =>({
    isLoading : state.loadingStore.isLoading
})

export default connect(mapStateToProps)(Preloader);
