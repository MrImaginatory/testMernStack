// const jwt = require('jsonwebtoken');

// const requireAuth = (req, res, next) => {
//     // Check if token is present in cookies
//     const token = req.cookies.token;

//     if (token) {
//         // Verify JWT token
//         jwt.verify(token, 'secretkey', (err, decodedToken) => {
//             if (err) {
//                 console.error('JWT verification failed:', err);
//                 res.status(401).send({ message: 'Unauthorized' });
//             } else {
//                 // User is authenticated, store user information in request object
//                 tokenData = decodedToken;
//                 console.log(tokenData);
//                 if (tokenData.Role != 'Manager') {
//                     res.status(401).send({ message: 'Unauthorized' });
//                     return res.redirect('/');
//                 }
//                 next();
//             }
//         });
//     } else {
//         // No token found, user is not authenticated
//         res.status(401).send({ message: 'Unauthorized' });
//     }
// };

// module.exports = { requireAuth };
