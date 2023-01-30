import { ColumnType, DeskType, PrayerType, UserType } from './data';

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

export type GetPrayersResponse = {
  data: PrayerType[];
  cursor: {
    afterCursor: string;
    beforeCursor: string;
  };
};

export type GetOwnDeskResponse = DeskType;

export type CreateColumnResponse = ColumnType;

export type RemoveColumnResponse = {
  raw: ColumnType[];
  affected: ColumnType['id'];
};
