<script>
import { useCourseStore } from '../stores/coursStore';
export default {
    name: 'MainSectionComponent',
    data() {
        return {
            Coures: useCourseStore(),
            searchKeyword: '',
            stars: [],
            codeElements: [],
            codeSnippets: [
        "<div>Hello World</div>",
        "function hello() {}",
        "const x = 10;",
        "class MyClass {}",
        "import React from 'react'",
        "System.out.println();",
        "public static void main()",
        "#include <stdio.h>",
        "print('Hello')",
        "echo 'Hello'",
        "<?php echo 'Hi'; ?>"
      ],
        }
    },
    mounted() {
    this.createStars();
    this.createCodeElements();
  },
    methods: {
    createCodeElements() {
      const count = 15;
      for (let i = 0; i < count; i++) {
        const text = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
        this.codeElements.push({
          text,
          left: Math.random() * 100,
          delay: Math.random() * 15,
          fontSize: 0.8 + Math.random() * 0.7,
          opacity: 0.1 + Math.random() * 0.2
        });
      }
    },
    createStars() {
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        this.stars.push({
          size: Math.random() * 2 + 1,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 4,
        });
      }
    }
    },
    computed:{
      filteredCourses() {
      if (!this.searchKeyword.trim()) return [];
      const keyword = this.searchKeyword.toLowerCase();
      return this.Coures.items.filter(course =>
        course.title.toLowerCase().includes(keyword) ||
        course.description.toLowerCase().includes(keyword)
      );
    }

    }
}

</script>

<template>
  <section class="hero-section text-white py-20 px-6 text-center relative overflow-hidden">
    <!-- ✨ Animated Stars Background -->
    <div id="stars-container" class="stars-container absolute inset-0 z-0">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star absolute bg-white rounded-full opacity-50 animate-pulse"
        :style="{
          width: star.size + 'px',
          height: star.size + 'px',
          left: star.left + '%',
          top: star.top + '%',
          animationDelay: star.delay + 's'
        }"
      ></div>
    </div>

    <!-- 💻 Floating Code Elements -->
    <div id="code-elements-container" class="code-elements-container absolute inset-0 z-0">
      <div
        v-for="(code, index) in codeElements"
        :key="index"
        class="floating-code absolute text-green-300 animate-bounce"
        :style="{
          left: code.left + '%',
          animationDelay: code.delay + 's',
          fontSize: code.fontSize + 'rem',
          opacity: code.opacity
        }"
      >
        {{ code.text }}
      </div>
    </div>

    <!-- 🌟 Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">Learn to Code</h1>
      <p class="text-xl mb-8 max-w-2xl mx-auto text-green-100">
        Start your coding journey today with our interactive courses designed for beginners and experts alike.
      </p>

      <!-- 🔍 Search Input & Button -->
      <div class="relative max-w-xl mx-auto">
<input v-model="searchKeyword" type="text" placeholder="What do you want to learn today?" class="w-full py-4 px-6 rounded-full bg-green-500/20 text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-400" />
        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition"
        >
          Start
        </button>
      </div>

      <!-- 🧠 Filtered Course Results -->
      <div v-if="searchKeyword" class="flex absolute left-1/2 transform -translate-x-1/2 z-150 w-[500px] bg-gray-200  flex-col  mt-2">
        <div @click="$router.push(`/DetailCourse/${item.title}/lession/${item.id}`);" v-for="(item, index) in filteredCourses.slice(0,2)"
          :key="index" 
          class=" borde flex  border-green-200 rounded bg-white text-gray-800 shadow hover:bg-green-100 transition p-2 "
        >
        <div class="  flex items-center gap-x-2 justify-center">
          <div  class="course-icon w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center  text-white ">
            <span v-html="item.icon" class="text-xl text-white"></span>
          </div>
          <div class="flex cursor-pointer flex-col items-start justify-start  ">
             <h3 class="text-xl font-bold text-black">{{ item.title }}</h3>
            <p class="text-black">{{ item.description }}</p>
          </div>
        </div>
          
        </div>
        <div
          v-if="filteredCourses.length === 0"
          class="col-span-full text-center text-black p-2  mt-4"
        >
          No courses found.
        </div>
      </div>

      <!-- 💥 Bouncing Tech Icons -->
      <div class="mt-12 flex justify-center space-x-4">
        <div
          class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center animate-bounce"
          style="animation-delay: 0.1s"
        >
          <i class="fab fa-html5 text-white text-xl"></i>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center animate-bounce"
          style="animation-delay: 0.2s"
        >
          <i class="fab fa-css3-alt text-white text-xl"></i>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce"
          style="animation-delay: 0.3s"
        >
          <i class="fab fa-js text-white text-xl"></i>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center animate-bounce"
          style="animation-delay: 0.4s"
        >
          <i class="fab fa-java text-white text-xl"></i>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>  
.hero-section {
            background: linear-gradient(rgba(16, 106, 133, 0.7), rgba(53, 50, 50, 0.7)), 
                        url('https://eandrrnqsieuoqnzyiab.supabase.co/storage/v1/object/public/images//bg.png');
            background-size: cover;
            position: relative;
            overflow: hidden;
        }
    .star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 2s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
.code-elements-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.floating-code {
  position: absolute;
  top: -2rem;
  white-space: nowrap;
  color: #0ff;
  animation: floatDown 20s linear infinite;
  font-family: monospace;
}

@keyframes floatDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(110vh);
  }
}
</style>