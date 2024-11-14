const db = require('../database/database.js');

const modifyFilterOptions = async (req, res) => {
    try {
        const filterOption = req.body;
        console.log('received', filterOption); //check error
        const { filter, option, action } = filterOption;

        //validation for the request body to ensure it contains the necessary filter and option
        if (!filter || !option || !action) {
            return res.status(400).json({ error: 'Missing required fields: filter, option, action' });
        }

        switch (action) {
            case "insert":
                await db.run(`
                    INSERT INTO sortFilterOptions (filter, option)
                    SELECT ?, ?
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM sortFilterOptions
                        WHERE filter = ? AND option = ?
                    )
                `, [filter, option, filter, option]);
                res.status(200).json({ message: `successfully inserted new option "${option}" for filter "${filter}"` });
                break;
            case "delete":
                await db.run(`
                    DELETE FROM sortFilterOptions
                    WHERE filter = ? AND option = ?
                `, [filter, option]);
                res.status(200).json({ message: `successfully deleted option "${option}" for filter "${filter}"` });
                break;
            default:
                console.error('Invalid action');
                res.status(400).json({ error: 'Invalid action' });
        }
    } catch (err) {
        //Catch and specify errors in parsing and database operations separately.
        if (err instanceof SyntaxError && err.message.includes('JSON')) {
            console.error('Error parsing filterOption in modifyFilterOptions()', err);
            res.status(400).json({ error: 'Invalid JSON format in request body' });
        } else {
            console.error('Database error in modifyFilterOptions()', err);
            res.status(500).json({ error: err.message || 'Internal server error' });
        }
    }
};

const retrieveFilterOptions = async (req, res) => {
    try {
        const filters = req.query.filters;
        let filterOptions = [];

        //map each filter to a database query, run them in parallel using Promise.all()
        //await all database queries before sending a response to ensure that all options are retrieved.
        await Promise.all(filters.map(async (filter) => {
            //try catch block for error handling for each individual query to track issues with specific filters.
            try {
                const options = await db.all(`
                    SELECT option
                    FROM sortFilterOptions
                    WHERE filter = ?
                `, [filter]);
                const optionsValues = options.map(row => row.option); //map to get array of option values
                filterOptions = [ ...filterOptions, {
                    filter: filter,
                    options: optionsValues
                }];
            } catch (err) {
                console.error(`Error retrieving options for filter ${filter}`, err);
                filterOptions = [ ...filterOptions, {
                    filter: filter,
                    options: []
                }];
            }
        }));

        res.status(200).json(filterOptions);
    } catch (err) {
        console.error('Error fetching filter options from database', err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
};

module.exports = {
    modifyFilterOptions,
    retrieveFilterOptions
};