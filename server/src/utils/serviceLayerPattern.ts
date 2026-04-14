/**
 * Service Layer Architecture Pattern
 *
 * SERVICES contain:
 *   - All business logic
 *   - All Prisma database queries
 *   - Data validation and transformation
 *   - Error handling and logging
 *
 * CONTROLLERS contain:
 *   - Request parsing (from req.body, req.params, req.query)
 *   - Call service methods
 *   - Response formatting via ApiResponse class
 *   - HTTP status codes
 *
 * Example Service Structure:
 *
 *   // src/services/user.service.ts
 *   import prisma from '../configs/prisma';
 *
 *   const userService = {
 *     async createUser(data) {
 *       return prisma.user.create({
 *         data: {
 *           email: data.email,
 *           password_hash: data.password,
 *           full_name: data.full_name,
 *           timezone: data.timezone || 'UTC',
 *         },
 *       });
 *     },
 *   };
 *
 * Example Controller Structure:
 *
 *   // src/controllers/user.controller.ts
 *   import ApiResponse from '../utils/apiResponse';
 *   import asyncHandler from '../utils/asyncHandler';
 *
 *   const userController = {
 *     createUser: asyncHandler(async (req, res) => {
 *       const user = await userService.createUser(req.body);
 *       res.status(201).json(new ApiResponse(true, 'User created successfully', user));
 *     }),
 *   };
 *
 * Example Route Structure:
 *
 *   import express from 'express';
 *   import userController from '../controllers/user.controller';
 *   import validate from '../middlewares/validate';
 *   import { createUserSchema } from '../validators/user.validate';
 *
 *   const router = express.Router();
 *
 *   router.post('/', validate(createUserSchema), userController.createUser);
 *
 *   export default router;
 */

const serviceLayerPattern = 'Service Layer Pattern - See comments in this file for detailed examples';

export default serviceLayerPattern;
