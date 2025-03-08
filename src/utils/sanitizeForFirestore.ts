import { z } from 'zod';

/**
 * Sanitizes an object for Firestore by converting all undefined values to null
 * Firestore doesn't accept undefined values, but it does accept null values
 *
 * @param obj The object to sanitize
 * @returns A new object with all undefined values converted to null
 */
export default function sanitizeForFirestore<T>(obj: T): T {
  // Create a dynamic schema for the input
  const schema = z.any().transform(val => {
    return JSON.parse(JSON.stringify(val));
  });

  return schema.parse(obj);
}
