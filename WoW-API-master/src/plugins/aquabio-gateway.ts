import {CorePlugin} from "./core-plugin";
import {randomFloat} from "../utils/plugins-utils";
import { CoapPlugin } from "./coap-plugin";

export class AquabioGateway extends CorePlugin{

    constructor (token: string, params: object){
        super(token, params);
    }

    connectHardware() {
        throw Error (' Not implemented yet');
    }

    observedActions() {
        throw Error (' Not implemented yet');
    }

    simulate() {
        this.interval = setInterval(async () => {
            if (this.localParams['propName'] === "ecoli"){
                this.updatingMeasurement(randomFloat(0,1), "ecoli");
            }else {
                this.updatingMeasurement(randomFloat(0,1), "enterococci");
            }
            this.updatingMeasurement(randomFloat(0,4), "turbidity");
            this.updatingMeasurement(randomFloat(0,44), "temperatureReactor");
            this.updatingMeasurement(randomFloat(0,44), "temperatureCoil");
            this.updatingMeasurement(randomFloat(0,12), "fluorescence");
            
        }, this.localParams['frequency']);
    }

    stop() {
        clearInterval(this.interval);
        this.logger.log(`${this.localParams['deviceId']} plugin stopped!`);
    }

}