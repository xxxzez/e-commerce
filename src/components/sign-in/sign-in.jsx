import { Component } from 'react'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input'
import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer,
} from './sign-in.styles'
class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault()

        const { email, password } = this.state
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }
    }
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
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
                    <ButtonsBarContainer>
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton
                            type="button"
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        )
    }
}

export default SignIn
