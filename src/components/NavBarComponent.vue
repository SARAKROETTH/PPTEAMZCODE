<script>
import { useUserStore } from '../stores/userStore';
import CourseDropDown from './DropDowns/CourseDropDown.vue';
import AboutASDropDown from './DropDowns/AboutASDropDown.vue';
import ProfileDropDown from './DropDowns/ProfileDropDown.vue';

export default{
    name: 'NavBarComponent',
    components: {
        CourseDropDown,
        AboutASDropDown,
        ProfileDropDown
    },
    data(){
        return{
            userStore :useUserStore(),
            oncourse: false,
            isabout: false,
            intervalId : null,
            profile: false,
            studentid:null
        };
    }, 
    watch:{
      $route(){
          setTimeout(() => {
              this.userStore.fetchItems();
          }, 2000);
      }
    },
    computed:{

    },
    unwatch: {
        '$route': function(newVal, oldVal) {
            // Handle route changes if needed
            console.log('Route changed from', oldVal, 'to', newVal);
        }
    },
    async mounted(){
       await this.userStore.fetchItems();
    },
    beforeUnmount() {
        
    },
    methods:{
     
      onUserLogout(){
        this.profile = false;
        this.oncourse = false;
        this.isabout = false;
        window.location.reload();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log("User logged out successfully");
      },
      handleProfile(){
        this.profile = !this.profile;
        this.oncourse = false;
        this.isabout = false;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
      },
      handlehome(){
        this.oncourse = false;
        this.isabout = false;
        this.profile = false;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
      },
      handlecours(){
        setTimeout(() => {
             this.oncourse = !this.oncourse;
        }, 100);
         this.isabout = false;
          this.profile = false;
          console.log("this is  toggle course dropdown");
      },
      handleabout(){
        setTimeout(() => {
           this.isabout = !this.isabout;
        }, 100);
         this.oncourse = false;
          this.profile = false;
          console.log("this is  toggle about dropdown");
      },

    }
};
</script>


<template>
    <nav class="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-150">
        <div class=" flex items-center space-x-8">
            <div class="flex items-center animate-pulse">
            <img class=" w-[100px] h-[50px] " src="https://eandrrnqsieuoqnzyiab.supabase.co/storage/v1/object/public/images//image.png" alt="">
        </div>
         <div class="hidden md:flex space-x-8">
            <a href="#" @click="handlehome" class="nav-link text-gray-800 hover:text-green-500  font-medium transition"><router-link to="/">Home</router-link></a>
            <a href="#" @click="handlecours" class="nav-link text-gray-800 hover:text-green-500 font-medium transition">Courses</a>
            <a href="#" @click="handleabout" class="nav-link text-gray-800 hover:text-green-500  font-medium transition">About Us</a>
        </div>
        </div>
        <!-- Profile View  -->
         <div @click="handleProfile" v-if="userStore.isAuthenticated || userStore.items" >
            <button id="btn-message" class="button-message">
	                <div class="content-avatar">
		        <div class="avatar">
                    <img :src="userStore.items?.user.profile_picture" alt="">
		    </div>
	        </div>
	        <div class="notice-content">
		<div class="username">{{ userStore?.items?.user.name }}</div>
		<div class="lable-message">{{ userStore?.items?.user.name }}<span class="number-message">3</span></div>
		<div class="user-id">@{{ userStore?.items?.user.name}}</div>
	        </div>
        </button>
            
         </div>
         <div  v-else class="flex  items-center space-x-4"> 
            <button class="px-4 py-2 text-gray-800 font-medium hover:text-green-500  transition animate-wave"><router-link to="/login">login</router-link></button>
            <button class="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium hover:opacity-90 transition shadow-lg animate-bounce"><router-link to="/register">Sign Up</router-link></button>
        </div>
       
    </nav>
    <CourseDropDown :isOpen="oncourse" />
    <AboutASDropDown :isOpen="isabout" />
    <ProfileDropDown :studentid="userStore?.items?.user.id" :isOpen="profile"  @logout="onUserLogout" />


