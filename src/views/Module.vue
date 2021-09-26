<template>
    <div class="container-fluid flex-column justify-content-center p-0">
        <div class="d-flex flex-row text-center p-3">
            <router-link class="nav-link text-primary p-0 me-3 mb-0" :to="{'name': 'Courses', 'params': {id: course_id}}"><h4>&lt;</h4></router-link>
            <h4 class="text-white">{{GetCourseTitle()}}-</h4>
            <h4 class="text-success">{{GetTitle()}}</h4>
        </div>
        <div v-if="mode === 'started'">
            <question></question>
        </div>
        <div v-else>
            <div class="d-flex flex-column text-start text-sm-start p-3 fadeIn">
                <h3 class="text-success">Теория</h3>
                <p style="white-space: pre-wrap;" class="text-secondary ms-sm-3" v-for="paragraph in theory" :key="theory.indexOf(paragraph)">{{paragraph}}</p>
            </div>
            <div class="d-flex flex-column text-center fadeIn" v-if="mode === 'completed'">
                <h4 class="text-success">Вы успешно прошли этот модуль!</h4>
                <router-link class="nav-link text-secondary" :to="{'name': 'Courses', 'params': {id: course_id}}">Вернуться</router-link>
            </div>
            <div class="d-flex flex-row justify-content-center p-3 fadeIn" v-else>
                <button class="btn btn-success text-white mx-auto" @click="Start()">Перейти к заданиям</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
import data from '@/assets/data.json'
import Question from '../components/Question.vue'

const ModuleMode = Object.freeze({
    Completed: "completed",
    Started: "started",
    Default: "default"
})

export default {
    components: {
        Question
    },
    data() {
        return {
            course_id: 0,
            id: 0,
            theory: [],
            mode: ModuleMode.Default,
            currentQuestion: 0,
        }
    },
    created() {
        this.course_id = this.$route.params.id
        this.id = this.$route.params.module_id
        this.theory = this.GetTheory()
        let mode = localStorage.getItem(String(this.course_id + "-" + this.id))
        switch (mode) {
            case ModuleMode.Completed:
                this.mode = mode
                break;
            case ModuleMode.Started:
                this.mode = mode
                this.currentQuestion = Number(localStorage.getItem(String(this.course_id + "-" + this.id) + "-question"))
                break;
        }
    },
    methods: {
        GetCourseTitle() {
            return data["courses"][this.course_id]["title"]
        },
        GetTitle() {
            return data["courses"][this.course_id]["modules"][this.id]["title"]
        },
        GetTheory() {
            return data["courses"][this.course_id]["modules"][this.id]["theory"]
        },
        GetQuestionNumber() {
            return data["courses"][this.course_id]["modules"][this.id]["questions"].length
        },
        GetCurrentQuestion() {
            return this.currentQuestion
        },
        SetCurrentQuestion(id) {
            if ( id >= 0 && id < data["courses"][this.course_id]["modules"][this.id]["questions"].length ) {
                this.currentQuestion = id
                localStorage.setItem(String(this.course_id + "-" + this.id) + "-question", String(id))
            }
        },
        SetMode(mode) {
            this.mode = mode
        },
        Start() {
            this.SetMode(ModuleMode.Started)
            localStorage.setItem(String(this.course_id + "-" + this.id), ModuleMode.Started)
            localStorage.setItem(String(this.course_id + "-" + this.id) + "-question", String(0))
        },
        Reset() {
            this.SetMode(ModuleMode.Default)
            this.currentQuestion = 0
        },
        Complete() {
            this.SetMode(ModuleMode.Completed)
            this.currentQuestion = 0
            localStorage.setItem(String(this.course_id + "-" + this.id), ModuleMode.Completed)
            localStorage.removeItem(String(this.course_id + "-" + this.id) + "-question")
        }
    }
}
</script>
