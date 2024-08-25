const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async createUser(username, password, roleID) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO Users (Username, PasswordHash, RoleID) VALUES (?, ?, ?)', [username, hashedPassword, roleID]);
        return result.insertId;
    }

    static async getUser(userID) {
        const [rows] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
        return rows[0];
    }

    static async updateUser(userID, username, password, roleID) {
        let query = 'UPDATE Users SET ';
        const params = [];
        if (username) {
            query += 'Username = ?, ';
            params.push(username);
        }
        if (password) {
            query += 'PasswordHash = ?, ';
            params.push(await bcrypt.hash(password, 10));
        }
        if (roleID) {
            query += 'RoleID = ?, ';
            params.push(roleID);
        }
        query = query.slice(0, -2); // Remove trailing comma
        query += ' WHERE UserID = ?';
        params.push(userID);

        await db.query(query, params);
    }

    static async deleteUser(userID) {
        await db.query('DELETE FROM Users WHERE UserID = ?', [userID]);
    }

    static async authenticateUser(username, password) {
        const [rows] = await db.query('SELECT * FROM Users WHERE Username = ?', [username]);
        const user = rows[0];
        if (user && await bcrypt.compare(password, user.PasswordHash)) {
            return user;
        }
        throw new Error('Invalid credentials');
    }
}

module.exports = User;
