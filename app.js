import Vue from './node_modules/vue/dist/vue';
const axios = require('axios');
require('./sass/main-style.scss');

const feedUrl = 'http://localhost:8888/announcements/emergency-announcement';

let container = document.getElementById('emergency_message');
if (!container) {
  container = document.createElement('div')
  container.id = "emergency_message";
}
document.body.prepend(container);

const EmgMessage = {
  name: 'emgMessage',
  props: {
    messages: Array
  },
  template: `<div>
  <div v-for="msg in messages">
    <h3>{{msg.text}}</h3>
    <p v-if="msg.link"><a v-bind:href="msg.link" class="btn">More</a></p>
  </div>
  </div>`
};

new Vue({
  el: '#emergency_message',
  components: {EmgMessage},
  data() {
    return {
      messages: [],
      visible: false
    }
  },
  methods: {
    hideMessage() {
      this.visible = false;
    }
  },
  mounted() {
    axios
      .get(feedUrl)
      .then(resp => {
        if (resp.data.nodes && resp.data.nodes.length > 0) {
          let nodes = resp.data.nodes;
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i].node;
            this.messages.push({
              text: node.body,
              link: node.more_link
            })
          }
          this.visible = true;
        }
      })
  },
  template: `<div class="emergency-message-saic"
                  id="emergency_message_saic"
                  v-if="visible">
    <button v-on:click="hideMessage" class="btn">X</button>
    <emgMessage :messages="messages" />
  </div>`
})