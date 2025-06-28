// MongoDB initialization script
db = db.getSiblingDB('portfolio');

// Create collections
db.createCollection('users');
db.createCollection('projects');
db.createCollection('media');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.projects.createIndex({ "owner": 1 });
db.media.createIndex({ "filename": 1 });

print('MongoDB initialized successfully!'); 