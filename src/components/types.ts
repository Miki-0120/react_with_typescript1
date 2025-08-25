export type Student = {
  id: number;
  name: string;
  role: 'student';
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};

export type Mentor = {
  id: number;
  name: string;
  role: 'mentor';
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};

export type User = Student | Mentor;

export type BaseFormData = {
  name: string;
  email: string;
  age: string;
  postCode: string;
  phone: string;
  hobbies: string;
  url: string;
};

export type StudentFormData = BaseFormData & {
  studyMinutes: string;
  taskCode: string;
  studyLangs: string;
  score: string;
};

export type MentorFormData = BaseFormData & {
  experienceDays: string;
  useLangs: string;
  availableStartCode: string;
  availableEndCode: string;
};