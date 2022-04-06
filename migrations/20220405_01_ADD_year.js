const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: new Date().getFullYear()
        //max is current year
        // isNotGreaterThanCurrentYear(value) {
        //   if (value > )
        // }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}