// Import the RESTDataSource base class from Apollo
const { RESTDataSource } = require("apollo-datasource-rest");

// Define a constant with Vitalik Buterin's Ethereum address
// This will be used to fetch the balance for his account
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Create an EtherDataSource class that extends RESTDataSource 
// to make calls to the Etherscan API
class EtherDataSource extends RESTDataSource {
  // Constructor sets the base URL for the Etherscan API
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }
  // Method to get the ETH balance for the defined Ethereum address
  async etherBalanceByAddress() {
    // Call the Etherscan API module=account&action=balance endpoint
    // Insert address and API key
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }
  // Method to get the total ETH supply
  async totalSupplyOfEther() {
    // Call the Etherscan API module=stats&action=ethsupply endpoint
    // Insert API key
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the latest Ethereum price
  async getLatestEthereumPrice() {
    // Call the Etherscan API module=stats&action=ethprice endpoint
    // Insert API key
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }
  // Method to get estimated block confirmation time
  async getBlockConfirmationTime() {
    //Get estimated block confirmation time
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Method to get transaction details by transaction hash
module.exports = EtherDataSource;
