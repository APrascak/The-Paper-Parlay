<template>
    <div>
        <h2>Login page</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email" class="left black-text">Email address:</label>
                <input type="text" name="email" v-model="email">
            </div>
            <div>
                <label for="password" class="left black-text">Password:</label>
                <input type="text" name="password" v-model="password">
            </div>
            <div>
                <button>Sign up</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '../firebase/init'
import firebase from 'firebase'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            user: null
        }
    },
    methods: {
        login() {
            if (this.email && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    console.log(cred.user)
                    this.$router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                console.log('Please enter both a username and password.')
            }
        }
    },
    created() {
        let ref = db.collection('users')

        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
                console.log(this.user)
            })
        })
        .then(() => {
            if (this.user) {
                this.$router.push({ name: 'About' })
            }
        })
    }
}
</script>

<style scoped>

</style>