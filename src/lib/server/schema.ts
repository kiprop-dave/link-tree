import { integer, jsonb, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	profileId: integer('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.unique()
});

export type Platform =
	| 'github'
	| 'twitter'
	| 'facebook'
	| 'frontend-mentor'
	| 'instagram'
	| 'linkedin';

export const profilesTable = pgTable('profiles', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 256 }),
	lastName: varchar('last_name', { length: 256 }),
	links: jsonb('links').$type<{ platform: Platform; url: string }[]>(),
	imageId: integer('image_id')
		.references(() => imagesTable.id, { onDelete: 'cascade' })
		.unique()
});

export const imagesTable = pgTable('images', {
	id: serial('id').primaryKey(),
	asset_id: text('asset_id').notNull().unique(),
	public_id: text('public_id').notNull(),
	format: text('format').notNull(),
	resource_type: text('resource_type').notNull(),
	type: text('type').notNull(),
	url: text('url').notNull(),
	secure_url: text('secure_url').notNull()
});
