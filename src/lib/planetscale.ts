// // import 'server-only';

// import {Generated, Insertable, InsertResult, Kysely, Selectable, Updateable} from 'kysely'
// import {PlanetScaleDialect} from 'kysely-planetscale';

// import {v4 as uuidv4} from 'uuid';
// import {new_ticket_props} from "@/types";
// import * as crypto from 'crypto';
// // interface User {
// //   id: Generated<number>;
// //   name: string;
// //   username: string;
// //   email: string;
// // }

// // interface Database {
// //   users: User;
// //   // https://github.com/nextauthjs/next-auth/issues/4922
// // }
// interface EventContent {
//   description: string,
//   images: string,
// }

// export interface EventInterface {
//   id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
//   event_creator : string,
//   event_title : string,
//   event_headline : string,
//   event_content : EventContent,
//   event_date : string,
//   event_start_time : string,
//   event_end_time : Date,
//   max_tickets : number,
//   drinks_included : boolean,
//   event_location : string,
//   ticket_price : number,
//   hero_image : string,
// }


// export interface SavedEventsTable {
//   id: Generated<string> | string; //primary key
//   user_id: Generated<string> | string; // Foriegn Key to UserTable row, index for quick lookup
//   event_id: Generated<string> | string;
//   user_email:string;
// }

// export type SelectSavedEvent = Selectable<SavedEventsTable>
// export type NewSavedEvent = Insertable<SavedEventsTable>
// export type SavedEventUpdate = Updateable<SavedEventsTable>

// export async function insertSavedEvent(user_id:string, event_id:string, user_email:string){

//   console.log("USER ID FROM INSERT EVENT: ", user_id)
//   let id = ""
//   if(user_id){
//     id = user_id
//   }else {


//     try {
//       console.log("INSERTING SAVED EVENT")
//       //check to see if the event and user already saved
//       const user = await queryBuilder
//           .selectFrom("users")
//           .where("email", "=", user_email)
//           .select("id")
//           .executeTakeFirst()
//       console.log("FIRST USER ID: ", user)

//       if (!user) {
//         const e = new Error
//         e.message = "USER NOT FOUND: " + user_email
//         throw e
//       }
//       id = user.id;
//     } catch (e) {
//       return
//     }
//   }
//   try {
//     const savedEvents = await queryBuilder
//         .selectFrom('SavedEventsTable')
//         .selectAll()
//         .where("user_id", "=", id)
//         .where("event_id", "=", event_id)
//         .execute();
//     if(savedEvents.length > 0) {
//       //ToDo : switch save event  button to toggle heart icon, and remove event from saved events
//       console.log("EVENT ALREADY SAVED")
//       return;
//     }
//   }catch (e) {
//     console.error("ERROR CHECKING SAVED EVENTS")
//     return
//   }


//     const savedEvent : NewSavedEvent = {
//         id:uuidv4(),
//         user_id:user_id,
//         event_id:event_id,
//         user_email:user_email,
//     }
//     try{
//         const result : InsertResult = await queryBuilder
//             .insertInto('SavedEventsTable')
//             .values(savedEvent)
//             .executeTakeFirstOrThrow();
//         console.log("EVENT SUCCESSFULLY SAVED")
//         return result;
//     } catch (error) {
//         // Log the error or handle it based on your application's requirements
//         console.error('Error inserting user:', error);

//         // Throw the error to propagate it further up the call stack if needed
//         throw error;
//     }

// }

// export async function getSavedEventsFromUserEmail(email:string){
//   return await queryBuilder
//         .selectFrom('SavedEventsTable')
//         .selectAll()
//         .where("user_email", "=", email)
//         .execute()
// }

// export async function getSavedEventDetailsFromUserEmail(email:string) {
//   //join between saved events table where
//   return await queryBuilder
//       .selectFrom('SavedEventsTable')
//       .selectAll()
//       .where("user_email","=",email)
//       .innerJoin('events','events.id','SavedEventsTable.event_id')
//       .execute()
// }

// //Relationship Table
// export interface ReviewTable {
//   id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
//   event_id: Generated<string>; // Foriegn Key to EventTable row
//   review_author_id: number; // Foriegn Key to UserTable row
//   review_title: string;
//   review_content: string | null;
//   review_rating: number | null;
//   review_author: string;
//   review_date: Date | string;
// }

// export type SelectReview = Selectable<ReviewTable>
// export type NewReview = Insertable<ReviewTable>
// export type ReviewUpdate = Updateable<ReviewTable>

// export interface ticketTypeTable {
//   id: Generated<string> | string; // Use a universally unique identifier (UUID) for the primary key.
//   event_id: Generated<string> | string; // Foriegn Key to EventTable row

//   ticket_type: string | null;
//   ticket_price : number ;
//   ticket_logo : string | null;
//   also_included : string | null;
//   drinks_included:boolean | null;
//   payment_method : "cash" | "credit" | "etransfer" | "free" | "POS Tap";
// }

