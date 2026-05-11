# Firebase Security Specification - CampusConnect

## 1. Data Invariants
- A student user can only create their own profile.
- A student user can only manage their own attendance records.
- Notices and Events are globally readable by authenticated users but only writable by users with the `admin` role.
- Role escalation is prevented by forcing `role: 'student'` on profile creation and making the `role` field immutable for non-admins.
- Attendance records must belong to a valid user document.

## 2. The "Dirty Dozen" Payloads (Denial Tests)
| # | Payload Description | Collection | Operation | Expected Result |
|---|---------------------|------------|-----------|-----------------|
| 1 | Create user with `role: 'admin'` | /users | create | PERMISSION_DENIED |
| 2 | Update another user's profile | /users | update | PERMISSION_DENIED |
| 3 | Inject shadow field `isVerified` | /users | update | PERMISSION_DENIED |
| 4 | List all users as a student | /users | list | PERMISSION_DENIED |
| 5 | Create notice as a student | /notices | create | PERMISSION_DENIED |
| 6 | Delete a notice as a student | /notices | delete | PERMISSION_DENIED |
| 7 | Create event with massive >128KB payload | /events | create | PERMISSION_DENIED |
| 8 | Update attendance for another user | /users/U1/attendance | update | PERMISSION_DENIED |
| 9 | Set attendance `presentCount` to string | /users/U1/attendance | create | PERMISSION_DENIED |
| 10| Modify `authorId` of a notice | /notices | update | PERMISSION_DENIED |
| 11| Create notice with junk ID characters | /notices | create | PERMISSION_DENIED (isValidId) |
| 12| Access system-only metadata fields | /users | update | PERMISSION_DENIED (hasOnly) |

## 3. Conflict Report & Mitigation
- **Identity Spoofing**: Mitigated by `isOwner(userId)` check on all user-specific paths.
- **State Shortcutting**: Not applicable as there's no linear state machine yet, but `hasOnly` protects field integrity.
- **Resource Poisoning**: `isValidId()` and size checks on strings protect against junk data injection.
- **PII Leakage**: All user documents are private (`isOwner(userId)`) except for basic profile retrieval by authenticated users.
