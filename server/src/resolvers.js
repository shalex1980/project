module.exports = {
    Query: {
        launches: (_, __, { dataSources }) => {
            //console.log(dataSources.launchAPI)
            return dataSources.launchAPI.getAllLaunches()
        },
        launch: (_, { id }, { dataSources }) => dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => (
            {
                id: 2,
                email: 'shema@gmail.com',
                trips: []
            }
        )
    }
}