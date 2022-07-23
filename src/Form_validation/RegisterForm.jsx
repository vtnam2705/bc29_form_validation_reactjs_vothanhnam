import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'

import { addAction } from '../Store/action/FormAction'

const DEFAULT_USER = {
    id: '',
    maSV: '',
    name: '',
    phoneNumber: '',
    email: '',
}

class RegisterForm extends Component {
    state = {
        values: DEFAULT_USER,

        errors: {
            id: '',
            maSV: '',
            name: '',
            phoneNumber: '',
            email: '',
        }
    }

    // Tham chiếu tới thẻ DOM để xác định có giá trị để set disable cho button "Thêm sinh viên"
    formRef = createRef();

    // LifeCycle
    static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.selectedUser && currentState.values.id !== nextProps.selectedUser.id) {
            currentState.values = nextProps.selectedUser;
        }

        return currentState;
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            },
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()


        if (!event.target.checkValidity()) {
            return;
        }

        this.props.dispatch({
            type: this.props.selectedUser ? 'UPDATE_USER' : 'ADD_USER',
            payload: this.state.values
        })

        this.setState({
            values: DEFAULT_USER
        }, () => {
            this.forceUpdate()
        })
    }


    handleBlur = (event) => {
        const {
            title,
            name,
            minLength,
            maxLength,
            // validationMessage,
            validity: { valueMissing, patternMismatch, tooLong, tooShort }
        } = event.target;

        let message = ''

        if (patternMismatch) {
            message = `${title} is invalid pattern.`
        }

        if (tooShort || tooLong) {
            message = `${title} from ${minLength} - ${maxLength} characters.`
        }

        if (valueMissing) {
            message = `${title} is required.`
        }

        this.setState({
            errors: {
                ...this.state.errors,
                [name]: message
            }
        })
    }

    render() {
        const {
            maSV,
            name,
            phoneNumber,
            email
        } = this.state.values || {};


        return (
            <div>
                <div style={
                    {
                        backgroundColor: '#303439'
                    }
                }>
                    <h1 className='text-white pt-2 pb-2'>THÔNG TIN SINH VIÊN</h1>
                </div>

                <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
                    <div className="row g-4 flex-wrap">
                        <div className="col-6">
                            {/* Name input */}
                            <div className="form-outline d-flex flex-column align-items-start">
                                <label>Mã SV</label>
                                <input
                                    required
                                    title='StudentID'
                                    type="text"
                                    className="form-control"
                                    name='maSV'
                                    value={maSV}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                />
                                {
                                    this.state.errors.maSV &&
                                    (<span className='text-danger'>
                                        {this.state.errors.maSV}
                                    </span>)
                                }
                            </div>
                        </div>

                        <div className="col-6">
                            {/* Email input */}
                            <div className="form-outline d-flex flex-column align-items-start">
                                <label>Họ tên</label>
                                <input
                                    required
                                    title='Fullname'
                                    minLength={4}
                                    maxLength={12}
                                    type="text"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                />
                                {
                                    this.state.errors.name &&
                                    (<span className='text-danger'>
                                        {this.state.errors.name}
                                    </span>)
                                }
                            </div>
                        </div>

                        <div className="col-6">
                            {/* Phone number input */}
                            <div className="form-outline d-flex flex-column align-items-start">
                                <label>Số điện thoại</label>
                                <input
                                    required
                                    title='Phone number'
                                    type="text"
                                    className="form-control"
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                />
                                {
                                    this.state.errors.phoneNumber &&
                                    (<span className='text-danger'>
                                        {this.state.errors.phoneNumber}
                                    </span>)
                                }
                            </div>
                        </div>

                        <div className="col-6">
                            {/* Phone number input */}
                            <div className="form-outline d-flex flex-column align-items-start">
                                <label>Email</label>
                                <input
                                    required
                                    title='Email'
                                    type="email"
                                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                />
                                {
                                    this.state.errors.email &&
                                    (<span className='text-danger'>
                                        {this.state.errors.email}
                                    </span>)
                                }
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!this.formRef.current?.checkValidity()}
                        className='btn btn-success mt-4 me-2'>
                        Thêm sinh viên
                    </button>
                    <button type='reset' className='btn btn-warning mt-4'>Reset</button>
                </form>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.FormReducer
    }
}

export default connect(mapStateToProps)(RegisterForm)
