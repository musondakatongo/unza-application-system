import { authenticate, fetchDepartments, submitApplication } from "@/app/actions"

export default async function Department({
  params,
}: {
  params: { school: string };
}) {

  const handleSubmit = async function(formData: FormData) {
    "use server"
    const departmentId = formData.get('department_id') as string;
    await submitApplication(departmentId);
  }

  await authenticate();
  const departments = await fetchDepartments(params.school);
  
  return (
    <main className="relative flex min-h-screen flex-col items-center m-10">
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 bg-teal-300">
              <thead className="text-xs text-gray-700 uppercase bg-teal-300">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Department
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {departments.map((department: any, index: number) => (
                  <tr key={index} className="bg-white border-b">
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {department.name}
                    </td>
                    <td className="px-6 py-4">
                        <form action={handleSubmit}>
                          <input className="hidden" name='department_id' value={department.department_id} readOnly />
                          <button type="submit"> Submit</button>
                        </form>
                    </td>
                </tr>
                ))}
              </tbody>
          </table>
      </div>
    </main>
  )
}
