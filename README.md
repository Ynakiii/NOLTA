# NOLTA

NOLTA is a responsive tennis-court reservation prototype with shared admin and user experiences.

- `index.html` - admin Schedule page
- `courts.html` - admin court records and availability
- `activity.html` - admin reservation records
- `user-home.html` - user Home page
- `user.html` - visual Book a Court page
- `user-reservations.html` - user booking history and cancellation
- `user-profile.html` - demo account and switching
- `login.html` / `register.html` - prototype account screens
- `assets/js/storage.js` - shared localStorage data model and validation
- `assets/js/auth.js` - local demo accounts and active-user state

## Run locally

Open the project in Visual Studio Code and use Live Server, then open `login.html`. Choose `Admin Demo` or `Demo User`, or create another local demo user. The role switch in the header lets you move between the two interfaces.

The pages share courts, schedule rules, reservations, and demo accounts through `localStorage` in the same browser profile and origin. Admin changes appear in User Mode after navigation or refresh, and user reservations appear in the admin Schedule and Activity pages.

## Authentication and production deployment

The login and role switch are intentionally fake prototype authentication: there are no passwords, secure sessions, or server-side permissions. GitHub Pages can host the frontend files, but it cannot run a backend or database. Data is not shared automatically between devices or browsers. A production deployment needs a server API, database, HTTPS, server-side reservation validation, and real authentication.