// export type SelectTicketType = Selectable<ticketTypeTable>
// export type NewTicketType = Insertable<ticketTypeTable>
// export type TicketTypeUpdate = Updateable<ticketTypeTable>













// export interface TicketTable {
//   id: Generated<string> | string; // Use a universally unique identifier (UUID) for the primary key.
//   event_id: Generated<string> | string; // Foriegn Key to EventTable row
//   ticket_holder_id: Generated<string> | string;
//   ticket_holder_email:string;
//   ticket_holder_name: string;// Foriegn Key to UserTable row
//   ticket_type: string | null;
//   ticket_price : number ;
//   ticket_logo : string | null;
//   also_included : string | null;
//   drinks_included:boolean | null;
//   payment_method : "cash" | "credit" | "etransfer" | "free" | "POS Tap";
//   payment_complete : boolean | null;
//   payment_required : boolean | null;

//   ticket_cancelled : boolean | null;
//   ticket_cancelled_reason : string | null;


// }



// export type SelectTicket = Selectable<TicketTable>
// export type NewTicket = Insertable<TicketTable>
// export type TicketUpdate = Updateable<TicketTable>

// export async function insertTicket(
//     t : new_ticket_props

// ){
//   const ticket : NewTicket = {
//     id:uuidv4(),
//     ticket_price:t.ticket_price,
//     ticket_type: t.ticket_type,
//     ticket_logo: t.ticket_logo,
//     ticket_holder_id: t.ticket_holder_id,
//     event_id: t.event_id,
//     drinks_included: t.drinks_included,
//     payment_required: t.payment_required,
//     payment_complete: t.payment_complete,
//     payment_method: t.payment_method,
//     ticket_holder_name: t.ticket_holder_name,
//     ticket_holder_email: t.ticket_holder_email,
//     ticket_cancelled: false,
//     ticket_cancelled_reason: null,
//   }
//   try{

//     const result : InsertResult = await queryBuilder
//         .insertInto('tickets')
//         .values(ticket)
//         .executeTakeFirstOrThrow();

//     return result;
//   } catch (error) {
//     // Log the error or handle it based on your application's requirements
//     console.error('Error inserting user:', error);

//     // Throw the error to propagate it further up the call stack if needed
//     throw new Error('Failed to insert ticket. Please try again later.');
//   }

// }


// export async function getTicketsAndMatchingEventForUserByEmail(email:string){
//   const ticketData  = await queryBuilder
//       .selectFrom('tickets')
//       .selectAll()
//       .where("ticket_holder_email","=",email)
//       .innerJoin('events','events.id','tickets.event_id')
//       .execute();
//   return ticketData
// }
// export async function getTicketsForUserByEmail(email:string){
//   const tickets = await queryBuilder
//   .selectFrom('tickets')
//       .selectAll()
//       .where("ticket_holder_email","=",email)
//       .execute();
//   return tickets
// }


// export interface UserTable {
//   id: Generated<string>; //Primary Key
//   name: string;
//   username: string;
//   email: string;
//   admin: boolean;
//   event_creator: boolean;
//   referral_code: string; //Index for fast search
//   password: string | null;
//   gender: "male"| "female" | "other" | null;
//   image: string | null;
//   events_created: number | null;
//   events_attended: number | null;
//   events_reviewed: number | null;
//   events_cancelled: number | null;

// }
// export type SelectUser = Selectable<UserTable>
// export type NewUser = Insertable<UserTable>
// export type UserUpdate = Updateable<UserTable>

// export async function getUserIdByEmail(email:string){
//   return await queryBuilder
//         .selectFrom('users')
//         .select(["id", "email", "admin", "event_creator"])
//         .where("email", "=", email)
//         .executeTakeFirstOrThrow();
// }

// export async function getUserRoleByEmail(email:string) {
//   const users = await queryBuilder
//       .selectFrom('users')
//       .select(["id","email","admin","event_creator"])
//       .where("email","=",email)
//       .executeTakeFirst();

//   console.log("\n\n USERS FROM AUTH API", users);
//   return users;

// }

// function generateAlphanumericCode(email: string, secretKey: string, codeLength = 10): string {
//   // Concatenate email and secretKey
//   const message = email + secretKey;

//   // Hash the message using SHA-256
//   const sha256Hash = crypto.createHash('sha256').update(message).digest('hex');

//   // Convert the hash into alphanumeric representation (using base64 encoding)
//   const alphanumericCode = sha256Hash.slice(0, codeLength);

//   return alphanumericCode;
// }


