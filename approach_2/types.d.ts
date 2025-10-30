export interface CustomerInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
}
export interface RebateSDKConfig {
    containerId: string;
    primaryColor?: string;
    secondaryColor?: string;
    iconUrl?: string;
    iconUrls?: string[];
    customer?: CustomerInfo;
    companyName?: string;
}
export interface CardDetails {
    cardholderName: string;
    cardNumber: string;
    cvv?: string;
    expiry?: string;
}
