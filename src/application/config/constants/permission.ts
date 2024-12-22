export const PERMISSION_CODES = {
  LEADS_READ: 'leads:read',
  LEADS_WRITE: 'leads:write',
} as const;

export type PermissionCode =
  (typeof PERMISSION_CODES)[keyof typeof PERMISSION_CODES];
