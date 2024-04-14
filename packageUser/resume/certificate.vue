<template>
  <div class="container">
    <div class="search-bar">
      <input type="search" v-model="searchTerm" placeholder="搜索资格证书">
      <button v-if="searchTerm" @click="clearSearch">清空</button>
    </div>
    <div class="category" v-for="category in filteredCategories" :key="category.title">
      <h2>{{ category.title }}</h2>
      <div class="certificates">
        <div v-for="certificate in category.certificates" :key="certificate" @click="selectCertificate(certificate)" class="certificate">
          {{ certificate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      categories: [
        {
          title: '财会',
          certificates: ['注册会计师', '税务师', '审计师']
        },
        {
          title: 'IT类',
          certificates: ['信息系统项目管理师', 'PMP', 'Cisco认证']
        },
        // 更多类别...
      ],
      selectedCertificates: []
    };
  },
  computed: {
    filteredCategories() {
      if (!this.searchTerm) {
        return this.categories;
      }
      const term = this.searchTerm.toLowerCase();
      return this.categories.map(category => ({
        ...category,
        certificates: category.certificates.filter(certificate => certificate.toLowerCase().includes(term))
      })).filter(category => category.certificates.length > 0);
    }
  },
  methods: {
    clearSearch() {
      this.searchTerm = '';
    },
    selectCertificate(certificate) {
      this.selectedCertificates.push(certificate);
      // 处理选中逻辑，比如更新数据或跳转页面
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #fff; /* 白色背景 */
  color: #333; /* 深色字体 */
  padding: 20px;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 4px;
}

.search-bar button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #f5f5f5; /* 按钮背景色 */
  color: #333; /* 按钮文字颜色 */
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 4px;
  cursor: pointer;
}

.category h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.certificates {
  margin-bottom: 20px;
}

.certificate {
  padding: 10px 20px;
  background-color: #f9f9f9; /* 证书背景色 */
  margin-bottom: 10px;
  border: 1px solid #ddd; /* 边框颜色 */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.certificate:hover {
  background-color: #eee; /* 悬停颜色 */
}
</style>
