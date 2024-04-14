<template>
  <view>
    <u-form model:value="formData" @submit="formSubmit">
		<view> <text>职位名称:</text></view>
      <u-input v-model="formData.jobTitle" :border="border" label="职位名称:" placeholder="请输入职位名称"></u-input>
      <u-input v-model="formData.salary" label="薪资待遇:" placeholder="请输入薪资待遇"></u-input>
      <u-textarea v-model="formData.jobDescription" label="工作内容:" placeholder="请输入工作内容"></u-textarea>
      <u-input v-model="formData.workTime" label="工作时间:" placeholder="请输入工作时间"></u-input>
      <u-input v-model="formData.contactPerson" label="联系人:" placeholder="请输入联系人"></u-input>
      <u-input v-model="formData.contactNumber" label="联系电话:" placeholder="请输入联系电话"></u-input>
      <u-button formType="submit" type="primary">发布</u-button>
    </u-form>
  </view>
</template>

<script>
		// interfaceCode
		export default {
  data() {
    return {
      formData: {
        jobTitle: '',
        salary: '',
        jobDescription: '',
        workTime: '',
        contactPerson: '',
        contactNumber: ''
      }
    };
  },
  methods: {
    formSubmit() {
      console.log('Form data:', this.formData);
      // 在这里处理表单提交逻辑，如数据验证和发送请求
    }
  },
  
					props: {
						
					}
					,
					async mounted() {
		// defaultLoad	
						// defaultLoad
					},
					components: {
					}
};</script>

<style scoped>
/* 在这里添加页面的自定义样式 */
</style>
