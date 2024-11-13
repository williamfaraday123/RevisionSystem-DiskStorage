const sqlite3 = require('sqlite3').verbose();

class Database {

    //singleton design pattern
    constructor(dbFilePath) {
        if (!Database.instance) {
            this.db = new sqlite3.Database(dbFilePath, (error) => {
                if (error) {
                    console.error('Could not connect to database', error);
                } else {
                    console.log('Connected to database');
                }
            });
            this._initialize();
            Database.instance = this;
        }
        return Database.instance;
    }

    _initialize() {
        //db.serialize() is used to ensure table creation commands run sequentially
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS sortFilterOptions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    filter VARCHAR(20) NOT NULL,
                    option VARCHAR(20) NOT NULL,
                    UNIQUE (filter, option)
                )
            `);
        });
    }

    //insert or update
    run(query, params = []) {
        //serialize is not used so that individual database operations can run concurrently, improving performance.
        return new Promise((resolve, reject) => {
            this.db.run(query, params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    //retrieve single row
    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    //retrieve multiple rows
    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    //run multiple run / get / all operations in sequence
    serialize(callback) {
        this.db.serialize(callback);
    }
}

//Ensure only one immutable instance exists
const instance = new Database('./database/database.db');
Object.freeze(instance);

module.exports = instance;