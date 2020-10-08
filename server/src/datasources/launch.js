const { RESTDataSource } = require('apollo-datasource-rest');
const connect = require('./../mongodb/mongodb.connect');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async getAllLaunches() {
        const client = await connect();
        const db = client.db('merch');
        const collection = db.collection('launch');
        const launches = await collection.find({}).toArray();

        return Array.isArray(launches) 
            ? launches.map(launch => this.launchReducer(launch))
            : [];
    }

    async getLaunchById({ launchId }) {
        const client = await connect();
        const db = client.db('merch');
        const collection = db.collection('launch');
        const response = await collection.findOne({
            flight_number: launchId
        });

        return this.launchReducer(response[0]);
    }

    getLaunchesByIds({ launchIds }) {
        return Promise.all(
          launchIds.map(launchId => this.getLaunchById({ launchId })),
        );
      }

    launchReducer(launch) {
        return {
          id: launch.flight_number || 0,
          cursor: `${launch.launch_date_unix}`,
          site: launch.launch_site && launch.launch_site.site_name,
          mission: {
            name: launch.mission_name,
            missionPatchSmall: launch.links.mission_patch_small,
            missionPatchLarge: launch.links.mission_patch,
          },
          rocket: {
            id: launch.rocket.rocket_id,
            name: launch.rocket.rocket_name,
            type: launch.rocket.rocket_type,
          },
        };
      }

}

module.exports = LaunchAPI


/* as variant  with async initialization 
class MyClass {
  constructor() {
     //static initialization
  }

  async initialize() {
     await WhatEverYouWant();
  }

  static async create() {
     const o = new MyClass();
     await o.initialize();
     return o;
  }
}


Then in your code create your object like this:

const obj = await MyClass.create();

*/