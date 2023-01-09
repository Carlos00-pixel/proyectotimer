<template>
  <div class="counter mb-3">
    {{ name }}: {{ minutesString }}:{{ secondsString }} 
    <button class="btn btn-danger btn-sm" @click="$emit('remove-counter')">Eliminar</button>
    <button class="btn btn-primary" @click="$emit('edit-counter')">Editar</button>
  </div>
</template>

<script>
export default {
  name: "CounterComponent",
  props: {
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
    isRunning: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeLeft: (this.minutes * 60) + this.seconds,
    }
  },
  computed: {
    minutesString() {
      return String(Math.floor(this.timeLeft / 60)).padStart(2, '0')
    },
    secondsString() {
      return String(this.timeLeft % 60).padStart(2, '0')
    },
  },
  watch: {
    isRunning(newValue) {
      if (newValue) {
        const interval = setInterval(() => {
          this.timeLeft--
          if (this.timeLeft <= 0) {
            clearInterval(interval)
            this.$emit('start-next', this.index)
            this.timeLeft = 0
          }
        }, 1000)
        // eslint-disable-next-line vue/no-deprecated-events-api
        //this.$once('hook:beforeDestroy', () => clearInterval(interval))
      }
    },
  },
}
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
</style>
