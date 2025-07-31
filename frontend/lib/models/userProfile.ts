import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    github: String,
    name: String,
    title: String,
    username: {
        type: String,
        required: true
    },
    bio: String,
    avatar: String,
    location: String,
    company: String,
    hireable: {
        type: Boolean,
        default: false
    },
    socialLinks: [String],
    onboardingCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema)