<template>
  <div class="about">
    <h1>Page for requesting from Odds API</h1>
    <table>
      <thead>
        <td>Date</td>
        <td>Team 1</td>
        <td>Spread 1</td>
        <td>Team 2</td>
        <td>Spread 2</td>
        <td></td>
      </thead>
      <tbody v-if="info">
        <tr v-for="item in info.events" :key="item.teams[0]">
          <td>{{ item.event_date }}</td>
          <td>{{ item.teams_normalized[0].name }}</td>
          <td>
            <span v-if="item.teams_normalized[0].is_away == true">{{ item.lines[1].spread.point_spread_away }}</span>
            <span v-if="item.teams_normalized[0].is_away == false">{{ item.lines[1].spread.point_spread_home }}</span>
          </td>
          <td>{{ item.teams_normalized[1].name }}</td>
          <td>
            <span v-if="item.teams_normalized[1].is_away == true">{{ item.lines[1].spread.point_spread_away }}</span>
            <span v-if="item.teams_normalized[1].is_away == false">{{ item.lines[1].spread.point_spread_home }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <p v-for="item in info" :key="item.teams[0]">{{ item.teams }} {{ item.sites[0].odds.spreads.points }}</p> -->
    <p>{{ info }}</p>
  </div>
</template>

<script>
//import firebase from 'firebase'
  import axios from 'axios'

  // https://api.the-odds-api.com/v3/sports?apiKey=8b9c9bded83224187aa61bb6b39a5954
  // https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=8b9c9bded83224187aa61bb6b39a5954

  export default {
    name: 'About',
    data() {
      return {
        info: null
      }
    },
    methods: {

    },
    mounted() {
      
      axios({
        "method":"GET",
        "url":"https://therundown-therundown-v1.p.rapidapi.com/sports/1/events/2020-01-01",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"therundown-therundown-v1.p.rapidapi.com",
        "x-rapidapi-key":"17ffe36addmsh3acdd5f06cf34a3p10d9c2jsn8bbd77669534"
        },
        "params": {
          "include": ["all_periods", "scores"], "offset": "0"
        }
        })
      .then(response => {
        console.log(response)
        this.info = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
</script>

