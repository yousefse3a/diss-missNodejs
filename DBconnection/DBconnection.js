import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('diss&miss', 'dissmiss', 'dissmiss', {
    host: '72.167.70.199',
    port: '3306',
    dialect: 'mysql',
});


const connectDB = () => {
    return sequelize.sync({ alter: true }).then((result) => {
        console.log('connection done ');

    }).catch((err) => {
        console.log(err)
        console.log('connection faill');
    })
}




export { sequelize, connectDB };