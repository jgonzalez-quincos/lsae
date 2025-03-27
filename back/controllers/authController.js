const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM lae_user WHERE user_email = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO lae_user (id_cargo, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
            [role, username, passwordHash]
        );

        // Generate a JWT
        const payload = {
            user: {
                id: newUser.rows[0].id,
                role: newUser.rows[0].role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        
        const user = await pool.query('SELECT * FROM lae_user WHERE user_email = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid user name'+username });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials password'+user_password });
        }

        // Generate a JWT
        const payload = {
            user: {
                id: user.rows[0].id,
                role: user.rows[0].role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Export the functions
module.exports = { registerUser, loginUser };

