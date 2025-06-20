<template>
  <div class="bg-gray-50 font-sans">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-gradient-to-r from-green-800 to-green-600 rounded-xl shadow-lg p-6 mb-8 relative">
        <div class="flex flex-col md:flex-row items-center">
          <div class="relative mb-4 md:mb-0 md:mr-6">
            <img :src="CurrentStudent?.profile_picture" alt="Profile" class="profile-pic rounded-full" />
            </div>
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-2xl font-bold text-white">{{ CurrentStudent?.name }}</h1>

            <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
              <div class="flex items-center text-white">
                <i class="fas fa-graduation-cap mr-2"></i>
                <span>{{ courseEnrolledLength }} Courses Enrolled</span>
              </div>

              <div class="flex items-center text-white">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>Member since {{ DateMember }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 md:mt-0">
            <button class="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              <i class="fas fa-cog mr-2"></i> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Quizzes Dashboard</h1>
      </header>

      <div class="flex border-b border-gray-200 mb-6">
        <button
          @click="filterContent('quizzes')"
          :class="{ 'tab-active': activeTab === 'quizzes' }"
          class="px-4 py-2 mr-2 text-sm font-medium"
        >
          Quizzes
        </button>
        <button
          @click="filterContent('allCourses')"
          :class="{ 'tab-active': activeTab === 'allCourses' }"
          class="px-4 py-2 mr-2 text-sm font-medium"
        >  
          All Courses
        </button>
      </div>

      <div v-if="activeTab === 'quizzes'" id="quizzes-container" class="grid grid-cols-1 gap-6">
        <div
          v-if="filteredQuizzes.length === 0"
          class="col-span-3 text-center py-12"
        >
          <i class="fas fa-question-circle text-4xl text-gray-300 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-500">No quizzes found</h3>
          <p class="text-gray-400 mt-1">
            It looks like there are no quizzes available for your enrolled courses yet.
          </p>
        </div>
        <div
          v-for="(quiz,index) in filteredQuizzes"
          :key="index"
          class="course-card bg-white rounded-lg shadow overflow-hidden transition-all duration-200">
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/4 flex items-center bg-green-800 justify-center h-48 md:h-auto">
              <div class="course-icon w-20 h-20 bg-green-800 rounded-lg flex items-center justify-center text-white mb-4">
                <span v-html="quiz.icon || '<i class=\'fas fa-question\'></i>'" class="text-5xl text-white"></span>
              </div>
            </div>
            <div class="p-6 w-full md:w-3/4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-1">
                    Lession  {{ quiz.name.split(' ')[0] }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ quiz.name }} Quiz</p>
                </div>
                <span
                  :class="{
                    'bg-green-100 text-green-800': getPercentage(quiz, index) >= 50 ,
                    'bg-yellow-100  text-yellow-800': getPercentage(quiz, index) >= 50 && getPercentage(quiz, index) <= 80,
                    'bg-red-100 text-red-800': getPercentage(quiz, index) < 50,
                  }"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ getStatusLabel(quiz, index) }}
                </span>
              </div>

              <div class="mt-4">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Score</span>
                  <span class="text-sm font-medium text-gray-700">{{ getPercentage(quiz, index) + '%' }}</span>
                </div>
                <div class="progress-bar">
                  <div
  class="progress-fill"
  :class="{
    'bg-green-500': getPercentage(quiz, index) > 80,
    'bg-yellow-500': getPercentage(quiz, index) >= 50 && getPercentage(quiz, index) <= 80,
    'bg-red-500': getPercentage(quiz, index) <= 50 }"
  :style="{ width: getPercentage(quiz, index) + '%' }"></div>
                </div>
              </div>

              <div class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
               
                <div class="mt-2 md:mt-0 text-right">
                  <p v-if="quiz.attempts" class="text-sm text-gray-600">Attempts: {{ quiz.attempts }}</p>
                </div>
              </div>

              <div class="mt-4 flex justify-end">
                <button  :disabled="getQuizStatus(quiz, index)" @click="$router.push(`/lesion_id=${quiz.lesson_id}/quiezze/${quiz.id}`)" class="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors">
                  {{  getNameBtnQuiz(quiz, index)  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'allCourses' || activeTab === 'pendingCourses' || activeTab === 'completedCourses'" id="courses-container" class="grid grid-cols-1 gap-6">
        <div
          v-if="filteredCourses?.length === 0"
          class="col-span-3 text-center py-12"
        >
          <i class="fas fa-book-open text-4xl text-gray-300 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-500">
            No {{ activeTab === 'allCourses' ? '' : activeTab.replace('Courses', '') }} courses found
          </h3>
          <p class="text-gray-400 mt-1">
            {{
              activeTab === 'completedCourses'
                ? 'Complete some courses to see them here'
                : 'You have no pending courses at the moment'
            }}
          </p>
        </div>
        <div
          v-for="(course, index) in filteredCourses"
          :key="index"
          class="course-card bg-white rounded-lg shadow overflow-hidden transition-all duration-200"
        >
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/4 flex items-center bg-green-800 justify-center h-48 md:h-auto">
            <div  class="course-icon w-20 h-20 bg-green-800 rounded-lg flex items-center justify-center text-white mb-4">
                <span v-html="course.icon" class="text-5xl text-white"></span>
            </div>
            </div>
            <div class="p-6 w-full md:w-3/4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-1">
                    {{ course.title }} Fundamentals
                  </h3>

                </div>
                <span
                  :class="{
                    'bg-green-100 text-green-800': getPercentageCourse(course,index) ==100,
                    'bg-yellow-100 text-yellow-800': getPercentageCourse(course,index) < 100 ,
                  }"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{  getStatusCourse(course,index) }}
                </span>
              </div>

              <div class="mt-4">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Progress</span>
                  <span class="text-sm font-medium text-gray-700"
                    >{{ getPercentageCourse(course,index) }}%</span
                  >
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :class="{
                      'bg-green-500': getPercentageCourse(course,index) >= 80,
                      'bg-indigo-500': getPercentageCourse(course,index) <=50 && getPercentageCourse(course,index) < 80,
                      'bg-yellow-500': getPercentageCourse(course,index) < 50
                    }"
                    :style="{ width: getPercentageCourse(course,index) + '%' }"
                  ></div>
                </div>
              </div>

              <div class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ course.description }}</span>
                  <p v-if="course.completionDate" class="text-sm text-gray-500 mt-1">
                    <i class="fas fa-calendar-alt mr-1"></i> Completed on
                    {{ new Date(course.completionDate).toLocaleDateString() }}
                  </p>
                  <p v-else class="text-sm text-gray-500 mt-1">
                    <i class="fas fa-clock mr-1"></i> Start Coures:
                    {{
                      new Date(course.createDate).toLocaleDateString()
                    }}
                  </p>
                </div>
                <div class="mt-2 md:mt-0 text-right">
                  <p v-if="course.status === 'completed'" class="text-green-600 font-medium">
                    Earned: ${{ course.earnings.toFixed(2) }}
                  </p>
                </div>
              </div>

              <div class="mt-4 flex justify-end">
                <button @click="$router.push(`/DetailCourse/:courseId/lession/${course.id}`)" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  {{ course.status === 'completed' ? 'View Certificate' : 'Continue Learning' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <nav class="inline-flex rounded-md shadow">
          <a href="#" @click="prevPage" :disabled="currentPage === 1" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <i class="fas fa-chevron-left"></i>
          </a>
          <a href="#" @click="changePage(page)" :class="{'text-indigo-600':currentPage === page}"  v-for="page in totalPages" :key="page" class="px-3 py-2 border-t border-b border-gray-300 bg-white font-medium">{{ page }}</a>
          <a href="#" @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <i class="fas fa-chevron-right"></i>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from '../stores/quizStore'
import { useStudentStore } from '../stores/StudentStore';
import { useEnrollmentStore } from '../stores/enrollStore';
import { useCourseStore } from '../stores/coursStore';
import { useStudentLessionStore } from '../stores/lessionstudent';

export default {
  name: 'StudentProfitTracker',
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      DateQuize:null,
      studentQuizzes:[],
      currentQuize:[],
      QuzieData:useQuizStore(),
      QuzieEnroll: useStudentLessionStore(),
      courseStore: useCourseStore(),
      studentData: useStudentStore(),
      EnrolledStore: useEnrollmentStore(),
      lastFilter: [],
      filterCourses: null,
      activeTab: 'allCourses', // Default to 'allCourses'
      searchQuery: '',
      sortBy: '',
      filterCategory: '',
    };
  },
  watch:{

  },
  async mounted() {
      const studentID = this.$route.path.split("/")[2];
      await this.studentData.fetchDataStudent(studentID);
      await this.EnrolledStore.getEnrollmentAll();
      await this.courseStore.fetchItems();
      await this.QuzieEnroll.fetchStudentLession();
      await this.QuzieData.fetchItemAll();
      await this.QuzieData.fetchQuiz();
     
      this.CourseFilter();
      this.Quziefilter();
      
  },
  computed: {
      totalPages() {
      return Math.ceil(this.lastFilter.length / this.perPage);
    },
    courseEnrolledLength() {
      const studentID = this.$route.path.split("/")[2];
      this.filterCourses = this.EnrolledStore?.enrollCourse?.filter((item) => {
        return item.User_id == parseInt(studentID);
      });
      return this.filterCourses?.length;
    },
    DateMember() {
      const DateMember = this.studentData.student?.createdAt;
      if (DateMember){
        const initDate = new Date(DateMember);
        return initDate.getFullYear();
      }
      return '';
    },
    CurrentStudent() {
      return this.studentData.student;
    },
    filteredCourses() {
      let filtered = this.lastFilter?.map(item => ({ ...item, createDate: this.getDateEnrollment(item.id) })) || [];

      if (this.activeTab === 'pendingCourses') {
        filtered = filtered.filter((course) => course.status === 'pending');
      } else if (this.activeTab === 'completedCourses') {
        filtered = filtered.filter((course) => course.status === 'completed');
      }

      // Search functionality for courses
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query)
        );
      }

      // Filter by category for courses
      if (this.filterCategory) {
        filtered = filtered.filter((course) => course.category === this.filterCategory);
      }

      // Sort functionality for courses
      if (this.sortBy) {
        filtered.sort((a, b) => {
          if (this.sortBy === 'newest') {
            return new Date(b.completionDate || b.createDate) - new Date(a.completionDate || a.createDate);
          } else if (this.sortBy === 'oldest') {
            return new Date(a.completionDate || a.createDate) - new Date(b.completionDate || b.createDate);
          } else if (this.sortBy === 'highest_earnings') {
            return b.earnings - a.earnings;
          } else if (this.sortBy === 'completion_date') {
            if (a.completionDate && b.completionDate) {
              return new Date(b.completionDate) - new Date(a.completionDate);
            } else if (a.completionDate) {
              return -1;
            } else if (b.completionDate) {
              return 1;
            }
            return 0;
          }
          return 0;
        });
      }
      const start = (this.currentPage - 1) * this.perPage;

      return filtered.slice(start, start + this.perPage);
    },
    filteredQuizzes() {
      // Get the student ID from the route
      const studentID = parseInt(this.$route.path.split("/")[2]);

      // Filter the quizzes from the quiz store that are associated with the student's enrolled quizzes
        this.studentQuizzes = this.QuzieData?.Datequize?.filter(quiz => {
        return this.QuzieEnroll?.items.some(enrollment => 
          enrollment.student_id === studentID && enrollment.quiz_id === quiz.id
        );
      }).map(quiz => {
        // Find the specific enrollment record for this quiz and student
        const enrollmentRecord = this.QuzieEnroll.items.find(enrollment => 
          enrollment.student_id === studentID && enrollment.quiz_id === quiz.id
        );
        // Augment the quiz data with student-specific details from the enrollment record
        return {
          ...quiz,
          score: enrollmentRecord ? enrollmentRecord.score : null, // Assuming 'score' directly exists in enrollment record
          status: enrollmentRecord ? enrollmentRecord.status : 'pending', // Assuming 'status' directly exists
          attempts: enrollmentRecord ? enrollmentRecord.attempts : 0, // Assuming 'attempts' directly exists
          completionDate: enrollmentRecord ? enrollmentRecord.completion_date : null, // Assuming 'completion_date'
          createDate: enrollmentRecord ? enrollmentRecord.created_at : quiz.createDate // Use enrollment date if available, otherwise quiz creation date
        };
      });

      let filtered = this.studentQuizzes || [];

      // Add search functionality for quizzes (if needed)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (quiz) =>
            quiz.title.toLowerCase().includes(query) ||
            quiz.courseTitle.toLowerCase().includes(query)
        );
      }
      const start = (this.currentPage - 1) * this.perPage;

      return filtered.slice(start, start + this.perPage);
    }
  },
  methods: {
  nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  changePage(page) {
      this.currentPage = page;
    },
  getNameBtnQuiz(quiz, index){
    const percentTageQuiz =  this.getPercentage(quiz, index);

    if(percentTageQuiz == 100) return 'Complated'

    return 'Start Quiz'
  },
  getQuizStatus(quiz, index){
    const percentTageQuiz =  this.getPercentage(quiz, index)
    if(percentTageQuiz == 100) return true;
    return false
  },
  getPercentageCourse(course,index){
    const studentId = this.$route.path.split('/')[2];

    // QuizLenght of course 
    const courseData =  course.Chapters.flatMap(ch => ch.Lessons);
    const quizLenght =  this.QuzieData.Datequize.filter(item =>{
      return courseData.some(cd => {
        return cd.id === item.lesson_id
      })
    }).flatMap(ch => ch.QuizQuestions).length;

    const score = this.QuzieEnroll.items.filter(item =>{
      return item.student_id === parseInt(studentId) &&  courseData.some(cd => {
        return cd.id === item.lesson_id
      })
    }).reduce((sum, result) => sum + result.score, 0);

    const percentageCourse = parseInt((score / quizLenght) * 100)

    if(isNaN(percentageCourse)){
      return 0
    }

    return percentageCourse
  },
  getStatusCourse(course,index){
    const percentageCourse =  this.getPercentageCourse(course,index);

    if(percentageCourse == 100){
      return 'complated'
    }
   return 'In Progress'
  },

  getPercentage(quiz, index) {
    return parseInt((this.studentQuizzes[index].score / this.studentQuizzes[index].QuizQuestions.length) * 100);
    
  },
  getStatusLabel(quiz, index) {
  const percent = this.getPercentage(quiz, index);
  if (percent >= 80) return 'Excellent';
  if (percent >= 50) return 'Good job';
  return 'Keep practicing';
},
    getStatusColor(quiz, index) {
    const percent = this.getPercentage(quiz, index);
    return percent >= 50 ? 'text-green-700' : 'text-red-700';
  },
    filterContent(tab) {
      this.activeTab = tab;
      this.searchQuery = ''; // Clear search when changing tabs
      this.sortBy = ''; // Clear sort when changing tabs
      this.filterCategory = ''; // Clear category filter when changing tabs
      this.currentPage = 1;

    },
    getDateEnrollment(id) {
      const res = this.filterCourses.find(item => {
        return item.course_id == id;
      });
      if (res) {
        const CurrentRes = new Date(res.enrolment_date);
        return CurrentRes;
      } 
      return null;
    },
    CourseFilter() {
      const studentID = this.$route.path.split("/")[2];
      const coursedate = this.courseStore.items;

      this.lastFilter = coursedate?.filter(item => {
        return this.filterCourses?.some(e => {
          return e.course_id === item.id &&
            e.User_id === parseInt(studentID);
        });
      }) || [];
    },
    Quziefilter(){
        const studentID = parseInt(this.$route.path.split("/")[2]);
        this.currentQuize = this.QuzieData?.Datequize.filter(qd =>{
            return this.QuzieEnroll?.items.some(qe =>{
                return qe.student_id === studentID && qe.quiz_id === qd.id;
            });
        });
    }
  },
};
</script>

<style scoped>
.progress-bar {
  height: 8px;
  border-radius: 4px;
  background-color: #e5e7eb;
}
.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.tab-active {
  border-bottom: 3px solid #4f46e5;
  color: #4f46e5;
  font-weight: 600;
}
.profile-pic {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>