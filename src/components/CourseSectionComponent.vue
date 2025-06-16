<script>
import LoadingComponent from './LoadingComponent.vue'
import { useCourseStore } from '../stores/coursStore';
import { useEnrollmentStore } from '../stores/enrollStore'
import { useUserStore } from '../stores/userStore';
export default {
    name: "CourseSectionComponent",
    components:{
        LoadingComponent
    },
    data(){
        return {
            visibleCount: 8,
            studentStore:useUserStore(),
            EnrollStore: useEnrollmentStore(),
            courseItem: [],
            courseStore: useCourseStore(),  
            isloading: true, 
            iserror: true,
            isCehecked: true,
        }
    },
    watch:{



    },
    async mounted(){
        await this.studentStore.fetchItems();
         await this.courseStore.fetchItems();
         await this.EnrollStore.getEnrollmentAll();
          const exiting = this.EnrollStore.enrollCourse.find(item => {return item.User_id === this.studentStore?.items?.user.id && item.course_id === 3});
          console.log(exiting)
    },
    computed: {
      sortedCourses() {
    return [...this.courseStore.items].sort((a, b) =>
      a.title.localeCompare(b.title)
    ); }
    },
    methods: {
      async handleCourse(item1,item2){
        try{
          await this.submitcoure(item1);
          this.$router.push(`/DetailCourse/${(item2)}/lession/${item1}`);
        }catch(err){
          console.log(err)
        }
      },
      async submitcoure(item1){
        const exiting = this.EnrollStore.enrollCourse.find(item => {return item.User_id === this.studentStore?.items?.user.id && item.course_id === item1});
          if(exiting){ return;}
           await this.EnrollStore.createEnrollment(this.studentStore?.items?.user.id,item1);
      }
       
    }

}
</script>


<template>

       <section  class="py-16 px-6 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-4 text-gray-800 animate-fade-in">Our Popular Courses</h2>
        <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.2s">Choose from our wide range of programming courses designed to help you master in-demand skills.</p>
       
        <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative ">
            
            <!-- HTML Course -->
            <div v-for="(item,index) in  sortedCourses.slice(0,visibleCount)" :key="index"  class="course-card-container">
                <div  class="course-card">
                    <div  class=" course-card-front rounded-xl p-3 border flex flex-col items-center justify-center border-blue-100">

                        <div  class="course-icon w-17 h-17 bg-green-500 rounded-lg flex items-center justify-center text-white mb-4">
                            <span v-html="item.icon" class="text-2xl text-white"></span>
                        </div>
                        <h3 class=" text-xl font-bold text-gray-800 mb-2"> {{ item.title }}</h3>
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
                        <button class="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition w-full" @click="handleCourse(item.id,item.title)" >Start Learning</button>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="text-center mt-16">
  <button
    v-if="visibleCount < courseStore.items.length"
    @click="visibleCount += 4"
    class="px-8 py-3 bg-gradient-to-r from-green-500 to-green-500 text-white rounded-full font-bold hover:opacity-90 transition shadow-lg animate-pulse"
  >
    View All Courses <i class="fas fa-arrow-right ml-2 animate-wave"></i>
  </button>
</div>
    </section>
</template>

<style scoped>
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