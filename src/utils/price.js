export const formatIDR = (amount) => {
    if (amount === null || amount === undefined) return '0';
    
    return  "IDR " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};