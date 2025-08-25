import React from "react";
import type { Student, Mentor, User } from "./types.ts";

type TableProps = {
  users: User[]; 
  filteredAndSortedUsers: User[];
};

export const Table: React.FC<TableProps> = ({ users, filteredAndSortedUsers }) => {
  return (
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
          {filteredAndSortedUsers.map((user) => {
            const isStudent = user.role === "student";

            return (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent ? "生徒" : "メンター"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.postCode}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.hobbies.join(", ")}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={user.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    リンク
                  </a>
                </td>

                {/* 生徒の場合 */}
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent ? user.studyMinutes : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent ? user.taskCode : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent ? (user.studyLangs as string[]).join(", ") : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent ? user.score : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {isStudent
                    ? users
                        .filter(
                          (u): u is Mentor =>
                            u.role === "mentor" &&
                            u.availableStartCode <= user.taskCode &&
                            user.taskCode <= u.availableEndCode
                        )
                        .map((m) => m.name)
                        .join(", ") || "該当なし"
                    : "-"}
                </td>

                {/* メンターの場合 */}
                <td className="border border-gray-300 px-4 py-2">
                  {!isStudent ? user.experienceDays : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!isStudent ? (user.useLangs as string[]).join(", ") : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!isStudent ? user.availableStartCode : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!isStudent ? user.availableEndCode : "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!isStudent
                    ? users
                        .filter(
                          (u): u is Student =>
                            u.role === "student" &&
                            user.availableStartCode <= u.taskCode &&
                            u.taskCode <= user.availableEndCode
                        )
                        .map((s) => s.name)
                        .join(", ") || "該当なし"
                    : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
