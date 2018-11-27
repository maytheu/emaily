import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PaymentGateway from './PaymentGateway'

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return
            case false:
                return (
                    [
                        <li key="1"><a href="auth/google">Login with Google</a></li>,
                        <li key="2"><a href="auth/facebook">Login with Facebook</a></li>
                    ]
                )
            default:
                return [
                    <li key="1"><PaymentGateway /></li>,
                    <li key="3" style={{margin: '0 10px'}}>credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">LogOut</a></li>
                ];
                
        }
    } 
    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} 
                    className="left brand-logo" >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }){ //from reducer/index
    return { auth }
}

export default connect(mapStateToProps)(Header)