/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// user.interface.ts
export interface User {
   
    email: string;
    password: string;
    accessToken: string;
    auth: any;
    /**
     * User's full name
     */
    displayName: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata:{
        createdAt: string; 
        lastLoginAt: string;
        lastSignInTime: string;
        creationTime: string;
    }
    phoneNumber: string;
    photoURL: string;
     /**
     * Unique identifier for the user
     */
    uid: string;
}
export interface Account {
    name: string 
    number: string
}
export interface AdminsDetails{
    creator: any
    details: {
        photo: string; 
        role: string; 
        email: string;
        displayName: string; 
        pin: string;
        phone: string;
        owner: boolean;
        tempName?: string;
    }
    id: number
    owner: boolean
    roles: {
        addStock: boolean
        countStock: boolean
        manageAdmins: boolean
        manageItems: boolean
        readReports: boolean
        sale: boolean
        supervisor: boolean
        receivePayments: boolean
        manageUsers: boolean
    }
    cropper?:boolean
    tempName?: string
    isUploading?: boolean
    pin?: string
    tempPin?: string | null
    tempPinTime?: number | null
}
export interface Plan {
    billingPeriod: string
    color: string
    details: Array<string>
    monthlyCost: number
    name: string
    value: number
    yearlyCost: number
}
export interface StoreAdmin {
    accounts: Array<Account>
    admins: Array<string>
    adminsDetails: Array<AdminsDetails>
    allowCash: boolean
    allowCredit: boolean
    expenseCategories: Array<string>
    id: string
    kra:string 
    name: string
    planDetails: {
        created: number
        expiring: number
        plan: Plan
        stkCallback: any
        lastReminder: number
    }
    lastDataCleaned: number
    planExpired: boolean
    negotiatePrice?:boolean
    storeOpens?: string
    storeCloses?: string
    tempName?: string
    tempEmail?: string
    allowTotalDiscount?: boolean
    mustPrintCaptainOrder?: boolean
}
export class Folder{
    name: string
    subFolders: Array<Folder>
    constructor(name: string){
        this.name = name;
        this.subFolders = []
    }
}
export interface Store {
    id: string
    contacts: { 
        website: string | null 
        email: string | null 
        phone: string | null
        position?: {
            longitude: number,
            latitude: number,
            accuracy?: number
        }
        postalOffice?: string | null
    }
    folders : Array<Folder>
    logo: {
        small: string
        big: string
    }
    name: string
    planValue: number
    userName: string
    color: "pwejar" | "pwejar-love" | "pwejar-gold"
    featuredItems?: Array<string>
    mpesaQRCodeActive?: boolean
    tempPhone?: string
    weeklySet?: any
    receiptFooter?:string
}
export interface StoreAllData extends Store , StoreAdmin {

}
export interface InputFix {
    value: string | number | null
    eye?: boolean
    eyeActive?: boolean
}
export interface LocalDevice {
    isVirtual : boolean
    manufacturer : string
    model : string
    operatingSystem : string
    osVersion : string
    platform : string
    webViewVersion : string
    id?: string
    signedInUserEmail?: string
}
export class ItemPhoto {
    uploaded: boolean = false
    fakeID: number
    original?: string 
    compressed?: string
    thumbnail?: string
    constructor(thumbnail?:string){
        this.fakeID = new Date().getTime()
        if(thumbnail)this.thumbnail = thumbnail
    }
}
export class Item {
    id?: string;
    photos: ItemPhoto[] = [];
    name: string = '';
    folder: string;
    storeID: string;
    brand: string = '';
    barcode: string = '';
    description: string = '';
    descriptionHTML: string = '';
    trackStock: boolean = true;
    type: string = 'track stock';
    active: boolean = true;
    priceVary: boolean = false;
    public: boolean = true;
    sales?: any[] = [];
    stocks?: StockMini[] = [];
    device: LocalDevice;
    markedPrice?: number;
    maximumDiscount?: number;
    markedPriceFrom?: number;
    markedPriceTo?: number;
    split?:boolean = false;
    splitIntoType?: string;
    splitInto?: number;
    childMarkedPrice?: number;
    childMaximumDiscount?: number;
    childMarkedPriceFrom?: number;
    childMarkedPriceTo?: number;
    currentStock?: number;
    openBills?: number;
    totalSold?: number;
    readableFolderName?: string;
    marks?: number
    stockAlertOn?:boolean = false;
    stockAlertLimit?: number;
    stockColor?: string;
    itemsTransactions?: any[];
    sellingPrice?: number ;
    unique?: boolean;
    cOPrinted?: boolean;
    printCO?: boolean;
    functionFromCart?: boolean;
    orderQuantity?: number;
    orderTime?: number;
    subItem?: boolean;
    mamaItem?: string;
    comment?: string;
    linkedItems?: LinkedItem[]
    linkedOptions?: LinkedOption[]
    buyingPrice?: number
    startingStock?: number
    stockIDs?: string[] = []
    log?: any[] = []
    creator: {
      by: string;
      time: number;
    };
    featured?:boolean
  
