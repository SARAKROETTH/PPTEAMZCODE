<script>
import axisos from 'axios';

export default {
  name: 'ProfileDropDown',
    watch: {
        isOpen(newVal) {
            this.islogout = newVal;
        }
    },
    props: {
        studentid:[Number,String],
        isOpen: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    methods: {
        handleProfile(){
            this.$router.push(`/profile/${this.studentid}`)

        },
        async handleLogout() {

            try{
                localStorage.removeItem('token');
                await axisos.post('http://localhost:3000/zcode/logout',{},{
                     withCredentials: true
                });
                
                 this.$emit('logout');
            }catch (error) {
                  console.log('Server logout failed', error);
            }
        }
    },
    mounted() {
    
        // Any initialization logic can go here
    }
};   

</script>

<template>
<div v-if="isOpen" class="input">
  <button @click="handleProfile" class="value flex items-center gap-2">
    <i class="fa-solid fa-user"></i>
    Public profile
  </button>
  <button @click="handleLogout" class="value flex items-center gap-2">
    <i class="fa-solid fa-right-from-bracket"></i>
    Log out
  </button>
</div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #efefef;
  justify-content: end;
  border-radius: 5px;
  position: absolute;
  z-index: 100;
  margin-top:10px ;
  right: 0;
}

.value {
  background-color: transparent;
  border: none;
  padding: 10px;
  color: black;
  display: flex;
  position: relative;
  gap: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.value:not(:active):hover,
.value:focus {
    color: #efefef;
  background-color: #2ee03a;
}

.value:focus,
.value:active {
  background-color: #1A1F24;
  outline: none;
}

.value::before {
  content: "";
  position: absolute;
  top: 5px;
  left: -10px;
  width: 5px;
  height: 80%;
  background-color: #2F81F7;
  border-radius: 5px;
  opacity: 0;
}

.value:focus::before,
.value:active::before {
  opacity: 1;
}

.value svg {
  width: 15px
}

</style>