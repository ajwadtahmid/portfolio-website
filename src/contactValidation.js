export const MIN_MESSAGE = 10;

// Returns { name?, email?, msg? } error messages; empty object means valid.
export function validate({ name, email, msg }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "That doesn't look like an email address. Check for typos.";
  if (msg.trim().length < MIN_MESSAGE)
    errors.msg = `Please write a short message (at least ${MIN_MESSAGE} characters).`;
  return errors;
}
