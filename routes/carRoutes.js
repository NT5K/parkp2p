// const connection = require("./connection");
// const express = require('express');
// const router = express.Router();

// //===========================================================================
// // update car make in dashboard
// //===========================================================================

// router.post('/api/account/update/car/make', (req, res) => {
//     const { token, carMakeToPostRequest } = req.body;

//     console.log("local token", token)
//     console.log("overnight change", carMakeToPostRequest)

//     if (!carMakeToPostRequest) {
//         return res.send({
//             success: false,
//             error: "car make input cannot be blank"
//         })
//     }

//     const query = "UPDATE users SET Car_Make = ? WHERE ID = ?;";
//     const input = [carMakeToPostRequest, token]

//     connection.query(query, input, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send("failed to update car make")
//         } else {
//             return res.send({
//                 success: true,
//                 new_car_make: carMakeToPostRequest
//             });
//         };
//     });
// });

// //===========================================================================
// // update car model in dashboard
// //===========================================================================

// router.post('/api/account/update/car/model', (req, res) => {
//     const { token, carModelToPostRequest } = req.body;

//     console.log("local token", token)
//     console.log("overnight change", carModelToPostRequest)

//     if (!carModelToPostRequest) {
//         return res.send({
//             success: false,
//             error: "car Model input cannot be blank"
//         })
//     }

//     const query = "UPDATE users SET Car_Model = ? WHERE ID = ?;";
//     const input = [carModelToPostRequest, token]

//     connection.query(query, input, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send("failed to update car Model")
//         } else {
//             return res.send({
//                 success: true,
//                 new_car_Model: carModelToPostRequest
//             });
//         };
//     });
// });

// //===========================================================================
// // update car color in dashboard
// //===========================================================================

// router.post('/api/account/update/car/color', (req, res) => {
//     const { token, carColorToPostRequest } = req.body;

//     console.log("local token", token)
//     console.log("overnight change", carColorToPostRequest)

//     if (!carColorToPostRequest) {
//         return res.send({
//             success: false,
//             error: "car Color input cannot be blank"
//         })
//     }

//     const query = "UPDATE users SET Car_Color = ? WHERE ID = ?;";
//     const input = [carColorToPostRequest, token]

//     connection.query(query, input, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send("failed to update car Color")
//         } else {
//             return res.send({
//                 success: true,
//                 new_car_Color: carColorToPostRequest
//             });
//         };
//     });
// });