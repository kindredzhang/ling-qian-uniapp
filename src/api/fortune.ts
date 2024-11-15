// Remove axios import if it exists
// import axios from 'axios'

interface FortuneResult {
  element: string;      // 金木水火土
  imagePath: string;    // 元素对应的图片路径
  dishName: string;     // 推荐菜品名称
  dishImage: string;    // 菜品图片
}

export const getFortuneResult = async (): Promise<FortuneResult> => {
  // 模拟API调用
  return {
    element: '金',
    imagePath: 'https://via.placeholder.com/500x500.png?text=金',
    dishName: '金牌叉烧',
    dishImage: 'https://via.placeholder.com/500x500.png?text=叉烧'
  }
} 