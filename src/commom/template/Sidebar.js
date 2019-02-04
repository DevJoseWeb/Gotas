import React, {Component} from 'react'
import {connect} from 'react-redux'
import Menu from './Menu'
import {bindActionCreators} from "redux"
import {logout} from "../../components/auth/AuthAction"
import { formatName } from '../../utils/utils';

class Sidebar extends Component {
    render() {
        return (
            <aside className="left-sidebar">

                <div className="scroll-sidebar">

                    <div className="user-profile" style={{background: "url(../assets/images/background/user-info.jpg) no-repeat"}}>

                        <div className="profile-img"><img src="../assets/images/users/profile.png" alt="user"/></div>

                        <div className="profile-text"><a href="#" className="dropdown-toggle u-dropdown" data-toggle="dropdown"
                                                         role="button" aria-haspopup="true" aria-expanded="true">{formatName(this.props.user.nome, false)}</a>
                            <div className="dropdown-menu animated flipInY">
                                <a href="#" onClick={this.props.logout} className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
                            </div>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <Menu/>
                    </nav>

                </div>

            </aside>
        );
    }
}

const mapStateToProps = state =>(
    {
        user: state.authStore.user
    }
)

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

