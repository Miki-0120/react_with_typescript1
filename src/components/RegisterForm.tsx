import React from "react";
import type { StudentFormData, MentorFormData } from "./types";

type RegisterFormProps = {
  showRegistrationForm: boolean;
  selectedRole: "" | "student" | "mentor";
  studentFormData: StudentFormData;
  mentorFormData: MentorFormData;
  currentFormData: any;
  handleStudentInputChange: (field: keyof StudentFormData, value: string) => void;
  handleMentorInputChange: (field: keyof MentorFormData, value: string) => void;
  handleRegister: () => void;
  resetForm: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  showRegistrationForm,
  selectedRole,
  studentFormData,
  mentorFormData,
  currentFormData,
  handleStudentInputChange,
  handleMentorInputChange,
  handleRegister,
  resetForm,
}) => {
  return (
    <>
      {showRegistrationForm && selectedRole && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-4">
            {selectedRole === "mentor" ? "メンター" : "生徒"}登録フォーム
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* 共通項目 */}
            <input 
              placeholder="名前 *" 
              value={currentFormData.name} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("name", e.target.value)
                : handleMentorInputChange("name", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="メールアドレス *" 
              value={currentFormData.email} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("email", e.target.value)
                : handleMentorInputChange("email", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="年齢 *" 
              type="text"
              value={currentFormData.age} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("age", e.target.value)
                : handleMentorInputChange("age", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="郵便番号 *" 
              value={currentFormData.postCode} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("postCode", e.target.value)
                : handleMentorInputChange("postCode", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="電話番号 *" 
              value={currentFormData.phone} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("phone", e.target.value)
                : handleMentorInputChange("phone", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="趣味 (カンマ区切り) *" 
              value={currentFormData.hobbies} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("hobbies", e.target.value)
                : handleMentorInputChange("hobbies", e.target.value)
              } 
              className="border p-2 rounded" 
            />
            <input 
              placeholder="URL *" 
              value={currentFormData.url} 
              onChange={(e) => selectedRole === 'student' 
                ? handleStudentInputChange("url", e.target.value)
                : handleMentorInputChange("url", e.target.value)
              } 
              className="border p-2 rounded col-span-full" 
            />

            {/* 生徒のみの項目 */}
            {selectedRole === "student" && (
              <>
                <input 
                  placeholder="勉強時間（分） *" 
                  type="text"
                  value={studentFormData.studyMinutes} 
                  onChange={(e) => handleStudentInputChange("studyMinutes", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="課題番号 *" 
                  type="text"
                  value={studentFormData.taskCode} 
                  onChange={(e) => handleStudentInputChange("taskCode", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="勉強中の言語 (カンマ区切り) *" 
                  value={studentFormData.studyLangs} 
                  onChange={(e) => handleStudentInputChange("studyLangs", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="ハピネススコア *" 
                  type="text"
                  value={studentFormData.score} 
                  onChange={(e) => handleStudentInputChange("score", e.target.value)} 
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
                  value={mentorFormData.experienceDays} 
                  onChange={(e) => handleMentorInputChange("experienceDays", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="現場で使っている言語 (カンマ区切り) *" 
                  value={mentorFormData.useLangs} 
                  onChange={(e) => handleMentorInputChange("useLangs", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="担当できる課題番号（開始） *" 
                  type="text"
                  value={mentorFormData.availableStartCode} 
                  onChange={(e) => handleMentorInputChange("availableStartCode", e.target.value)} 
                  className="border p-2 rounded" 
                />
                <input 
                  placeholder="担当できる課題番号（終了） *" 
                  type="text"
                  value={mentorFormData.availableEndCode} 
                  onChange={(e) => handleMentorInputChange("availableEndCode", e.target.value)} 
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
      </>
  )};