    constructor(folderPath: string, storeID: string, adminEmail: string, device: LocalDevice ) {
      this.folder = folderPath;
      this.storeID = storeID;
      this.device = device;
      this.creator = {
        by: adminEmail,
        time: new Date().getTime()
      };
    }
}
export class LinkedOption{
    options: LinkedItem[] = []
    name: string = ''
    selected?: LinkedItem
}
export interface LinkedItem{
    itemID: string
    quantity: number
    name: string
}

export interface StockMini {
    quantity: number
    sellByDate?: number | null
    buyingPrice: number 
    adjustStock?: boolean
    time: number
    stockID?: string
}
export class Stock {
    quantity: number
    sellByDate?: number
    buyingPrice: number
    itemID: string
    storeID: string
    adminEmail: string
    adjustStock?: boolean
    time: number
    stockID?: string
    supplier?: {
        name: null,
        phone: null
    }
    constructor(quantity: number,itemID: string, storeID: string, adminEmail: string, buyingPrice?:number ){
        this.quantity = quantity
        this.itemID = itemID
        this.storeID = storeID
        buyingPrice?this.buyingPrice=buyingPrice:this.buyingPrice = 0
        this.adminEmail = adminEmail
        this.supplier = {
            name: null,
            phone: null
        }
        this.time = new Date().getTime()
    }
}
export class Bill {
    cart: Array<any> = []
    id?: string
    invoiceNumber: string
    created: {
        time: number
        by: string
        name: string
    }
    trash: any[] = []
    active: boolean =  true
    storeID: string
    payments: Payment[] = []
    accounts: any[] = []
    debits: any[] = []
    tableOwner: string
    tableOwnerName: string
    clientName?: string
    tableNo?: string
    isCombined?: boolean
    logs: any[] = []
    marks?: number
    closingTime?: number
    combinedBills?: Bill[]
    clientInfo?: ClientInfo
    combine?: boolean
    processPayments: boolean = false
    showScrollTopButton?: boolean
    mpesaQr?: MpesaQR
    constructor( admin: AdminsDetails, storeID: string){
        this.invoiceNumber = this.numberToLetters(admin.id) + this.numberToLetters(Math.round(new Date().getTime()/1000));
        this.storeID = storeID
        this.created = {
            time: new Date().getTime(),
            by: admin.details.email,
            name: admin.details.displayName
        }
        this.tableOwner = admin.details.email
        this.tableOwnerName = admin.details.displayName
    }
    numberToLetters(num: any) {
        let letters = '';
        while (num >= 0) {
            letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[num % 36] + letters;
            num = Math.floor(num / 36) - 1;
        }
        return letters;
    }
}
export interface Payment {
    name: string
    number: string
    amount: number
    transactionID?: string
    wiredID?: string
    time: number
    admin: {
        name: string
        email: string
    }
}
export interface Pesa {
    storeID: string
    bankID: string
    used: boolean
    reqHost: string | null
    TransAmount: string
    TransTime: string;
    TransID: string;
    BusinessShortCode: string
    BillRefNumber: string
    FirstName: string
    InvoiceNumber: string
    MSISDN: string
    ThirdPartyTransID : string
    TransactionType: string
}
export interface MpesaQR {
    qrBody?: string
    plainQR?: string
    decodedText?: string
    total?: number
    state: 'pending' | 'complete'
}
export interface ClientInfo {
    id: string
    name: string
    phone: string
}
export interface FilterSettings {
    key: string
    desc: boolean
}
export class Expense {
    date: number | undefined
    amount: number | undefined
    category: string | undefined
    description: string | undefined
    storeID: string
    adminEmail: string
    otherCategory: boolean | undefined
    paymentMethod: string | undefined
    created: number
    otherPaymentMethod: string | undefined
    image: ItemPhoto | undefined
    cropper?: boolean
    constructor( storeID: string, adminEmail: string ){
        this.storeID = storeID
        this.adminEmail = adminEmail
        this.created = new Date().getTime()
    }
}