import { Component } from 'react'
import { signInWithGoogle } from '../../firebase/firebase.utils'
import CustomButton from '../custom-button.jsx/custom.button'
import FormInput from '../form-input/form-input'
import './sign-in.styles.scss'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ email: '' })
    }
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="email"
                        required
                        onChange={this.handleChange}
                    />
                    <FormInput
                        type="password"
                        label="password"
                        name="password"
                        value={this.state.password}
                        required
                        onChange={this.handleChange}
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
