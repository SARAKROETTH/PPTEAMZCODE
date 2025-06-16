<script>
import NavBarComponent from '../components/NavBarComponent.vue'
import MainSectionComponent from '../components/MainSectionComponent.vue'
import CourseSectionComponent from '../components/CourseSectionComponent.vue'
import FooterSectionComponent from '../components/FooterSectionComponent.vue'
import { useUserStore } from '../stores/userStore'

export default {
    name: 'HomePage',
    data(){
        return{
            userStore: useUserStore(),
            onLogin: false,
            studentId :null
        }
    },
    watch:{
        studentId(newval){
              console.log('Child B got new data:', newval);
        },
        '$route.path'(newPath) {
           this.onLoad(newPath);
        }
    },
    components: {
        NavBarComponent,
        MainSectionComponent,
        CourseSectionComponent,
        FooterSectionComponent
    },
    methods:{
        onload(path){
            console.log(path);
        },
        handleEmit(payload){
            this.studentId = payload;
        }
    }

}
</script>


<template>
    <NavBarComponent @sendToMainSection="handleEmit" />
    <MainSectionComponent :studentId="studentId"/>
    <CourseSectionComponent/>
    <FooterSectionComponent/>
</template>

<style scoped>


 
</style>