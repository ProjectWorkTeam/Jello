# Starter Lecture Notes

*I had very spotty internet during this*
Use the README
 -2nd README in frontend starter in React-App
    - npm install

Every time you make a change to your pipenv (install a new module) run the command `pipenv requirements > requirements.txt`, that will write to your requirements.txt, which we will need for deployment

## React App Notes

### Store (using Redux) - setup with Session

- We must add other slices of state
- Optional Modals provided to use

## Backend Notes

- Use Group_Project_Resources
- if we redo migration and reset .db => env.py imports and lines of code need to be copied in again. Mod6 Repo/Group Project Resources has the code if we don't save it.
- In new migrations we need to add a line to set the migration file.

### Flask App Folder

- Flask Invocation
- CurrentUser will be saved based on starter code.
- Seed Commands already set up for us? seed_commands
- CORS is already set up for us, if we have any errors related to that it's coming form seomthing using CORS, not CORS itself. "/api/users" vs "api/users/"
- /api/docs preset route given that will provide documentation for all of our routes.Can be thrown in a dictionary formatter to clean

### .db

- Every time we seed we need to unseed first (in production, not sure 100% why, is this only for reseeding? or is this for addin any seeders at all?)
- Something about Join tables and housing undo inside one of the joined tables, not in it's own file
- foreign key helper is in models/db.py
- every class based model, we need if envirnment == "Production"
- render-deployment-debugging has notes for most db stuff

### forms

- form init.py already made for us along with login form and signup form
- use built-in email validator in WTFforms (requires an additional import)
- avoid routes sharing the same url (even if there are additional validators)
- only 1 use of the user authentication per route run, so don't use it twice per route
