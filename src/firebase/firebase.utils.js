import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyBTVsQE8gLdOVCjvbmTajqEw0Ao0vau0ng',
    authDomain: 'e-commerce-db-61d27.firebaseapp.com',
    projectId: 'e-commerce-db-61d27',
    storageBucket: 'e-commerce-db-61d27.appspot.com',
    messagingSenderId: '495248365524',
    appId: '1:495248365524:web:086ab59d9ae68ddfe5e841',
    measurementId: 'G-0PDFJLPJD6',
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
