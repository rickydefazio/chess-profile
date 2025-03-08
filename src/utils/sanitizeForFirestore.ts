/**
 * Sanitizes an object for Firestore by converting all undefined values to null
 * Firestore doesn't accept undefined values, but it does accept null values
 *
 * @param obj The object to sanitize
 * @returns A new object with all undefined values removed or converted to null
 */
export default function sanitizeForFirestore<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForFirestore) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value === undefined ? null : sanitizeForFirestore(value);
      return acc;
    }, {} as any) as T;
  }
  return obj;
}
