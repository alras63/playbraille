<template>
    <div class="container-fluid flex-column justify-content-center p-0">
        <div class="d-flex flex-row text-center p-3">
            <router-link class="nav-link text-primary p-0 me-3 mb-0" to="/"><h4>&lt;</h4></router-link>
            <h4 class="text-white">{{title}}</h4>
            <h4 class="text-success ms-auto" v-if="mode === 'completed' ">Завершён</h4>
            <h4 class="text-secondary ms-auto" v-else-if="mode === 'started' ">{{GetCompletedModulesNumber()}} из {{GetModuleNumber()}}</h4>
        </div>
        <div class="container mx-auto d-flex flex-column justify-content-center">
            <div class="d-flex flex-column rounded shadow mt-3 p-3 text-center text-sm-start fadeIn" v-for="module in modules" :key="module.ID">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <router-link :to="{'name': 'Modules', 'params': {id: id ,module_id: module.ID}}" class="nav-link text-success me-auto w-auto p-0"><h5>{{module.Title}}</h5></router-link>
                    <h6 class="text-success" v-if="module.Mode === 'completed' ">Завершён</h6>
                    <h6 class="text-secondary" v-else-if="module.Mode === 'started' ">{{module.CurrentQuestion + 1}} из {{module.QuestionNumber}}</h6>
                </div>
                <h6 class="text-secondary mr-auto">{{module.Description}}</h6>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
import data from '@/assets/data.json'

const ModuleMode = Object.freeze({
    Completed: "completed",
    Started: "started",
    Default: "default"
})

export default {
    data() {
        return {
            title: "",
            id : 0,
            modules: [],
            mode: ModuleMode.Default
        }
    },
    created() {
        this.title = this.GetTitle()
        this.id = this.$route.params.id
        this.modules = this.GetModules()
        let mode = localStorage.getItem(String(this.id))
        switch (mode) {
            case ModuleMode.Completed:
                this.mode = mode
                break;
            case ModuleMode.Started:
                this.mode = mode
                if (this.GetCompletedModulesNumber() === this.GetModuleNumber()) {
                    localStorage.setItem(String(this.id), ModuleMode.Completed)
                }
                break;
            default:
                if (this.GetCompletedModulesNumber() > 0) {
                    localStorage.setItem(String(this.id), ModuleMode.Started)
                    this.mode = ModuleMode.Started
                }
        }
    },
    methods: {
        GetTitle() {
            return data["courses"][this.id]["title"]
        },
        GetCompletedModulesNumber() {
            let completedModulesCount = 0
            for (var i=0; i < this.GetModuleNumber(); i++) {
                if (localStorage.getItem(String(this.id + "-" + i)) === ModuleMode.Completed) {
                    completedModulesCount++
                }
            }
            return completedModulesCount
        },
        GetModuleNumber() {
            return data["courses"][this.id]["modules"].length
        },
        GetModules() {
            let modules = []
            for (var i in data["courses"][this.id]["modules"]) {
                let module = data["courses"][this.id]["modules"][i]
                let mode = localStorage.getItem(String(this.id + "-" + i))
                let questionNumber = module["questions"].length
                let currentQuestion = 0
                if (mode == ModuleMode.Started) {
                    currentQuestion = Number(localStorage.getItem(String(this.id + "-" + i) + "-question"))
                }
                modules.push({
                    ID: i,
                    Title: module["title"],
                    Description: module["description"],
                    Mode: mode,
                    QuestionNumber: questionNumber,
                    CurrentQuestion: currentQuestion
                })
            }
            return modules
        }
    }
}

</script>