</template>
<style scoped>
/* From Uiverse.io by Li-Deheng */ 
#btn-message {
  --text-color: rgb(255, 255, 255);
  --bg-color-sup: #5e5e5e;
  --bg-color: #2b2b2b;
  --bg-hover-color: #27b35a;
  --online-status: #00da00;
  --font-size: 16px;
  --btn-transition: all 0.2s ease-out;
}


.button-message {
  display: flex;
  justify-content: center;
  align-items: center;
  font: 400 var(--font-size) Helvetica Neue, sans-serif;
  box-shadow: 0 0 2.17382px rgba(0,0,0,.049),0 1.75px 6.01034px rgba(0,0,0,.07),0 3.63px 14.4706px rgba(0,0,0,.091),0 22px 48px rgba(0,0,0,.14);
  background-color: var(--bg-color);
  border-radius: 68px;
  cursor: pointer;
  padding: 6px 10px 6px 6px;
  width: fit-content;
  height: 40px;
  border: 0;
  overflow: hidden;
  position: relative;
  transition: var(--btn-transition);
}

.button-message:hover {
  height: 56px;
  padding: 8px 20px 8px 8px;
  background-color: var(--bg-hover-color);
  transition: var(--btn-transition);
}

.button-message:active {
  transform: scale(0.99);
}

.content-avatar {
  width: 30px;
  height: 30px;
  margin: 0;
  transition: var(--btn-transition);
  position: relative;
}

.button-message:hover .content-avatar {
  width: 40px;
  height: 40px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--bg-color-sup);
}

.user-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-user {
  position: absolute;
  width: 6px;
  height: 6px;
  right: 1px;
  bottom: 1px;
  border-radius: 50%;
  outline: solid 2px var(--bg-color);
  background-color: var(--online-status);
  transition: var(--btn-transition);
  animation: active-status 2s ease-in-out infinite;
}

.button-message:hover .status-user {
  width: 10px;
  height: 10px;
  right: 1px;
  bottom: 1px;
  outline: solid 3px var(--bg-hover-color);
}

.notice-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 8px;
  text-align: initial;
  color: var(--text-color);
}

.username {
  letter-spacing: -6px;
  height: 0;
  opacity: 0;
  transform: translateY(-20px);
  transition: var(--btn-transition);
}

.user-id {
  font-size: 12px;
  letter-spacing: -6px;
  height: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--btn-transition);
}

.lable-message {
  display: flex;
  align-items: center;
  opacity: 1;
  transform: scaleY(1);
  transition: var(--btn-transition);
}

.button-message:hover .username {
  height: auto;
  letter-spacing: normal;
  opacity: 1;
  transform: translateY(0);
  transition: var(--btn-transition);
}

.button-message:hover .user-id {
  height: auto;
  letter-spacing: normal;
  opacity: 1;
  transform: translateY(0);
  transition: var(--btn-transition);
}

.button-message:hover .lable-message {
  height: 0;
  transform: scaleY(0);
  transition: var(--btn-transition);
}

.lable-message, .username {
  font-weight: 600;
}

.number-message {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 8px;
  font-size: 12px;
  width: 16px;
  height: 16px;
  background-color: var(--bg-color-sup);
  border-radius: 20px;
}

.course-active {
  background-color: var(--online-status);
  color: white;
}


.course-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
}

/*==============================================*/
@keyframes active-status {
  0% {
    background-color: var(--online-status);
  }

  33.33% {
    background-color: #93e200;
  }

  66.33% {
    background-color: #93e200;
  }

  100% {
    background-color: var(--online-status);
  }
}
.nav-link {
            position: relative;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: #17b92f;
            transition: width 0.3s ease;
        }
        .nav-link:hover::after {
            width: 100%;
        }
         .animate-wave {
            animation: wave 3s ease-in-out infinite;
        }
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
 
</style>
