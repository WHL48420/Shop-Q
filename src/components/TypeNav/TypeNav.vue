
</template>
<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="currentleave" @click="goSearch">
        <h2 class="all" @mouseenter="mouserenter">全部商品分类</h2>
        <!--商品分类的地方:虽然刚开始的时候商品分类结构在底部,调整到当前位置，但是页面结构没有太大的变化,因为老师们已经把样式搞定了-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <!--一级分类地盘-->
              <div
                class="item"
                v-for="(c1, index) in CategoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="currentinex(index)"
                  :class="{ cur: current == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 通过JS实现动态行内样式，进行二级、三级分类的显示与隐藏(display:none|block切换的) -->
                <div
                  class="item-list clearfix"
                  :style="{ display: current == index ? 'block' : 'none' }"
                >
                  <!--二级分类-->
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!--三级分类-->
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>




<script>
//引入辅助函数
import { mapState } from "vuex";

//引入loadsh的_函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  //组件挂载完毕，向服务器发请求
  data() {
    return {
      current: -1,
      show:true
    };
  },
  mounted() {
    // //通知Vuex发请求，获取数据，存储在仓库当中
    // this.$store.dispatch("CategoryList");    //已经转入了APP.vue
    if (this.$route.path!='/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      //辅助函数映射为组件内部的属性的对象写法
      //右侧需要的是一个函数，当这个计算属性调用的时候，右侧函数会立即执行一次
      //注入一个参数state，其实是这个大仓库中的数据
      CategoryList: (state) => {
        // console.log(state);
        // //大仓库.小仓库.数据
        // console.log(state.home.CategoryList);
        return state.home.CategoryList;
      },
    }),
  },
  methods: {
    currentinex: throttle(function (index) {
      this.current = index;
    }),
    //leaveHandler
    currentleave() {
      this.current = -1;
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    //事件委托  +  编程式导航    解决路由跳转问题
    goSearch(event) {

      let element = event.target;

      let { categoryname, category1id, category2id, category3id } = element.dataset;

      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //整理参数
        //合并参数
        //如果有params参数捎带一脚也传过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    },
    //changeShow
    mouserenter(){
      this.show = true
    },
    //
    mouseleave(){
      // if (this.$route.path != '/home') {
      //   this.show = false
      // }
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        text-decoration: none;
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
      
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
   
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: orange;
        }
      }
         //过渡动画的进入状态
   
    }
     .sort-enter{
      height: 0px;
    }
    //过渡动画的结束状态
    .sort-enter-to{
      height: 461px;
    }
    //过渡动画的属性
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>