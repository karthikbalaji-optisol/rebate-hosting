import { RebateSDKConfig } from './types';
export declare class RebateSDK {
    private cfg;
    private container;
    private rootEl;
    constructor(cfg: RebateSDKConfig);
    mount(): Promise<void>;
    private showTermsFlow;
    private showTermsAndConditions;
    private fetchAndRenderCard;
    private showLoadingBar;
    private hideLoadingBar;
    private fetchCardDetails;
    private maskCardNumber;
    private renderCard;
    private renderAddToWalletButton;
    private cardStyles;
}
