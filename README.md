# MVC Arcitecture
- Hepls to structured the backend application well
- MVC Architecture is a pattern to write server-side applications that divides the application into three parts: Model, View, and Controller

- View is the layer that users interact with the application, and Controller is the layer that receives user req and send it to Model. and receive the response from Model and return it to the View.

```
View (req) --> Controller --> Model
Model (res) --> Controller --> View
```

## MVC Architecture
### Frontend Project
- View (React / Frontend Project)

### Backend Project
- Controller
- Model

## More broader approaches

```
View --> Routing Layer --> Validation Layer --> Controller Layer (Receives user req and send it to Service) --> Service Layer (Contain functions and classes to handle business logic) --> Repository Layer --> Schema Layer
```
### Other Layer
```
API Layer, Configuration Layer, util/helper Layer, DTO Layer
```

### Repository design pattern
- Segregate DB intractions from business logic to a new Layer.
- This Layer is called Repository  Layer / DAO Layer (Data Access Layer).
- Inside the Repository Layer, we can use any ORM or RAW queries.

### Schema Layer
- In the schema layer, we define the schema of the database.

### Validation on code level
- In mongose we can define the validation on code with the Schema.
```js
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        

    },
    password : {
        type : String,
        required : true
    }
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
```

- We can include our custom validation using regex.
```js
email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message : (props) => `${props.value} is not a valid email`
        }

    },
```
- In mongoose Schma we can pass {timestaps : true} with the Schema Obj which will provide create and update date automacic


## Task
- Make a Post Schema 
```js
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    postContent : {
        type : String,
        reqiured : true,  
    },
    user : {
        type : Schema.ObjectId,
        reqiured : true
    },
    image : {
        type : String,
        reqiured : true,
        validate : {
            validator : (value) => {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i.test(value)
            },
            message : "Invalid Image url"
        }
    }

}, {timestamps : true})
```
## FIX
- We make also directly take image and convert it to `base64` string and store the image in the db.
- But this will take lots storage and database become messy because the image strig is long.
- Thats why we can use `amazon s3` bucket to store the image.
- s3 will take image and return the url of the image.

```js
    user : {
        type : Schema.ObjectId,
        ref : "User",
        reqiured : true
    },
```
- In mongoose when we have to do relationship we need to use `ref` in the schema.


## HOMEWORK - 
- Upload the image in cloudinary and store thr url in the database.
- Done
```js
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_KEY, CLOUDINARY_SECRECT } from "./serverConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
  cloud_name: "dp4roeps2",
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRECT,
});

export async function uploadImageInCloudinary(imagename) {
  try {
    const relativePath = path.join(__dirname, `../../public/${imagename}`);
    const result = await cloudinary.uploader.upload(relativePath);
    console.log("Image uploaded successfully");
    console.log(result);
    console.log(result.url);
    return result?.url;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
```

## Routes
- We can use `express` router to handle the routes.
- When we use something like `https://example.com/api/user` that mean its a api route
- There is other type of route like `http://example.com/user` that mean its a web route

### API Versioning
- Using this we can make multiple version of the api.
- Like `https://example.com/api/v1/user` and `https://example.com/api/v2/user`
- We can define single route inside our index.js like `/api` and in the api route we can define the other routes like `/user, /post, `etc. We can use `apiRouter.use()` to do that.
```js
import express from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);


export default apiRouter;
```
### TASK make a V1 router and make a V2 router 

```js
import express from "express";
import userRouter from "../user.js";
import postRouter from "../post.js";
const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/post", postRouter);


export default v1Router;
```

```js
import express from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
import v1Router from "./v1/v1Router.js";
const apiRouter = express.Router();

apiRouter.use("/v1", v1Router);

export default apiRouter;
```

- Done, now we can use `http://localhost:3000/api/v1/post/all` to access the all post.
- FIXDone: All the other routes like `user` and `post` should be inside the v1 folder.

## TASK - 
- Done - Implement the `delete` and `update` route

## HW -
- Implement a logic to delete the exiting image from cloudinary when image is updated or post deleted.

## Triggers 
- Every database have triggers.
- Triggers are used to do just before and after some action happens in the database.
- In mongoose triggers are called hook and there is `pre` and `post` hooks.
- `pre` hooks are called before the action and `post` hooks are called after the action.
- These are used in the `Schema` or `Model` Layer.
```js
userSchema.pre("save", function modifyPassword(next){
    const user = this;
    const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUND);
    user.password = hashedPassword;
    next();
})
```
## Authentication
- Authentication is the process of verifying that a user is who they say they are.
- Most common way of authentication is with JWT.

