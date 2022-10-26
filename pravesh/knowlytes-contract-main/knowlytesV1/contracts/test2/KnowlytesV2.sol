        // SPDX-License-Identifier: UNLICENSED
        pragma solidity 0.8.4;
        import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
        import "./StorageV2.sol";
        import "./IHelper.sol";

        contract KnowlytesV2 is StorageV2,ERC721{

            constructor(address _helper,bytes32 _rootHash) ERC721("Knowlytes","$KNOW"){
                helper = _helper;
                rootHash = _rootHash; //0xa1145b2cc45e8f24fa625b517b862a3bc0e16f3e02323791276acbefdb770a8b
                owner = msg.sender;
                initMapping();
            }

            //Minting Knowlytes Functions
            function mintKnowlytes() external payable{
                tokenIdCounter++;
                uint tokenId = tokenIdCounter;
                require(isMintingPaused,"Mint paused");
                require(tokenId<=maxSupply,"All NFT Minted");
                if(msg.sender!= owner){
                    require(msg.value >= price,"Wrong Amount");
                }
                updateNFTDetails(tokenId);
            }

            function mintKnowlytesWhiteList(bytes32[] calldata proof) external payable{
                require(isWhiteListedPaused,"WhiteList Mint Paused");
                tokenIdCounter++;
                uint256 tokenId = tokenIdCounter;
                require(tokenId <= maxSupply,"All NFT Minted");
                if(msg.sender!= owner){
                    require(msg.value>= preSalePrice,"Wrong Amount");
                }
                (bool success,) = helper.delegatecall(abi.encodeWithSignature("isWhiteListedAddress(bytes32[])",proof));
                require(success,"Tx Failed");
                updateNFTDetails(tokenId);
            }


            function updateBatchTraitType(uint256[] memory tId, uint8[] memory _type, uint8[] memory _value) external{
                (bool success,) = helper.delegatecall(abi.encodeWithSignature("updateBatchTraitType(uint256[], uint8[], uint8[])", tId, _type, _value));
                require(success, "Freeze Value Failed");
            }



            function withdraw()public onlyOwner{
                (bool success ,) = owner.call{value:address(this).balance}("");
                require(success,"Withdraw Failed");
            }

            function changeTraits(uint256 tokenId,bytes32 data) external{
                require(ownerOf(tokenId)==msg.sender,"Not Owner of TokenID");
                (bool success,) = helper.delegatecall(abi.encodeWithSignature("changeTrait(uint256,bytes32)",tokenId,data));
                require(success,"Change Traits Failed");
            }

            function freezeValues(uint8[][6] calldata min, uint256[][6] calldata totalId) external{
                (bool success,) = helper.delegatecall(abi.encodeWithSignature("freezeValues(uint8[][6],uint256[][6])", min, totalId));
                require(success, "Freeze Value Failed");
            }

            function tokenURI(uint256 tokenId) public view override(ERC721) returns(string memory){
                require(_exists(tokenId),"TKID NOT EXIST");
                TokenMetaData memory nft = nftDetails[tokenId];
                IHelper.NFTData memory nftData;
                nftData.background = backgroundMap[nft.currentDetails.Background.value];
                nftData.hat = hatMap[nft.currentDetails.Hat.value];
                nftData.jacket = jacketMap[nft.currentDetails.Jacket.value];
                nftData.hair = hairMap[nft.currentDetails.Hair.value];
                nftData.nose = noseMap[nft.currentDetails.Nose.value];
                nftData.glass = glassMap[nft.currentDetails.Glass.value];
                nftData.ear = earMap[nft.currentDetails.Ear.value];

                if(isRevealed){
                    string memory URI = IHelper(helper).getTokenURI(tokenId,baseURI,nftData);
                    return URI;
            }
                return revealURI;
            }



            //Public Traits Functions
            function getHatValue(uint256 _type) public view returns(string memory){
                return hatMap[_type];
            }
            function getJacketValue(uint256 _type) public view returns(string memory){
                return jacketMap[_type];
            }
            function getHairValue(uint256 _type) public view returns(string memory){
                return hairMap[_type];
            }
            function getNoseValue(uint256 _type) public view returns(string memory){
                return noseMap[_type];
            }
            function getGlassValue(uint256 _type)public view returns(string memory){
                return glassMap[_type];
            }
            function getEarValue(uint256 _type)public view returns(string memory){
                return earMap[_type];
            }
            function getBackgroundValue(uint256 _type)public view returns(string memory){
                return backgroundMap[_type];
            }

            //Public Traits Booleans
            function isHatFreezed(uint256 _type) public view returns(bool){
                return hatFreezedMap[_type];
            }
            function isJacketFreezed(uint256 _type) public view returns(bool){
                return jacketFreezedMap[_type];
            }
            function isHairFreezed(uint256 _type) public view returns(bool){
                return hairFreezedMap[_type];
            }
            function isNoseFreezed(uint256 _type) public view returns(bool){
                return noseFreezedMap[_type];
            }
            function isGlassFreezed(uint _type) public view returns(bool){
                return glassFreezedMap[_type];
            }
            function isEarFreezed(uint _type) public view returns(bool){
                return earFreezedMap[_type];
            }

            //NFT Details
            function getNFTDetails(uint256 tokenId) public view returns(TokenMetaData memory){
                return nftDetails[tokenId];
            }

            function getManager() public view returns(address){
                return manager;
            }





            //Toggle Functions
            function toggleMinting() external onlyOwner {
                isMintingPaused = !isMintingPaused;
            }

            function toggleReveal() external onlyOwner {
                isRevealed = !isRevealed;
            }

            function toggleWhiteListMinting() external onlyOwner{
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
            function setManager(address _newManager)external onlyOwner{
                manager = _newManager;
            }


            function initMapping() private{
                hatMap[1] = "Saliors Hat";
                hatMap[2] = "Cartoon";
                hatMap[3] = "Baseballer";
                hatMap[4] = "Sexy Chef";
                hatMap[5] = "Pirates";
                hatMap[6] = "Beach Party";
                hatMap[7] = "Street Boy";
                hatMap[8] = "Wizards";
                hatMap[9] = "Equestriane";
                hatMap[10] = "The Gentlemen";
                hatMap[11] = "Troops Mask";
                hatMap[12] = "Troops Mask 2";
                hatMap[13] = "Princess";
                hatMap[14] = "Magician Hat";

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
                backgroundMap[2] = "Conference";
                backgroundMap[3] = "Construction";
                backgroundMap[4] = "Hospital";
                backgroundMap[5] = "Restaurant";
                backgroundMap[6] = "Yellow";
                backgroundMap[7] = "Green";
            }

            function updateNFTDetails(uint256 tokenId)private{
                TokenMetaData storage nft = nftDetails[tokenId];
                nft.tokenId = tokenId;
                uint256 hat = nft.currentDetails.Hat.value = uint256(generateRandom(msg.sender, 14));
                uint256 jacket = nft.currentDetails.Jacket.value = uint256(generateRandom(msg.sender, 14));
                uint256 hair = nft.currentDetails.Hair.value = uint256(generateRandom(msg.sender, 13));
                uint256 nose = nft.currentDetails.Nose.value = uint256(generateRandom(msg.sender, 8));
                uint256 glass = nft.currentDetails.Glass.value = uint256(generateRandom(msg.sender, 8));
                uint256 ear = nft.currentDetails.Ear.value = uint256(generateRandom(msg.sender, 8));
                uint256 bg = nft.currentDetails.Background.value = uint256(generateRandom(msg.sender, 7));
                updateTraitCounter(hat,jacket,hair,nose,glass,ear);
                _safeMint(msg.sender,tokenId);
                emit MintKnowlytes(tokenId, bg, hat, jacket, hair, nose, glass, ear);
            }

            function updateTraitCounter(uint256 hat,uint256 jacket,uint256 hair,uint256 nose,uint256 glass,uint256 ear) private{
                traitCounter[1][hat]+=1;
                traitCounter[2][jacket]+=1;
                traitCounter[3][hair]+=1;
                traitCounter[4][nose]+=1;
                traitCounter[5][glass]+=1;
                traitCounter[6][ear]+=1;
            }

            function generateRandom(address _account, uint256 range)private view returns (uint256){
                uint256 startToken = 0;
                uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp,_account,block.difficulty,startToken))) % range;
                if(random == 0){revert();}
                return random;
            }
    

    }
