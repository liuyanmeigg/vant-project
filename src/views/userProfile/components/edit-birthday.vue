<template>
  <div class="edit-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closed')"
      @confirm="onConfirmBirth"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { updateUserProfileAPI } from '@/api';
export default {
  name: 'edit-birthday',
  props: {
    birthday: {
      type: String
    }
  },

  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    };
  },

  methods: {
    onConfirmBirth() {
      const currentDate = dayjs(this.currentDate).format('YYYY' - 'MM' - 'DD');
      const subtringDate = currentDate.substring(0, 10);
      this.$emit('newDate', subtringDate);
      console.log(currentDate, 'currentDate');
      // this.$toast.loading({
      //   message: '保存中...',
      //   forbidClick: true,
      //   duration: 0
      // });
      // try {
      //   const currentDate = dayjs(this.currentDate).format(
      //     'YYYY' - 'MM' - 'DD'
      //   );
      //   const res = await updateUserProfileAPI({
      //     birthday: currentDate
      //   });
      //   this.$emit('input', currentDate);
      //   this.$emit('closed');
      //   this.$toast.success('修改成功');
      //   console.log(res);
      // } catch (err) {
      //   this.$toast.fail('更新用户信息失败');
      // }
    }
  }
};
</script>

<style>
</style>
