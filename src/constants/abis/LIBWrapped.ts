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
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hashedMessage",
          "type": "bytes32"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "wrapWithSignature",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060405161001d9061005f565b604051809103906000f080158015610039573d6000803e3d6000fd5b50600080546001600160a01b0319166001600160a01b039290921691909117905561006c565b6122f48061073683390190565b6106bb8061007b6000396000f3fe6080604052600436106100435760003560e01c806351c2c54f1461005a5780639fe8c07d14610085578063d46eb11914610052578063de0e9a3e1461009857610052565b36610052576100506100b8565b005b6100506100b8565b34801561006657600080fd5b5061006f610180565b60405161007c91906105b8565b60405180910390f35b6100506100933660046104af565b61018f565b3480156100a457600080fd5b506100506100b3366004610514565b61028f565b600034116100e15760405162461bcd60e51b81526004016100d8906105cc565b60405180910390fd5b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f19906101139033903490600401610581565b600060405180830381600087803b15801561012d57600080fd5b505af1158015610141573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b83334604051610176929190610581565b60405180910390a1565b6000546001600160a01b031681565b600034116101af5760405162461bcd60e51b81526004016100d8906105cc565b806001600160a01b03166101c586868686610402565b6001600160a01b0316146101eb5760405162461bcd60e51b81526004016100d890610603565b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f199061021d9084903490600401610581565b600060405180830381600087803b15801561023757600080fd5b505af115801561024b573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b88134604051610280929190610581565b60405180910390a15050505050565b600081116102af5760405162461bcd60e51b81526004016100d890610647565b6000546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906102e39033903090869060040161055d565b602060405180830381600087803b1580156102fd57600080fd5b505af1158015610311573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103359190610488565b50600054604051630852cd8d60e31b81526001600160a01b03909116906342966c689061036690849060040161067c565b600060405180830381600087803b15801561038057600080fd5b505af1158015610394573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156103c5573d6000803e3d6000fd5b507f434a87dd0568dfbbb4bc8b6b51b072be25ff126809317b293b9ed43aaa84fd0e33826040516103f7929190610581565b60405180910390a150565b60008085604051602001610416919061052c565b60405160208183030381529060405280519060200120905060018186868660405160008152602001604052604051610451949392919061059a565b6020604051602081039080840390855afa158015610473573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600060208284031215610499578081fd5b815180151581146104a8578182fd5b9392505050565b600080600080600060a086880312156104c6578081fd5b85359450602086013560ff811681146104dd578182fd5b9350604086013592506060860135915060808601356001600160a01b0381168114610506578182fd5b809150509295509295909350565b600060208284031215610525578081fd5b5035919050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b93845260ff9290921660208401526040830152606082015260800190565b6001600160a01b0391909116815260200190565b6020808252601e908201527f5765206e65656420746f2077726170206174206c656173742031207765690000604082015260600190565b60208082526024908201527f526563656976657220646f6573206e6f74207369676e656420746865206d65736040820152637361676560e01b606082015260800190565b6020808252818101527f5765206e65656420746f20756e77726170206174206c65617374203120776569604082015260600190565b9081526020019056fea264697066735822122092f7fe81662aa76c26bc13388b5230889ad7971f785befe1090f9695e590118664736f6c6343000801003360806040523480156200001157600080fd5b50604080518082018252600c81526b2634b13930b93caa37b5b2b760a11b6020808301918252835180850190945260038452622624a160e91b9084015281519192918391839162000065916005916200035d565b5080516200007b9060069060208401906200035d565b50506007805460ff19169055506200009e600062000098620001cc565b620001d0565b620000cd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a662000098620001cc565b620000fc7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a62000098620001cc565b5050604080518082018252600c81526b2634b13930b93caa37b5b2b760a11b6020918201528151808301835260018152603160f81b908201529051620001ab917f91ab3d17e3a50a9d89e63fd30b92be7f5336b03b287bb946787a83a9d62a2766917ffcf9492d0fa4ac2bd5b78387b235836e49ea88c59547ebcb07f8f307914e081d917fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69130910162000403565b60408051601f19818403018152919052805160209091012060085562000464565b3390565b620001dc8282620001e0565b5050565b620001f782826200022360201b62000a8f1760201c565b60008281526001602090815260409091206200021e91839062000b14620002ad821b17901c565b505050565b6200022f8282620002cd565b620001dc576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916600117905562000269620001cc565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620002c4836001600160a01b038416620002f6565b90505b92915050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600062000304838362000345565b6200033c57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620002c7565b506000620002c7565b60009081526001919091016020526040902054151590565b8280546200036b9062000427565b90600052602060002090601f0160209004810192826200038f5760008555620003da565b82601f10620003aa57805160ff1916838001178555620003da565b82800160010185558215620003da579182015b82811115620003da578251825591602001919060010190620003bd565b50620003e8929150620003ec565b5090565b5b80821115620003e85760008155600101620003ed565b938452602084019290925260408301526001600160a01b0316606082015260800190565b6002810460018216806200043c57607f821691505b602082108114156200045e57634e487b7160e01b600052602260045260246000fd5b50919050565b611e8080620004746000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c806370a082311161010f578063a457c2d7116100a2578063d539139311610071578063d5391393146103e7578063d547741f146103ef578063dd62ed3e14610402578063e63ab1e914610415576101f0565b8063a457c2d71461039b578063a9059cbb146103ae578063ca15c873146103c1578063d505accf146103d4576101f0565b80639010d07c116100de5780639010d07c1461035857806391d148541461037857806395d89b411461038b578063a217fddf14610393576101f0565b806370a082311461031757806379cc67901461032a5780637ecebe001461033d5780638456cb5914610350576101f0565b8063313ce567116101875780633f4ba83a116101565780633f4ba83a146102e157806340c10f19146102e957806342966c68146102fc5780635c975abb1461030f576101f0565b8063313ce5671461029e5780633644e515146102b357806336568abe146102bb57806339509351146102ce576101f0565b806323b872dd116101c357806323b872dd1461025b578063248a9ca31461026e5780632f2ff15d1461028157806330adf81f14610296576101f0565b806301ffc9a7146101f557806306fdde031461021e578063095ea7b31461023357806318160ddd14610246575b600080fd5b6102086102033660046116a1565b61041d565b604051610215919061176d565b60405180910390f35b61022661044a565b60405161021591906117d3565b61020861024136600461161d565b6104dc565b61024e610500565b6040516102159190611778565b610208610269366004611571565b610506565b61024e61027c366004611646565b610534565b61029461028f36600461165e565b610549565b005b61024e610572565b6102a6610596565b6040516102159190611d3f565b61024e61059b565b6102946102c936600461165e565b6105a1565b6102086102dc36600461161d565b6105f0565b61029461063c565b6102946102f736600461161d565b61068e565b61029461030a366004611646565b6106e0565b6102086106f4565b61024e610325366004611525565b6106fd565b61029461033836600461161d565b610718565b61024e61034b366004611525565b610734565b610294610746565b61036b610366366004611680565b610796565b6040516102159190611759565b61020861038636600461165e565b6107b5565b6102266107de565b61024e6107ed565b6102086103a936600461161d565b6107f2565b6102086103bc36600461161d565b610853565b61024e6103cf366004611646565b61086b565b6102946103e23660046115ac565b610882565b61024e6109fd565b6102946103fd36600461165e565b610a21565b61024e61041036600461153f565b610a40565b61024e610a6b565b60006001600160e01b03198216635a05180f60e01b1480610442575061044282610b29565b90505b919050565b60606005805461045990611dde565b80601f016020809104026020016040519081016040528092919081815260200182805461048590611dde565b80156104d25780601f106104a7576101008083540402835291602001916104d2565b820191906000526020600020905b8154815290600101906020018083116104b557829003601f168201915b5050505050905090565b6000806104e7610b4e565b90506104f4818585610b52565b60019150505b92915050565b60045490565b600080610511610b4e565b905061051e858285610c06565b610529858585610c50565b506001949350505050565b60009081526020819052604090206001015490565b61055282610534565b6105638161055e610b4e565b610d74565b61056d8383610dd8565b505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601290565b60085481565b6105a9610b4e565b6001600160a01b0316816001600160a01b0316146105e25760405162461bcd60e51b81526004016105d990611c6f565b60405180910390fd5b6105ec8282610dfa565b5050565b6000806105fb610b4e565b6001600160a01b038082166000908152600360209081526040808320938916835292905220549091506104f49082908690610637908790611d4d565b610b52565b6106687f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610386610b4e565b6106845760405162461bcd60e51b81526004016105d9906118ee565b61068c610e1c565b565b6106ba7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610386610b4e565b6106d65760405162461bcd60e51b81526004016105d990611a6b565b6105ec8282610e8a565b6106f16106eb610b4e565b82610f52565b50565b60075460ff1690565b6001600160a01b031660009081526002602052604090205490565b61072a82610724610b4e565b83610c06565b6105ec8282610f52565b60096020526000908152604090205481565b6107727f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610386610b4e565b61078e5760405162461bcd60e51b81526004016105d990611bcd565b61068c611043565b60008281526001602052604081206107ae908361109e565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b60606006805461045990611dde565b600081565b6000806107fd610b4e565b6001600160a01b03808216600090815260036020908152604080832093891683529290522054909150838110156108465760405162461bcd60e51b81526004016105d990611c2a565b6105298286868403610b52565b60008061085e610b4e565b90506104f4818585610c50565b6000818152600160205260408120610442906110aa565b428410156108a25760405162461bcd60e51b81526004016105d990611a34565b6008546001600160a01b038816600090815260096020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b9190876108f583611e19565b919050558a60405160200161090f96959493929190611781565b604051602081830303815290604052805190602001206040516020016109369291906116c9565b60405160208183030381529060405280519060200120905060006001828686866040516000815260200160405260405161097394939291906117b5565b6020604051602081039080840390855afa158015610995573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906109cb5750886001600160a01b0316816001600160a01b0316145b6109e75760405162461bcd60e51b81526004016105d990611b02565b6109f2898989610b52565b505050505050505050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b610a2a82610534565b610a368161055e610b4e565b61056d8383610dfa565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b610a9982826107b5565b6105ec576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610ad0610b4e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006107ae836001600160a01b0384166110b5565b60006001600160e01b03198216637965db0b60e01b14806104425750610442826110ff565b3390565b6001600160a01b038316610b785760405162461bcd60e51b81526004016105d990611b89565b6001600160a01b038216610b9e5760405162461bcd60e51b81526004016105d99061194b565b6001600160a01b0380841660008181526003602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610bf9908590611778565b60405180910390a3505050565b6000610c128484610a40565b90506000198114610c4a5781811015610c3d5760405162461bcd60e51b81526004016105d99061198d565b610c4a8484848403610b52565b50505050565b6001600160a01b038316610c765760405162461bcd60e51b81526004016105d990611b44565b6001600160a01b038216610c9c5760405162461bcd60e51b81526004016105d99061183b565b610ca7838383611118565b6001600160a01b03831660009081526002602052604090205481811015610ce05760405162461bcd60e51b81526004016105d9906119c4565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290610d17908490611d4d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d619190611778565b60405180910390a3610c4a84848461056d565b610d7e82826107b5565b6105ec57610d96816001600160a01b03166014611123565b610da1836020611123565b604051602001610db29291906116e4565b60408051601f198184030181529082905262461bcd60e51b82526105d9916004016117d3565b610de28282610a8f565b600082815260016020526040902061056d9082610b14565b610e0482826112d5565b600082815260016020526040902061056d9082611358565b610e246106f4565b610e405760405162461bcd60e51b81526004016105d99061187e565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610e73610b4e565b604051610e809190611759565b60405180910390a1565b6001600160a01b038216610eb05760405162461bcd60e51b81526004016105d990611cbe565b610ebc60008383611118565b8060046000828254610ece9190611d4d565b90915550506001600160a01b03821660009081526002602052604081208054839290610efb908490611d4d565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610f3e908590611778565b60405180910390a36105ec6000838361056d565b6001600160a01b038216610f785760405162461bcd60e51b81526004016105d990611ac1565b610f8482600083611118565b6001600160a01b03821660009081526002602052604090205481811015610fbd5760405162461bcd60e51b81526004016105d9906118ac565b6001600160a01b0383166000908152600260205260408120838303905560048054849290610fec908490611d84565b90915550506040516000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061102f908690611778565b60405180910390a361056d8360008461056d565b61104b6106f4565b156110685760405162461bcd60e51b81526004016105d990611a0a565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e73610b4e565b60006107ae838361136d565b6000610442826113a5565b60006110c183836113a9565b6110f7575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104fa565b5060006104fa565b6001600160e01b031981166301ffc9a760e01b14919050565b61056d8383836113c1565b60606000611132836002611d65565b61113d906002611d4d565b67ffffffffffffffff81111561116357634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561118d576020820181803683370190505b509050600360fc1b816000815181106111b657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106111f357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000611217846002611d65565b611222906001611d4d565b90505b60018111156112b6576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061126457634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061128857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936112af81611dc7565b9050611225565b5083156107ae5760405162461bcd60e51b81526004016105d990611806565b6112df82826107b5565b156105ec576000828152602081815260408083206001600160a01b03851684529091529020805460ff19169055611314610b4e565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006107ae836001600160a01b0384166113f1565b600082600001828154811061139257634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b5490565b60009081526001919091016020526040902054151590565b6113cc83838361056d565b6113d46106f4565b1561056d5760405162461bcd60e51b81526004016105d990611cf5565b60008181526001830160205260408120548015611504576000611415600183611d84565b855490915060009061142990600190611d84565b90508181146114aa57600086600001828154811061145757634e487b7160e01b600052603260045260246000fd5b906000526020600020015490508087600001848154811061148857634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b85548690806114c957634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506104fa565b60009150506104fa565b80356001600160a01b038116811461044557600080fd5b600060208284031215611536578081fd5b6107ae8261150e565b60008060408385031215611551578081fd5b61155a8361150e565b91506115686020840161150e565b90509250929050565b600080600060608486031215611585578081fd5b61158e8461150e565b925061159c6020850161150e565b9150604084013590509250925092565b600080600080600080600060e0888a0312156115c6578283fd5b6115cf8861150e565b96506115dd6020890161150e565b95506040880135945060608801359350608088013560ff81168114611600578384fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561162f578182fd5b6116388361150e565b946020939093013593505050565b600060208284031215611657578081fd5b5035919050565b60008060408385031215611670578182fd5b823591506115686020840161150e565b60008060408385031215611692578182fd5b50508035926020909101359150565b6000602082840312156116b2578081fd5b81356001600160e01b0319811681146107ae578182fd5b61190160f01b81526002810192909252602282015260420190565b60007f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008252835161171c816017850160208801611d9b565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161174d816028840160208801611d9b565b01602801949350505050565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b9586526001600160a01b0394851660208701529290931660408501526060840152608083019190915260a082015260c00190565b93845260ff9290921660208401526040830152606082015260800190565b60006020825282518060208401526117f2816040850160208701611d9b565b601f01601f19169190910160400192915050565b6020808252818101527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604082015260600190565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b60208082526022908201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604082015261636560f01b606082015260800190565b60208082526039908201527f45524332305072657365744d696e7465725061757365723a206d75737420686160408201527f76652070617573657220726f6c6520746f20756e706175736500000000000000606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601d908201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604082015260600190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604082015265616c616e636560d01b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526018908201527f4552433230576974685065726d69743a20455850495245440000000000000000604082015260600190565b60208082526036908201527f45524332305072657365744d696e7465725061757365723a206d7573742068616040820152751d99481b5a5b9d195c881c9bdb19481d1bc81b5a5b9d60521b606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736040820152607360f81b606082015260800190565b60208082526022908201527f4552433230576974685065726d69743a20494e56414c49445f5349474e415455604082015261524560f01b606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526037908201527f45524332305072657365744d696e7465725061757365723a206d75737420686160408201527f76652070617573657220726f6c6520746f207061757365000000000000000000606082015260800190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201526e103937b632b9903337b91039b2b63360891b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b6020808252602a908201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686040820152691a5b19481c185d5cd95960b21b606082015260800190565b60ff91909116815260200190565b60008219821115611d6057611d60611e34565b500190565b6000816000190483118215151615611d7f57611d7f611e34565b500290565b600082821015611d9657611d96611e34565b500390565b60005b83811015611db6578181015183820152602001611d9e565b83811115610c4a5750506000910152565b600081611dd657611dd6611e34565b506000190190565b600281046001821680611df257607f821691505b60208210811415611e1357634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611e2d57611e2d611e34565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212207a13b6ce558810680ec1b92ce4394031bc05bbe1ac4dc8a71a689f79fcbaaf2664736f6c63430008010033",
  "deployedBytecode": "0x6080604052600436106100435760003560e01c806351c2c54f1461005a5780639fe8c07d14610085578063d46eb11914610052578063de0e9a3e1461009857610052565b36610052576100506100b8565b005b6100506100b8565b34801561006657600080fd5b5061006f610180565b60405161007c91906105b8565b60405180910390f35b6100506100933660046104af565b61018f565b3480156100a457600080fd5b506100506100b3366004610514565b61028f565b600034116100e15760405162461bcd60e51b81526004016100d8906105cc565b60405180910390fd5b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f19906101139033903490600401610581565b600060405180830381600087803b15801561012d57600080fd5b505af1158015610141573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b83334604051610176929190610581565b60405180910390a1565b6000546001600160a01b031681565b600034116101af5760405162461bcd60e51b81526004016100d8906105cc565b806001600160a01b03166101c586868686610402565b6001600160a01b0316146101eb5760405162461bcd60e51b81526004016100d890610603565b6000546040516340c10f1960e01b81526001600160a01b03909116906340c10f199061021d9084903490600401610581565b600060405180830381600087803b15801561023757600080fd5b505af115801561024b573d6000803e3d6000fd5b505050507f9c1359f4b53f71481ac276ccdffa0cc71cd40491a5b8636617ecd8e25d42e2b88134604051610280929190610581565b60405180910390a15050505050565b600081116102af5760405162461bcd60e51b81526004016100d890610647565b6000546040516323b872dd60e01b81526001600160a01b03909116906323b872dd906102e39033903090869060040161055d565b602060405180830381600087803b1580156102fd57600080fd5b505af1158015610311573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103359190610488565b50600054604051630852cd8d60e31b81526001600160a01b03909116906342966c689061036690849060040161067c565b600060405180830381600087803b15801561038057600080fd5b505af1158015610394573d6000803e3d6000fd5b505060405133925083156108fc02915083906000818181858888f193505050501580156103c5573d6000803e3d6000fd5b507f434a87dd0568dfbbb4bc8b6b51b072be25ff126809317b293b9ed43aaa84fd0e33826040516103f7929190610581565b60405180910390a150565b60008085604051602001610416919061052c565b60405160208183030381529060405280519060200120905060018186868660405160008152602001604052604051610451949392919061059a565b6020604051602081039080840390855afa158015610473573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600060208284031215610499578081fd5b815180151581146104a8578182fd5b9392505050565b600080600080600060a086880312156104c6578081fd5b85359450602086013560ff811681146104dd578182fd5b9350604086013592506060860135915060808601356001600160a01b0381168114610506578182fd5b809150509295509295909350565b600060208284031215610525578081fd5b5035919050565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152601c810191909152603c0190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03929092168252602082015260400190565b93845260ff9290921660208401526040830152606082015260800190565b6001600160a01b0391909116815260200190565b6020808252601e908201527f5765206e65656420746f2077726170206174206c656173742031207765690000604082015260600190565b60208082526024908201527f526563656976657220646f6573206e6f74207369676e656420746865206d65736040820152637361676560e01b606082015260800190565b6020808252818101527f5765206e65656420746f20756e77726170206174206c65617374203120776569604082015260600190565b9081526020019056fea264697066735822122092f7fe81662aa76c26bc13388b5230889ad7971f785befe1090f9695e590118664736f6c63430008010033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
