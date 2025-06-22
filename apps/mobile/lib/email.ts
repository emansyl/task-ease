/**
 * Email utility functions for TaskEase mobile app
 */

/**
 * Get the appropriate email domain based on environment
 */
export function getForwardingEmailDomain(): string {
  return __DEV__ ? "inbox.dev.usetaskease.com" : "inbox.usetaskease.com";
}

/**
 * Format a complete forwarding email address from a username
 * @param username - The username portion (stored in database)
 * @returns Complete email address with appropriate domain
 */
export function formatForwardingEmail(username: string): string {
  if (!username) {
    return "";
  }
  return `${username}@${getForwardingEmailDomain()}`;
}

/**
 * Extract username from a complete forwarding email address
 * @param email - Complete email address
 * @returns Username portion only
 */
export function extractUsernameFromEmail(email: string): string {
  if (!email) {
    return "";
  }
  return email.split("@")[0];
}

/**
 * Check if an email address is a valid TaskEase forwarding address
 * @param email - Email address to validate
 * @returns True if it's a valid TaskEase forwarding address
 */
export function isTaskEaseForwardingEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  const domain = email.split("@")[1];
  return domain === "inbox.usetaskease.com" || domain === "inbox.dev.usetaskease.com";
}