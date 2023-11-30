// DataService.js
export default {
    storageKey: 'sharedData',

    setSharedData(data) {
        console.log('data local = ', data)
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    },

    getSharedData() {
        const storedData = localStorage.getItem(this.storageKey);
        return storedData ? JSON.parse(storedData) : null;
    },

    clearSharedData() {
        localStorage.removeItem(this.storageKey);
    }
};