<script>
import HandleErrorComponent from'../components/HandleErrorComponent.vue'
import axios from 'axios';
import { reactive,toRaw } from 'vue';
import { useUserStore } from '../stores/userStore';

export default{
    name: "LoginPage",
    components:{
         HandleErrorComponent
    },
    data(){
        return{
            userStorge: useUserStore(),

            defaulttriggerstatus:{
                 status:"",
                errorStatus:"",
                isshow: false,
                iswarning:false,
                iserror:false,
                isSuccess:false,
                default:false,
            },
            // trigger status login
            triggerstatus:{
                status:"",
                errorStatus:"",
                isshow: false,
                iswarning:false,
                iserror:false,
                isSuccess:false,
                default:false,
            },

            pharam:"",
            showLogin: true,
            loginValue:{
                email:'',
                password:''
            },
            loginpasswordVisible: false,
            registerValue:{
                name:'',
                email:'',
                password:'',
                profile_picture:'',
            },
            registerConfirm:'',
            registerPasswordVisble: false,
        }
    },
    watch:{
  '$route.path'(newPath) {
    this.getPharam(newPath);
}
    },
     mounted() {
             this.pharam = this.$route.path;
              this.getPharam(this.pharam);
             },
    computed:{
        loginTabClass(){
            return this.showLogin ? 'active bg-blue-600 text-white px-4 py-2 rounded'
            :'text-blue-600 px-4 opacity-0 py-2 rounded'
        },
        registerTabClass() {
            return !this.showLogin
        ? 'active bg-blue-600 text-white px-4 py-2 rounded'
        : 'text-blue-600 px-4 py-2 opacity-1  rounded';
        },
        loginFromClass(){
            return this.showLogin ? '':'';
        },
        authContainerClass(){
            return this.showLogin ?'auth-container':'active';
        },
        registerFromClass(){
            return !this.showLogin ? '':'';
        },
        
    },
    methods:{
        clickCancelStatus(payload){
            if(payload){
                // for reset triggerstatus
             Object.assign(this.triggerstatus, toRaw(this.defaulttriggerstatus));

            }   
        },
        changeTriggerStatus(status,errorStatus,isshow) {
            this.triggerstatus.status = status;
            this.triggerstatus.isshow = isshow;
            if(errorStatus == "isyellow"){
                this.triggerstatus.iswarning = true;
            }if (errorStatus == "isgreen") {
                this.triggerstatus.isSuccess = true;
            }if (errorStatus == "isred") {
                this.triggerstatus.iserror = true;
            } else {      
            }
        },

        NewNavagetor(path){
            this.$router.push(path)
        },
        getPharam(path){
            if(path == '/login'){
                this.showLogin = true;
            }if (path == "/register") {
                this.showLogin = false;
            }
        },
        async handleLogin() {
            
         try {
                const res = await axios.post('http://localhost:3000/zcode/login',this.loginValue,
            { 
                headers: {
                    'Content-Type': 'application/json'
                },
                
            withCredentials: true 

            }
        );
        this.userStorge.isAuthenticated = true;
        this.NewNavagetor(`/`);
        } catch (error) {
            this.changeTriggerStatus("Login failed","isred",true)
        alert('Login failed: ' + (error.response?.data?.error || error.message));
            }
        },
        async handleRegister() {
    // Validate passwords match
            if (this.registerValue.password !== this.registerConfirm) {
               this.changeTriggerStatus("Passwords do not match!","isyellow",true)
            return;
            }

    // Validate password strength
            if (this.registerValue.password.length < 8 || !/\d/.test(this.registerValue.password)) {
                this.changeTriggerStatus("assword must be at least 8 characters with at least 1 number","isyellow",true);
            return;
            }

    // Set default profile picture
            this.registerValue.profile_picture = "https://eandrrnqsieuoqnzyiab.supabase.co/storage/v1/object/public/images//photo_2025-05-14_21-27-04.jpg";
            try {
                const res = await axios.post('http://localhost:3000/zcode/users', this.registerValue, { headers: {'Content-Type': 'application/json'}});

                    this.NewNavagetor("/login");
            } catch (error) {
                 if (error.response) {
            const status = error.response.status;

            if (status === 409) {
                this.changeTriggerStatus("User already exists!","isred",true);
            } else {
                alert('Registration failed (status ' + status + '): ' + error.response.data.error);
            }
        } else {
            alert('Registration failed: ' + error.message);
        }
        }
            
    }

    }
    
}

