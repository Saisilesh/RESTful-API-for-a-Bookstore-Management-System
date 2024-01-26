import mongoose from 'mongoose';

//building a schema
const schema = mongoose.Schema;

//creating a user collection
const userSchema= new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});


//exporting the user schema into MongoDB
//the name will be stored as "users"
export default mongoose.model("User",userSchema);