const {METADATA_TABLE} = require('../../src/constants');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable(METADATA_TABLE, table => {
        table.increments();
        // collectionId is needed to separate metadata for different nft collections
        table.string('collection_id', 20).unique();
        // tokenId: Number of the NFT in its collection
        table.integer('token_id');
        table.text('image').nullable();
        table.text('image_data').nullable();
        table.text('external_url').nullable();
        table.text('description').notNullable();
        // Max character length of 50 is typically fine
        table.string('name', 50).notNullable();
        // attributes object is serialized to a string
        // I did consider making another table for attributes,but I don't really see the need.
        table.json('attributes').notNullable();
        table.string('background_color').nullable();
        table.text('animation_url').nullable();
        table.text('youtube_url').nullable();
        // Index for fast querying
        table.index(['collection_id', 'token_id'], 'collectionId_tokenId');
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTableIfExists(METADATA_TABLE);
};
