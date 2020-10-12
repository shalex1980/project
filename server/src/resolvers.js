module.exports = {
    Query: {
        launches: (_, __, { dataSources, req }) =>{
            if(req) {
                console.log(' Req is here !!!!');
            }
            return dataSources.launchAPI.getAllLaunches()
        } ,
        launch: (_, { id }, { dataSources }) => dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => (
            {
                id: 2,
                email: 'shema@gmail.com',
                trips: []
            }
        )
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            console.log("EMAIL IN RESOLVERS ", email)
            const user = await dataSources.userAPI.findOrCreateUser({email});
            return user;
        }
    },
    Mission : {
        missionPatch: (mission, { size } = { size: 'LARGE'}) => {
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge
        }
    },
    Launch: {
        isBooked: async (launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id})
    },

}