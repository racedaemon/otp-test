<template>
<div class="flex flex-col mx-auto bg-gray-50 rounded-md shadow-lg max-w-md">
  <span class="text-center bg-slate-300 rounded-t-md py-1 font-">One time password check</span>
  <div class="flex items-center justify-between py-4 px-4">
    <select v-model="userId" class="flex-1 border-gray-200 border rounded-md h-14 pr-2 focus-within:ring-2 focus-within:ring-orange-400">
      <option v-for="user in users" :value="user.user_id" v-text="user.name" />
    </select>
    <input type="text" v-model="code" class="border-gray-200 border rounded-md h-14 px-2 focus-within:ring-2 focus-within:ring-orange-400 ml-2 w-20 appearance-none focus:outline-none text-center font-bold">
    <button @click="checkPassword" class="bg-bt-yellow ml-2 h-14 px-2 rounded-md text-white font-light border-yellow-400 hover:-hue-rotate-30  focus:ring-orange-400 focus:ring-offset-lime-500 focus:ring-2">
      <span>Check</span>
      <div class="self-center">
        <span class="material-icons" :class="check.color">{{check.icon}}</span>
      </div>
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordCheck',
  props: ['users'],
  computed: {
    check() {
      console.log('check')
      switch (this.result) {
        case true:
          return { color: 'text-lime-400', icon: 'check_circle_outline'}
        case false:
          return { color: 'text-red-400', icon: 'highlight_off'}
        default:
          return { color: 'text-bt-yellow', icon: 'panorama_fish_eye'}
      }
    }
  },
  data() {
    return {
      userId: null,
      code: '',
      result: null
    }
  },
  methods: {
    async checkPassword() {
      const result = await fetch('http://localhost:3333/api/v1/users/check_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserId: this.userId,
          Code: this.code
        })
      }).then(res => res.json())
      this.result = result.Result
    },
    reset() {
      this.userId = null
      this.code = ''
      this.result = null
    }
  }
}
</script>
