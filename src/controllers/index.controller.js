const { Pool } = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'Ta123',
    database: 'firstapi', 
    port: '5432'
};

const pool = new Pool(config);

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUsers = async (req, res) => {
    const { name, email } = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const {name, email } = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    res.json('User Updated successfully');
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json(`User ${id} delete successfully`);
};


module.exports = {
    getUsers,
    getUserById,
    createUsers,
    updateUser,
    deleteUser
}