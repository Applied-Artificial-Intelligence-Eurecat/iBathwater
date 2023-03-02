import {findThing, isoTimestamp} from "../utils/plugins-utils";
import {Logger, NotFoundException} from "@nestjs/common";
import axios from "axios";
import * as WebSocket from 'ws';
import {stringify} from "querystring";

export abstract class CorePlugin {
    protected logger = new Logger(CorePlugin.name);
    protected interval;
    protected token = '';
    protected localParams: object = {'simulate': false, 'frequency': 2000, 'deviceId': '', 'propName': ''};
    protected model;
    protected ws;

    constructor (token: string, params: object){
        if(params) this.localParams = params;
        this.token = token;
        this.ws = new WebSocket(`ws://${process.env.ROOT_URL.split('http://')[1]}`)
    }

    public async start(){
        this.model = await findThing(this.localParams['deviceId']);
        if(this.localParams['simulate']){
            this.simulate();
        }
        else {
            this.connectHardware();
        }

        this.logger.log(`[plugin started] ${this.localParams["deviceId"]}`);
    }

    protected async updatingMeasurement(value: any, paramName: string): Promise<void>{
        let measurement= {}
        measurement[paramName] = value
        measurement['timestamp'] = isoTimestamp();
        this.logger.log(`updating at ${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}/properties/${paramName}`)
        /*const response = await axios.put(`${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}/properties/${paramName}`,
            measurement,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ this.token
                }
            });
        if (response.status !== 200) throw new NotFoundException(`The Device measurement cannot be updated`);*/

        this.ws.send(JSON.stringify({
            event: "wow-data",
            data: {
                id:`${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}/properties/${paramName}`,
                measurement: measurement
            }
        }));
    }

    abstract connectHardware();
    abstract simulate();
    abstract observedActions();
    abstract stop();
}