import {SVGProps} from "react";
import {Generated} from "kysely";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
  userId: string
  event: {
    title: string
    description: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
  path: string
}

export type UpdateEventParams = {
  userId: string
  event: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
  path: string
}

export type DeleteEventParams = {
  eventId: string
  path: string
}

export type GetAllEventsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type GetEventsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedEventsByCategoryParams = {
  categoryId: string
  eventId: string
  limit?: number
  page: number | string
}

export type Event = {
  _id: string
  title: string
  description: string
  price: string
  isFree: boolean
  imageUrl: string
  location: string
  startDateTime: Date
  endDateTime: Date
  url: string
  organizer: {
    _id: string
    firstName: string
    lastName: string
  }
  category: {
    _id: string
    name: string
  }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  eventTitle: string
  eventId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  stripeId: string
  eventId: string
  buyerId: string
  totalAmount: string
  createdAt: Date
}

export type GetOrdersByEventParams = {
  eventId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}





export interface event_table_interface {
  id: Generated<string> | string; // Use a universally unique identifier (UUID) for the primary key.
  event_creator : string,
  event_title : string,
  event_headline : string,
  event_content : string, //consider storing data in a firebase data store, and hold the reference here.
  event_date : string,
  event_start_time : string,
  length: number,
  is_18_plus: boolean,
  is_private: boolean,
  drinks_included : boolean,
  event_location : string,
  event_address: string,
  hero_image : string,
  ticket : JSON | string,
}

export interface event_card_interface {
  id: Generated<string> | string; // Use a universally unique identifier (UUID) for the primary key.
  event_creator : string,
  event_title : string,
  event_headline : string,
  event_date : string,
  event_start_time : string,
  length: number,
  is_18_plus: boolean,
  is_private: boolean,
  event_location : string,
  hero_image : string,
  ticket : JSON | string,
}

export interface ticket_card_interface {
  logo: string,
  price: number,
  ticket_type: string,
  alsoIncluded: string,
  paymentTypes: string[],
  drinksInlcuded: boolean
  payment_required: boolean,
}

export interface EmailTemplateProps {
  name:string,
  email:string,
  event_title:string,
  event_date:string,
  QRCodeURI: string,
  event_location: string
}



export interface ticket_gen_props {
  logo: string,
  price: number,
  ticket_type: string,
  alsoIncluded: string,
  paymentTypes: string[],
  drinksInlcuded: boolean,
  user_email : string,
  user_name : string,
  user_id : number,
}

export interface new_ticket_props{
  event_id:string,
  ticket_holder_id:string,
  ticket_holder_email : string,
  ticket_type: string,
  ticket_price: number,
  ticket_logo:string | null,
  drinks_included : boolean,
  payment_method : "cash" | "credit" | "etransfer" | "POS Tap",
  payment_complete: boolean,
  payment_required: boolean,
  ticket_holder_name: string,
  also_included: string,
}


export interface ticket_gen_props_event {
  id: number,
  event_creator : string,
  event_title : string,
  event_headline : string,
  event_date : string,
  event_start_time : string,
  length : string,
  event_location : string,
}

export interface GenTicketButtonProps {
  id: number,
  event_creator : string,
  event_title : string,
  event_headline : string,
  event_date : string,
  event_start_time : string,
  length : string,
  event_location : string,
  ticket_price : number,
  logo: string,
  price: number,
  ticket_type: string,
  alsoIncluded: string,
  paymentTypes: string[],
  drinksInlcuded: boolean,
  user_email : string,
  user_name : string,
  user_id : number,
}