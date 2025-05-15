import { redirect } from "@sveltejs/kit";
import { sql } from "./db";
export async function loginUser(usernameOrEmail: string, password: string) {
    const results = await sql`
    select *
    from users
    where username = ${usernameOrEmail}
    or email = ${usernameOrEmail};
    `
    console.log(results)
}