### [JWT](www.jwt.io)
- JSON Web Token
- JWT have 3 parts - header, payload, signature
- Payload is the data that we want to store in the token like {_id : "mani123}.
- header provide information about the type of token
- signature is used to verify and make the token. Secret key.
**Note** - The signin details like email, password should come fro rew body because if send 
them confidential using peram or query string it will be stored in history of the user.

### Steps In Signin
- Fist get will get the email and password from the body
- then we have to find the user in the database using email
- them uisng bycrypt compare the database password with the user given password
- Then make a JWT token uisng user._id and send it to the user

### TASK -
Make a signin functionality using JWT
- Done ✔️

## Tommorow Class Authorization - 
- HW - Exprore Authorization

## Authorization
- TASK  - Get the user id from auth and provide it in post object - Done ✔️
- Get user name and email details from ref data in post object in mongodb without doing an extra database call - Done ✔️

### Populate
- We can use the `.populate()` method on the `user` field in your Mongoose query. This will retrieve the referenced User document directly within the same query, allowing you to access the user's name and other details without an extra call.

```javascript
export const getPaginatedPosts = async (offset, limit) => {
    try {
        const posts = await PostModel.find()
            .sort({ "createdAt": -1 })
            .skip(offset)
            .limit(limit)
            .populate("user", "username email _id"); // Populating only the 'name' field of the 'user'

        return posts;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};
```

In the `.populate("user", "name")` part:
- The first argument (`"user"`) specifies the field you want to populate.
- The second argument (`"name"`) specifies the fields you want to retrieve from the `User` document. You can list additional fields (e.g., `"name email"`) if needed.

---
**TASK -** :The owner of the post can delete his post.
- Done ✔️

## Authorisation
- Authorisation is the process of deciding what a user is allowed to do.
- Authorisation process is done after authentication.
- `role`property is used in the `userSchema` to define the role of the user.
```js
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    }
```
- **TASK** - Attatch auth and authorisation to update post route so that only admin can edit it.
- Done ✔️

## Documentation
- We can use `swagger-jsdoc` to generate good and understandable documentation for our API.
- [swagger-jsdoc](https://swagger.io/docs/)
- `swagger-jsdoc` is a library that generates swagger documentation for our API.

### Process
- Import `swagger-jsdoc` and `swagger-ui-express` npm packages.
- import `swaggerJsdoc` and `swaggerUi` from `swagger-jsdoc` and `swagger-ui-express` respectively in `index.js`.
- `swaggerJsdoc` takes `options` as an argument.
- Have to make a `swaggerOption.js` file in `utils` folder.
```js
export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ImageGram API',
        version: '1.0.0',
        description: 'API for ImageGram',
      },
      servers: [
        {
          url: 'http://localhost:3000/api/v1',
        },
      ],
    },
    apis: ['./src/Routes/v1/*.js'], // files containing annotations as above
  };
```
- `swaggerJsdoc` takes `options` as an argument and returns `swaggerDocument`.
- Then we have to use `swaggerUi.serve` and `swaggerUi.setup` to serve the swagger documentation.
```js
// index.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {options} from "./utils/swaggerOption.js"

const swaggerDocument = swaggerJsdoc(options);

const app = express();
const PORT = 3000;
app.use(express.json());

await connectDB();
app.use("/api", apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log("Server started on port http://localhost:3000");
});
```
- Now we can write the documentation for api route using comments.
```js
/**
 * @swagger
 * /signup:
 *  post:
 *     summary: Create user
 *     description: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             
 *     responses:
 *          200:
 *              description: User created successfully
 *          500:
 *              description: Internal server error
 *          400:
 */
v1Router.post("/signup", validate(zodSignupValidation), signupController)
```

**HW** - Implement the `like` and `comment` route
- There is diff type of likes in instagram like "heart" and "thumbs up".
- Likes can be done on post and comment.
- Comment can be done on post and comment. - Done ✔️

## Deployment
- We can deploy our backend application using `AWS` (paid) or `Render` (free).
### Render
- Go to render.com
- Click on `new` and select `web service`
- Chose the project to deploy or give the github public link
- Chose the deside directory
- Give the build and start command, ex- `npm install && npm run start`
- Choose the free plan
- Fill up .env details

## Custom Loadbalancer
- Loadbalancer is a server that distributes traffic to multiple servers.
```
client ----> loadbalancer ----> server1

                     or   -----> server2
```
- first install the `ip` npm package, this will help us to get the public ip of the server client.
```bash
npm i ip
```
- now we can get the ip address of the client using `ip` package.
```js
const ip = require("ip");
const publicIp = ip.address();
console.log(publicIp);
```

## Rate Limiting 
- Rate limiting is the process of limiting the number of requests that can be made to a server in a given time period.
- It prevents ddos attacks.
- npm package - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- Have to make a limiter object.
```js
const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, 
	limit: 5, 
    
})
```
```js
app.use(limiter);
```