import { RebateSDKConfig } from './types';
export declare class RebateSDK {
    private cfg;
    private container;
    private rootEl;
    constructor(cfg: RebateSDKConfig);
    mount(): void;
    private buttonStyles;
    private onGetRebate;
    private fetchCardDetails;
    private renderCard;
    private cardStyles;
}
