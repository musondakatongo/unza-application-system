'use server';

import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { APPLICANT_ID_COOKIE_KEY } from './constants';

export async function handleSignUp (formData: FormData) {
  'use server';
  const firstName = formData.get('first_name');
  const lastName = formData.get('last_name');
  const emailAddress = formData.get('email_address');
  const password = formData.get('password');
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await sql`
      INSERT INTO applicants (first_name, last_name, email_address, encrypted_password)
      VALUES (${firstName}, ${lastName}, ${emailAddress}, ${encryptedPassword});
    `;
    const applicant = result.rows[0];
    cookies().set(APPLICANT_ID_COOKIE_KEY, applicant.applicant_id);
    redirect('/applications');
  } catch (e) {
    console.log(e);
  }
}

export async function handleSignIn (formData: FormData) {
  const emailAddress = formData.get('email_address');
  const password = formData.get('password');
  let redirectPath = '/signup';
  try {
    const result = await sql`
      SELECT * FROM applicants
      WHERE email_address = ${emailAddress};
    `;
    if (result?.rows.length > 0) {
      const applicant = result.rows[0];
      const valid = await bcrypt.compare(password, applicant.encrypted_password);
      if (valid) {
        cookies().set(APPLICANT_ID_COOKIE_KEY, applicant.applicant_id);
        redirectPath = '/applications';
      }
    }
  } catch (e) {
    console.log(e);
  }
  redirect(redirectPath);
}

export async function handleSignOut() {
  cookies().delete(APPLICANT_ID_COOKIE_KEY);
  redirect('/signin');
}

export async function fetchSchools() {
  const { rows: schools } = await sql`
    SELECT * FROM schools;
  `;
  return schools;
}

export async function fetchDepartments(school) {
  const formattedSchool = school.split("-").join(" ");
  const { rows: departments } = await sql`
    SELECT departments.department_id, departments.name
    FROM departments, schools where LOWER(schools.name) = ${formattedSchool} AND schools.school_id = departments.school_id;
    `;
  return departments
}

export async function fetchApplications() {
  const applicantId = cookies().get(APPLICANT_ID_COOKIE_KEY)?.value;
  const { rows: applications } = await sql`
    SELECT schools.name as school, departments.name as department, applications.status
    FROM schools, departments, applications
    WHERE applications.applicant_id = ${applicantId} and applications.department_id = departments.department_id and schools.school_id = departments.school_id;
  `;
  return applications;
}

export async function submitApplication(departmentId) {
  const applicantId = cookies().get(APPLICANT_ID_COOKIE_KEY)?.value;
  await sql`
    INSERT INTO applications (applicant_id, department_id, status)
    VALUES (${applicantId}, ${departmentId}, 'Submitted');
  `;
  redirect('/applications');
}

export async function authenticate() {
  if (!cookies().get(APPLICANT_ID_COOKIE_KEY)) {
    redirect('/signin');
  }
}

