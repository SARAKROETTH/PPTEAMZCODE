<script>
export default {
  name: "CourseDropDown",
  data() {
    return {
      oncourse: false,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCourse() {
      this.oncourse = !this.oncourse;
    },
  },
};
</script>
<template>
<section
  :class="{
    'h-fit p-[20px]': isOpen,
    'h-0 p-0': !isOpen
  }"
  class="w-full overflow-hidden absolute z-100 bg-white flex flex-col transition-all duration-300 ease-in-out"
>
  <h1 class="text-5xl p-3 font-bold">អំពី​ពួក​យើង</h1>

  <div class="w-full min-h-[200px] flex flex-col md:flex-row relative gap-4">
    
    <!-- Text Content -->
    <div class="w-full md:w-1/2 px-[20px] flex flex-col justify-center">
      <p class="text-gray-700 leading-relaxed">
        សូមស្វាគមន៍មកកាន់គេហទំព័រ <strong>ZCode.cam!</strong><br />
        បេសកកម្មរបស់យើងគឺធ្វើឱ្យការសរសេរកូដមានលក្ខណៈសាមញ្ញ<br />
        ដែលមនុស្សគ្រប់គ្នាអាចចូលទៅរៀនបានដោយសេរីនិងមិនគិតថ្លៃសម្រាប់មនុស្សគ្រប់គ្នា។<br />
        នៅ ZCode.cam យើងផ្តល់ជូននូវវគ្គសិក្សាជាភាសាសរសេរកម្មវិធីសំខាន់ៗ រួមមាន HTML,<br />
        CSS, JavaScript, C++, C, Python, Java និង PHP។<br />
        វគ្គសិក្សានីមួយៗត្រូវបានរចនាឡើងដើម្បីជួយអ្នកបង្កើតមូលដ្ឋានគ្រឹះដ៏រឹងមាំ
        និងបង្កើតគម្រោងដែលបង្ហាញពីសមត្ថភាពរបស់អ្នក។
      </p>

      <router-link
        to="/register"
        class="text-white shadow-lg rounded-2xl w-fit px-4 py-3 mt-6 bg-green-500 hover:text-black hover:bg-white border hover:border-green-500 transition"
      >
        ចូលរួមជាមួយពួកយើង
      </router-link>
    </div>

    <!-- Image -->
    <div class="w-full md:w-1/2 p-[20px] flex items-center justify-center">
      <img
        class="w-[400px] h-[200px] object-contain"
        src="@/assets/aboutUs.png"
        alt="About Us"
      />
    </div>

  </div>
</section>
</template>

<style scoped></style>
