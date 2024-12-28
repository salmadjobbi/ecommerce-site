const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assurez-vous que vous avez importé l'instance sequelize
const User = require('./user'); // Importer correctement le modèle User

// Modèle pour les commandes
const Order = sequelize.define('Order', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'En attente'
  },
}, {
  timestamps: true, // Gère createdAt et updatedAt automatiquement
});

// Clé étrangère qui relie chaque commande à un utilisateur
Order.belongsTo(User, {
  foreignKey: 'userId',  // Le champ de référence dans la table Order
  onDelete: 'CASCADE'    // Supprime les commandes quand un utilisateur est supprimé
});

module.exports = Order;
