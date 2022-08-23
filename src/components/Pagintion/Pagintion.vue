<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li :class="{ prev: pageNo == 1 }">
          <button
            :disabled="pageNo == 1"
            @click="$emit('currentPage', pageNo - 1)"
            :class="{ disabled: pageNo == 1 }"
          >
            上一页
          </button>
        </li>
        <li
          v-if="startNumberEndNumber.start > 1"
          :class="{ active: pageNo == 1 }"
          @click="$emit('currentPage', 1)"
        >
          <a>1</a>
        </li>
        <li class="dotted" v-if="startNumberEndNumber.start > 2">
          <span>..</span>
        </li>

        <!-- 中间页码 -->
        <li
          v-for="(item, index) in startNumberEndNumber.end"
          :key="index"
          v-if="item>= startNumberEndNumber.start"
          :class="{ active: item == pageNo }"
          @click="$emit('currentPage', item)"            
        >
          <a>{{ item }}</a>
        </li>

        <li class="dotted" v-if="startNumberEndNumber.end < totalPage - 1">
          <span>..</span>
        </li>
        <li
          v-if="startNumberEndNumber.end < totalPage"
          @click="$emit('currentPage', totalPage)"
        >
          <a>{{ totalPage }}</a>
        </li>

        <li class="next">
          <button
            :disabled="pageNo == totalPage"
            @click="$emit('currentPage', pageNo + 1)"
          >
            下一页
          </button>
        </li>
      </ul>
      <div>
        <span>共{{ total }}条&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagintion",
  /* 1.一共多少页   total
  2.当前多少页   pageNo
  3.每一页展示多少数据    pageSize
  4.分页器连续的页码数   continues  5/7【奇数】  为了对称好看 */
  props: ["pageNo", "total", "pageSize", "continues"],
  computed: {
    //一共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //连续数字的起始和结束的数字
    //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
    startNumberEndNumber() {
      //算出连续页码:开始与结束这两个数字
      let start = 0;
      let end = 0;
      const { pageNo, totalPage, continues } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //约束start|end在合理范围之内
        //约束头部
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.page {
  width: 900px;
  height: 66px;
  overflow: hidden;
  float: right;
  margin: 20px auto;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-bottom: 0;
      vertical-align: middle;
      width: 650px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        button {
          // display: block;
          vertical-align: middle;
          background-color: #fafafa;
          width: 50px;
          height: 40px;
          border: 1px solid orange;
          margin: 0 2px;
          background-color: aquamarine;
          transform: translateY(-14px);
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
      margin-top: 10px;
    }
  }
}
</style>