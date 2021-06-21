import './App.css'
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { Component } from 'react'

class App extends Component {
    constructor() {
        super()
        this.state = {
            currentUser: null,
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot((snapshot) => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    })
                })
            }
            this.setState({ currentUser: userAuth })
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
                    <Route path="/signIn" component={SignInAndSignUp} />
                </Switch>
            </div>
        )
    }
}

export default App
