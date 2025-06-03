const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// const { JWT_SECRET } = process.env

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide Username"],
      // unique: true
    },
    email: {
      type: String,
      required: [true, "Please provide Email Id"],
      //   unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide Password"],
    },
//     isAvtarImageSet:{
//             type:Boolean,
//             default:false
//     },
//     avtarImage:{
//         type:String,
//         default:""
// }
    // confirmPassword: {
    //   type: String,
    //   required: [false, "Please provide confirm Password"],
    // },
  },
  { timestamps: true }
);

// for hashing password
UserSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// for comparing hash
UserSchema.methods.comparePassword = async function (password, StoredPassword) {

    const ismatched = await bcrypt.compare(password, StoredPassword)
    return ismatched
}

// for creating / genrating token
// UserSchema.methods.CreateToken = function () {

//     const payload = {
//         userId: this._id,
//         email: this.email
//     }
//     const createToken = jwt.sign(
//         payload,
//         JWT_SECRET,
//         { expiresIn: '1h' }
//     )
//     return createToken
// }

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
