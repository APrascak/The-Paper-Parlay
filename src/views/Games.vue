<template>
    <div class="container">
        <h1 class="center">Upcoming Matches</h1>
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        <a class="btn" @click="logData()">Log Data</a>
        <div class="row" v-if="games">
            <ul class="collection with-header col m8 offset-m2" v-for="match in games.current_matches" :key="match.title">
                <li class="collection-header"><h4>{{ match.title }}</h4></li>
                <li class="collection-item"><div>{{ match.team1 }} +4.0<a class="secondary-content modal-trigger" href="#modal1"><i class="material-icons" @click="updateModal(match.team1, match.team1_score, match.title)">add_box</i></a></div></li>
                <li class="collection-item"><div>{{ match.team2 }} -4.0<a class="secondary-content modal-trigger" href="#modal1"><i class="material-icons" @click="updateModal(match.team2, match.team2_score, match.title)">add_box</i></a></div></li>
            </ul>
        </div>
        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
                <form @submit.prevent="">
                    <div>
                        <h4>{{ title }}</h4>
                    </div>
                    <h5>{{ team }} {{ line }} (-110)</h5>
                    <form>
                        Wager Amount: 
                        <div class="input-field inline">
                            <input id="email_inline" type="number" v-model="amount">
                            <label for="email_inline">Amount</label>
                            <!-- <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> -->
                        </div>
                        Return amount: {{ amount * (10 / 11) | round(2) }}
                        <div class="row">
                            <button class='btn' @click.prevent="placeBet()">
                                Place Bet
                            </button>
                        </div>
                    </form>
                    
                    <!-- <h5>{{ line }}</h5> -->
                    <!-- <div>
                        <label for="email" class="left black-text">Email address:</label>
                        <input type="text" name="email">
                    </div>
                    <div>
                        <label for="password" class="left black-text">Password: </label>
                        <input type="text" name="password">
                    </div>
                    <div>
                        <button>Sign up</button>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/init'
import round from 'vue-round-filter'
import firebase from 'firebase'

export default {
    name: 'Games',
    data() {
        return {
            // user: null,
            games: null,
            team: null,
            line: 0,
            winnings: 0,
            amount: 0,
            title: null
        }
    },
    filters: {
        round
    },
    methods: {
        logData() {
            console.log(this.games)
            // let ref = db.collection('bets').doc('test@test.com')
            // ref.getCollections().then(collections => {
            //     collections.forEach(collection => {
            //         console.log('Found subcollection with id:', collection.id);
            //     })
            // })

            db.collection("bets").doc("test@test.com").collection("bets").get().then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                })
            })
            // let allDocs = ref.get()
            // .then(snapshot => {
            //     snapshot.forEach(doc => {
            //         doc.listCollection
            //     })
            // })
            // console.log(allDocs)
            // ref.get().then(snapshot => {
            //     snapshot.forEach(doc => {
            //         console.log(doc)
            //     })
            // })
        },
        updateModal(team, spread, title) {
            this.team = team
            this.spread = spread
            this.title = title
        },
        placeBet() {
            console.log('BET TO BE PLACED:')
            console.log(this.team)
            console.log(this.spread)
            console.log(this.amount)
            this.winnings = Math.round((this.amount *(10 / 11)) * 100) / 100
            console.log(this.winnings)
        }
    },
    created() {
        let ref = db.collection('current_matches')
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.games = doc.data()
            })
        })
        console.log('This is printing the user in the created hook')
        console.log(this.user)
    },
    mounted() {
        let userRef = db.collection('users')
        userRef.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
            this.user = doc.data(),
            this.user.id = doc.id
            console.log('THIS IS THE USER INFORMATION')
            console.log(this.user)
            })
        })
        console.log('YEET')
    }
}
</script>

<style scoped>

</style>