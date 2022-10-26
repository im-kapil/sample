pragma solidity 0.8.4;
// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./StorageV2.sol";
import "./IHelper.sol";
// import "hardhat/console.sol";

contract KnowlytesV2 is StorageV2, ERC721 {
    constructor(address _helper, bytes32 _rootHash, bytes32 _freeRoot)
        ERC721("Knowlytes", "$KNOW")
    {
        helper = _helper;
        rootHash = _rootHash; //0xc4b871bdf865490180e7473dcbc03b4b8a6e1a05bea6d3085907dfbf22efb889
        freeRootHash = _freeRoot; //0xd45f23078ba8b6959ab0a0fb1b219f90c02ad57ebbd44d5772fada02f4d0e7eb
        owner = msg.sender;
        initMapping();
    }
    //Minting Knowlytes Functions
    modifier check {
        _;
        tokenIdCounter++;
        require(tokenIdCounter <= maxSupply, "All NFT Minted");
        updateNFTDetails(tokenIdCounter);
    }

    function mintKnowlytes() external payable check{
        require(isMintingPaused, "Mint paused");
        if (msg.sender != owner) {
            require(msg.value >= price, "Wrong Amount");
        }
        // require(msg.value >= price, "Wrong Amount");
    }
    function freemintKnowlytes(bytes32[] calldata proof) external payable check{
        (bool success, ) = helper.delegatecall(
            abi.encodeWithSignature("isFreeListedAddress(bytes32[])", proof)
        );
        require(success, "Failed");
    }

    function mintKnowlytesWhiteList(bytes32[] calldata proof) external payable check{
        require(isWhiteListedPaused, "WhiteList Mint Paused");
        require(msg.value >= preSalePrice, "Wrong Amount");
        (bool success, ) = helper.delegatecall(
            abi.encodeWithSignature("isWhiteListedAddress(bytes32[])", proof)
        );
        require(success, "Failed");
    }

    function updateBatchTraitTypes(
        uint256[] calldata tId,
        uint256[] calldata t,
        uint256[] calldata value
    ) external {
        (bool executed, ) = helper.delegatecall(
            abi.encodeWithSignature(
                "updateBatchTraitType(uint256[],uint256[],uint256[])",
                tId,
                t,
                value
            )
        );
        require(executed, "UPDATION FAILED");
    }
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdraw Failed");
    }

    function changeTraits(uint256 tokenId, bytes32 data) external {
        require(ownerOf(tokenId) == msg.sender, "Not Own TKID");
        (bool success, ) = helper.delegatecall(
            abi.encodeWithSignature(
                "changeTrait(uint256,bytes32)",
                tokenId,
                data
            )
        );
        require(success, "Change Failed");
    }

    function freezeValues(
        uint256[][6] calldata min,
        uint256[][6] calldata totalId
    ) external {
        (bool success, ) = helper.delegatecall(
            abi.encodeWithSignature(
                "freezeValues(uint256[][6],uint256[][6])",
                min,
                totalId
            )
        );
        require(success, "Freeze Value Failed");
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(_exists(tokenId), "No TKID");
        TokenMetaData memory nft = nftDetails[tokenId];
        IHelper.NFTData memory nftData;
        nftData.background = backgroundMap[nft.currentDetails.Background.value];
        nftData.hat = hatMap[nft.currentDetails.Hat.value];
        nftData.jacket = jacketMap[nft.currentDetails.Jacket.value];
        nftData.hair = hairMap[nft.currentDetails.Hair.value];
        nftData.nose = noseMap[nft.currentDetails.Nose.value];
        nftData.glass = glassMap[nft.currentDetails.Glass.value];
        nftData.ear = earMap[nft.currentDetails.Ear.value];
        if (isRevealed) {
            string memory URI = IHelper(helper).getTokenURI(
                tokenId,
                baseURI,
                nftData
            );
            return URI;
        }
        return revealURI;
    }

    //Public Traits Functions
    function getHatValue(uint256 _type) public view returns (string memory) {
        return hatMap[_type];
    }

    function getJacketValue(uint256 _type) public view returns (string memory) {
        return jacketMap[_type];
    }

    function getHairValue(uint256 _type) public view returns (string memory) {
        return hairMap[_type];
    }

    function getNoseValue(uint256 _type) public view returns (string memory) {
        return noseMap[_type];
    }

    function getGlassValue(uint256 _type) public view returns (string memory) {
        return glassMap[_type];
    }

    function getEarValue(uint256 _type) public view returns (string memory) {
        return earMap[_type];
    }

    function getBackgroundValue(uint256 _type)
        public
        view
        returns (string memory)
    {
        return backgroundMap[_type];
    }

    //Public Traits Booleans
    function isHatFreezed(uint256 _type) public view returns (bool) {
        return hatFreezedMap[_type];
    }

    function isJacketFreezed(uint256 _type) public view returns (bool) {
        return jacketFreezedMap[_type];
    }

    function isHairFreezed(uint256 _type) public view returns (bool) {
        return hairFreezedMap[_type];
    }

    function isNoseFreezed(uint256 _type) public view returns (bool) {
        return noseFreezedMap[_type];
    }

    function isGlassFreezed(uint _type) public view returns (bool) {
        return glassFreezedMap[_type];
    }

    function isEarFreezed(uint _type) public view returns (bool) {
        return earFreezedMap[_type];
    }

    //NFT Details
    function getNFTDetails(uint256 tokenId)
        public
        view
        returns (TokenMetaData memory)
    {
        return nftDetails[tokenId];
    }

    function getManager() public view returns (address) {
        return manager;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function getPreSalePrice() public view returns (uint256) {
        return preSalePrice;
    }

    function isMintingPause() public view returns (bool) {
        return isMintingPaused;
    }
    function isFreeMintingPause() public view returns (bool) {
        return isFreeMintingPaused;
    }

    function isWhitelistMintingPause() public view returns (bool) {
        return isWhiteListedPaused;
    }
    //Toggle Functions
    function toggleMinting() external onlyOwner {
        isMintingPaused = !isMintingPaused;
    }
    function toggleFreeMinting() external onlyOwner {
        isFreeMintingPaused = !isFreeMintingPaused;
    }

    function toggleReveal() external onlyOwner {
        isRevealed = !isRevealed;
    }

    function toggleWhiteListMinting() external onlyOwner {
        isWhiteListedPaused = !isWhiteListedPaused;
    }

    // Setters Functions
    function setPrice(uint256 _newPrice) external onlyOwner {
        price = _newPrice;
    }

    function setBaseURI(string calldata _newURI) external onlyOwner {
        baseURI = _newURI;
    }

    function setRevealURI(string calldata _newURI) external onlyOwner {
        revealURI = _newURI;
    }

    function setManager(address _newManager) external onlyOwner {
        manager = _newManager;
    }

    function initMapping() private {
        hatMap[1] = "Hat1";
        hatMap[2] = "Hat2";
        hatMap[3] = "Hat3";
        hatMap[4] = "Hat4";
        hatMap[5] = "Hat5";
        hatMap[6] = "Hat6";
        hatMap[7] = "Hat7";
        hatMap[8] = "Hat8";
        hatMap[9] = "Hat9";
        hatMap[10] = "Hat10";
        hatMap[11] = "Hat11";
        hatMap[12] = "Hat12";
        hatMap[13] = "Hat13";
        hatMap[14] = "Hat14";
        jacketMap[1] = "Jacket1";
        jacketMap[2] = "Jacket2";
        jacketMap[3] = "Jacket3";
        jacketMap[4] = "Jacket4";
        jacketMap[5] = "Jacket5";
        jacketMap[6] = "Jacket6";
        jacketMap[7] = "Jacket7";
        jacketMap[8] = "Jacket8";
        jacketMap[9] = "Jacket9";
        jacketMap[10] = "Jacket10";
        jacketMap[11] = "Jacket11";
        jacketMap[12] = "Jacket12";
        jacketMap[13] = "Jacket13";
        jacketMap[14] = "Jacket14";
        hairMap[1] = "Hair1";
        hairMap[2] = "Hair2";
        hairMap[3] = "Hair3";
        hairMap[4] = "Hair4";
        hairMap[5] = "Hair5";
        hairMap[6] = "Hair6";
        hairMap[7] = "Hair7";
        hairMap[8] = "Hair8";
        hairMap[9] = "Hair9";
        hairMap[10] = "Hair10";
        hairMap[11] = "Hair11";
        hairMap[12] = "Hair12";
        hairMap[13] = "Hair13";
        noseMap[1] = "Nose1";
        noseMap[2] = "Nose2";
        noseMap[3] = "Nose3";
        noseMap[4] = "Nose4";
        noseMap[5] = "Nose5";
        noseMap[6] = "Nose6";
        noseMap[7] = "Nose7";
        noseMap[8] = "Nose8";
        glassMap[1] = "Glass1";
        glassMap[2] = "Glass2";
        glassMap[3] = "Glass3";
        glassMap[4] = "Glass4";
        glassMap[5] = "Glass5";
        glassMap[6] = "Glass6";
        glassMap[7] = "Glass7";
        glassMap[8] = "Glass8";
        earMap[1] = "Ear1";
        earMap[2] = "Ear2";
        earMap[3] = "Ear3";
        earMap[4] = "Ear4";
        earMap[5] = "Ear5";
        earMap[6] = "Ear6";
        earMap[7] = "Ear7";
        earMap[8] = "Ear8";
        backgroundMap[1] = "Blue";
        backgroundMap[2] = "Confrence";
        backgroundMap[3] = "Construction";
        backgroundMap[4] = "Hospital";
        backgroundMap[5] = "Restaurant";
        backgroundMap[6] = "Yellow";
        backgroundMap[7] = "Green";
        nameMap[1] = "Paul";
        nameMap[2] = "Ben";
        nameMap[3] = "Leon";
        nameMap[4] = "Finn";
        nameMap[5] = "Elias";
        nameMap[6] = "Jonas";
        nameMap[7] = "Luis";
        nameMap[8] = "Noah";
        nameMap[9] = "Felix";
        nameMap[10] = "Lukas";
        nameMap[11] = "Jurgen";
        nameMap[12] = "Karl";
        nameMap[13] = "Stefan";
        nameMap[14] = "Walter";
        nameMap[15] = "Uwe";
        nameMap[16] = "Hans";
        nameMap[17] = "Klaus";
        nameMap[18] = "Emma";
        nameMap[19] = "Mia";
        nameMap[20] = "Hannah";
        nameMap[21] = "Emilia";
        nameMap[22] = "Sofia";
        nameMap[23] = "Lina";
        nameMap[24] = "Anna";
        nameMap[25] = "Mila";
        nameMap[26] = "Lea";
        nameMap[27] = "Ella";
        nameMap[28] = "Ursula";
        nameMap[29] = "Christina";
        nameMap[30] = "Ilse";
        nameMap[31] = "Ingrid";
        nameMap[32] = "Petra";
        nameMap[33] = "Monika";
        nameMap[34] = "Gisela";
        nameMap[35] = "Susanne";
        nameMap[36] = "Baron";
        nameMap[37] = "Brenner";
        nameMap[38] = "Bronson";
        nameMap[39] = "Christoph";
        nameMap[40] = "Conra";
        nameMap[41] = "Corrado";
        nameMap[42] = "Davi";
        nameMap[43] = "Delmar";
        nameMap[44] = "Derek";
        nameMap[45] = "Edga";
        nameMap[46] = "Egelbert";
        nameMap[47] = "Egon";
        nameMap[48] = "Elias";
        nameMap[49] = "Fedde";
        nameMap[50] = "Franz";
        nameMap[51] = "Frederic";
        nameMap[52] = "Geoffrey";
        nameMap[53] = "Godfrey";
        nameMap[54] = "Gunther";
        nameMap[55] = "Hans";
        nameMap[56] = "Hedwig";
        nameMap[57] = "Henry";
        nameMap[58] = "Hulbart";
        nameMap[59] = "Kaiser";
        nameMap[60] = "Kurtis";
        nameMap[61] = "Leon";
        nameMap[62] = "Leopol";
        nameMap[63] = "Louis";
        nameMap[64] = "Marcus";
        nameMap[65] = "Martell";
        nameMap[66] = "Mayne";
        nameMap[67] = "Nicko";
        nameMap[68] = "Nikolaus";
        nameMap[69] = "Noa";
        nameMap[70] = "Odie";
        nameMap[71] = "Raymond";
        nameMap[72] = "Robert";
        nameMap[73] = "Roderick";
        nameMap[74] = "Ryker";
        nameMap[75] = "Truman";
        nameMap[76] = "William";
        nameMap[77] = "Adali";
        nameMap[78] = "Adaleigh";
        nameMap[79] = "Adellene";
        nameMap[80] = "Adelredu";
        nameMap[81] = "Addle";
        nameMap[82] = "Adette";
        nameMap[83] = "Agatha";
        nameMap[84] = "Ail";
        nameMap[85] = "Amalia";
        nameMap[86] = "Amara";
        nameMap[87] = "Bernadine";
        nameMap[88] = "Carri";
        nameMap[89] = "Harry";
        nameMap[90] = "Ronald";
        nameMap[91] = "Harmoinee";
        nameMap[92] = "Ginnie";
        nameMap[93] = "Rubius";
        nameMap[94] = "Serius";
        nameMap[95] = "Albus";
        nameMap[96] = "Dadli";
        nameMap[97] = "Flinch";
        nameMap[98] = "Navil";
        nameMap[99] = "James";
        nameMap[100] = "Lilly";
    }

    function setTraitvalues(uint256 i, uint256 key, string calldata val) external onlyOwner {
        (bool exe, ) = helper.delegatecall(abi.encodeWithSignature("setTraitvalues(uint256,uint256,string)",i,key,val));
        require(exe, "UPDATION FAILED");
        
    }
    function setHashroot(bytes32 _newRoot) external onlyOwner {
        rootHash = _newRoot;
    }
    function setFreeHashroot(bytes32 _newRoot) external onlyOwner {
        freeRootHash = _newRoot;
    }

    function updateNFTDetails(uint256 tokenId) private {
        (bool success, ) = helper.delegatecall(abi.encodeWithSignature("updateNFTDetail(uint256)", tokenId));
        require(success, "Not Updated");
        _safeMint(msg.sender, tokenId);
    }


    // function updateTraitCounter(
    //     uint256 hat,
    //     uint256 jacket,
    //     uint256 hair,
    //     uint256 nose,
    //     uint256 glass,
    //     uint256 ear
    // ) private {
        
    //     traitCounter[1][hat] += 1;
    //     traitCounter[2][jacket] += 1;
    //     traitCounter[3][hair] += 1;
    //     traitCounter[4][nose] += 1;
    //     traitCounter[5][glass] += 1;
    //     traitCounter[6][ear] += 1;
    // }

    // function generateRandom(address _account, uint256 range)
    //     private
    //     view
    //     returns (uint256)
    // {
    //     uint256 startToken = 0;
    //     uint256 random = uint256(
    //         keccak256(
    //             abi.encodePacked(
    //                 block.timestamp,
    //                 _account,
    //                 block.difficulty,
    //                 startToken
    //             )
    //         )
    //     ) % range;
    //     if (random == 0) {
    //         revert();
    //     }
    //     return random;
    // }
}
