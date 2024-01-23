document.addEventListener("DOMContentLoaded", async function () {
    // Create a Sequelize instance
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '',
        database: 'ecommerce',
    });

    // Define the CategoryList model
    const CategoryList = sequelize.define('CategoryList', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        }
    }, { tableName: 'categoryList' });

    try {
        // Fetch data from the server
        const categories = await CategoryList.findAll();
        
        // Populate the table with data
        const tableBody = document.getElementById('categoryTableBody');
        tableBody.innerHTML = ''; // Clear existing content

        categories.forEach(category => {
            const row = `<tr>
                <th scope="row">${category.id}</th>
                <td>${category.category}</td>
                <td>${category.quantity}</td>
                <td>${new Date(category.date).toLocaleDateString()}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
        
        console.log('All categories:', categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
});