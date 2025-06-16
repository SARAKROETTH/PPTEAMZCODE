<script>
import { ref } from 'vue';
export default{
    name:"NotFoundPage",
    data(){ 
    return {
      starCount: 100,
    };
  },
  mounted() {
    const container = this.$refs.starsContainer;

    for (let i = 0; i < this.starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3;
      const delay = Math.random() * 5;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty('--delay', delay);

      container.appendChild(star);
    }
  },
  methods:{
    handleMouseMove(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const astronaut = this.$refs.astronaut;
      const planet = this.$refs.planet;

      astronaut.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px) rotate(${x * 10 - 5}deg)`;
      planet.style.transform = `translate(${x * 40 - 20}px, ${y * 40 - 20}px) rotate(${x * 120}deg)`;
    },
  }


}

</script>

<template>
    <div  @mousemove="handleMouseMove" class="bg-black  text-white min-h-screen flex flex-col items-center justify-center overflow-hidden relative">

    <div ref="starsContainer" id="stars-container"  class="stars-container inset-0 overflow-hidden"></div>
    
    <!-- Planet -->
    <div ref="planet" class="planet absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-900 to-blue-900">
        <div class="absolute top-20 left-20 w-16 h-16 rounded-full bg-blue-700"></div>
        <div class="absolute top-40 left-10 w-24 h-24 rounded-full bg-purple-800"></div>
    </div>
    
    <!-- Main content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div class="flex justify-center mb-8">
            <div class="astronaut relative">
                <div ref="astronaut" class="w-40 h-48 bg-white rounded-full relative">
                    <!-- Astronaut helmet -->
                    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-400">
                        <!-- Visor -->
                        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-16 rounded-full bg-gradient-to-b from-blue-900 to-blue-500"></div>
                        <!-- Reflection -->
                        <div class="absolute top-10 left-10 w-6 h-4 rounded-full bg-white opacity-60"></div>
                    </div>
                    <!-- Body -->
                    <div class="absolute top-32 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-white rounded-b-full"></div>
                    <!-- Arms -->
                    <div class="absolute top-32 left-2 w-6 h-16 bg-white rounded-full"></div>
                    <div class="absolute top-32 right-2 w-6 h-16 bg-white rounded-full"></div>
                    <!-- Legs -->
                    <div class="absolute top-44 left-10 w-6 h-12 bg-white rounded-b-full"></div>
                    <div class="absolute top-44 right-10 w-6 h-12 bg-white rounded-b-full"></div>
                    <!-- Oxygen tank -->
                    <div class="absolute top-28 -right-4 w-8 h-12 bg-gray-300 rounded-full"></div>
                    <!-- Oxygen tubes -->
                    <div class="absolute top-32 right-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div class="absolute top-36 right-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <!-- Floating bubbles -->
                <div class="absolute -top-4 left-12 w-3 h-3 bg-blue-300 rounded-full opacity-80 animate-bounce" style="animation-delay: 0.2s;"></div>
                <div class="absolute -top-8 right-12 w-4 h-4 bg-blue-400 rounded-full opacity-80 animate-bounce" style="animation-delay: 0.5s;"></div>
                <div class="absolute top-4 -left-4 w-2 h-2 bg-blue-200 rounded-full opacity-80 animate-bounce" style="animation-delay: 0.8s;"></div>
            </div>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-bold mb-4 glow">404</h1>
        <h2 class="text-2xl md:text-4xl font-semibold mb-6">Houston, we have a problem!</h2>
        <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">The page you're looking for seems to have drifted off into the unknown reaches of the internet.</p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a class="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2 pulse">
                <i class="fas fa-rocket"></i> <router-link to="/">Back to HomePage</router-link>
            </a>
            <a href="#" class="px-6 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-2">
                <i class="fas fa-question-circle"></i> Need Help?
            </a>
        </div>
    </div>
    
    <!-- Floating space debris -->
    <div class="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-gray-500 opacity-60 animate-bounce" style="animation-delay: 0.3s;"></div>
    <div class="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-gray-400 opacity-60 animate-bounce" style="animation-delay: 0.6s;"></div>
    <div class="absolute bottom-1/4 right-1/4 w-10 h-4 rounded-full bg-gray-600 opacity-60 animate-bounce" style="animation-delay: 0.9s;"></div>

    </div>
    
    



</template>

<style scoped>
.space-scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
@keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        @keyframes twinkle {
            0%, 100% {
                opacity: 0.2;
                transform: scale(0.8);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .astronaut {
            animation: float 6s ease-in-out infinite;
        }
        
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: twinkle 3s ease-in-out infinite;
            animation-delay: calc(var(--delay) * 1s);
        }
        .stars-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        .planet {
            animation: rotate 120s linear infinite;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            70% {
                transform: scale(1.05);
                box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
        
        .glow {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                         0 0 20px rgba(255, 255, 255, 0.6), 
                         0 0 30px rgba(255, 255, 255, 0.4);
        }


</style>