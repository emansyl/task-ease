import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY!, "hex");

if (key.length !== 32) {
  throw new Error("Encryption key must be 32 bytes (256 bits)");
}

export function encrypt(text: string): string {
  const iv = randomBytes(12); // Recommended length for GCM
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(hash: string): string {
  const [ivHex, authTagHex, encryptedHex] = hash.split(":");
  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error("Invalid encrypted string format.");
  }

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
