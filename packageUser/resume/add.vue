<template>
  <view class="page">
    <!-- 学历信息部分 -->
    <view class="card">
      <u--form labelPosition="top" :model="form" ref="form">
        <u-form-item label="学校*" :required="true" prop="school">
          <u--input v-model="form.school" placeholder="请输入您的学校"></u--input>
        </u-form-item>
        <u-form-item label="专业" prop="major">
          <u--input v-model="form.major" placeholder="请输入您的主修专业"></u--input>
        </u-form-item>
        <u-form-item label="学历*" required prop="edu">
                 <picker mode="selector" :range="educationOptions" v-model="form.edu" />
            </u-form-item>
        <u-form-item label="入学时间*" :required="true" prop="eduStartTime">
          <u--datetime-picker v-model="form.eduStartTime" placeholder="请选择入学时间"></u--datetime-picker>
        </u-form-item>
        <u-form-item label="毕业时间*" :required="true" prop="eduEndTime">
          <u--datetime-picker v-model="form.eduEndTime" placeholder="请选择毕业时间"></u--datetime-picker>
        </u-form-item>
        <u-button type="primary" @click="submit">保存</u-button>
      </u--form>
    </view>
    <view class="notice">注：需填写打<text class="required">*</text>号的内容才能保存该模块</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        school: '',
        major: '',
        edu: '',
        eduStartTime: '',
        eduEndTime: '',
      },
      // 校验规则
      rules: {
        school: [{ required: true, message: '请输入您的学校', trigger: 'blur' }],
        edu: [{ required: true, message: '请选择您的学历', trigger: 'change' }],
        eduStartTime: [{ required: true, message: '请选择入学时间', trigger: 'change' }],
        eduEndTime: [{ required: true, message: '请选择毕业时间', trigger: 'change' }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('提交成功');
          // 这里处理表单提交逻辑
        } else {
          alert('请完整填写信息');
          return false;
        }
      });
    },
  },
};
</script>


<style scoped>
.page {
  padding: 30px;
  background-color: #f5f5f5;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.notice {
  font-size: 14px;
  color: #999;
}

.required {
  color: red;
}
</style>
