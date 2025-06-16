<script >
import ListCourseSectionComponent from '../components/ListCourseSectionComponent.vue';
import MainCourseComponent from '../components/MainCourseComponent.vue';
import { useCourseDetailStore } from '../stores/coursedetail';
import { provide, reactive } from 'vue';

export default{
    name:"CourseDetailPage",
    components:{
        ListCourseSectionComponent,
        MainCourseComponent
    },
    watch:{
        $router(){
             this.uesCourse.fetctData(this.$route.path.split("/")[4]);
        }
    },
    data(){
        return{
            uesCourse:useCourseDetailStore(),
            messageToB:null
        }
    },
    mounted(){
        this.uesCourse.fetechItem(this.$route.path.split("/")[4]);
    },
    methods:{
    handleFromChildA(payload) {
      this.messageToB = payload;
    }
    },
}

</script>

<template>
    <section class="bg-gray-50 font-sans flex h-screen overflow-hidden">
        <ListCourseSectionComponent  @sendToMainCourse="handleFromChildA" />
        <MainCourseComponent :messageFromSibling="messageToB" />
    </section>
</template>

<style scoped>
 @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideInRight {
            animation: slideInRight 0.4s ease-out forwards;
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
        
        .video-container {
            aspect-ratio: 16/9;
        }
        
        .progress-bar {
            height: 4px;
            background-color: #e5e7eb;
        }
        
        .progress-fill {
            width: 35%;
            background-color: #8b5cf6;
            transition: width 0.3s ease;
        }
        
        .active-lesson {
            border-left: 4px solid #06b6d4;
            background-color: #f0fdfa;
            transform: scale(1.02);
            transition: all 0.3s ease;
        }
        
        .completed-lesson .lesson-title::after {
            content: "✓";
            color: #10b981;
            margin-left: 8px;
            transition: all 0.3s ease;
        }
        
        .lesson-item {
            transition: all 0.3s ease;
        }
        
        .lesson-item:hover {
            transform: translateX(5px);
        }
        
        .quiz-option {
            transition: all 0.2s ease;
        }
        
        .quiz-option:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .quiz-option.selected {
            background-color: #f0fdfa;
            border-color: #06b6d4;
        }
        
        .quiz-option.correct {
            background-color: #ecfdf5;
            border-color: #10b981;
        }
        
        .quiz-option.incorrect {
            background-color: #fef2f2;
            border-color: #ef4444;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
            animation: fadeIn 0.5s ease-out;
        }
        
        .tab-button.active {
            border-bottom: 3px solid #8b5cf6;
            color: #8b5cf6;
            font-weight: 600;
        }
</style>