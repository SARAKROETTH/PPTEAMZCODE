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
          v-for="quiz in filteredQuizzes"
          :key="quiz.id"
          class="course-card bg-white rounded-lg shadow overflow-hidden transition-all duration-200">
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/4 flex items-center bg-blue-500 justify-center h-48 md:h-auto">
              <div class="course-icon w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <span v-html="quiz.icon || '<i class=\'fas fa-question\'></i>'" class="text-5xl text-white"></span>
              </div>
            </div>
            <div class="p-6 w-full md:w-3/4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-1">
                    {{ quiz.title }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ quiz.courseTitle }} Quiz</p>
                </div>
                <span
                  :class="{
                    'bg-green-100 text-green-800': quiz.status === 'completed',
                    'bg-yellow-100 text-yellow-800': quiz.status === 'pending',
                    'bg-red-100 text-red-800': quiz.status === 'failed',
                  }"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ quiz.status === 'completed' ? 'Completed' : quiz.status === 'pending' ? 'Pending' : 'Failed' }}
                </span>
              </div>

              <div class="mt-4">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Score</span>
                  <span class="text-sm font-medium text-gray-700">{{ quiz.score !== undefined ? quiz.score + '' : 'N/A' }}</span>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :class="{
                      'bg-green-500': quiz.status === 'completed',
                      'bg-indigo-500': quiz.status === 'pending',
                      'bg-red-500': quiz.status === 'failed',
                    }"
                    :style="{ width: quiz.score !== undefined ? quiz.score + '%' : '0%' }"
                  ></div>
                </div>
              </div>

              <div class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p v-if="quiz.completionDate" class="text-sm text-gray-500 mt-1">
                    <i class="fas fa-calendar-alt mr-1"></i> Completed on
                    {{ new Date(quiz.completionDate).toLocaleDateString() }}
                  </p>
                  <p v-else class="text-sm text-gray-500 mt-1">
                    <i class="fas fa-clock mr-1"></i> Created on
                    {{ new Date(quiz.createDate).toLocaleDateString() }}
                  </p>
                </div>
                <div class="mt-2 md:mt-0 text-right">
                  <p v-if="quiz.attempts" class="text-sm text-gray-600">Attempts: {{ quiz.attempts }}</p>
                </div>
              </div>

              <div class="mt-4 flex justify-end">
                <button @click="$router.push(`/quizzes/${quiz.id}`)" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {{ quiz.status === 'completed' ? 'Review Quiz' : 'Start Quiz' }}
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
          v-for="course in filteredCourses"
          :key="course.id"
          class="course-card bg-white rounded-lg shadow overflow-hidden transition-all duration-200"
        >
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/4 flex items-center bg-green-500 justify-center h-48 md:h-auto">
            <div  class="course-icon w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center text-white mb-4">
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
                    'bg-green-100 text-green-800': course.status === 'completed',
                    'bg-yellow-100 text-yellow-800': course.status === 'pending',
                  }"
                  class="text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ course.status === 'completed' ? 'Completed' : 'In Progress' }}
                </span>
              </div>

              <div class="mt-4">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Progress</span>
                  <span class="text-sm font-medium text-gray-700"
                    >{{ course.progress  }}%</span
                  >
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :class="{
                      'bg-green-500': course.status === 'completed',
                      'bg-indigo-500': course.status === 'pending',
                    }"
                    :style="{ width: course.progress + '%' }"
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
          <a href="#" class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <i class="fas fa-chevron-left"></i>
          </a>
          <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-indigo-600 font-medium">1</a>
          <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">2</a>
          <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">3</a>
          <a href="#" class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
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
      studentQuizzes:[],
      currentQuize:[],
      QuzieData:useQuizStore(),
      QuzieEnroll: useStudentLessionStore(),
      courseStore: useCourseStore(),
      studentData: useStudentStore(),
      EnrolledStore: useEnrollmentStore(),
      lastFilter: null,
      filterCourses: null,
      activeTab: 'allCourses', // Default to 'allCourses'
      searchQuery: '',
      sortBy: '',
      filterCategory: '',
    };
  },
  async mounted() {
    try {
      const studentID = this.$route.path.split("/")[2];
      await this.studentData.fetchDataStudent(studentID);
      await this.EnrolledStore.getEnrollmentAll();
      await this.courseStore.fetchItems();
      await this.QuzieEnroll.fetchStudentLession();
      await this.QuzieData.fetchItemAll();
      this.CourseFilter();
      this.Quziefilter()
      
    
    } catch (err) {
      console.error("Error during data fetching:", err);
    }
  },
  computed: {
    caculateScore(){
      

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
      if (DateMember) {
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
      return filtered;
    },
    filteredQuizzes() {
      // Get the student ID from the route
      const studentID = parseInt(this.$route.path.split("/")[2]);

      // Filter the quizzes from the quiz store that are associated with the student's enrolled quizzes
        this.studentQuizzes = this.QuzieData?.quizitemAll.filter(quiz => {
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
      return filtered;
    }
  },
  methods: {
    filterContent(tab) {
      this.activeTab = tab;
      this.searchQuery = ''; // Clear search when changing tabs
      this.sortBy = ''; // Clear sort when changing tabs
      this.filterCategory = ''; // Clear category filter when changing tabs
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
        this.currentQuize = this.QuzieData?.quizitemAll.filter(qd =>{
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