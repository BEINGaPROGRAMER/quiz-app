
var quiz = {
  user: "Me",
  questions: [
  

  {
    text: "Which of the following is not an input device for a computer ?",
    responses: [
    { text: "Mouse " },
    {
      text: " Keyboard" },

    { text: "Monitor", correct: true },
    { text: "Scanner" }] },


  {
    text:
    "Which of the following is a type of non-volatile memory?",
    responses: [
    { text: "RAM" },
    { text: "ROM", correct: true },
    { text: "Cache" },
    { text: "Virtual Memory" }] },


  {
    text: "Which of the following is the smallest unit of digital data?    ",
    responses: [
    { text: "Byte"},
    { text: "Bit", correct: true },
    {
      text: "Megabyte" },

    { text: "Gigabyte" }] },


  {
    text: "Which of the following is not an operating system? ",
    responses: [
    { text: " Linux" },
    { text: "Windows"},
    { text: "macOS" },
    { text: " Microsoft Office", correct: true }] },


  {
    text:
    "What is the full form of HTML?",
    responses: [
    {
      text: "Assembly language" },

    { text: " C" , correct: true},
    { text: "Binary code"},
    { text: "Machine language" }] },


  {
    text: "Which of the following is not a type of computer network? ",
    responses: [
    { text: "LAN " },
    { text: "WAN"},
    { text: "MAN" },
    { text: "CAN" , correct: true}] }] },




userResponseSkelaton = Array(quiz.questions.length).fill(null);
let correctSound = new Audio('correctSound.mp3');
let incorrectSound = new Audio('incorrectSound.mp3');


var app = new Vue({
  el: "#app",
  data: {
    quiz: quiz,
    questionIndex: 0,
    userResponses: userResponseSkelaton,
    isActive: false,
    playerScore: 0
  },
  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    }
  },
  methods: {
    restart: function () {
      this.playerScore = 0;
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
      
    },
    selectOption: function (index) {
      Vue.set(this.userResponses, this.questionIndex, index);
      this.selectedResponse = index;
      if (
        typeof this.quiz.questions[this.questionIndex].responses[index] !== 'undefined' &&
        this.quiz.questions[this.questionIndex].responses[index].correct
      ) {
        correctSound.play();
        this.optionClass = 'correct';
      } else {
        incorrectSound.play();
        this.optionClass = 'incorrect';
      }
    },
    
    
    next: function () {
      this.playerScore = this.score(); 
      if (this.questionIndex < this.quiz.questions.length)
      this.questionIndex++;
      return this.playerScore;
    },
    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    score: function () {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
        typeof this.quiz.questions[i].responses[
        this.userResponses[i]] !==
        "undefined" &&
        this.quiz.questions[i].responses[this.userResponses[i]].correct)
        {
          score = score + 1;
        }
        else if (
          typeof this.quiz.questions[i].responses[
          this.userResponses[i]] !==
          "undefined" &&
          !this.quiz.questions[i].responses[this.userResponses[i]].correct){
          score = score - 1;
        }
      }
      return score;
    }
  }
});
