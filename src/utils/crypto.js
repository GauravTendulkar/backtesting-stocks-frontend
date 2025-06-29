import crypto from 'crypto';

// Generate these once and store in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const IV = process.env.IV; // Must be 16 bytes

export function encryptEmail(email) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(IV, 'hex')
  );
  
  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
}

// Example usage:
// const encryptedEmail = encryptEmail('user@example.com');