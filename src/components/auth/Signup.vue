<template>
    <div class="signup container">
        <form @submit.prevent="signUp" class="cardpanel">
            <h2 class="center deep-purple-text">Sign Up</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="name">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <p class="red-text">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data () {
        return {
            name: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signUp() {
            if (this.alias && this.name && this.password) {
                this.slug = slugify(this.alias, {
                    replacement: '-',
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                })
                console.log(this.slug)
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if (doc.exists) {
                        this.feedback = 'This username is already taken.'
                    }
                    else {
                        firebase.auth().createUserWithEmailAndPassword(this.name, this.password)
                        .then(cred => {
                            ref.set({
                                alias: this.alias,
                                geolocation: null,
                                user_id: cred.user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'GMap'})
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                        })
                    }
                })
            }
            else {
                this.feedback = 'Please enter all fields.'
            }
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}
.signup h2 {
    font-size: 2.4em;
}
.signup .field {
    margin-bottom: 16px;
}
</style>