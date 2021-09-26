<template>
    <div class="container d-flex flex-column justify-content-center text-center">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <h3 class="text-success me-auto">Вопрос №{{ID+1}}</h3>
            <h3 class="text-secondary">{{ID+1}} из {{$parent.GetQuestionNumber()}}</h3>
        </div>
        <h5 class="text-secondary me-auto ms-3">{{GetQuestion().Question}}</h5>
        <h5 class="text-secondary">{{GetDescription()}}</h5>
        <div class="row d-flex flex-row align-items-center">
            <div class="col-12 col-lg-6 p-2" v-for="answer in GetAnswers()" :key="answer.ID">
                <div class="d-flex flex-row align-items-center card bg-dark shadow">
                    <input class="form-check-input my-3 mx-3 bg-success border-success shadow-none" type="radio" name="answer" @click="SetAnswer(answer.ID)">
                    <label class="form-check-label text-secondary text-start">
                        {{answer.Content}}
                    </label>
                </div>
            </div>
        </div>
        <button class="btn btn-success text-white shadow-none mx-auto mt-3" @click="Answer()">Ответить</button>
        <h5 class="text-danger mt-3 fadeIn" id="error" style="display: none">Неверно!Попробуйте ещё раз!</h5>
        <div class="d-flex justify-content-between mt-5">
            <button class="btn text-secondary shadow-none" @click="Back()">Назад</button>
            <button class="btn btn-success text-white shadow-none" :disabled="!answered" @click="Forward()">{{ID+1 <$parent.GetQuestionNumber() ? "Следующий вопрос" : "Завершить"}}</button>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
import data from '@/assets/data.json'

export default {
    data() {
        return {
            courseID: this.$parent.course_id,
            moduleID: this.$parent.id,
            ID: this.$parent.currentQuestion,
            currentAnswerID: null,
            answered: false,
        }
    },
    methods: {
        UpdateData() {
            this.courseID = this.$parent.course_id
            this.moduleID = this.$parent.id
            this.ID = this.$parent.currentQuestion
        },
        GetQuestion() {
            this.UpdateData()
            let question = data["courses"][this.courseID]["modules"][this.moduleID]["questions"][this.ID]["question"]
            let type = data["courses"][this.courseID]["modules"][this.moduleID]["questions"][this.ID]["type"]
            let content = data["courses"][this.courseID]["modules"][this.moduleID]["questions"][this.ID]["content"]
            return {Question: question, Type: type, Content: content}
        },
        GetDescription() {
            this.UpdateData()
            return data["courses"][this.courseID]["modules"][this.moduleID]["questions"][this.ID]["description"]
        },
        GetAnswers() {
            this.UpdateData()
            let answers = []
            let res = data["courses"][this.courseID]["modules"][this.moduleID]["questions"][this.ID]["answers"]
            for (var i in res){
                let answer = res[i]
                answers.push({
                    ID: i,
                    Type: answer["type"],
                    Content: answer["content"],
                    Correct: answer["is_correct"]
                })
            }
            return answers
        },
        SetAnswer(id) {
            this.currentAnswerID = id
        },
        Answer() {
            if (this.currentAnswerID !== null && this.GetAnswers()[this.currentAnswerID].Correct) {
                document.querySelector("#error").setAttribute("style", "display: none")
                this.answered = true
            } else {
                document.querySelector("#error").setAttribute("style", "display: block")
                this.answered = false
            }
        },
        Forward() {
            if (this.ID+1 < this.$parent.GetQuestionNumber()) {
                this.$parent.SetCurrentQuestion(this.ID+1)
                this.answered = false
            } else {
                this.$parent.Complete()
                this.answered = false
            }
        },
        Back() {
            if (this.ID === 0) {
                this.$parent.Reset()
                this.answered = false
            } else {
                this.$parent.SetCurrentQuestion(this.ID-1)
                this.answered = false
            }
        }
    }
}
</script>
