import {defineStore} from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false,
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((pre, cur) => {
                return cur.isFav ? pre+1 : pre
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.isLoading = true
            const res = await fetch('http://localhost:3000/tasks')
            this.tasks = await res.json()
            this.isLoading = false
        },
        async addTask(task) {
            this.tasks.push(task)
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            const res = await fetch('http://localhost:3000/tasks/'+id, {
                method: 'DELETE',
            })
            if(res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/'+id, {
                method: 'PATCH',
                body: JSON.stringify({isFav: task.isFav}),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.error) {
                console.log(res.error)
            }
        }
    }
})