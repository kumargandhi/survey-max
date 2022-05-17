/**
 * Utility function to check logged in user permission with roles
 */
export function hasPermission(permission, currentRoles: string[]): boolean {
    for (let j = 0; j < currentRoles.length; j++) {
        if (permission === currentRoles[j]) {
            return true;
        }
    }
    return false;
}
