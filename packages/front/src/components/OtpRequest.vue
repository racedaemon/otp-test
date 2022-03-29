<template>
  <div class="flex flex-col mx-auto bg-gray-50 rounded-md shadow-lg max-w-md mb-10 max-h-96">
    <span class="text-center bg-slate-300 rounded-t-md py-1 font-">One time password request</span>

      <ul role="list" class="px-4 divide-y divide-gray-200 overflow-y-scroll">
        <IndividualRequest v-for="user in users" :user="user" :key="user.user_id" />
      </ul>
  </div>
</template>

<script>
import IndividualRequest from "./IndividualRequest.vue";
export default {
    name: "OtpRequest",
    components: { IndividualRequest },
    props: ["users"]
}
</script>
