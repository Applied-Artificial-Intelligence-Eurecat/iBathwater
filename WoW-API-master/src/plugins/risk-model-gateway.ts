import {randomFloat, randomInt} from "../utils/plugins-utils";
import {CorePlugin} from "./core-plugin";
import axios from 'axios';

export class RiskModelGateway extends CorePlugin{

    constructor (token: string, params: object){
        super(token, params);
    }

    connectHardware() {

        const sensor = {
            read: async () => {
                var modelResult = (await axios.get((this.model.links[0]).href)).data;
                this.updatingMeasurement({
                    "P2_5": modelResult[modelResult.length -1]['P2_5'],
                    "P50": modelResult[modelResult.length -1]['P50'],
                    "P95": modelResult[modelResult.length -1]['P95'],
                    "P90": modelResult[modelResult.length -1]['P90'],
                    "P97_5": modelResult[modelResult.length -1]['P97_5']
                }, 'ecoliConcentration');

                this.updatingMeasurement(modelResult[modelResult.length -1]['prediction'], 'waterQuality');
            }
        };

        this.interval = setInterval( () => {
            sensor.read();
        }, this.localParams["frequency"]);
    }

    observedActions() {
        throw new Error (`There is not implemented yet.`);
    }

    simulate() {
        var items = ["excellent",
            "good",
            "sufficient",
            "poor"];
        this.interval = setInterval(async () => {
            this.updatingMeasurement({
                "P2_5": randomFloat(0.00,5.00),
                "P50": randomFloat(0.00,5.00),
                "P95": randomFloat(0.00,5.00),
                "P90": randomFloat(0.00,5.00),
                "P97_5": randomFloat(0.00,5.00)
            }, 'ecoliConcentration');

            this.updatingMeasurement(items[randomInt(0,3)], 'waterQuality');

        }, this.localParams["frequency"]);
    }

    stop() {
        clearInterval(this.interval);
        this.logger.log(`${this.localParams['deviceId']} plugin stopped!`);
    }

}