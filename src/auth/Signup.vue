<template>
    <div>
        <h2 class="center">User Registration</h2>

        <form @submit.prevent="signup">
            <h3 class="black-text">Signup</h3>
            <div>
                <label for="email" class="left black-text">Email address:</label>
                <input type="text" name="email" v-model="email">
            </div>
            <div>
                <label for="password" class="left black-text">Password:</label>
                <input type="text" name="password" v-model="password">
            </div>
            <div>
                <label for="password" class="left black-text">Confirm Password:</label>
                <input type="text" name="password" v-model="confirm">
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
            confirm: null
        }
    },
    methods: {
        signup() {
            if (this.email && this.password && (this.password == this.confirm)) {
                let ref = db.collection('users').doc(this.email)
                ref.get().then(doc => {
                    if (doc.exists) {
                        console.log('This email is already in use')
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            console.log(cred)
                            ref.set({
                                user_id: cred.user.uid,
                                user_email: cred.user.email
                            })
                        }).then(() => {
                            this.$router.push({ name: 'About' })
                        })
                        .catch (err => {
                            console.log(err)
                        })
                    }
                })
            }
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>