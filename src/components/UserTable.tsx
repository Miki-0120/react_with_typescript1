import { useState } from 'react';

type Student = {
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

type Mentor = {
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

type User = Student | Mentor;

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

export default function UserTable() {
  const [users, setUsers] = useState<User[]>(INITIAL_USER_LIST);
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'mentor'>('all');
  const [sortKey, setSortKey] = useState<'studyMinutes' | 'score' | 'experienceDays' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"" | "student" | "mentor">("");
  const [formData, setFormData] = useState<any>({});

  const handleSort = (key: 'studyMinutes' | 'score' | 'experienceDays') => {
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

  const filteredAndSortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = (a as any)[sortKey];
    const bValue = (b as any)[sortKey];
    if (typeof aValue !== 'number' || typeof bValue !== 'number') return 0;
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getSortButtonText = (key: string) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? '▲(昇順)' : '▼(降順)';
    }
    return '';
  };

  const handleRoleSelect = (role: "student" | "mentor") => {
    setSelectedRole(role);
    setFormData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'age', 'postCode', 'phone', 'hobbies', 'url'];
    
    if (selectedRole === 'student') {
      requiredFields.push('studyMinutes', 'taskCode', 'studyLangs', 'score');
    } else if (selectedRole === 'mentor') {
      requiredFields.push('experienceDays', 'useLangs', 'availableStartCode', 'availableEndCode');
    }

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return false;
      }
    }
    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      alert("全ての項目を入力してください。");
      return;
    }

    const processedData: any = {
      ...formData,
      role: selectedRole,
      id: Math.max(...users.map(u => u.id)) + 1,
      age: parseInt(formData.age) || 0,
      hobbies: formData.hobbies?.split(",").map((h: string) => h.trim()).filter(Boolean) || [],
    };

    if (selectedRole === "student") {
      processedData.studyMinutes = parseInt(formData.studyMinutes) || 0;
      processedData.taskCode = parseInt(formData.taskCode) || 0;
      processedData.studyLangs = formData.studyLangs?.split(",").map((l: string) => l.trim()).filter(Boolean) || [];
      processedData.score = parseInt(formData.score) || 0;
    } else {
      processedData.experienceDays = parseInt(formData.experienceDays) || 0;
      processedData.useLangs = formData.useLangs?.split(",").map((l: string) => l.trim()).filter(Boolean) || [];
      processedData.availableStartCode = parseInt(formData.availableStartCode) || 0;
      processedData.availableEndCode = parseInt(formData.availableEndCode) || 0;
    }

    setUsers((prev) => [...prev, processedData]);
    setSelectedRole("");
    setFormData({});
    setShowRegistrationForm(false);
    alert("登録に成功しました");
  };

  const resetForm = () => {
    setSelectedRole("");
    setFormData({});
    setShowRegistrationForm(false);
  };

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

      {/* 新規登録フォーム */}
      {showRegistrationForm && selectedRole && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-4">
            {selectedRole === "mentor" ? "メンター" : "生徒"}登録フォーム
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 共通項目 */}
            <input 
              placeholder="名前 *" 
              value={formData.name || ''} 
              onChange={(e) => handleInputChange("name", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="メールアドレス *" 
              value={formData.email || ''} 
              onChange={(e) => handleInputChange("email", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="年齢 *" 
              type="text"
              value={formData.age || ''} 
              onChange={(e) => handleInputChange("age", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="郵便番号 *" 
              value={formData.postCode || ''} 
              onChange={(e) => handleInputChange("postCode", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="電話番号 *" 
              value={formData.phone || ''} 
              onChange={(e) => handleInputChange("phone", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="趣味 (カンマ区切り) *" 
              value={formData.hobbies || ''} 
              onChange={(e) => handleInputChange("hobbies", e.target.value)} 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="URL *" 
              value={formData.url || ''} 
              onChange={(e) => handleInputChange("url", e.target.value)} 
              className="border p-2 rounded col-span-full" 
            />

            {/* 生徒のみの項目 */}
            {selectedRole === "student" && (
              <>
                <input 
                  placeholder="勉強時間（分） *" 
                  type="text"
                  value={formData.studyMinutes || ''} 
                  onChange={(e) => handleInputChange("studyMinutes", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="課題番号 *" 
                  type="text"
                  value={formData.taskCode || ''} 
                  onChange={(e) => handleInputChange("taskCode", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="勉強中の言語 (カンマ区切り) *" 
                  value={formData.studyLangs || ''} 
                  onChange={(e) => handleInputChange("studyLangs", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="ハピネススコア *" 
                  type="text"
                  value={formData.score || ''} 
                  onChange={(e) => handleInputChange("score", e.target.value)} 
                  className="border p-2 rounded" 
                />
              </>
            )}

            {/* メンターのみの項目 */}
            {selectedRole === "mentor" && (
              <>
                <input 
                  placeholder="実務経験日数 *" 
                  type="text"
                  value={formData.experienceDays || ''} 
                  onChange={(e) => handleInputChange("experienceDays", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="現場で使っている言語 (カンマ区切り) *" 
                  value={formData.useLangs || ''} 
                  onChange={(e) => handleInputChange("useLangs", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="担当できる課題番号（開始） *" 
                  type="text"
                  value={formData.availableStartCode || ''} 
                  onChange={(e) => handleInputChange("availableStartCode", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="担当できる課題番号（終了） *" 
                  type="text"
                  value={formData.availableEndCode || ''} 
                  onChange={(e) => handleInputChange("availableEndCode", e.target.value)} 
                  className="border p-2 rounded" 
                />
              </>
            )}
          </div>

          <div className="mt-4 space-x-2">
            <button 
              onClick={handleRegister} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              登録
            </button>
            <button 
              onClick={resetForm} 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

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

      {roleFilter === 'mentor' && (
        <div className="mb-4 space-x-2">
          <button 
            onClick={() => handleSort('experienceDays')}
            className="px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
          >
            実務経験日数でソート {getSortButtonText('experienceDays')}
          </button>
        </div>
      )}

      {/* テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">名前</th>
              <th className="border border-gray-300 px-4 py-2">ロール</th>
              <th className="border border-gray-300 px-4 py-2">メールアドレス</th>
              <th className="border border-gray-300 px-4 py-2">年齢</th>
              <th className="border border-gray-300 px-4 py-2">郵便番号</th>
              <th className="border border-gray-300 px-4 py-2">電話番号</th>
              <th className="border border-gray-300 px-4 py-2">趣味</th>
              <th className="border border-gray-300 px-4 py-2">URL</th>
              <th className="border border-gray-300 px-4 py-2">勉強時間</th>
              <th className="border border-gray-300 px-4 py-2">課題番号</th>
              <th className="border border-gray-300 px-4 py-2">勉強中の言語</th>
              <th className="border border-gray-300 px-4 py-2">ハピネススコア</th>
              <th className="border border-gray-300 px-4 py-2">対応可能なメンター</th>
              <th className="border border-gray-300 px-4 py-2">実務経験日数</th>
              <th className="border border-gray-300 px-4 py-2">現場で使っている言語</th>
              <th className="border border-gray-300 px-4 py-2">担当できる課題番号初め</th>
              <th className="border border-gray-300 px-4 py-2">担当できる課題番号終わり</th>
              <th className="border border-gray-300 px-4 py-2">対応可能な生徒</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role === 'student' ? '生徒' : 'メンター'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.postCode}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.hobbies.join(', ')}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={user.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    リンク
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'student' ? user.studyMinutes : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'student' ? user.taskCode : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'student' ? (user.studyLangs as string[]).join(', ') : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'student' ? user.score : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'student'
                    ? users
                        .filter(
                          (u): u is Mentor =>
                            u.role === 'mentor' &&
                            u.availableStartCode <= user.taskCode &&
                            user.taskCode <= u.availableEndCode
                        )
                        .map((m) => m.name)
                        .join(', ') || '該当なし'
                    : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'mentor' ? user.experienceDays : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'mentor' ? (user.useLangs as string[]).join(', ') : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'mentor' ? user.availableStartCode : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'mentor' ? user.availableEndCode : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'mentor'
                    ? users
                        .filter(
                          (u): u is Student =>
                            u.role === 'student' &&
                            user.availableStartCode <= u.taskCode &&
                            u.taskCode <= user.availableEndCode
                        )
                        .map((s) => s.name)
                        .join(', ') || '該当なし'
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}