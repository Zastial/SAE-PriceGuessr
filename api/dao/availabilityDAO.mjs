'use strict'
import ikea from 'ikea-availability-checker'
import { HttpsProxyAgent } from 'hpagent'
import Availability from '../model/Availability.mjs'

const agent = new HttpsProxyAgent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
    proxy: process.env.https_proxy
})

const ikeaOptions = {
    proxy: false, 
    httpsAgent: agent
}

export const availabilityDAO = {
    findById: async (id) => {
        try {
            const stores = ikea.stores.findByCountryCode("fr");
            const objs = await ikea.availabilities(stores, [id], ikeaOptions);

            const availabilities = objs.map(obj=>{
                return new Availability({
                    buCode: obj.buCode,
                    stock: obj.stock,
                    name: obj.store.name,
                    longitude: obj.store.coordinates[0],
                    latitude: obj.store.coordinates[1]
                })
            })
            return availabilities
        } catch (e) {
            return Promise.reject(e)
        }
        
    }
}