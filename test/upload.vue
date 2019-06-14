<template>
<div>
  <input @change="handleChange" ref="fileInput" type="file">
  <button @click="upload">开始上传</button>
</div>
</template>

<script>
import Asker from '../src/asker'

let file = null

const uploadApi = new Asker({
  baseUrl: 'http://192.168.5.134:81/yoyi-dmpapi',
  maxQueue: 5,
  maxPiece: 5 * 1024 * 1024
})


export default {


  methods: {
    handleChange () {
      file = this.$refs.fileInput.files[0]
    },

    upload () {

    }
  },

  mounted () {
    
  }
}
</script>

<style>

</style>
