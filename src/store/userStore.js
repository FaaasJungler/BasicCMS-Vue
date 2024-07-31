import { defineStore } from 'pinia';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        loading: false,
        error: null,
        isLoginSuccess: false,
        isRegisterSuccess: false,
    }),
    actions: {
        async login(email, password) {
            this.loading = true;
            this.error = null;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.isLoginSuccess = true;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async register(email, password) {
            this.loading = true;
            this.error = null;
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.isRegisterSuccess = true;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            try {
                await signOut(auth);
                this.user = null;
            } catch (error) {
                this.error = error.message;
            }
        },
        setUser(user) {
            this.user = user;
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
});

export const initializeAuthObserver = () => {
    const userStore = useUserStore();
    onAuthStateChanged(auth, (user) => {
        userStore.setUser(user);
    });
}