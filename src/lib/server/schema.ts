import { relations } from 'drizzle-orm';
import { integer, jsonb, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').unique().notNull(),
	password: text('password').notNull()
});

export const userProfileRelation = relations(usersTable, ({ one }) => ({
	profilesTable: one(profilesTable, {
		fields: [usersTable.id],
		references: [profilesTable.userId]
	})
}));

export type Platform = 'github' | 'twitter' | 'facebook' | 'frontend-mentor' | 'instagram';

export const profilesTable = pgTable('profiles', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 256 }).notNull(),
	lastName: varchar('last_name', { length: 256 }).notNull(),
	userId: integer('user_id').references(() => usersTable.id),
	links: jsonb('links').$type<{ platform: Platform; url: string }[]>().notNull()
});

export const profileImagesRelation = relations(profilesTable, ({ one }) => ({
	imagesTable: one(imagesTable, {
		fields: [profilesTable.id],
		references: [imagesTable.profileId]
	})
}));

export const imagesTable = pgTable('images', {
	id: serial('id').primaryKey(),
	profileId: integer('profile_id')
		.notNull()
		.references(() => profilesTable.id),
	asset_id: text('asset_id').notNull().unique(),
	public_id: text('public_id').notNull(),
	format: text('format').notNull(),
	resource_type: text('resource_type').notNull(),
	type: text('type').notNull(),
	url: text('url').notNull(),
	secure_url: text('secure_url').notNull()
});
