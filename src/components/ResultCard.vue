<template>
  <view class="card-container" :class="{ 'is-flipped': isFlipped }">
    <view class="card-inner">
      <view class="card-front">
        <image :src="fortuneResult.imagePath" mode="aspectFit" @tap="flipCard"/>
        <text class="element-text">{{ fortuneResult.element }}</text>
      </view>
      <view class="card-back">
        <image :src="fortuneResult.dishImage" mode="aspectFit"/>
        <text class="dish-name">{{ fortuneResult.dishName }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ResultCard extends Vue {
  @Prop({ required: true }) fortuneResult!: any
  isFlipped = false

  flipCard() {
    this.isFlipped = !this.isFlipped
  }
}
</script>

<style scoped>
.card-container {
  width: 300rpx;
  height: 400rpx;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.element-text,
.dish-name {
  text-align: center;
  margin-top: 20rpx;
}
</style> 