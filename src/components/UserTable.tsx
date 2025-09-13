import { useState } from 'react';
import type { User, Student, Mentor, StudentFormData, MentorFormData } from './types';
import { Table } from './table';
import { RegisterForm } from "./RegisterForm";

const INITIAL_USER_LIST: User[] = [
  { id: 1, name: "鈴木太郎", role: "student", email: "test1@happiness.com", age: 26, postCode: "100-0003", phone: "0120000001", hobbies: ["旅行", "食べ歩き", "サーフィン"], url: "https://aaa.com", studyMinutes: 3000, taskCode: 101, studyLangs: ["Rails", "Javascript"], score: 68 },
  { id: 2, name: "鈴木二郎", role: "mentor", email: "test2@happiness.com", age: 31, postCode: "100-0005", phone: "0120000002", hobbies: ["サッカー", "ランニング", "筋トレ"], url: "https://bbb.com", experienceDays: 1850, useLangs: ["Next.js", "GoLang"], availableStartCode: 201, availableEndCode: 302 },
  { id: 3, name: "鈴木三郎", role: "student", email: "test3@happiness.com", age: 23, postCode: "300-0332", phone: "0120000003", hobbies: ["アニメ", "ゲーム", "旅行"], url: "https://ccc.com", studyMinutes: 125000, taskCode: 204, studyLangs: ["Rails", "Next.js"], score: 90 },
  { id: 4, name: "鈴木四郎", role: "mentor", email: "test4@happiness.com", age: 31, postCode: "100-0005", phone: "0120000004", hobbies: ["食べ歩き", "ランニング", "旅行"], url: "https://ddd.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 103, availableEndCode: 408 },
  { id: 5, name: "鈴木五郎", role: "student", email: "test5@happiness.com", age: 22, postCode: "300-0005", phone: "0120000005", hobbies: ["筋トレ", "ランニング"], url: "https://eee.com", studyMinutes: 47800, taskCode: 305, studyLangs: ["Next.js", "Rails"], score: 84 },
  { id: 6, name: "鈴木六郎", role: "mentor", email: "test6@happiness.com", age: 28, postCode: "100-0007", phone: "0120000006", hobbies: ["ゲーム", "サッカー"], url: "https://fff.com", experienceDays: 260, useLangs: ["PHP", "Javascript"], availableStartCode: 101, availableEndCode: 302 },
  { id: 7, name: "鈴木七郎", role: "student", email: "test7@happiness.com", age: 24, postCode: "300-0008", phone: "0120000007", hobbies: ["筋トレ", "ダーツ"], url: "https://ggg.com", studyMinutes: 26900, taskCode: 401, studyLangs: ["PHP", "Rails"], score: 73 },
  { id: 8, name: "鈴木八郎", role: "mentor", email: "test8@happiness.com", age: 33, postCode: "100-0009", phone: "0120000008", hobbies: ["ランニング", "旅行"], url: "https://hhh.com", experienceDays: 6000, useLangs: ["Golang", "Rails"], availableStartCode: 301, availableEndCode: 505 },
];

type SortableKey = 'studyMinutes' | 'score' | 'experienceDays';

const hasStudentProperties = (user: User): user is Student => {
  return user.role === 'student';
};

const hasMentorProperties = (user: User): user is Mentor => {
  return user.role === 'mentor';
};

const createEmptyStudentFormData = (): StudentFormData => ({
  name: '',
  email: '',
  age: '',
  postCode: '',
  phone: '',
  hobbies: '',
  url: '',
  studyMinutes: '',
  taskCode: '',
  studyLangs: '',
  score: ''
});

const createEmptyMentorFormData = (): MentorFormData => ({
  name: '',
  email: '',
  age: '',
  postCode: '',
  phone: '',
  hobbies: '',
  url: '',
  experienceDays: '',
  useLangs: '',
  availableStartCode: '',
  availableEndCode: ''
});

export default function UserTable() {
  const [users, setUsers] = useState<User[]>(INITIAL_USER_LIST);
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'mentor'>('all');
  const [sortKey, setSortKey] = useState<SortableKey | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"" | "student" | "mentor">("");
  const [studentFormData, setStudentFormData] = useState<StudentFormData>(createEmptyStudentFormData());
  const [mentorFormData, setMentorFormData] = useState<MentorFormData>(createEmptyMentorFormData());

  const handleSort = (key: SortableKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users.filter((user) => {
    if (roleFilter === 'all') return true;
    return user.role === roleFilter;
  });

  const sortUsers = (
    users: User[], 
    sortKey: SortableKey | null, 
    sortOrder: 'asc' | 'desc'
  ): User[] => {
    if (!sortKey) return users;
    
    return [...users].sort((a, b) => {
      let aValue: number = 0;
      let bValue: number = 0;
      
      if (sortKey === 'studyMinutes') {
        aValue = hasStudentProperties(a) ? a.studyMinutes : 0;
        bValue = hasStudentProperties(b) ? b.studyMinutes : 0;
      } else if (sortKey === 'score') {
        aValue = hasStudentProperties(a) ? a.score : 0;
        bValue = hasStudentProperties(b) ? b.score : 0;
      } else if (sortKey === 'experienceDays') {
        aValue = hasMentorProperties(a) ? a.experienceDays : 0;
        bValue = hasMentorProperties(b) ? b.experienceDays : 0;
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

  const filteredAndSortedUsers = sortUsers(filteredUsers, sortKey, sortOrder);

  const getSortButtonText = (key: SortableKey) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? '▲(昇順)' : '▼(降順)';
    }
    return '';
  };

  const handleRoleSelect = (role: "student" | "mentor") => {
    setSelectedRole(role);

    if (role === 'student') {
      setStudentFormData(createEmptyStudentFormData());
    } else {
      setMentorFormData(createEmptyMentorFormData());
    }
  };

  const handleStudentInputChange = (field: keyof StudentFormData, value: string) => {
    setStudentFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMentorInputChange = (field: keyof MentorFormData, value: string) => {
    setMentorFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStudentForm = (data: StudentFormData): boolean => {
    const requiredFields: (keyof StudentFormData)[] = [
      'name', 'email', 'age', 'postCode', 'phone', 'hobbies', 'url',
      'studyMinutes', 'taskCode', 'studyLangs', 'score'
    ];

    return requiredFields.every(field => data[field].trim() !== '');
  };

  const validateMentorForm = (data: MentorFormData): boolean => {
    const requiredFields: (keyof MentorFormData)[] = [
      'name', 'email', 'age', 'postCode', 'phone', 'hobbies', 'url',
      'experienceDays', 'useLangs', 'availableStartCode', 'availableEndCode'
    ];

    return requiredFields.every(field => data[field].trim() !== '');
  };

  const handleRegister = () => {
    if (selectedRole === 'student') {
      if (!validateStudentForm(studentFormData)) {
        alert("全ての項目を入力してください。");
        return;
      }

       const newStudent: Student = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: studentFormData.name,
        role: 'student',
        email: studentFormData.email,
        age: parseInt(studentFormData.age) || 0,
        postCode: studentFormData.postCode,
        phone: studentFormData.phone,
        hobbies: studentFormData.hobbies.split(",").map(h => h.trim()).filter(Boolean),
        url: studentFormData.url,
        studyMinutes: parseInt(studentFormData.studyMinutes) || 0,
        taskCode: parseInt(studentFormData.taskCode) || 0,
        studyLangs: studentFormData.studyLangs.split(",").map(l => l.trim()).filter(Boolean),
        score: parseInt(studentFormData.score) || 0
      };

      setUsers(prev => [...prev, newStudent]);
    } else if (selectedRole === 'mentor') {
      if (!validateMentorForm(mentorFormData)) {
        alert("全ての項目を入力してください。");
        return;
      }

      const newMentor: Mentor = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: mentorFormData.name,
        role: 'mentor',
        email: mentorFormData.email,
        age: parseInt(mentorFormData.age) || 0,
        postCode: mentorFormData.postCode,
        phone: mentorFormData.phone,
        hobbies: mentorFormData.hobbies.split(",").map(h => h.trim()).filter(Boolean),
        url: mentorFormData.url,
        experienceDays: parseInt(mentorFormData.experienceDays) || 0,
        useLangs: mentorFormData.useLangs.split(",").map(l => l.trim()).filter(Boolean),
        availableStartCode: parseInt(mentorFormData.availableStartCode) || 0,
        availableEndCode: parseInt(mentorFormData.availableEndCode) || 0
      };

      setUsers(prev => [...prev, newMentor]);
    }

    setSelectedRole("");
    setShowRegistrationForm(false);
    alert("登録に成功しました");
  };

  const resetForm = () => {
    setSelectedRole("");
    setStudentFormData(createEmptyStudentFormData());
    setMentorFormData(createEmptyMentorFormData());
    setShowRegistrationForm(false);
  };

  const currentFormData = selectedRole === 'student' ? studentFormData : mentorFormData;

  return (
    <div className="p-4">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button 
            onClick={() => setRoleFilter('all')}
            className={`px-4 py-2 rounded ${roleFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            全員表示
          </button>
          <button 
            onClick={() => setRoleFilter('student')}
            className={`px-4 py-2 rounded ${roleFilter === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            生徒のみ
          </button>
          <button 
            onClick={() => setRoleFilter('mentor')}
            className={`px-4 py-2 rounded ${roleFilter === 'mentor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            メンターのみ
          </button>
        </div>

        {/* 新規登録ボタン */}
        <div className="space-x-2">
          <button 
            onClick={() => {
              setShowRegistrationForm(true);
              handleRoleSelect('student');
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            生徒登録
          </button>
          <button 
            onClick={() => {
              setShowRegistrationForm(true);
              handleRoleSelect('mentor');
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            メンター登録
          </button>
        </div>
      </div>

      <RegisterForm
  showRegistrationForm={showRegistrationForm}
  selectedRole={selectedRole}
  studentFormData={studentFormData}
  mentorFormData={mentorFormData}
  currentFormData={selectedRole === "student" ? studentFormData : mentorFormData}
  handleStudentInputChange={handleStudentInputChange}
  handleMentorInputChange={handleMentorInputChange}
  handleRegister={handleRegister}
  resetForm={resetForm}
/>

      {/* ソートボタン */}
      {roleFilter === 'student' && (
        <div className="mb-4 space-x-2">
          <button 
            onClick={() => handleSort('studyMinutes')}
            className="px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
          >
            勉強時間でソート {getSortButtonText('studyMinutes')}
          </button>
          <button 
            onClick={() => handleSort('score')}
            className="px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
          >
            スコアでソート {getSortButtonText('score')}
          </button>
        </div>
      )}

      {roleFilter === 'mentor' &&(
        <div className="mb-4 space-x-2">
          <button 
            onClick={() => handleSort('experienceDays')}
            className="px-4 py-2 bg-purple-200 hover:bg-purple-300 rounded"
          >
            経験日数でソート {getSortButtonText('experienceDays')}
          </button>
        </div>
      )}

      {/* テーブル */}
      <Table users={users} filteredAndSortedUsers={filteredAndSortedUsers} />
    </div>
  );
}