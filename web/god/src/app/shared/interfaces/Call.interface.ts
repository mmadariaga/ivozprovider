export enum CallEventType {
    ANSWER = 'answer',
    HANGUP = 'hangup'
}

export enum CallDirection {
    OUTBOUND = 'outbound',
    INBOUND = 'intbound'
}

export interface CallInterface {
    Event: CallEventType;
    callid: string;
    time?: number;
    brand?: string;
    company?: string;
    direction?: string;
    caller?: string;
    callee?: string;
    type?: string;
    caller_country?: string;
    callee_country?: string;
    carrierId?: string;
}