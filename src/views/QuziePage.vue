<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen font-sans">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="text-center mb-12 fade-in">
        <h1 class="text-4xl font-bold text-indigo-800 mb-2">Knowledge Check</h1>
        <p class="text-lg text-gray-600">Test your understanding of the lesson material</p>
        <div class="w-full bg-gray-200 rounded-full h-4 mt-6">
          <div id="progress-bar" class="progress-bar bg-green-600 h-4 rounded-full" :style="{ width: progressBarWidth }"></div>
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>Progress</span>
          <span id="progress-text">{{ currentQuestionIndex }}/{{ this.quizFecth.quizitem.length }}</span>
        </div>
      </div>

      <div id="quiz-container" class="bg-white rounded-2xl shadow-xl overflow-hidden fade-in" style="animation-delay: 0.2s">
        <div id="question-screen" class="p-8" v-if="!quizCompleted">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <span id="question-number" class="text-xl font-bold text-green-500">{{ currentQuestionIndex + 1 }}</span>
            </div>
            <h2 id="question-text" class="text-2xl font-semibold text-gray-800">{{ currentQuestion?.question }}</h2>
          </div>

          <div id="options-container" class="grid gap-4 mt-8">
            <div
              v-for="(option, index ) in currentQuestion?.option_questions"
              :key="index"
              class="option-card bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
              :class="{
                'bg-indigo-100 border-indigo-300': selectedOptionIndex == index  && !answered,
                'correct': answered && index  == parseInt(currentQuestion?.answer),
                'incorrect shake': answered && index  == selectedOptionIndex && index  !== parseInt(currentQuestion?.answer)
              }"
              @click="selectOption(index)"
            >
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 border border-gray-300">
                  {{ String.fromCharCode(65 + index) }}
                </div>
                <div>{{ option.options }}</div>
              </div>
            </div>
          </div>

          <div class="mt-10 flex justify-between items-center">
            <button id="hint-btn" class="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg flex items-center" @click="showHintModal = true">
              <i class="fas fa-lightbulb mr-2"></i> Hint
            </button>
            <button
              id="next-btn"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="selectedOptionIndex === null || answered"
              @click="nextQuestion"
            >
              {{ currentQuestionIndex < this.quizFecth.quizitem.length  ? 'Next Question' : 'See Results' }} <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <div id="results-screen" class="p-8 text-center" v-else>
          <div class="mb-8">
            <div class="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 pulse">
              <i class="fas fa-trophy text-5xl text-yellow-500"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <p class="text-lg text-gray-600">
              You scored <span id="score" class="font-bold text-indigo-600">{{ score }}</span> out of
              <span id="total-questions" class="font-bold">{{ this.quizFecth.quizitem.length }}</span>
            </p>
          </div>

          <div id="performance-message" class="mb-8 p-4 rounded-lg">
            <div
              :class="`bg-${performanceColor}-100 border-l-4 border-${performanceColor}-500 text-${performanceColor}-700 p-4`"
            >
              <p class="font-bold">{{ performanceEmoji }} {{ performanceMessage }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ score }}</div>
              <div class="text-sm text-blue-800">Correct Answers</div>
            </div>
            <div class="bg-purple-50  p-4 rounded-lg">
              <div class="text-2xl font-bold text-purple-600 mb-1">{{ this.quizFecth.quizitem.length - score }}</div>
              <div class="text-sm text-purple-800">Incorrect Answers</div>
            </div>
          </div>

          <button id="restart-btn" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition" @click="restartQuiz">
            <i class="fas fa-redo mr-2"></i> Take Quiz Again
          </button>
           <button  id="restart-btn" class="px-6 py-3 ml-[20px] bg-indigo-600  text-white rounded-lg font-medium hover:bg-indigo-700 transition" @click="$router.back()">
             Go to Class 
             <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

        <div id="hint-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" :class="{ 'hidden': !showHintModal }">
          <div class="bg-white rounded-xl p-6 max-w-md mx-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i> Hint</h3>
              <button id="close-hint" class="text-gray-500 hover:text-gray-700" @click="showHintModal = false">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="text-right">
              <button id="got-it-btn" class="px-4 py-2 bg-indigo-600 text-white rounded-lg" @click="showHintModal = false">
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed top-1/4 left-10 w-8 h-8 rounded-full bg-purple-200 opacity-30 floating" style="animation-delay: 0.1s"></div>
      <div class="fixed bottom-1/3 right-12 w-10 h-10 rounded-full bg-blue-200 opacity-30 floating" style="animation-delay: 0.3s"></div>
      <div class="fixed top-1/3 right-1/4 w-6 h-6 rounded-full bg-indigo-200 opacity-30 floating" style="animation-delay: 0.5s"></div>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from '../stores/quizStore'
