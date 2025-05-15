// Use @sveltejs/kit for server-side utilities
import { fail, redirect } from '@sveltejs/kit';

// Import your backend authentication logic (you'll need to implement these)
import { loginUser } from '$lib/server/auth'; // Assume this function exists
//import { handleSuccessfulLogin } from '$lib/server/auth'; // Assume this handles session/cookie setting
export async function POST({request}) {
  const formData = await request.formData();
  const usernameOrEmail = formData.get('usernameOrEmail');
  const password = formData.get('password');

  // Basic server-side validation
  if (!usernameOrEmail || !password) {
    return fail(400, { error: 'Username/Email and password are required.' });
  }

  try {
    // Call your backend login logic
    // This function should return the user object on success
    // or throw specific errors (e.g., user not found, incorrect password)
    const user = await loginUser(usernameOrEmail, password);

    // If login is successful, handle session creation (e.g., set cookie)
    //await handleSuccessfulLogin(user, cookies); // Pass cookies object

    // Redirect the user to the dashboard or feed after successful login
    // The 303 status code is standard for redirect after POST
    throw redirect(303, '/'); // Redirect to home page (feed)

  } catch (error) {
    // Handle specific login errors from your backend function
    if (error.message === 'User not found' || error.message === 'Incorrect password') {
      return fail(401, { error: 'Invalid username or password.' });
    }

    // Handle any other unexpected errors
    console.error('Login error:', error);
    return fail(500, { error: 'An unexpected error occurred. Please try again.' });
  }
}

// You might want a GET handler if you need to check if the user is already logged in
// when they visit the login page.
// /** @type {import('./$types').RequestHandler} */
// export async function GET({ locals }) {
//   // 'locals' should contain the user if they are already logged in (set in hooks.server.js)
//   if (locals.user) {
//     throw redirect(303, '/'); // Redirect to home if already logged in
//   }
//   // Otherwise, just render the page (no return needed)
// }

