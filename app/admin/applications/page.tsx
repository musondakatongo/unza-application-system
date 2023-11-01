import { admitApplicant, autheticateAdmin, fetchAdminApplications, rejectApplicant } from "@/app/actions";

export default async function Applications() {

  const handleAdmit = async function(formData: FormData) {
    "use server"
    const applicationId = formData.get('application_id') as string;
    await admitApplicant(applicationId);
  }

  const handleReject = async function(formData: FormData) {
    "use server"
    const applicationId = formData.get('application_id') as string;
    await rejectApplicant(applicationId);
  }

  await autheticateAdmin();
 
  const applications = await fetchAdminApplications();
  
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
                          First Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Last Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                 {applications.map((application, index) => (
                      <tr key={index} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                            {application.school}
                        </th>
                        <td className="px-6 py-4">
                            {application.department}
                        </td>
                        <td className="px-6 py-4">
                            {application.first_name}
                        </td>
                        <td className="px-6 py-4">
                            {application.last_name}
                        </td>
                        <td className="px-6 py-4">
                            {application.email_address}
                        </td>
                        <td className="px-6 py-4">
                            {application.status}
                        </td>
                        <td className="px-6 py-4">
                            {
                              application.status == 'Submitted' ? (
                                <div className='flex'>
                                  <form action={handleAdmit}>
                                    <input className="hidden" name='application_id' value={application.application_id} readOnly />
                                    <button className="text-teal-500 m-1" type="submit">Admit</button>
                                  </form>
                                  <form action={handleReject}>
                                    <input className="hidden" name='application_id' value={application.application_id} readOnly />
                                    <button className="text-red-400 m-1" type="submit">Reject</button>
                                  </form>
                                </div>
                              ) : ''
                            }
                        </td>
                    </tr>
                 ))}  
              </tbody>
          </table>
      </div>
    </main>
  )
}
