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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('Error creating user', error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey)
    const batch = firestore.batch()
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })
    return await batch.commit()
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
