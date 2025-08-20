import React from "react";
import { Student, Mentor, User } from "./UserTable";

type UserRowProps = {
  user: User;
  users: User[];
};

export const Table: React.FC<UserRowProps> = ({ user, users }) => {
  const isStudent = user.role === "student";

   return (
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
                )
            )};