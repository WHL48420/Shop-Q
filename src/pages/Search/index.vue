<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- query关键字面包屑 -->
            <li class="with-x" v-if="searchdata.categoryName">
              {{ searchdata.categoryName }}<i @click="removeCategorName">X</i>
            </li>
            <!-- keyword关键字面包屑 -->
            <li class="with-x" v-if="searchdata.keyword">
              {{ searchdata.keyword }}<i @click="removekeyword">X</i>
            </li>
            <!-- 品牌信息面包屑 -->
            <li class="with-x" v-if="searchdata.trademark">
              {{ searchdata.trademark.split(":")[1]
              }}<i @click="removetrademark">X</i>
            </li>
            <!-- 属性信息面包屑 -->
            <li class="with-x" v-for="(item,index) in searchdata.props" :key="index">
              {{ item.split(":")[1]
              }}<i @click="removeprops(index)">X</i>
            </li>
          </ul>
        </div>

        <!--selector 子组件-->
        <SearchSelector @trademarkinfos="trademarkinfos" @attrinfos="attrinfos" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}"  @click="changeSc('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-arrowup':isAsc,'icon-arrowdown':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeSc('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-arrowup':isAsc,'icon-arrowdown':isDesc}" ></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="item in goodsList" class="yui3-u-1-5" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img v-lazy="item.defaultImg"
                    />
                    </router-link>
                   
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ " " + item.price + ".00" }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器  测试阶段-->
         <Pagintion :pageNo="searchdata.pageNo" :pageSize="searchdata.pageSize" :total="totalData" :continues="5"
         @currentPage="currentPage"
         ></Pagintion>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchdata: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //产品的名字
        keyword: "", //关键字
        order: "1:desc" , //排序
        pageNo: 1, //当前第几页
        pageSize: 3, //每一页需要展示多少条数据
        props: [], //平台属性的选择参数
        trademark: "", //品牌参数
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    // this.searchdata.category1Id = this.$route.query.category1Id
    // this.searchdata.category2Id = this.$route.query.category2Id
    // this.searchdata.category3Id = this.$route.query.category3Id
    // this.searchdata.categoryName = this.$route.query.categoryName
    // this.searchdata.keyword = this.$route.params.keyword
    //整理参数
    //核心的obj是第一个参数 this.searchdata
    Object.assign(this.searchdata, this.$route.params, this.$route.query);
  },
  mounted() {
    // this.$store.dispatch('GetSearchinfo',{})
    this.goSearch();
    setTimeout(() => {
      // console.log(this.$store.state.search.searchList);
    }, 1000);
  },
  computed: {
    // ...mapState({
    //    searchList:(state)=>{
    //   return state.search.searchList
    // }
    // }),
    //简化数据  mapGetters传递的是数组
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    //分页器获取总共的数据
    ...mapState({
      totalData:state=>{
        return state.search.searchList.total
      }
    }),

    isOne(){
     return this.searchdata.order.indexOf('1')!=-1
    },
    isTwo(){
     return this.searchdata.order.indexOf('2')!=-1
    },
    isAsc(){
      return this.searchdata.order.indexOf('asc')!=-1
    },
    isDesc(){
      return this.searchdata.order.indexOf('desc')!=-1
    }
  },
  methods: {
    //派发请求任务
    goSearch() {
      this.$store.dispatch("GetSearchinfo", this.searchdata);
    },
    //删除query参数面包屑操作
    removeCategorName() {
      this.searchdata.categoryName = undefined;
      this.searchdata.category1Id = undefined;
      this.searchdata.category2Id = undefined;
      this.searchdata.category3Id = undefined;
      this.goSearch();
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除keyword关键字面包屑
    removekeyword() {
      this.searchdata.keyword = undefined;
      this.goSearch();
      //通知兄弟组件Header删除关键字
      this.$bus.$emit("clear");

      //进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件传品牌信息
    trademarkinfos(item) {
      //整理参数：   参数格式为   ID：品牌信息
      this.searchdata.trademark = `${item.tmID}:${item.tmName}`;
      this.goSearch();
    },
    //删除品牌信息面包屑
    removetrademark() {
      this.searchdata.trademark = undefined;
      this.goSearch();
    },
    //属性信息的自定义事件
    attrinfos(item,items){
      // 参数格式 [属性id:属性名：属性值]
      let props = `${item.attrId}:${items}:${item.attrName}`
      //数组去重
      if (this.searchdata.props.indexOf(props)==-1) {
        this.searchdata.props.push(props)
      }
      
      this.goSearch()
    },
    //删除属性信息面包屑
    removeprops(index){
      this.searchdata.props.splice(index,1)
      this.goSearch()
    },
    //点击判断综合还是  价格    升序还是降序
    changeSc(flag){
      //flag是一个标记  传入1是综合   传入2是价格
      //获取初始的是 1  还是   2
      let orginorder = this.searchdata.order.split(":")[0]
      //获取初始的是  desc   还是  asc
      let orginenter = this.searchdata.order.split(":")[1]
      //准备一个初始值为空的order
      let  neworder = ' '
      //第一次确认点击的是综合    多次点击相同按钮进行if语句执行
      if (flag == orginorder) {
        neworder = `${orginorder}:${ orginenter = 'desc'?'asc':'decs' }`
      }else{
        //确实不是多次点击同一个按钮    默认开始都是降序
        neworder = `${flag}:${'desc'}`
      }
      this.searchdata.order = neworder
      this.goSearch()
      
      
    },
    //分页器页码自定义事件   --传参发请求
    currentPage(data){
      this.searchdata.pageNo = data
      this.goSearch()
    }
  },

  watch: {
    $route(newvalue, oldvalue) {
      Object.assign(this.searchdata, this.$route.query, this.$route.params);
      this.goSearch();
      this.searchdata.category1Id = undefined;
      this.searchdata.category2Id = undefined;
      this.searchdata.category3Id = undefined;
      // console.log(this.searchdata);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>