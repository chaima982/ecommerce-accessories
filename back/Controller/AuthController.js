const User = require('../Model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const authUser = (req, res, next) => {
    const userType = req.user.type;

    if (userType === 1) {
        res.redirect("/homepage");
    } else if (userType === 2) {
        res.redirect("/dashboard");
    } else {
        res.status(403).json({ message: "Unauthorized access" });
    }
};

const register = async (req, res, next) => {
    const { Nom, Prenom, Email, MDP, CIN, NumTel, CodePostal, Ville, Pays, Address, Type } = req.body;

    try {
     
        const existingUser = await User.findOne({ Email: Email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashPass = await bcrypt.hash(MDP, 10);

    
        const user = new User({
            Nom,
            Prenom,
            Email,
            MDP: hashPass,
            CIN,
            NumTel,
            CodePostal,
            Ville,
            Pays,
            Address,
            Type,
        });

        await user.save();

     
        res.json({
            message: 'User added successfully!',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message,
        });
    }
};


const login = (req, res, next) => {
    var Email = req.body.Email
    var MDP = req.body.MDP

    User.findOne({ $or: [{ Email: Email }, { Email: Email }] })
        .then(user => {
            if (user) {
                bcrypt.compare(MDP, user.MDP, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ Nom: user.Nom }, 'AZQ,PI)0(', { expiresIn: '30s' })
                        let refreshtoken = jwt.sign({ Nom: user.Nom }, 'refreshtokensecret', { expiresIn: '48h' })
                        res.json({
                            message: 'login successful',
                            token,
                            refreshtoken
                        })
                    } else {
                        res.json({
                            message: 'Mot de pass doesnt match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'no user found'
                })
            }
        })
};


const update = (req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;

    User.findOneAndUpdate({ _id: userId }, updateData, { new: true, runValidators: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.json({
                    message: 'User not found',
                });
            }

            res.json({
                message: 'User updated successfully',
                user: updatedUser,
            });
        })
        .catch(error => {
            if (error.name === 'ValidationError') {
                res.status(422).json({
                    error: 'Validation error',
                    details: error.errors,
                });
            } else {
                res.status(500).json({
                    error: 'Error updating user',
                });
            }
        });
};

const deleteUser = (req, res, next) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.json({
                    message: 'User not found',
                });
            }

            res.json({
                message: 'User deleted successfully',
                user: deletedUser,
            });
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error deleting user',
            });
        });
};

const getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error fetching users',
            });
        });
};
const getbyidClients = (req, res, next) => {
    const userId = req.params.id;
    
   
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            
           
            User.find({ Type: 1 })
                .then(clients => {
                    res.json(clients);
                })
                .catch(error => {
                    res.status(500).json({
                        error: 'Error fetching clients',
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error fetching user by id',
            });
        });
};
const getbyidAdmin= (req, res, next) => {
    const userId = req.params.id;
    

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            
      
            User.find({ Type: 2 })
                .then(clients => {
                    res.json(admins);
                })
                .catch(error => {
                    res.status(500).json({
                        error: 'Error fetching Admins',
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error fetching user by id',
            });
        });
};


const getClients = (req, res, next) => {
    User.find({ Type: 1 })
        .then(clients => {
            res.json(clients);
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error fetching clients',
            });
        });
};

const getAdmins = (req, res, next) => {
    User.find({ Type: 2 })
        .then(admins => {
            res.json(admins);
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error fetching admins',
            });
        });
};


module.exports = {
    register, login,getbyidClients, update, deleteUser,getbyidAdmin, getAllUsers,getAdmins,getClients
}