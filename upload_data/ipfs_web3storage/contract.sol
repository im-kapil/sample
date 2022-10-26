pragma solidity 0.8.7;
// import "./Ownable.sol";
contract myNextFilm is Ownable {
    
    mapping(string => uint256) public approvedMember;
    mapping(string =>mapping(string=>string)) public preview;       //preview[email][_previewName] = uri
    mapping(string =>mapping(string=>string)) fullScript;    //fullScript[email][_previewName] = uri
    mapping(string =>mapping(string=>string)) public approvalToScript;      //approvalToScript[ScriptHolderEmail][_requestedEmail] = _fullSciptName
    
    constructor(){}

    function preApprovedMember(string memory _email,uint _labels) public onlyOwner{     
        approvedMember[_email] = _labels;
    }
    
    function removePreApprovedMember(string memory _email) public onlyOwner{
        delete approvedMember[_email];
    }

    function createPreView(string memory _email,string memory _previewName, string memory _url) public{
        preview[_email][_previewName] = _url;
    }

    function createScript(string memory _email,string memory _fullScriptName, string memory _EncryptedUrl) public{
        fullScript[_email][_fullScriptName] = _EncryptedUrl;
    }

    function permissionToSeeScript(string memory _scriptHolderEmail,string memory _requestedEmail,string memory _fullScriptName)public{
        require(bytes(fullScript[_scriptHolderEmail][_fullScriptName]).length != 0,"script doesnot exist");
        require(uint(keccak256(abi.encodePacked(approvalToScript[_scriptHolderEmail][_requestedEmail]))) != uint(keccak256(abi.encodePacked(_fullScriptName))),"already permissioned");
        approvalToScript[_scriptHolderEmail][_requestedEmail] = _fullScriptName;    
    }  

    function seeScript(string memory _scriptHolderEmail,string memory _requestedEmail,string memory _fullScriptName) public view returns(string memory _uri){
        require(bytes(fullScript[_scriptHolderEmail][_fullScriptName]).length != 0,"script doesnot exist");
        require(approvedMember[_requestedEmail]!=0 || uint(keccak256(abi.encodePacked(approvalToScript[_scriptHolderEmail][_requestedEmail]))) == uint(keccak256(abi.encodePacked(_fullScriptName))),"you are not approved...");
        return fullScript[_scriptHolderEmail][_fullScriptName];
    }  

    function scriptTransfer(string memory _scriptHolderEmail, string memory _receiverEmail,string memory _fullScriptName, string memory _encryptedUrl) public{
        require(bytes(fullScript[_scriptHolderEmail][_fullScriptName]).length != 0,"script doesnot exist");
        delete fullScript[_scriptHolderEmail][_fullScriptName];
        fullScript[_receiverEmail][_fullScriptName] = _encryptedUrl;
    }
}