<template>
  <view class="container">
    <!-- 顶部标题区域 -->
    <view class="header">
      <text class="title">道缘食府</text>
      <text class="subtitle">今日运势抽签</text>
    </view>

    <!-- 抽签区域 -->
    <view class="draw-section" v-if="!showResult">
      <view class="jar-container">
        <image class="jar-image" :class="{ 'shaking': isShaking }" 
               src="/static/images/jar.png" mode="aspectFit"/>
        <image class="stick-image" :class="{ 'drawing': isDrawing }" 
               src="/static/images/stick.png" mode="aspectFit"/>
      </view>
      <button class="draw-button" @tap="startDraw" :disabled="isDrawing">
        开始抽签
      </button>
    </view>

    <!-- 结果展示区域 -->
    <view class="result-section" v-if="showResult">
      <view class="card-wrapper" :class="{ 'is-flipped': isFlipped }" @tap="flipCard">
        <view class="card-face card-front">
          <image class="element-image" :src="fortuneResult.imagePath" mode="aspectFit"/>
          <text class="element-text">{{ fortuneResult.element }}</text>
        </view>
        <view class="card-face card-back">
          <image class="dish-image" :src="fortuneResult.dishImage" mode="aspectFit"/>
          <text class="dish-name">{{ fortuneResult.dishName }}</text>
          <text class="dish-desc">推荐美食</text>
        </view>
      </view>
      <button class="retry-button" @tap="resetDraw">重新抽签</button>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getFortuneResult } from '@/api/fortune'

@Component
export default class Index extends Vue {
  showResult = false
  isShaking = false
  isDrawing = false
  isFlipped = false
  fortuneResult: any = null

  async startDraw() {
    this.isShaking = true
    this.isDrawing = true
    
    setTimeout(async () => {
      this.isShaking = false
      this.isDrawing = false
      
      try {
        this.fortuneResult = await getFortuneResult()
        this.showResult = true
      } catch (error) {
        uni.showToast({
          title: '获取结果失败',
          icon: 'none'
        })
      }
    }, 2000)
  }

  flipCard() {
    this.isFlipped = !this.isFlipped
  }

  resetDraw() {
    this.showResult = false
    this.isFlipped = false
    this.fortuneResult = null
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.header .title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.header .subtitle {
  font-size: 32rpx;
  color: #666;
}

.draw-section .jar-container {
  position: relative;
  height: 600rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.draw-section .jar-image {
  width: 400rpx;
  height: 400rpx;
}

.draw-section .jar-image.shaking {
  animation: shake 0.5s infinite;
}

.draw-section .stick-image {
  position: absolute;
  width: 100rpx;
  height: 300rpx;
  top: 50%;
}

.draw-section .stick-image.drawing {
  animation: drawStick 1s forwards;
}

.draw-section .draw-button {
  width: 80%;
  height: 88rpx;
  background: #e4393c;
  color: #fff;
  border-radius: 44rpx;
  margin-top: 40rpx;
}

.result-section .card-wrapper {
  width: 600rpx;
  height: 800rpx;
  margin: 0 auto;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.result-section .card-wrapper.is-flipped {
  transform: rotateY(180deg);
}

.result-section .card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-section .card-back {
  transform: rotateY(180deg);
}

.result-section .element-image,
.result-section .dish-image {
  width: 500rpx;
  height: 500rpx;
  margin: 20rpx 0;
}

.result-section .element-text,
.result-section .dish-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-top: 30rpx;
}

.result-section .dish-desc {
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
}

.result-section .retry-button {
  width: 80%;
  height: 88rpx;
  background: #e4393c;
  color: #fff;
  border-radius: 44rpx;
  margin-top: 60rpx;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}

@keyframes drawStick {
  0% { transform: translateY(0); }
  50% { transform: translateY(-100rpx); }
  100% { transform: translateY(0); }
}
</style>
