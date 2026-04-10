VOD System Microservices
A video-on-demand backend built with the MERN stack using a microservices architecture. The system handles secure user authentication, video uploads with automatic FFmpeg transcoding, and path-rewriting through a centralized API Gateway.

Architecture Overview
The project is divided into three core services:

- API Gateway: The entry point for all requests. Handles path rewriting, authentication bridging, and request proxying.

- Auth Service: Manages user registration, login, and JWT generation/validation.

- Upload Service: Manages multipart file uploads via Multer, metadata storage in MongoDB, and background video processing (compression and thumbnail generation) using FFmpeg.

Technologies Used
- Node.js & Express: Core backend framework.

- MongoDB & Mongoose: NoSQL database for user and video metadata.

- FFmpeg: Industrial-grade video processing (transcoding to H.264).

- Multer: Middleware for handling multipart/form-data.

- Joi: Data validation for incoming requests.

- http-proxy-middleware: Powering the API Gateway routing.