import { useStudentLessionStore } from '../stores/lessionstudent'
import { useUserStore } from '../stores/userStore'
export default {
  data() {
    return {
      StudentDate : useUserStore(),
      recordStudent : useStudentLessionStore(),
      quizFecth : useQuizStore(),
      quizData: [
        {
          question: "What is the primary purpose of HTML?",
          options: [
            "To style web pages",
            "To structure content on the web",
            "To add interactivity to websites",
            "To query databases"
          ],
          correct: 1,
          hint: "HTML stands for HyperText Markup Language and is used to define the structure of web content."
        },
        {
          question: "Which CSS property is used to change the text color of an element?",
          options: [
            "text-style",
            "font-color",
            "text-color",
            "color"
          ],
          correct: 3,
          hint: "This property can accept values like 'red', '#FF0000', or 'rgb(255, 0, 0)'."
        },
        {
          question: "What does the 'DOM' stand for in JavaScript?",
          options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Method",
            "Display Order Module"
          ],
          correct: 0,
          hint: "It's a programming interface for web documents that represents the page as nodes and objects."
        },
        {
          question: "Which of these is NOT a JavaScript framework?",
          options: [
            "React",
            "Vue",
            "Angular",
            "Flask"
          ],
          correct: 3,
          hint: "This one is actually a Python web framework, not a JavaScript framework."
        },
        {
          question: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
          ],
          correct: 2,
          hint: "It's a style sheet language used for describing the presentation of a document written in HTML."
        }
      ],
      currentQuestionIndex: 0,
      score: 0,
      selectedOptionIndex: null,
      answered: false,
      quizCompleted: false,
      showHintModal: false
    };
  },
  computed: {
    currentQuestion() {
      return this.quizFecth.quizitem[this.currentQuestionIndex];
    },
    progressBarWidth() {
      return `${(this.currentQuestionIndex / this.quizFecth.quizitem.length) * 100}%`;
    },
    performancePercentage() {
      return (this.score / this.quizFecth.quizitem.length) * 100;
    },
    performanceMessage() {
      if (this.performancePercentage >= 80) {
        return 'Excellent work! You have a strong understanding of this material.';
      } else if (this.performancePercentage >= 60) {
        return 'Good job! You understand most concepts but could review some areas.';
      } else if (this.performancePercentage >= 40) {
        return 'Not bad! Consider reviewing the lesson material to strengthen your knowledge.';
      } else {
        return 'Keep practicing! Review the material and try again.';
      }
    },
    performanceEmoji() {
      if (this.performancePercentage >= 80) {
        return '🎉';
      } else if (this.performancePercentage >= 60) {
        return '👍';
      } else if (this.performancePercentage >= 40) {
        return '🤔';
      } else {
        return '📚';
      }
    },
    performanceColor() {
      if (this.performancePercentage >= 60) {
        return 'green';
      } else if (this.performancePercentage >= 40) {
        return 'yellow';
      } else {
        return 'red';
      }
    }
  },
  methods: {
    selectOption(index) {
      if (this.answered) return;
      this.selectedOptionIndex = index;
    },
    nextQuestion() {
    
      if (this.selectedOptionIndex === null) return;

      this.answered = true;

      if (this.selectedOptionIndex == parseInt(this.currentQuestion?.answer)) {
        this.score++;
        this.createConfetti();
      }
      

      setTimeout(() => {
        if (this.currentQuestionIndex < this.quizFecth.quizitem.length - 1 ) {
          this.currentQuestionIndex++;
          this.selectedOptionIndex = null;
          this.answered = false;
        } else {
          this.quizCompleted = true;
          this.RecordQuize();
          if (this.performancePercentage >= 60) {
            for (let i = 0; i < 50; i++) {
              setTimeout(this.createConfetti, i * 50);
            }
          }
        }
      }, 1500);
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.selectedOptionIndex = null;
      this.answered = false;
      this.quizCompleted = false;
    },
    createConfetti() {
      const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.width = Math.random() * 8 + 6 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.animation = 'confetti 3s linear forwards';
      confetti.style.animationDuration = Math.random() * 2 + 2 + 's';

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    },
      async RecordQuize(){
    try{
      const QuizId = this.$route.path.split('/')[3];
      const Lession_id = this.$route.path.split('=')[1].split('/')[0];

      const quizeExiting = this.recordStudent.items.find(items =>{
        return items.lesson_id === parseInt(Lession_id) && items.student_id ===  parseInt(this.StudentDate?.items?.user.id)
      })
      if(quizeExiting){
       await this.recordStudent.updateStudentLession(Lession_id ,this.score);
        return;
      }

      await this.recordStudent.createStudentLession(this.StudentDate?.items?.user.id,parseInt(Lession_id),parseInt(QuizId),this.score,1)


    }catch(err){
      console.log(err)
    }
  }
  },
  async mounted() {
     await this.quizFecth.fetchItem(this.$route.path.split('/')[3]);
     await this.StudentDate.fetchItems();
     await this.recordStudent.fetchStudentLession();
     console.log(this.recordStudent.items)
  }
};
</script>

<style>
/* Re-include your CSS animations and styles here */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.pulse {
  animation: pulse 1.5s infinite;
}

.shake {
  animation: shake 0.5s;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00;
  opacity: 0;
}

.progress-bar {
  transition: width 0.5s ease;
}

.option-card {
  transition: all 0.3s ease;
}

.option-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.correct {
  background-color: #4ade80 !important;
  color: white !important;
}

.incorrect {
  background-color: #f87171 !important;
  color: white !important;
}

.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>