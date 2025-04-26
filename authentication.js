// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Authentication functions
const auth = {
    // Sign up with email and password
    async signUp(email, password, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });
            return { data, error };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Sign in with email and password
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            return { data, error };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            return { error };
        } catch (error) {
            return { error };
        }
    },

    // Reset password
    async resetPassword(email) {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email);
            return { data, error };
        } catch (error) {
            return { data: null, error };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            return { user, error };
        } catch (error) {
            return { user: null, error };
        }
    },

    // Check if user is authenticated
    async isAuthenticated() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            return { isAuthenticated: !!session, error };
        } catch (error) {
            return { isAuthenticated: false, error };
        }
    }
};

// Export the auth object
export default auth; 