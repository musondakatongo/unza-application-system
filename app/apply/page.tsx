import Link from 'next/link';
import { authenticate, fetchSchools } from '../actions';


export default async function Apply() {
  await authenticate();
  const schools = await fetchSchools();

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
                          Link
                      </th>
                  </tr>
              </thead>
              <tbody>
                {schools.map(school => (
                  <tr className="bg-white border-b">
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {school.name}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/apply/school/${school.name.toLowerCase().split(" ").join("-")}`}> Apply</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>

    </main>
  )
}
