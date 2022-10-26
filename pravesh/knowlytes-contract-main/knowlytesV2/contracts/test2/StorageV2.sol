// SPDX-License-Identifier:UNLICENSED
pragma solidity 0.8.4;

contract StorageV2{
    //Intergers
    uint256 public tokenIdCounter;
    uint256 internal price = 0.0000005 ether; // Getters
    uint256 internal preSalePrice = 0.0000004 ether;

    //sizes of trait
    uint256 sHat = 14;
    uint256 sJacket = 14;
    uint256 sHair = 13;
    uint256 sNose = 8;
    uint256 sGlass = 8;
    uint256 sEar = 8;
    //Bytes32
    bytes32 internal rootHash;
    bytes32 internal freeRootHash;
    //Address
    address internal owner;
    address internal manager;
    address internal helper;
    //Constant 
    uint256 public constant maxSupply = 1111;
    //Booleans
    bool internal isMintingPaused;
    bool internal isFreeMintingPaused;
    bool internal isWhiteListedPaused;
    bool internal isRevealed;
    //Strings
    string internal baseURI = "http://3.110.231.144:5000/knowlyets/";
    string internal revealURI = "";
    
    //Events
    event MintKnowlytes(uint256 indexed tokenId,uint256 bg,uint256 hat,uint256 jacket,uint256 hair,uint256 nose,uint256 glass,uint256 ear,uint256 name);
    event ChangeTrait(uint256 indexed tokenId,bytes32 indexed data);
    //Modifiers
    modifier onlyOwner{
        _onlyOwner();
        _;
    }
    //Structs
    struct TraitValue{
        uint256 value;
        bool isFreezed;
    }

    struct Traits{
      TraitValue Hat;
      TraitValue Jacket;
      TraitValue Hair;
      TraitValue Nose;
      TraitValue Glass;
      TraitValue Ear;
      TraitValue Background;
      TraitValue Name;
    //   TraitValue Generation;
    }

    struct TokenMetaData{
        uint256 tokenId;
        uint256 changedMonth;
        bytes32 hashedProof;
        Traits currentDetails;
        bool haveChanged;
    }


    //Mappings
    mapping(uint256 => string) internal hatMap;
    mapping(uint256 => string) internal jacketMap;
    mapping(uint256 => string) internal hairMap;
    mapping(uint256 => string) internal noseMap;
    mapping(uint256 => string) internal glassMap;
    mapping(uint256 => string) internal earMap;
    mapping(uint256 => string) internal backgroundMap;
    mapping (uint256 => string) internal nameMap;



    // Traits Freezed Mapping
    mapping(uint256 => bool) internal hatFreezedMap;
    mapping(uint256 => bool) internal jacketFreezedMap;
    mapping(uint256 => bool) internal hairFreezedMap;
    mapping(uint256 => bool) internal noseFreezedMap;
    mapping(uint256 => bool) internal glassFreezedMap;
    mapping(uint256 => bool) internal earFreezedMap;


    //Traits Details
    mapping(uint256 => TokenMetaData) internal nftDetails;
    mapping(uint256 => mapping(uint256 => uint256)) internal traitCounter;

    //Functions
    function _onlyOwner() private view{
        require(msg.sender == owner,"only Owner");
    }

    
}