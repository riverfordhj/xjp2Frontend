<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
				<span v-if="!editing" @dblclick="edit(this)" :style="item.number.style"> 
                  
                  
        <!-- <dv-digital-flop
          :config="item.number"
          style="width:120px;height:60px;"
        /> -->
				{{item.number.number}}
				</span>
				<input type="text"
				ref="input"
				v-if="editing"
				
			  v-model="item.number.number"
				@blur="save">
          <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
import { GetTotalTaRNO } from '@/api/company.js';
export default {
  name: 'DigitalFlop',
  data () {
    return {
			editing: false,
      companycount:'',
      taxsum:'',
      revenuesum:'',
      digitalFlopData:[],
    
    }
  },
  created(){
     this.getcountData();
  },
  methods: { 
    getcountData(){
      GetTotalTaRNO().then(res =>{
          this.revenuesum = parseFloat((res[0].tRevenue / 10000).toFixed(2));
          this.companycount = res[0].companyCount ;
          this.taxsum = parseFloat((res[0].tTax / 10000).toFixed(2));;
          this.digitalFlopData = [
              // {
              //   title: '徐家棚总营收',
              //   number: {
              //     number: this.revenuesum,
              //       toFixed: 2,
              //     content: '{nt}{nt}',
              //     textAlign: 'center',
              //     style: {
							// 			fontSize: '30px',
              //       color: '#f46827',
							// 			fontWeight: 'bold',
              //     }
              //   },
              //   unit: '亿'
              // },
              {
                title: '徐家棚总税收',
                number: {
                  number: 51.1,
                  toFixed: 2,
                  content: '{nt}',
                  textAlign: 'center',
                  style: {
										fontSize: '30px',
                    color: '#40faee',
                    fontWeight: 'bold'
                  }
                },
                unit: '亿'
              },
              {
                title: '楼宇数量',
                number: {
                  number: 26,
                  content: '{nt}',
                  textAlign: 'center',
                  style: {
										fontSize: '30px',
                    color: '#f46827',
                    fontWeight: 'bold'
                  }
                },
                unit: '栋'
              },
              {
                title: '楼宇企业数量',
                number: {
                  number: 1233,
                  content: '{nt}',
                  textAlign: 'center',
                  style: {
										fontSize: '30px',
                    color: '#40faee',
                    fontWeight: 'bold'
                  }
                },
                unit: '家'
              },
              {
                title: '“四上”企业数',
                number: {
                  number: 150,
                  content: '{nt}',
                  textAlign: 'center',
                  style: {
										fontSize: '30px',
                    color: '#f46827',
                    fontWeight: 'bold'
                  }
                },
                unit: '家'
              },
              {
                title: '区级重大项目数',
                number: {
                  number: 21,
                  content: '{nt}',
                  textAlign: 'center',
                  style: {
										fontSize: '30px',
                    color: '#40faee',
                    fontWeight: 'bold'
                  }
                },
                unit: '项'
              },
            ]
      })
    },
		edit: function () {
			this.editing = true
			this.$nextTick(function () {
				// this.$els.input.focus()
			})
				},
			save: function () {
					this.editing = false;
				}
  },
  mounted () {
 
  }
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 20%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    // margin-top: 3px;
    font-size: 20px;
     margin-bottom: 10px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
