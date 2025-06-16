<script>
import { useCourseStore } from '../../stores/coursStore'
export default {

  name: 'CourseDropDown',
  data() {
    return {
      Course: useCourseStore(),
      oncourse: false,
    };
  },
  async mounted(){
    await this.Course.fetchItems();
    console.log(this.Course.items)

  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  }
};

</script>

<template>
  <div :class="{'h-[500px] p-[20px]': isOpen ,'p-0 h-0': !isOpen}" class=" bg-gray-100 w-full  overflow-hidden gap-x-1 ease flex flex-wrap absolute transition-all duration-300 z-100">

  <div class="w-full flex flex-wrap items-center justify-center ">
    <div @click="$router.push(`/DetailCourse/${item.title}/lession/${item.id}`);" v-for="(item,index) in Course.items" :key="index" class="group flex-grow  md:w-1/3 flex flex-row m-[10px] hover:bg-green-500/80 transition-all duration-500 shadow-lg rounded-lg p-[10px]">
      
      <div class="course-icon w-14 h-14 group-hover:bg-green-500 rounded-lg flex items-center justify-center text-white">
        <span v-html="item.icon" class="text-2xl group-hover:text-white text-black"></span>
      </div>

      <div class="mx-[10px]">
        <h3>
          <span class="text-2xl group-hover:text-white font-bold text-gray-800">{{ item.title }} Fundamentals</span>
        </h3>
        <p class="text-gray-600 group-hover:text-white/50">Learn the basics of {{ item.title }}</p>
      </div>
    </div>
  </div>

</div>


</template>

<style scoped>


</style>