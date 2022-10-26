// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IHelper{
    struct NFTData{
        string background;
        string hat;
        string jacket;
        string hair;
        string nose;
        string glass;
        string ear;
    }
    function getTokenURI(uint256 tokenId,string memory baseURI,NFTData memory data) external pure returns(string memory);
}