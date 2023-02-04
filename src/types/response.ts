import { ColumnType, CommentType, DeskType, PrayerType, UserType } from './data';

export type SignInResponse = {
  id: number;
  email: string;
  name: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type SignUpResponse = UserType & {
  token: string;
};

export type GetDesksResponse = {
  data: DeskType[];
  cursor: {
    afterCursor: string;
    beforeCursor: string;
  };
};

export type GetColumnsResponse = {
  data: ColumnType[];
  cursor: {
    afterCursor: string;
    beforeCursor: string;
  };
};

export type GetPrayersResponse = PrayerType[];

export type GetOwnDeskResponse = DeskType;

export type CreateColumnResponse = ColumnType;

export type RemoveColumnResponse = never;

export type CreatePrayerResponse = PrayerType;

export type RemovePrayerResponse = never;

export type DoPrayResponse = PrayerType;

export type getCommentsResponse = CommentType[];
