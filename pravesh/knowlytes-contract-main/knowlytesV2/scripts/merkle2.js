// const { utils } = require("ethers");
const { ethers } = require("hardhat");
const keccak256 = require("keccak256");
const { default: MerkleTree } = require("merkletreejs");

const address = [
  "0xE2127e81688D61d360741A1bC0b26FDD1db3Dfd7",
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
];

const leaves = address.map((leaf) => keccak256(leaf)); //  Hashing All Leaf Indivdual
const tree = new MerkleTree(leaves, keccak256, {
  sortPairs: true,
}); // Constructing Merkle Tree
const buf2Hex = (x) => "0x" + x.toString("hex"); //  Utility Function to Convert From Buffer to Hex

console.log(`Here is Root Hash: ${buf2Hex(tree.getRoot())}`); // Get Root of Merkle Tree

// const leaf = keccak256("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
const leaf = keccak256("0xE2127e81688D61d360741A1bC0b26FDD1db3Dfd7");
console.log(`My Leaf`, buf2Hex(leaf));
const proof = tree.getProof(leaf);
console.log(proof);
const  proofReturn = proof.map((x) => buf2Hex(x.data));
console.log("Proof",proofReturn)

module.exports = {
  rootHash: buf2Hex(tree.getRoot()),
  //0xd45f23078ba8b6959ab0a0fb1b219f90c02ad57ebbd44d5772fada02f4d0e7eb
  proof:proofReturn
};
