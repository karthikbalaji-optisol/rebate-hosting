export interface CustomerInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
}
export interface RebateSDKConfig {
    containerId: string;
    primaryColor?: string;
    secondaryColor?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
    successColor?: string;
    successBgColor?: string;
    errorColor?: string;
    iconUrl?: string;
    iconUrls?: string[];
    customer?: CustomerInfo;
    companyName?: string;
}
export interface CardDetails {
    programId: string;
    accountNumber: string;
    partner_user_id: string;
    cardNumber: string;
    cardNumberMasked: string;
    firstName: string;
    lastName: string;
    exp_year: number;
    exp_month: number;
    available: number;
}
export type PayoutMethod = 'virtual_card' | 'bank_transfer' | 'request_check';
export interface BankAccount {
    bankName: string;
    accountType: 'checking' | 'savings';
    routingNumber: string;
    accountNumber: string;
    accountNumberMasked: string;
    routingNumberMasked: string;
}
export interface PayoutMethodOption {
    id: PayoutMethod;
    title: string;
    description: string;
    icon: string;
    enabled: boolean;
}
