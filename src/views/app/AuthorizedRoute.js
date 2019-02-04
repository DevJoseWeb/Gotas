import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class AuthorizedRoute extends React.Component {

    render() {
        const { component: Component, user, ...rest } = this.props

        return (
            <Route {...rest} render={props => {
                return (user)
                    ? <Component {...props} />
                    : <Redirect to="/auth/login" />
            }} />
        )
    }
}

const mapStateToProps = state => ({ user: state.authStore.user })
export default connect(mapStateToProps)(AuthorizedRoute)