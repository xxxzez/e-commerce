import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'
import CheckoutPage from './pages/checkout/checkout'

class App extends Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    })
                })
            }
            setCurrentUser(userAuth)
        })
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUp />
                            )
                        }
                    />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
