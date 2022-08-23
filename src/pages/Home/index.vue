<template>
  <!-- <div>我是首页</div> -->
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodyRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="item in FloorList" :key="item.id" :list="item"></Floor>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import TodyRecommend from '@/pages/Home/TodyRecommend/TodyRecommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/Like/Like.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'

import { mapState } from 'vuex'
export default {
  components:{
    ListContainer,
    TodyRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //获取floor组件数据
    this.$store.dispatch('MockFloorData')
    //获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      FloorList:state=>{
        return state.home.FloorList
      }
    })
  }

}
</script>

<style>

</style>