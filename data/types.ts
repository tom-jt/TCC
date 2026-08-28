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
  /** Description of the photo, read aloud to visitors using a screen reader. */
  photoAlt: string;
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
  /** Description of the photo, read aloud to visitors using a screen reader. */
  photoAlt: string;
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

/**
 * The address again, split into parts. Only search engines read this — it feeds
 * the structured data that lets Google show the school as a local business.
 */
export interface PostalAddress {
  street: string;
  locality: string;
  region: string;
  postcode: string;
  /** Two-letter country code, e.g. "AU". */
  country: string;
}

export interface ContactContent {
  buildingPhoto: string;
  mapUrl: string;
  address: string[];
  postal: PostalAddress;
  mobile: string[];
  wechat: string[];
  email: string;
}
