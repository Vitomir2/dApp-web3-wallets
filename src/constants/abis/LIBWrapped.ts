export const LIB_WRAPPED_TOKEN = {
    "_format": "hh-sol-artifact-1",
    "contractName": "LIBWrapper",
    "sourceName": "contracts/LIBWrapper.sol",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "LogLIBUnwrapped",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "LogLIBWrapped",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "WLIBToken",
        "outputs": [
          {
            "internalType": "contract LIB",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "unwrap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "wrap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b5060405161001d9061005f565b604051809103906000f080158015610039573d6000803e3d6000fd5b50600080546001600160a01b0319166001600160a01b039290921691909117905561006c565b611e7d8061049a83390190565b61041f8061007b6000396000f3fe6080604052600436106100385760003560e01c806351c2c54f1461004f578063d46eb11914610047578063de0e9a3e1461007a57610047565b366100475761004561009a565b005b61004561009a565b34801561005b57600080fd5b50610064610162565b6040516100719190610360565b60405180910390f35b34801561008657600080fd5b5061004561009536600461030b565b610171565b600034116100c35760405162461bcd60e51b81526004016100ba90610374565b60405180910390fd5b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f19906100f59033903490600401610347565b600060405180830381600087803b15801561010f57600080fd5b505af1158015610123573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b83334604051610158929190610347565b60405180910390a1565b6000546001600160a01b031681565b600081116101915760405162461bcd60e51b81526004016100ba906103ab565b6000546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906101c590339030908690600401610323565b602060405180830381600087803b1580156101df57600080fd5b505af11580156101f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021791906102e4565b50600054604051630852cd8d60e31b81526001600160a01b03909116906342966c68906102489084906004016103e0565b600060405180830381600087803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156102a7573d6000803e3d6000fd5b507f434a87dd0568dfbbb4bc8b6b51b072be25ff126809317b293b9ed43aaa84fd0e33826040516102d9929190610347565b60405180910390a150565b6000602082840312156102f5578081fd5b81518015158114610304578182fd5b9392505050565b60006020828403121561031c578081fd5b5035919050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0391909116815260200190565b6020808252601e908201527f5765206e65656420746f2077726170206174206c656173742031207765690000604082015260600190565b6020808252818101527f5765206e65656420746f20756e77726170206174206c65617374203120776569604082015260600190565b9081526020019056fea26469706673582212201fccf6e65516dc072acc4c21b0798ea1718718312567d6c675a04548621ded5864736f6c6343000801003360806040523480156200001157600080fd5b50604080518082018252600c81526b2634b13930b93caa37b5b2b760a11b6020808301918252835180850190945260038452622624a160e91b90840152815191929183918391620000659160059162000295565b5080516200007b90600690602084019062000295565b50506007805460ff19169055506200009e60006200009862000104565b62000108565b620000cd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66200009862000104565b620000fc7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200009862000104565b505062000378565b3390565b62000114828262000118565b5050565b6200012f82826200015b60201b620008761760201c565b600082815260016020908152604090912062000156918390620008fb620001e5821b17901c565b505050565b62000167828262000205565b62000114576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001a162000104565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620001fc836001600160a01b0384166200022e565b90505b92915050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60006200023c83836200027d565b6200027457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620001ff565b506000620001ff565b60009081526001919091016020526040902054151590565b828054620002a3906200033b565b90600052602060002090601f016020900481019282620002c7576000855562000312565b82601f10620002e257805160ff191683800117855562000312565b8280016001018555821562000312579182015b8281111562000312578251825591602001919060010190620002f5565b506200032092915062000324565b5090565b5b8082111562000320576000815560010162000325565b6002810460018216806200035057607f821691505b602082108114156200037257634e487b7160e01b600052602260045260246000fd5b50919050565b611af580620003886000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d539139311610071578063d539139314610385578063d547741f1461038d578063dd62ed3e146103a0578063e63ab1e9146103b3576101c4565b8063a457c2d71461034c578063a9059cbb1461035f578063ca15c87314610372576101c4565b80639010d07c116100d35780639010d07c1461030957806391d148541461032957806395d89b411461033c578063a217fddf14610344576101c4565b806370a08231146102db57806379cc6790146102ee5780638456cb5914610301576101c4565b8063313ce567116101665780633f4ba83a116101405780633f4ba83a146102a557806340c10f19146102ad57806342966c68146102c05780635c975abb146102d3576101c4565b8063313ce5671461026a57806336568abe1461027f5780633950935114610292576101c4565b806318160ddd116101a257806318160ddd1461021a57806323b872dd1461022f578063248a9ca3146102425780632f2ff15d14610255576101c4565b806301ffc9a7146101c957806306fdde03146101f2578063095ea7b314610207575b600080fd5b6101dc6101d7366004611417565b6103bb565b6040516101e991906114c8565b60405180910390f35b6101fa6103e8565b6040516101e991906114dc565b6101dc610215366004611393565b61047a565b61022261049e565b6040516101e991906114d3565b6101dc61023d366004611358565b6104a4565b6102226102503660046113bc565b6104d2565b6102686102633660046113d4565b6104e7565b005b610272610510565b6040516101e991906119cf565b61026861028d3660046113d4565b610515565b6101dc6102a0366004611393565b610564565b6102686105b0565b6102686102bb366004611393565b610602565b6102686102ce3660046113bc565b610654565b6101dc610668565b6102226102e936600461130c565b610671565b6102686102fc366004611393565b61068c565b6102686106a8565b61031c6103173660046113f6565b6106f8565b6040516101e991906114b4565b6101dc6103373660046113d4565b610717565b6101fa610740565b61022261074f565b6101dc61035a366004611393565b610754565b6101dc61036d366004611393565b6107b5565b6102226103803660046113bc565b6107cd565b6102226107e4565b61026861039b3660046113d4565b610808565b6102226103ae366004611326565b610827565b610222610852565b60006001600160e01b03198216635a05180f60e01b14806103e057506103e082610910565b90505b919050565b6060600580546103f790611a6e565b80601f016020809104026020016040519081016040528092919081815260200182805461042390611a6e565b80156104705780601f1061044557610100808354040283529160200191610470565b820191906000526020600020905b81548152906001019060200180831161045357829003601f168201915b5050505050905090565b600080610485610935565b9050610492818585610939565b60019150505b92915050565b60045490565b6000806104af610935565b90506104bc8582856109ed565b6104c7858585610a37565b506001949350505050565b60009081526020819052604090206001015490565b6104f0826104d2565b610501816104fc610935565b610b5b565b61050b8383610bbf565b505050565b601290565b61051d610935565b6001600160a01b0316816001600160a01b0316146105565760405162461bcd60e51b815260040161054d906118ff565b60405180910390fd5b6105608282610be1565b5050565b60008061056f610935565b6001600160a01b0380821660009081526003602090815260408083209389168352929052205490915061049290829086906105ab9087906119dd565b610939565b6105dc7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610337610935565b6105f85760405162461bcd60e51b815260040161054d906115f7565b610600610c03565b565b61062e7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610337610935565b61064a5760405162461bcd60e51b815260040161054d9061173d565b6105608282610c71565b61066561065f610935565b82610d39565b50565b60075460ff1690565b6001600160a01b031660009081526002602052604090205490565b61069e82610698610935565b836109ed565b6105608282610d39565b6106d47f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610337610935565b6106f05760405162461bcd60e51b815260040161054d9061185d565b610600610e2a565b60008281526001602052604081206107109083610e85565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600680546103f790611a6e565b600081565b60008061075f610935565b6001600160a01b03808216600090815260036020908152604080832093891683529290522054909150838110156107a85760405162461bcd60e51b815260040161054d906118ba565b6104c78286868403610939565b6000806107c0610935565b9050610492818585610a37565b60008181526001602052604081206103e090610e91565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b610811826104d2565b61081d816104fc610935565b61050b8383610be1565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6108808282610717565b610560576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556108b7610935565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610710836001600160a01b038416610e9c565b60006001600160e01b03198216637965db0b60e01b14806103e057506103e082610ee6565b3390565b6001600160a01b03831661095f5760405162461bcd60e51b815260040161054d90611819565b6001600160a01b0382166109855760405162461bcd60e51b815260040161054d90611654565b6001600160a01b0380841660008181526003602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906109e09085906114d3565b60405180910390a3505050565b60006109f98484610827565b90506000198114610a315781811015610a245760405162461bcd60e51b815260040161054d90611696565b610a318484848403610939565b50505050565b6001600160a01b038316610a5d5760405162461bcd60e51b815260040161054d906117d4565b6001600160a01b038216610a835760405162461bcd60e51b815260040161054d90611544565b610a8e838383610eff565b6001600160a01b03831660009081526002602052604090205481811015610ac75760405162461bcd60e51b815260040161054d906116cd565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290610afe9084906119dd565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b4891906114d3565b60405180910390a3610a3184848461050b565b610b658282610717565b61056057610b7d816001600160a01b03166014610f0a565b610b88836020610f0a565b604051602001610b9992919061143f565b60408051601f198184030181529082905262461bcd60e51b825261054d916004016114dc565b610bc98282610876565b600082815260016020526040902061050b90826108fb565b610beb82826110bc565b600082815260016020526040902061050b908261113f565b610c0b610668565b610c275760405162461bcd60e51b815260040161054d90611587565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610c5a610935565b604051610c6791906114b4565b60405180910390a1565b6001600160a01b038216610c975760405162461bcd60e51b815260040161054d9061194e565b610ca360008383610eff565b8060046000828254610cb591906119dd565b90915550506001600160a01b03821660009081526002602052604081208054839290610ce29084906119dd565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610d259085906114d3565b60405180910390a36105606000838361050b565b6001600160a01b038216610d5f5760405162461bcd60e51b815260040161054d90611793565b610d6b82600083610eff565b6001600160a01b03821660009081526002602052604090205481811015610da45760405162461bcd60e51b815260040161054d906115b5565b6001600160a01b0383166000908152600260205260408120838303905560048054849290610dd3908490611a14565b90915550506040516000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610e169086906114d3565b60405180910390a361050b8360008461050b565b610e32610668565b15610e4f5760405162461bcd60e51b815260040161054d90611713565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610c5a610935565b60006107108383611154565b60006103e08261118c565b6000610ea88383611190565b610ede57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610498565b506000610498565b6001600160e01b031981166301ffc9a760e01b14919050565b61050b8383836111a8565b60606000610f198360026119f5565b610f249060026119dd565b67ffffffffffffffff811115610f4a57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610f74576020820181803683370190505b509050600360fc1b81600081518110610f9d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610fda57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000610ffe8460026119f5565b6110099060016119dd565b90505b600181111561109d576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061104b57634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061106f57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361109681611a57565b905061100c565b5083156107105760405162461bcd60e51b815260040161054d9061150f565b6110c68282610717565b15610560576000828152602081815260408083206001600160a01b03851684529091529020805460ff191690556110fb610935565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000610710836001600160a01b0384166111d8565b600082600001828154811061117957634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b5490565b60009081526001919091016020526040902054151590565b6111b383838361050b565b6111bb610668565b1561050b5760405162461bcd60e51b815260040161054d90611985565b600081815260018301602052604081205480156112eb5760006111fc600183611a14565b855490915060009061121090600190611a14565b905081811461129157600086600001828154811061123e57634e487b7160e01b600052603260045260246000fd5b906000526020600020015490508087600001848154811061126f57634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b85548690806112b057634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610498565b6000915050610498565b80356001600160a01b03811681146103e357600080fd5b60006020828403121561131d578081fd5b610710826112f5565b60008060408385031215611338578081fd5b611341836112f5565b915061134f602084016112f5565b90509250929050565b60008060006060848603121561136c578081fd5b611375846112f5565b9250611383602085016112f5565b9150604084013590509250925092565b600080604083850312156113a5578182fd5b6113ae836112f5565b946020939093013593505050565b6000602082840312156113cd578081fd5b5035919050565b600080604083850312156113e6578182fd5b8235915061134f602084016112f5565b60008060408385031215611408578182fd5b50508035926020909101359150565b600060208284031215611428578081fd5b81356001600160e01b031981168114610710578182fd5b60007f416363657373436f6e74726f6c3a206163636f756e742000000000000000000082528351611477816017850160208801611a2b565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516114a8816028840160208801611a2b565b01602801949350505050565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b60006020825282518060208401526114fb816040850160208701611a2b565b601f01601f19169190910160400192915050565b6020808252818101527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604082015260600190565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b60208082526022908201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604082015261636560f01b606082015260800190565b60208082526039908201527f45524332305072657365744d696e7465725061757365723a206d75737420686160408201527f76652070617573657220726f6c6520746f20756e706175736500000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601d908201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604082015260600190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604082015265616c616e636560d01b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526036908201527f45524332305072657365744d696e7465725061757365723a206d7573742068616040820152751d99481b5a5b9d195c881c9bdb19481d1bc81b5a5b9d60521b606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736040820152607360f81b606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526037908201527f45524332305072657365744d696e7465725061757365723a206d75737420686160408201527f76652070617573657220726f6c6520746f207061757365000000000000000000606082015260800190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201526e103937b632b9903337b91039b2b63360891b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b6020808252602a908201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686040820152691a5b19481c185d5cd95960b21b606082015260800190565b60ff91909116815260200190565b600082198211156119f0576119f0611aa9565b500190565b6000816000190483118215151615611a0f57611a0f611aa9565b500290565b600082821015611a2657611a26611aa9565b500390565b60005b83811015611a46578181015183820152602001611a2e565b83811115610a315750506000910152565b600081611a6657611a66611aa9565b506000190190565b600281046001821680611a8257607f821691505b60208210811415611aa357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea26469706673582212203b6917f45de4e5c634abb536c1f710e4c9c26b5448569832549ddcdf4f5bf78c64736f6c63430008010033",
    "deployedBytecode": "0x6080604052600436106100385760003560e01c806351c2c54f1461004f578063d46eb11914610047578063de0e9a3e1461007a57610047565b366100475761004561009a565b005b61004561009a565b34801561005b57600080fd5b50610064610162565b6040516100719190610360565b60405180910390f35b34801561008657600080fd5b5061004561009536600461030b565b610171565b600034116100c35760405162461bcd60e51b81526004016100ba90610374565b60405180910390fd5b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f19906100f59033903490600401610347565b600060405180830381600087803b15801561010f57600080fd5b505af1158015610123573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b83334604051610158929190610347565b60405180910390a1565b6000546001600160a01b031681565b600081116101915760405162461bcd60e51b81526004016100ba906103ab565b6000546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906101c590339030908690600401610323565b602060405180830381600087803b1580156101df57600080fd5b505af11580156101f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021791906102e4565b50600054604051630852cd8d60e31b81526001600160a01b03909116906342966c68906102489084906004016103e0565b600060405180830381600087803b15801561026257600080fd5b505af1158015610276573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156102a7573d6000803e3d6000fd5b507f434a87dd0568dfbbb4bc8b6b51b072be25ff126809317b293b9ed43aaa84fd0e33826040516102d9929190610347565b60405180910390a150565b6000602082840312156102f5578081fd5b81518015158114610304578182fd5b9392505050565b60006020828403121561031c578081fd5b5035919050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0391909116815260200190565b6020808252601e908201527f5765206e65656420746f2077726170206174206c656173742031207765690000604082015260600190565b6020808252818101527f5765206e65656420746f20756e77726170206174206c65617374203120776569604082015260600190565b9081526020019056fea26469706673582212201fccf6e65516dc072acc4c21b0798ea1718718312567d6c675a04548621ded5864736f6c63430008010033",
    "linkReferences": {},
    "deployedLinkReferences": {}
}  