</script>
<template>
<section class="bg-gradient-to-br from-blue-50  to-indigo-100 min-h-screen flex items-center justify-center p-4">
    <div :class="authContainerClass" class=" w-full max-w-4xl">
        <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
            <!-- Header with logo -->
            <div class="bg-gradient-to-r from-green-500 to-green-700 p-6 text-white">
                <div class="flex items-center justify-center space-x-3">
                    <i class="fas fa-graduation-cap text-3xl"></i>
                    <h1 class="text-2xl font-bold">ZcodeCam</h1>
                </div>
                <p class="text-center mt-2 text-blue-100">Access free courses and expand your knowledge</p>
            </div>
            
            <div class="flex flex-col md:flex-row">
                <!-- Left side - Featured Courses -->
                <div class="w-full md:w-1/2 bg-blue-50 p-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-6">Popular Free Courses</h2>
                    
                    <div class="space-y-4">
                    
                        <div class="course-card bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                            <h3 class="font-semibold text-blue-700">Web Development Fundamentals</h3>
                            <p class="text-sm text-gray-600 mt-1">Learn HTML, CSS & JavaScript basics</p>
                            
                        </div>
                        
                        <div class="course-card bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                            <h3 class="font-semibold text-green-700">Data Science Essentials</h3>
                            <p class="text-sm text-gray-600 mt-1">Introduction to Python for data analysis</p>
                           
                        </div>
                        
                        <div class="course-card bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                            <h3 class="font-semibold text-purple-700">Digital Marketing Basics</h3>
                            <p class="text-sm text-gray-600 mt-1">SEO, Social Media & Content Marketing</p>
                           
                        </div>
                    </div>
                    <div class=" w-full p-1.5 flex items-center justify-center">
                        <HandleErrorComponent :triggerStatus="triggerstatus"  @update-status="clickCancelStatus" />
                    </div>
                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600">Browse all 200+ free courses after signing up</p>
                    </div>
                    
                </div>
                <!-- Right side - Auth Forms -->
                <div class="w-full md:w-1/2 p-8">
                    <!-- Toggle between forms -->

                    <div class="flex justify-center mb-6">
                        <div class="bg-blue-100 rounded-full p-1 flex">
                            <button :class="loginTabClass" @click='showLogin = true' id="login-tab"  class="px-6 py-2 rounded-full font-medium text-white bg-green-500 shadow-sm transition-all duration-300">
                                Login
                            </button>
                            <button id="register-tab" :class="registerTabClass" @click='showLogin = false' class="px-6 py-2 rounded-full font-medium text-blue-600 bg-green-500 transition-all duration-300">
                                Register
                            </button>
                        </div>
                    </div>

                    <!-- Forms container -->
                    <div class="relative min-h-[400px]">
                        <!-- Login Form -->
                            <form id="login-form" v-if="showLogin" @submit.prevent="handleLogin"  class="auth-form login-form">
                            <div class="mb-6">
                                <div class="relative">
                                    <input type="email" v-model="loginValue.email" id="login-email" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="" required>
                                    <label for="login-email"  class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Email Address</label>
                                </div>
                            </div>

                            <div class="mb-6">
                                <div class="relative">
                                    <input :type="registerPasswordVisble ? 'text' : 'password'" v-model="loginValue.password" id="login-password" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="" required>
                                    <label for="login-password" class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Password</label>
                                    <span class="toggle-password absolute right-4 top-3 text-gray-400">
                                        <i v-show="registerPasswordVisble" @click="registerPasswordVisble = !registerPasswordVisble" class="far fa-eye"></i>
                                        <i v-show="!(registerPasswordVisble)" @click="registerPasswordVisble = !registerPasswordVisble" class="fa-regular fa-eye-slash"></i>
                                    </span>
                                </div>
                                <div class="flex justify-between items-center mt-2">
                                    <div class="flex items-center">
                                        <input type="checkbox" id="remember-me" class="h-4 w-4 text-blue-600 focus:ring-green-500 border-gray-300 rounded">
                                        <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                                    </div>
                                    <a href="#" class="text-sm text-blue-600 hover:text-green-500">Forgot password?</a>
                                </div>
                            </div>

                            <button type="submit" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                                <i class="fas fa-sign-in-alt mr-2"></i> Sign In
                            </button>

                            <div class="mt-6 text-center">
                                <p class="text-gray-600 text-sm">Or continue with</p>
                                <div class="flex justify-center space-x-4 mt-3">
                                    <button type="button" class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition">
                                        <i class="fab fa-google"></i>
                                    </button>
                                    <button type="button" class="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition">
                                        <i class="fab fa-github"></i>
                                    </button>
                                    <button type="button" class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition">
                                        <i class="fab fa-linkedin-in"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <!-- Register Form -->
                            <form v-else id="register-form"  @submit.prevent="handleRegister"  class="auth-form">
                            <div class="mb-4 mt-2">
                                <div class="relative">
                                    <input type="text" id="register-name" v-model="registerValue.name" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder=" " required>
                                    <label for="register-name" class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Full Name</label>
                                </div>
                            </div>
                            
                            <div class="mb-4 mt-[25px]">
                                <div class="relative">
                                    <input type="email" id="register-email" v-model="registerValue.email"  class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder=" " required>
                                    <label for="register-email" class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Email Address</label>
                                </div>
                            </div>
                            
                            <div class="mb-4 mt-[25px]">
                                <div class="relative">
                                    <input  v-model="registerValue.password" :type="registerPasswordVisble ? 'text' : 'password'" id="register-password" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder=" " required>
                                    <label for="register-password"  class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Password</label>
                                    <span class="toggle-password absolute  right-4 top-3 text-gray-400">
                                        <i v-show="registerPasswordVisble" @click="registerPasswordVisble = !registerPasswordVisble" class="far fa-eye"></i>
                                        <i v-show="!(registerPasswordVisble)" @click="registerPasswordVisble = !registerPasswordVisble" class="fa-regular fa-eye-slash"></i>

                                    </span>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">At least 8 characters with 1 number</p>
                            </div>
                            
                            <div class="mb-6 mt-[25px]">
                                <div class="relative">
                                    <input :type="registerPasswordVisble ? 'text' : 'password'" id="register-confirm" v-model="registerConfirm" class="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder=" " required>
                                    <label for="register-confirm" class="absolute left-4 top-3 text-gray-500 transition-all duration-300 pointer-events-none">Confirm Password</label>
                                </div>
                            </div>
                            
                            <div class="flex items-center mb-6">
                                <input type="checkbox" id="terms" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" required>
                                <label for="terms" class="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" class="text-green-600 hover:text-green-500">Terms</a> and <a href="#" class="text-green-600 hover:text-green-500">Privacy Policy</a>
                                </label>
                            </div>
                            
                            <button type="submit" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                                <i class="fas fa-user-plus mr-2"></i> Create Free Account
                            </button>
                            <div class="mt-4 text-center">
                                <p class="text-sm text-gray-600">By registering, you get access to:</p>
                                <ul class="text-sm flex  text-gray-600 mt-1 items-center justify-center space-y-1">
                                    <li><i class="fas fa-check-circle text-green-500 mr-1"></i> 200+ free courses</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>    

</template>
<style scoped>
        .auth-container {
            perspective: 1000px;
        }

        .auth-form {
            transition: transform 0.6s ease, opacity 0.6s ease;
            transform-style: preserve-3d;
        }

        .login-form {
            transform: rotateY(0deg);
            opacity: 1;
        }

        .register-form {
            position: absolute;
            top: 0;
            left: 0;
            transform: rotateY(180deg);
            opacity: 0;
        }

        .active .login-form {
            transform: rotateY(-180deg);
            opacity: 1;
        }

        .active .register-form {
            transform: rotateY(0deg);
            opacity: 1;
        }

        .input-field:focus + label, .input-field:not(:placeholder-shown) + label {
            transform: translateY(-35px) scale(0.9);
            color: #3bf657a5;
        }

        .toggle-password {
            cursor: pointer;
        }

        .course-card {
            transition: all 0.3s ease;
        }

        .course-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
</style>