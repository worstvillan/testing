// const express = require('express');
// const app = express();
// const router = express.Router();
// const bodyParser = require("body-parser")
// const bcrypt = require("bcrypt");
// const User = require('../schemas/UserSchema');

// app.set("view engine", "pug");
// app.set("views", "views");

// app.use(bodyParser.urlencoded({ extended: false }));

// router.get("/", (req, res, next) => {

//     res.status(200).render("password");
// })

// router.post("/", async (req, res, next) => {

//     var username = req.body.logUsername.trim();
//     var password = req.body.password.trim();
//     var confirmpassword = req.body.passwordConf.trim();
//     var answer = req.body.answer.trim();

//     var payload = req.body;

//     if(username) {
//         var user = await User.findOne({
//                 username: username 
//         })
//         .catch((error) => {
//             console.log(error);
//             payload.errorMessage = "Something went wrong.";
//             res.status(200).render("password",payload);
//         });

//         if(user == null) {

//             payload.errorMessage = "User Not found";
//             res.redirect("/register");

//         }
//         else {
//             // User found

//             var result = await bcrypt.compare(answer, user.answer);

//             if(result && password==confirmpassword) {
                

//                 var data = await bcrypt.hash(password, 10);

//                 User.findByIdAndUpdate(user.id,  { password: data } )

//                 res.redirect("/login");
//             }
//             else if(password!=confirmpassword){
//                 payload.errorMessage = "User Not found";
//             }
//             else {
//                 payload.errorMessage = "secuity answer is wrong";
                
//             }
//             res.status(200).render("password", payload);
//         }
//     }
//     else {
//         payload.errorMessage = "Make sure each field has a valid value.";
//         res.status(200).render("password", payload);
//     }
// })

// module.exports=router;

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("password");
});

router.post("/", async (req, res, next) => {
    var username = req.body.logUsername.trim();
    var password = req.body.password.trim();
    var confirmpassword = req.body.passwordConf.trim();
    var answer = req.body.answer.trim();
    var payload = req.body;

    if (username) {
        try {
            var user = await User.findOne({ username: username });

            if (user == null) {
                // User not found
                payload.errorMessage = "User Not found";
                res.redirect("/register"); // Redirect instead of rendering
            } else {
                // User found
                var result = await bcrypt.compare(answer, user.answer);

                if (result && password == confirmpassword) {
                    var data = await bcrypt.hash(password, 10);
                    await User.findByIdAndUpdate(user.id, { password: data });
                    res.redirect("/login");
                } else if (password != confirmpassword) {
                    payload.errorMessage = "Passwords do not match";
                    res.status(200).render("password", payload);
                } else {
                    payload.errorMessage = "Security answer is wrong";
                    res.status(200).render("password", payload);
                }
            }
        } catch (error) {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("password", payload);
        }
    } else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("password", payload);
    }
});

module.exports = router;
