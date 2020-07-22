<template>
  <div class="container">
    <button type="button" class="btn btn-primary">{{ msg }}</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Ping',
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  methods: {
    getMessage () {
      const path = 'http://localhost:5000'
      axios({
        method:'get',
        url: path,
        params: {
          ID: 12345
        }
      }).then((res) => {
        console.log(res)
        this.msg = res.data
      }).catch((error) => {
        // eslint-disable-next-line
        console.error(error)
      })
    }
  },
  created () {
    this.getMessage()
  }
}
</script>
