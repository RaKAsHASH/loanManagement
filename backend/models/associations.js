import User from './user.js'
import Loan from './loan.js'



User.hasOne(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });


export  {
    User,
    Loan,
}