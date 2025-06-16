<script>
import { RouterLink } from 'vue-router'
import { useCourseDetailStore } from '../stores/coursedetail'
export default{
    name:"ListCourseSectionComponent",
    data(){
        return{
            CourseDetail:useCourseDetailStore(),
            selectedLesson: null,
            itemsCourse:null
        }
    },
    watch:{
        async $router(){
             await this.CourseDetail.fetechItem(this.$route.path.split("/")[4]);
        }
    },
    computed:{
    CurrentQuest(){
           const chapters = this.CourseDetail.items?.Chapters;
            if (!chapters?.length || this.selectedLesson == null) return null;
            const question = chapters.flatMap(ch => ch.Lessons).find(l => l.id === this.selectedLesson)?.Quizzes?.find(q => q.lesson_id === this.selectedLesson)|| null;
        return question
    }
    },
    async mounted(){
        const courseId = this.$route.path.split("/")[4];
        await this.CourseDetail.fetechItem(courseId); // Make sure this returns a promise
         this.testprint();
    },
    methods:{
     selectLesson(id) {
       this.selectedLesson = id
       this.$emit('sendToMainCourse', this.selectedLesson );
    },
    testprint(){
        const LessionID = this.CourseDetail.items?.Chapters[0].Lessons[0].id || [];

         this.selectLesson(LessionID);
    }

    }
}
</script>


<template>
       <div class="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-800 animate-fadeIn">{{ CourseDetail.items?.title }} Fundamentals</h2>
        </div>
        
        <div class="sidebar overflow-y-auto flex-1">
            <div class="p-4 space-y-2">
                <div  v-for="(item ,index) in CourseDetail.items?.Chapters" :key="index" class="  ">
                    <div class="py-2 gap-1">
                       <strong class="text-[13px]">Chapters : 0{{ index +1 }}</strong> <span class=" text-[13px]">{{ item?.title }}</span> 
                    </div>
                    <div  @click="selectLesson(lessionitem.id)"  :class="{ active : selectedLesson === lessionitem.id }" class="p-2 text-[13px] " v-for="(lessionitem ,index) in item?.Lessons" :key="index" >
                        <strong>Lession : {{ index + 1 }}</strong>
                        <span>{{ lessionitem?.title }}</span>
                    </div>

                </div>
                
            
                
                <!-- Quiz Section -->
                <div class="mt-6 mb-2 animate-fadeIn" style="animation-delay: 0.4s">
                    <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Quiz</h3>
                </div>
                
                <div @click="$router.push(`/lesion_id=${selectedLesson}/quiezze/${CurrentQuest?.id}`)" class="pl-3 py-2 -ml-4 cursor-pointer hover:bg-gray-100 lesson-item animate-fadeIn" style="animation-delay: 0.5s">
                    <div class="flex justify-between items-center">
                        <h4 class="font-medium text-gray-600 flex items-center">
                            <i class="fas fa-question-circle text-purple-500 mr-2"></i>
                            <span>{{ CurrentQuest?.name }}</span>
                        </h4>
                        <span class="text-xs text-gray-400">questions</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="p-4 border-t border-gray-200 animate-fadeIn" style="animation-delay: 0.6s">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span class="text-purple-600 font-medium">JS</span>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-800">John Smith</p>
                    <p class="text-xs text-gray-500">Instructor</p>
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
        .lesson-item {
            transition: all 0.3s ease;
        }
        
        .lesson-item:hover {
            transform: translateX(5px);
        }
        .active{
            border-left: 4px solid #0cc666;
            background-color: #f0fdfa;
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
        



</style>
