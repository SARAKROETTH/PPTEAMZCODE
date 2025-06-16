<script>
import { useCourseDetailStore } from '../stores/coursedetail'
import { useCourseStore } from '../stores/coursStore'


export default{
    name:"MainCourseComponent",
     data() {
        return{
           CourseDetail:useCourseDetailStore(),
           courseStore: useCourseStore(),
        }
    },
    watch:{
         async $route() {
         setInterval(()=>{window.location.reload},100)
        }
    },
    computed:{
        CoureReference(){
            const index = parseInt(this.$route.path.split("/")[4]) - 1;
             const cartegoryId = this.courseStore.items[index]?.category_id;
            const courseReference =this.courseStore.items.filter(course => {
                return course.category_id == cartegoryId;
             });
            return courseReference
        },
        CurrentVideo(){
            const chapters = this.CourseDetail.items?.Chapters;
            if (!chapters?.length || this.messageFromSibling == null) return null;
            const question = chapters.flatMap(ch => ch.Lessons).find(l => l.id === this.messageFromSibling)|| null;
            return `${question.video_url}?autoplay=1&controls=1`
        },
        CurrentLession(){
            const chapters = this.CourseDetail.items?.Chapters;
            if (!chapters?.length || this.messageFromSibling == null) return null;
            const question = chapters.flatMap(ch => ch.Lessons).find(l => l.id === this.messageFromSibling)|| null;
            return question
        },
        CurrentChapter(){
            const chapters = this.CourseDetail.items?.Chapters[0];
            return chapters
        }
    },
    watch:{
        messageFromSibling(newval){
              console.log('Child B got new data:', newval);
        }

    },
    props:{
      messageFromSibling: [String, Number],
     
    },
    async mounted(){
        const courseId = this.$route.path.split("/")[4];
        await this.CourseDetail.fetechItem(courseId);
        await this.courseStore.fetchItems();
         // Make sure this returns a promise
    },
    methods:{
        

    }
}

</script>

