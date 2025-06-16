<template>
  <nav class="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-lg relative">
    <div class="flex justify-between items-center text-white font-bold text-xl">
      <div>ZCode.cam</div>
      <div class="relative group">
        <button @click="toggleDropdown" class="px-4 py-2 hover:bg-white hover:text-purple-700 rounded transition duration-300">
          អំពី​ពួក​យើង
        </button>

        <transition name="fade-slide">
          <div
            v-if="dropdownOpen"
            class="absolute top-14 right-0 w-[28rem] bg-white text-black rounded-xl shadow-xl z-10 p-5 flex items-start space-x-4"
          >
            <!-- Left-side Image/SVG -->
            <div class="w-24 h-24 flex-shrink-0">
              <img src="@/assets/aboutUs.png" alt="About us" class="w-full h-full object-contain" />
            </div>

            <!-- Right-side Text Content -->
            <div>
              <h2 class="text-xl font-semibold text-purple-600 mb-2">អំពី​ពួក​យើង</h2>
              <p class="text-sm mb-3 leading-relaxed">
            សូមស្វាគមន៍មកកាន់គេហទំព័រ ZCode.cam! 
            បេសកកម្មរបស់យើងគឺធ្វើឱ្យការសរសេរកូដមានលក្ខណៈសាមញ្ញ 
            ដែលមនុស្សគ្រប់គ្នាអាចចូលទៅរៀនបានដោយសេរីនិងមិនគិតថ្លៃសម្រាប់មនុស្សគ្រប់គ្នា។ 
            នៅ ZCode.cam យើងផ្តល់ជូននូវវគ្គសិក្សាជាភាសាសរសេរកម្មវិធីសំខាន់ៗ រួមមាន HTML, CSS, JavaScript, C++, C, Python, Java និង PHP។ 
            វគ្គសិក្សានីមួយៗត្រូវបានរចនាឡើងដើម្បីជួយអ្នកបង្កើតមូលដ្ឋានគ្រឹះដ៏រឹងមាំ និងបង្កើតគម្រោងដែលបង្ហាញពីសមត្ថភាពរបស់អ្នក។
              </p>
              <button class="mt-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-800 transition">
                ចូលរួមជាមួយពួកយើង
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
