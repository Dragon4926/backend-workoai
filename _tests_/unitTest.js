const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User API', () => {
    let userId;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/worko/user')
            .send({
                email: 'test@example.com',
                name: 'Test User',
                age: 25,
                city: 'Test City',
                zipCode: '12345'
            })
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        userId = res.body.id;
    });

    it('should list users', async () => {
        const res = await request(app)
            .get('/worko/user')
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get user details by ID', async () => {
        const res = await request(app)
            .get(`/worko/user/${userId}`)
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should update a user', async () => {
        const res = await request(app)
            .put(`/worko/user/${userId}`)
            .send({
                email: 'updated@example.com',
                name: 'Updated User',
                age: 26,
                city: 'Updated City',
                zipCode: '54321'
            })
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('email', 'updated@example.com');
    });

    it('should soft delete a user', async () => {
        const res = await request(app)
            .delete(`/worko/user/${userId}`)
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('isDeleted', true);
    });

    it('should return 404 for deleted user', async () => {
        const res = await request(app)
            .get(`/worko/user/${userId}`)
            .auth('admin', 'supersecret');
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'User not found');
    });
});
