import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from "../utils/xcallAbi";

console.log(ethers);
const CONTRACT = '0x694C1f5Fb4b81e730428490a1cE3dE6e32428637';
const PROVIDER = "https://sepolia.infura.io/v3/ffbf8ebe228f4758ae82e175640275e0";

const ContractEventListener = () => {
    const [eventData, setEventData] = useState([""]);


    useEffect(() => {
      function getAllEvents(contract) {
        contract.on("CallMessage", (...params) => {
          setEventData(state => {
            let newState = [...state];
            newState.push(JSON.stringify(params));
            return newState;
          })
        })
      }
      const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
      const contractAddress = CONTRACT;
      const contractABI = [...abi];

      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      getAllEvents(contract);
      return () => {
        contract.removeAllListeners(); // Clean up listeners when component unmounts
      };
    },[]);

    return (
    <div>
      <h1>Contract Event Listener</h1>
        <ul>
          {eventData.map((event, index) => (
          <li key={index}>{index} - {JSON.stringify(event)}</li>
          ))}
        </ul>
    </div>
  );
};

export default ContractEventListener;
