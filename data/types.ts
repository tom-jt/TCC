export interface GeneralContent {
  logo: string;
  heroTagline: string;
  enrolIntro: string;
}

export interface Notice {
  title: string;
  date: string;
  body: string;
}

export interface NoticeboardContent {
  principalPhoto: string;
  principalQuote: string;
  principalAttribution: string;
  notices: Notice[];
}

export interface ClassGroup {
  title: string;
  lessonDuration: string;
  schedule: string[];
}

export interface ClassesContent {
  photo: string;
  intro: string;
  groupLessons: string;
  individualLessons: string;
  termLabel: string;
  termDates: string;
  features: string[];
  groups: ClassGroup[];
}

export interface HolidayContent {
  photo: string;
  intro: string;
  intensiveIntro: string;
  intensiveDetails: string[];
  mockExams: string;
}

export interface StudentResult {
  name: string;
  result: string;
}

export interface ResultsContent {
  subheading: string;
  stateRanks: StudentResult[];
  atar: StudentResult[];
  extension2: StudentResult[];
  extension1: StudentResult[];
  advanced2: StudentResult[];
}

export interface ContactContent {
  buildingPhoto: string;
  mapUrl: string;
  address: string[];
  mobile: string[];
  wechat: string[];
  email: string;
}
