import {Logger} from "@nestjs/common";
import {randomInt} from "../utils/plugins-utils";
import * as coap from 'coap';
import {BufferListStream} from 'bl'
import {CorePlugin} from "./core-plugin";

export class CoapPlugin extends CorePlugin{
    protected logger = new Logger(CoapPlugin.name);

    constructor(token: string, params: object){
        super(token, params);
    }

    stop (){
        clearInterval(this.interval);
        this.logger.log(`${this.localParams['deviceId']} plugin stopped!`);
    }

    simulate() {
        this.interval = setInterval(async () => {
            if (this.localParams['paramName'] instanceof Array){
                this.localParams['paramName'].forEach(prop => {
                    this.updatingMeasurement(randomInt(0,1000), prop);
                });
            }else {
                this.updatingMeasurement(randomInt(0,1000), this.localParams['paramName'] );
            }

        }, this.localParams["frequency"]);
    }

    connectHardware() {
        const sensor = {
            read: () => {
                this.logger.log(this.model.links[0].href+'/')
                coap.request({
                    proxyUri: this.model.links[0].href+'/',
                    pathname: '/'+this.localParams["propName"],
                    options: {'Accept': 'application/json'}
                })
                    .on ('response', (res) => {
                        this.logger.log(`COAP response code ${res.code}`);
                        if(res.code !== '2.05'){
                            this.logger.error(`Error while contacting CoAP service: ${res.code}`);
                        }
                        res.pipe(BufferListStream((err,data)=> {
                            const json = JSON.parse(data);
                            if (this.localParams['propName'] instanceof Array){
                                this.localParams['propName'].forEach(prop => {
                                    this.updatingMeasurement(json[this.localParams["propName"]], prop);
                                });
                            }else {
                                this.updatingMeasurement(json[this.localParams["propName"]], this.localParams['propName'] );
                            }
                        }));
                    }).end();
            }
        };

        this.interval = setInterval( () => {
            sensor.read();
        }, this.localParams["frequency"]);
    }

    observedActions() {
        throw new Error("Method not implemented.");
    }
}
