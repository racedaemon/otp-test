<template>
  <li class="py-4">
    <div class="flex items-center justify-between">
      <div class="flex-1 min-w-0">
        <!-- <span>{{ test }}</span> -->
        <p class="truncate" v-text="user.name" />
      </div>

      <div class="inline-flex bg-white border-gray-200 border rounded-md h-14 pr-2 focus-within:ring-2 focus-within:ring-orange-400 items-center">
        <input type="text" v-model="code" class="text-center font-bold w-24 h-full outline-none rounded-md focus:outline-none">
        <button @click="generateOtp" :disabled="interval" class="bg-bt-yellow w-10 h-10 rounded-md text-white font-light border-yellow-400 hover:-hue-rotate-30  focus:ring-orange-400 focus:ring-offset-lime-500 focus:ring-2 ml-0 flex justify-center items-center">
          <VueCountdown v-if="interval" :time="interval * 1000" @end="endInterval" v-slot="{ totalSeconds }">{{ totalSeconds }}</VueCountdown>
          <span v-else class="material-icons">lock_reset</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
export default {
  name: 'IndividualOtpRequest',
  components: { VueCountdown },
  props: ['user'],
  data() {
    return {
      code: '',
      interval: null
    }
  },
  methods: {
    async generateOtp() {
      const pinData = await fetch(`http://localhost:3333/api/v1/users/generate_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserId: this.user.user_id,
          DateTime: new Date()
        })
      }).then(res => res.json())

      this.code = pinData.Code
      this.interval = pinData.Interval
    },
    endInterval () {
      this.interval = null
      this.code = ''
    }
  }
}
</script>
