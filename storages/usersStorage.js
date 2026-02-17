// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age: age || null, bio: bio || ""  };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { ...this.storage[id], ...updates };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
    // NEW: search helper
  searchUsers({ name, email }) {
    const allUsers = this.getUsers();
    return allUsers.filter(user => {
      let matches = true;
      if (name) {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        matches = matches && fullName.includes(name.toLowerCase());
      }
      if (email) {
        matches = matches && user.email.toLowerCase().includes(email.toLowerCase());
      }
      return matches;
    });
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();