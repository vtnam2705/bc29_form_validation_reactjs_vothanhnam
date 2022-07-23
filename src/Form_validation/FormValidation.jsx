import React, { Component } from 'react'
import UserManagement from './UserManagement'
import RegisterForm from './RegisterForm'

export default class FormValidation extends Component {
    render() {
        return (
            <div>
                <div className='container'>
                    <RegisterForm />
                    <UserManagement />
                </div>
            </div>
        )
    }
}
