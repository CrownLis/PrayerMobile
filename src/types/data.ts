export type ColumnType = {
  id: number;
  title: string;
  description: string;
  userId: UserType['id'];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  isGreetings: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type DeskType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type PrayerType = {
  id: number;
  title: string;
  description: string;
  userId: UserType['id'];
  columnId: ColumnType['id'];
  completesCount: number;
  subscribersCount: number;
  myPrayCount: number;
  otherPrayCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  subscribers?: UserType[];
};

export type CommentType = {
  id: number;
  body: string;
  userId: UserType['id'];
  prayerId: PrayerType['id'];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
