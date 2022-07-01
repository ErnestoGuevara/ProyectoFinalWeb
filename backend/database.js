const mongoose= require("mongoose")
const URI= "mongodb+srv://neto:neto120899@cluster0.sxvgh.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URI)
    .then(db=> console.log("DB is connected"))
    .catch(err=>console.error(err))
module.exports = mongoose;