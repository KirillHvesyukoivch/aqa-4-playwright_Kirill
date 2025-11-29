import { IResponseFields } from "./core.types";


export interface IMetricsResponse extends IResponseFields {
    Metrics:IMetrics

}
export interface IMetrics{
        orders: {
            totalRevenue: number;
            totalOrders: number;
            averageOrderValue: number;
            totalCanceledOrders: number;
            recentOrders: Array<{}>;        
            ordersCountPerDay: Array<{}>;  
        };
        customers: {
            totalNewCustomers: number;
            topCustomers: Array<{}>;
            customerGrowth: Array<{}>;
        };              
        products: {
            topProducts: Array<{}>;       
        };
 }