import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserManagement extends Component {
    state = {
        keyword: "",
    }


    renderUserList = () => {
        const data = this.props.userList.filter(ele => {
            return ele.name.toLowerCase().trim().indexOf(this.state.keyword.toLowerCase().trim()) !== -1
        })

        return data.map((ele, idx) => {
            const { id, maSV, name, phoneNumber, email } = ele;


            return (
                <tr key={id} className={`${idx % 2 !== 0 && 'bg-light'}`}>
                    <th>{idx + 1}</th>
                    <th>{maSV}</th>
                    <td>{name}</td>
                    <td>{phoneNumber}</td>
                    <td>{email}</td>
                    <td>
                        <button
                            onClick={() => {
                                this.props.dispatch({
                                    type: 'SET_SELECTED_USER',
                                    payload: ele,
                                })
                            }}
                            className='btn btn-primary outline-none me-2'>
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                this.props.dispatch({
                                    type: 'DELETE_USER',
                                    payload: ele,
                                })
                            }}
                            className='btn btn-danger'>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="mt-4">
                <input
                    onChange={this.handleChange}
                    name="keyword"
                    type='text'
                    placeholder='Search by Full name'
                    className='form-control'
                />
                <table className='table mt-3'>
                    <thead
                        style={
                            {
                                backgroundColor: '#303439',
                                color: 'white'
                            }
                        }
                    >
                        <tr>
                            <th scope='col'>STT</th>
                            <th scope="col">Mã SV</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.FormReducer
    }
}

export default connect(mapStateToProps)(UserManagement)