<template>
        <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Bar -->
        <div class=" bg-gradient-to-r from-green-800 to-green-600 text-white p-4 animate-fadeIn">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-xl font-bold">{{ CurrentChapter?.title }}</h1>
                    <p class="text-purple-200">{{  CurrentLession?.title }}</p>
                </div>
                <div class="flex space-x-4">
                    <button class="text-white hover:text-purple-200 transition-colors">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="text-white hover:text-purple-200 transition-colors">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Tabs -->
        
        
        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
            <!-- Lesson Content -->
            <div id="lesson" class="tab-content active">
                <!-- Video Player -->
                <div class="video-container bg-gray-100 rounded-lg overflow-hidden relative mb-6 animate-fadeIn" style="animation-delay: 0.3s">
                    <!-- Video Thumbnail -->

                     <iframe class="h-full w-full" :src="CurrentVideo" frameborder="0" allowfullscreen ></iframe>
                    
                    <!-- Progress Bar -->
                    <div class="absolute bottom-0 left-0 right-0">
                        <div class="progress-bar w-full">
                            <div class="progress-fill h-full"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Video Controls -->

                
                <!-- Lesson Content -->
                <div class="mt-8 bg-white rounded-lg shadow-sm p-6 animate-fadeIn" style="animation-delay: 0.5s">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">1. {{ CurrentLession?.title  }}</h2>
                    
                    <div class="prose mt-[20px] max-w-none text-gray-700">
                        <p>{{ CurrentLession?.description }}</p>
                    </div>
                    
                    <h2 class="text-2xl mt-3 font-bold text-gray-800 mb-4">Reference Course</h2>

            <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative ">
            <!-- HTML Course -->

            <div v-for="(item,index) in CoureReference"  :key="index"  class="course-card-container">

                <div class="course-card ">

                    <div class="course-card-front rounded-xl p-3 border flex flex-col items-center justify-center border-blue-100">

                        <div class="course-icon w-17 h-17 bg-green-500 rounded-lg flex items-center justify-center text-white mb-4">
                            <span v-html="item.icon" class="text-2xl text-white"></span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2"> {{ item.title }}</h3>
                        <p class="text-gray-600 mb-6 text-center"> {{item.description}}</p>
                    </div>
                    <div class="course-card-back bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-100">
                        <div class="course-stats">
                            <div class="stat-item">
                                <div class="stat-value text-green-600">{{ item.total_lessons }}</div>
                                <div class="stat-label">Lessons</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value text-green-600">{{ item.total_chapters }}</div>
                                <div class="stat-label">Chapters</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value text-green-600">{{ item.total_quizzes }}</div>
                                <div class="stat-label">Quizzes</div>
                            </div>
                        </div>
                        <div class="progress-bar bg-gray-200 rounded-full h-2 mb-4">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 75%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Average completion time: 2 weeks</p>
                        <button class="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition w-full" @click="this.$router.push(`/DetailCourse/${(item.title)}/lession/${item.id}`)" >Start Learning</button>
                    </div>
                </div>
            </div>
            
        </div>
                    
                    <div class="mt-8 pt-6 border-t border-gray-200 animate-fadeIn" style="animation-delay: 0.6s">
                        <div class="flex justify-between">
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>

         @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .tab-button.active {
            border-bottom: 3px solid #8b5cf6;
            color: #8b5cf6;
            font-weight: 600;
        }
         .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
            animation: fadeIn 0.5s ease-out;
        }
        .video-container {
            aspect-ratio: 16/9;
        }
        .sidebar {
            scrollbar-width: thin;
            scrollbar-color: #9ca3af #f3f4f6;
        }
        
        .sidebar::-webkit-scrollbar {
            width: 6px;
        }
        
        .sidebar::-webkit-scrollbar-track {
            background: #f3f4f6;
        }
        
        .sidebar::-webkit-scrollbar-thumb {
            background-color: #9ca3af;
            border-radius: 3px;
        }
                 .course-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        }
        .course-card-container {
            perspective: 1000px;
            height: 280px;
        }
        
        .course-card {
            transition: all 0.6s ease;
            transform-style: preserve-3d;
            position: relative;
            height: 100%;
            width: 100%;
        }
        
        .course-card:hover {
            transform: rotateY(180deg);
        }
        
        .course-card-front, .course-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .course-card-back {
            transform: rotateY(180deg);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        /* From Uiverse.io by Cksunandh */ 
.switch {
  height: 24px;
  display: block;
  position: absolute;
  right: 0;
  top: 10px;
  cursor: pointer;
}
.switch input {
  display: none;
}
.switch input + span {
  padding-left: 50px;
  min-height: 24px;
  line-height: 24px;
  display: block;
  color: #99a3ba;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.switch input + span:before,
.switch input + span:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 12px;
}
.switch input + span:before {
  top: 0;
  left: 0;
  width: 42px;
  height: 24px;
  background: #e4ecfa;
  transition: all 0.3s ease;
}
.switch input + span:after {
  width: 18px;
  height: 18px;
  background: #fff;
  top: 3px;
  left: 3px;
  box-shadow: 0 1px 3px rgba(18, 22, 33, 0.1);
  transition: all 0.45s ease;
}
.switch input + span em {
  width: 8px;
  height: 7px;
  background: #99a3ba;
  position: absolute;
  left: 8px;
  bottom: 7px;
  border-radius: 2px;
  display: block;
  z-index: 1;
  transition: all 0.45s ease;
}
.switch input + span em:before {
  content: "";
  width: 2px;
  height: 2px;
  border-radius: 1px;
  background: #fff;
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin: -1px 0 0 -1px;
}
.switch input + span em:after {
  content: "";
  display: block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #99a3ba;
  border-bottom: 0;
  width: 6px;
  height: 4px;
  left: 1px;
  bottom: 6px;
  position: absolute;
  z-index: 1;
  transform-origin: 0 100%;
  transition: all 0.45s ease;
  transform: rotate(-35deg) translate(0, 1px);
}
.switch input + span strong {
  font-weight: normal;
  position: relative;
  display: block;
  top: 1px;
}

.switch input + span strong:before,
.switch input + span strong:after {
  font-size: 14px;
  font-weight: 500;
  display: block;
  font-family: "Mukta Malar", Arial;
  -webkit-backface-visibility: hidden;
}
.switch input + span strong:before {
  content: "Unlocked";
  transition: all 0.3s ease 0.2s;
}
.switch input + span strong:after {
  content: "Locked";
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  color: #02923c;
  transition: all 0.3s ease;
  transform: translate(2px, 0);
}
.switch input:checked + span:before {
  background: #eae7e7;
}
.switch input:checked + span:after {
  background: #fff;
  transform: translate(18px, 0);
}
.switch input:checked + span em {
  transform: translate(18px, 0);
  background: #02923c;
}
.switch input:checked + span em:after {
  border-color: #02923c;
  transform: rotate(0deg) translate(0, 0);
}
.switch input:checked + span strong:before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translate(-2px, 0);
}
.switch input:checked + span strong:after {
  opacity: 1;
  visibility: visible;
  transform: translate(0, 0);
  transition: all 0.3s ease 0.2s;
}

.switch :before,
:after {
  box-sizing: border-box;
}
        

</style>