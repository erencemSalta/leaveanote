<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center deep-purple-text">Login</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="name">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            <div class="field center login-btn-field">
                <button class="btn deep-purple">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data() {
        return {
            name: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            if(this.name && this.password) {
                firebase.auth().signInWithEmailAndPassword(this.name, this.password)
                .then(cred => {
                    this.$router.push({ name: 'GMap'})
                })
                .catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
            } else {
                this.feedback = 'Please fill both the fields'
            }
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin: 60px auto;
}
.login h2 {
    font-size: 2.4em;
}
.login .field {
    margin-bottom: 16px;
}
.login-btn-field {
    margin: 20px auto;
}
</style>