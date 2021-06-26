import SignIn from '../../components/sign-in/sign-in'
import SignUp from '../../components/sign-up/sign-up'
import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles'

const SignInAndSignUp = () => (
    <SignInAndSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpContainer>
)

export default SignInAndSignUp
