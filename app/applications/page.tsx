import { authenticate, fetchApplications } from "../actions"

export default async function Applications() {
 
  await authenticate();

  const applications = await fetchApplications();

  return (
    <main className="relative flex min-h-screen flex-col items-center m-10">
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 bg-teal-300">
              <thead className="text-xs text-gray-700 uppercase bg-teal-300">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          School
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Department
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                  </tr>
              </thead>
              <tbody>
                 {applications.map(application => (
                      <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                          {application.school}
                      </th>
                      <td className="px-6 py-4">
                          {application.department}
                      </td>
                      <td className="px-6 py-4">
                          {application.status}
                      </td>
                  </tr>
                 ))}  
              </tbody>
          </table>
      </div>
    </main>
  )
}
