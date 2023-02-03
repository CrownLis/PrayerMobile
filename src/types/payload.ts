import { ColumnType, DeskType, PrayerType } from './data';

export type SignUpPayload = {
  email: string;
  name: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type GetDesksPayload = {
  limit: number;
  afterCursor?: string;
};

export type GetColumnsPayload = {
  limit: number;
  afterCursor?: string;
  deskId: DeskType['id'];
};

export type GetPrayersPayload = {
  columnId: ColumnType['id'];
};

export type CreateColumnPayload = {
  title: string;
  description: string;
};

export type CreatePrayerPayload = {
  title: string;
  description: string;
  columnId?: ColumnType['id'];
};

export type CreateCommentPayload = {
  body: string;
  prayerId: PrayerType['id'];
};

export type DeleteColumnPayload = ColumnType['id'];

export type DeletePrayerPayload = PrayerType['id'];
