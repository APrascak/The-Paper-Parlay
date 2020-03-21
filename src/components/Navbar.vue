<template>
    <nav>
        <div class="nav-wrapper green">
            <a href="#" class="brand-logo center">The Paper Parley</a>
            <ul id="nav-mobile" class="right">
                <li><router-link :to="{ name: 'About'}">Upcoming Games</router-link></li>
                <li><router-link :to="{ name: 'About'}">Active Bets</router-link></li>
                <li><router-link :to="{ name: 'About'}">Profile</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
import M from 'materialize-css'

export default {
    name: 'Navbar',
    data() {
        return {
            user: null
        }
    },
    methods: {

    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user
                console.log(user)
            } else {
                this.user = null
            }
        })
    },
    mounted() {
        M.AutoInit()
    }
}
</script>

<style>

</style>