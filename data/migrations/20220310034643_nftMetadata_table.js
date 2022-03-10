/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    try {
        await knex.schema.createTable('nftMetadata', table => {
            table.increments();
            // collectionId is needed to separate metadata for different nft collections
            table.string('collection_id', 20).notNullable().index();
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
            // Make combined unique; ensure unique token id per collection and also helps for fast querying
            table.unique(['collection_id', 'token_id']);
            table.timestamps();
        });
    } catch (e) {
        console.error(e);
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('nftMetadata');
};
