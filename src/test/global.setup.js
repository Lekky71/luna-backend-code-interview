const Knex = require('knex');
const knexfile = require('../../knexfile');

// Create the test database
async function createTestDatabase() {
    const knex = Knex(knexfile.no_connection);

    try {
        await knex.raw('DROP DATABASE IF EXISTS test_metadata_db');
        await knex.raw('CREATE DATABASE test_metadata_db');
    } catch (error) {
        throw new Error(error);
    } finally {
        await knex.destroy();
    }
}

// Seed the database with schema and data
async function seedTestDatabase() {
    const knex = Knex(knexfile.testing);

    try {
        await knex.migrate.latest();
    } catch (error) {
        throw new Error(error);
    } finally {
        await knex.destroy();
    }
}

module.exports = async () => {
    try {
        await createTestDatabase();
        await seedTestDatabase();
        console.log('Test database created successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
