const sqlite3 = require('sqlite3').verbose();

// Use a persistent database file instead of in-memory
const db = new sqlite3.Database('./members.db');

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Check if table exists first
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='members'", (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!row) {
          // Table doesn't exist, create it
          db.run(`
            CREATE TABLE members (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              age INTEGER NOT NULL,
              gender TEXT NOT NULL,
              address TEXT NOT NULL,
              phone_number TEXT NOT NULL UNIQUE,
              email_address TEXT NOT NULL UNIQUE,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              reject(err);
            } else {
              // Insert initial sample data
              const sampleMembers = [
                ['John Doe', 25, 'Male', '123 Main St, City', '555-0123', 'john.doe@email.com'],
                ['Jane Smith', 30, 'Female', '456 Oak Ave, Town', '555-0456', 'jane.smith@email.com'],
                ['Mike Johnson', 28, 'Male', '789 Pine Rd, Village', '555-0789', 'mike.johnson@email.com']
              ];
              
              const stmt = db.prepare(`INSERT INTO members 
                (name, age, gender, address, phone_number, email_address) 
                VALUES (?, ?, ?, ?, ?, ?)`);
              
              sampleMembers.forEach(member => {
                stmt.run(member);
              });
              
              stmt.finalize();
              console.log('Database initialized with sample data');
              resolve();
            }
          });
        } else {
          // Table exists, just resolve
          console.log('Database already exists');
          resolve();
        }
      });
    });
  });
}

function addMember(member) {
  return new Promise((resolve, reject) => {
    const { name, age, gender, address, phone_number, email_address } = member;
    
    db.run(
      `INSERT INTO members 
      (name, age, gender, address, phone_number, email_address) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age, gender, address, phone_number, email_address],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

function getAllMembers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM members`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function updateMember(id, member) {
  return new Promise((resolve, reject) => {
    const { name, age, gender, address, phone_number, email_address } = member;
    
    db.run(
      `UPDATE members 
      SET name = ?, age = ?, gender = ?, address = ?, 
      phone_number = ?, email_address = ? 
      WHERE id = ?`,
      [name, age, gender, address, phone_number, email_address, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function deleteMember(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM members WHERE id = ?`, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  initializeDatabase,
  addMember,
  getAllMembers,
  updateMember,
  deleteMember
};