<script lang="ts">
  // Import SvelteKit's form prop helper
  import { enhance } from '$app/forms';

  // This prop receives data returned from the +server.js POST action
  export let form

  // State variables for input values
  let usernameOrEmail = '';
  let password = '';
</script>

<!-- Use the Tailwind CSS structure from the mock -->
<div class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login to Pixx</h2>

    <!--
      Use the 'action' attribute to post to the same route's +server.js
      Use the 'enhance' action for client-side form enhancement (optional but nice)
      Method defaults to POST when using form action
    -->
    <form method="POST" use:enhance>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="usernameOrEmail">
          Username or Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="usernameOrEmail"
          name="usernameOrEmail"
          type="text"
          placeholder="Enter your username or email"
          bind:value={usernameOrEmail}
          required
        >
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="********"
          bind:value={password}
          required
        >
        <!-- Display error message from server if present -->
        {#if form?.error}
          <p class="text-red-500 text-xs italic mt-1">{form.error}</p>
        {/if}
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>

    <div class="text-center mt-4 text-sm">
      <p class="text-gray-600">Don't have an account?</p>
      <a class="text-blue-500 hover:underline" href="/register"> <!-- Use SvelteKit path -->
        Sign Up
      </a>
    </div>
  </div>
</div>