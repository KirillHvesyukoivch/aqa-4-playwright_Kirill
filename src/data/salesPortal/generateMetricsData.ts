import { IMetrics} from "data/types/home.types";
import { faker } from "@faker-js/faker";

export function generateMetrickData(params?: Partial<IMetrics>): IMetrics{
    return {
        orders: {
            totalRevenue: faker.number.int({ min: 0, max: 999 }),
            totalOrders: faker.number.int({ min: 0, max: 99 }),
            averageOrderValue: faker.number.int({ min: 0, max: 99 }),
            totalCanceledOrders: faker.number.int({ min: 0, max: 99 }),
            recentOrders:[],        
            ordersCountPerDay:[],
        },
        customers: {
            totalNewCustomers: faker.number.int({ min: 0, max: 10 }),
            topCustomers:[],
            customerGrowth:[],
        },            
        products: {
            topProducts:[],       
        },
    }
}
