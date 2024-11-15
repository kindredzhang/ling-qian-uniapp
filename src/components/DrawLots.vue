<template>
  <view class="draw-lots-container">
    <view class="jar" :class="{ 'shaking': isShaking }">
      <image src="/static/images/jar.png" mode="aspectFit"/>
    </view>
    <view class="stick" :class="{ 'drawing': isDrawing }">
      <image src="/static/images/stick.png" mode="aspectFit"/>
    </view>
    <button @tap="startDraw" :disabled="isDrawing">抽签</button>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DrawLots extends Vue {
  isShaking = false
  isDrawing = false

  startDraw() {
    this.isShaking = true
    this.isDrawing = true
    
    setTimeout(() => {
      this.isShaking = false
      setTimeout(() => {
        this.isDrawing = false
        this.$emit('drawComplete')
      }, 1000)
    }, 2000)
  }
}
</script>

<style scoped>
.draw-lots-container {
  position: relative;
  height: 400rpx;
}

.jar {
  width: 200rpx;
  height: 200rpx;
}

.shaking {
  animation: shake 0.5s infinite;
}

.stick {
  width: 100rpx;
  height: 300rpx;
}

.drawing {
  animation: drawStick 1s forwards;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

@keyframes drawStick {
  from { transform: translateY(0); }
  to { transform: translateY(-100rpx); }
}
</style> 