// export async function insertUser(
//     name: string,
//     username: string,
//     email: string,
//     admin: boolean,
//     event_creator: boolean,
//     image: string | null
// ) {
//   try {
//     const newuser : NewUser = {
//       id: uuidv4(),
//       name: name,
//       username: username,
//       email: email,
//       admin: admin,
//       event_creator: event_creator,
//       referral_code: generateAlphanumericCode(email, process.env.SECRETKEY || "laksdjfoiqj",10),
//       image: image
//     }

//     const result : InsertResult = await queryBuilder
//         .insertInto('users')
//         .values(newuser)
//         .executeTakeFirstOrThrow();

//     return {insertResult: result, insertedUser: newuser};
//   } catch (error) {
//     // Log the error or handle it based on your application's requirements
//     console.error('Error inserting user:', error);

//     // Throw the error to propagate it further up the call stack if needed
//     throw new Error('Failed to insert user. Please try again later.');
//   }
// }






// export async function findUser(criteria: Partial<SelectUser>){
//   let query = queryBuilder.selectFrom('users');
//   if (criteria.id) {
//     query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.name) {
//     query = query.where('name', '=', criteria.name) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.username) {
//     query = query.where('username', '=', criteria.username) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.email) {
//     query = query.where('email', '=', criteria.email) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.admin) {
//     query = query.where('admin', '=', criteria.admin) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_creator) {
//     query = query.where('event_creator', '=', criteria.event_creator) // Kysely is immutable, you must re-assign!
//   }
//   return await query.selectAll().execute()


// }





// export interface Events_Table {
//   id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
//   event_creator : string,
//   event_title : string,
//   event_headline : string,
//   event_content : string, //consider storing data in a firebase data store, and hold the reference here.
//   event_date : string,
//   event_start_time : string,
//   length: number,
//   is_18_plus: boolean,
//   is_private: boolean,
//   drinks_included : boolean,
//   event_location : string,
//   event_address: string,
//   hero_image : string,
//   ticket : JSON,
// }

// export type SelectEvent = Selectable<Events_Table>
// export type NewEvent = Insertable<Events_Table>
// export type UpdateEvent = Updateable<Events_Table>


// //ToDo: chante this to take partials at some point
// // export async function updateEvent(event:UpdateEvent){
// //     return await queryBuilder
// //         .updateTable('events')
// //         .set(event)
// //         .where('id', '=', event.id)
// //         .executeTakeFirstOrThrow()
// // }
//     //@ts-ignore
// export async function getNextEvent(){
//   return await queryBuilder
//       .selectFrom('events')
//       .selectAll()
//           //@ts-ignore
//       .where("event_date",">=",new Date().toISOString().split('T')[0])
//       .orderBy("event_date")
//       .limit(1)
//       .executeTakeFirstOrThrow()
// }
// export async function insertEvent(event: NewEvent) {
//   return await queryBuilder
//       .insertInto('events')
//       .values(event)
//       .executeTakeFirstOrThrow()
// }

// export async function getAllEvents(){
//   return await queryBuilder
//       .selectFrom('events')
//       .select(["id","event_creator","event_title","event_headline","event_date","event_start_time","is_18_plus","is_private","length","event_location","hero_image","ticket"])
//       .execute()

// }


// export async function findEventById(id:string){
//     return await queryBuilder
//         .selectFrom('events')
//         .select(["id","ticket"])
//         .where("id","=",id)
//         .executeTakeFirstOrThrow()
// }

// export async function selectEvent(criteria: Partial<SelectEvent>){
//   let query = queryBuilder.selectFrom('events');
//   if (criteria.id) {
//     query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_creator) {
//     query = query.where('event_creator', '=', criteria.event_creator) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_title) {
//     query = query.where('event_title', '=', criteria.event_title) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_headline) {
//     query = query.where('event_headline', '=', criteria.event_headline) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_date) {
//     query = query.where('event_date', '=', criteria.event_date) // Kysely is immutable, you must re-assign!
//   }
//   if (criteria.event_location){
//     query = query.where('event_location', '=', criteria.event_location) // Kysely is immutable, you must re-assign!
//   }

//   return await query.selectAll().execute()
// }


// export interface referral_table {
//     id: Generated<string>; // Use a universally unique identifier (UUID) for the primary key.
//     user_id : string, //id of the person being reffered
//     referrer_id : string | null | undefined, //id of the person who referred the user
//     referral_code : string, //code used to identify the referrer 10 chars, index on this for fast search
// }

// interface EventDatabase {
//   // Event: EventInterface;
//   events: Events_Table;
//   review_table: ReviewTable;
//   tickets: TicketTable;
//   users: UserTable;
//   SavedEventsTable: SavedEventsTable;
//   referrals: referral_table;
//   ticket_types: ticketTypeTable;

//   // https://github.com/nextauthjs/next-auth/issues/4922
// }
// // export const queryBuilder = new Kysely<EventDatabase>({
// //   dialect: new PlanetScaleDialect({
// //     //@ts-ignore
// //     url: process.env.DATABASE_URL
// //   })
// // });


